'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Mic, MicOff } from 'lucide-react';

interface Message {
  sender: 'visitor' | 'admin' | 'bot' | 'system';
  text: string;
}

const INTERESTS = [
  'Cloud Services',
  'Cyber Security',
  'Digital Transformation',
  'Managed IT',
  'Products (TMS/LMS)',
  'Careers',
  'General Inquiry',
];

type Step = 'welcome' | 'contact' | 'chat';

const SESSION_KEY = 'iq_chat_session_id';
const POLL_MS = 4000;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [interest, setInterest] = useState('');
  const [input, setInput] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [unread, setUnread] = useState(false);
  const [typingName, setTypingName] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const listeningActiveRef = useRef(false);

  // Voice-to-text: converts speech directly into typed text (not an audio recording),
  // so it reads normally in the emailed chat history and doesn't need anyone to listen
  // to a clip later. Uses the browser's built-in speech recognition — no API key needed.
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    setVoiceSupported(true);

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      // Ignore results that arrive after we've already stopped listening (e.g. a
      // trailing result delivered just after Send was pressed) — otherwise it can
      // silently repopulate the input right after it was cleared.
      if (!listeningActiveRef.current) return;
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      listeningActiveRef.current = false;
      recognitionRef.current.stop();
      setListening(false);
    } else {
      setInput('');
      listeningActiveRef.current = true;
      recognitionRef.current.start();
      setListening(true);
    }
  };

  useEffect(() => {
    sessionIdRef.current = sessionId;
  }, [sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, step]);

  // Resume an existing chat session on this browser, if one exists.
  useEffect(() => {
    const existing = typeof window !== 'undefined' ? localStorage.getItem(SESSION_KEY) : null;
    if (existing) {
      setSessionId(existing);
      setStep('chat');
    }
  }, []);

  // Let the visitor's own tab-close/navigate-away notify the admin that they left,
  // instead of the conversation just going silent with no explanation.
  useEffect(() => {
    const notifyLeave = () => {
      const id = sessionIdRef.current;
      if (!id) return;
      try {
        navigator.sendBeacon(`/api/chat/${id}/leave`, new Blob([], { type: 'application/json' }));
      } catch { /* best-effort only */ }
    };
    window.addEventListener('beforeunload', notifyLeave);
    window.addEventListener('pagehide', notifyLeave);
    return () => {
      window.removeEventListener('beforeunload', notifyLeave);
      window.removeEventListener('pagehide', notifyLeave);
    };
  }, []);

  const startChatWith = async (details: {
    name: string; email: string; phone: string; company?: string; interest: string; message?: string; greeting?: string;
  }) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      localStorage.setItem(SESSION_KEY, data.id);
      setSessionId(data.id);
      setMessages(data.messages || []);
      setInput('');
      setStep('chat');
    } catch { /* silent */ }
    setSubmitting(false);
  };

  // Auto-start (and auto-open) a chat when the lead-capture popup is submitted,
  // using a message tailored to whatever the visitor described they're looking for.
  useEffect(() => {
    const handlePopupSubmitted = (e: Event) => {
      if (sessionIdRef.current) return; // already chatting — don't override an existing conversation
      const detail = (e as CustomEvent).detail || {};
      const description = (detail.description || '').trim();
      const name = detail.name || '';

      const greeting = description
        ? `Hi, I understand that you are looking for "${description}". I would like to know more about it.`
        : `Hi, I understand that you are looking for some services or products. I would like to know more.`;

      setOpen(true);
      startChatWith({
        name,
        email: detail.email || '',
        phone: detail.phone || '',
        interest: detail.interest || '',
        greeting,
      });
    };

    window.addEventListener('iq:popup-submitted', handlePopupSubmitted);
    return () => window.removeEventListener('iq:popup-submitted', handlePopupSubmitted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Poll for new messages (e.g. admin replies) while a session is active.
  useEffect(() => {
    if (!sessionId) return;

    const poll = async () => {
      try {
        const res = await fetch(`/api/chat/${sessionId}`);
        if (res.status === 404) {
          // Admin deleted this conversation — reset so the visitor can start a fresh chat
          // instead of the widget appearing frozen with no explanation.
          localStorage.removeItem(SESSION_KEY);
          setSessionId(null);
          setMessages([]);
          setInterest('');
          setForm({ name: '', email: '', phone: '', company: '' });
          setStep('welcome');
          return;
        }
        if (!res.ok) return;
        const data = await res.json();
        setMessages((prev) => {
          if (data.messages.length === prev.length) return prev;
          // If the widget is closed and new admin messages arrived, show the unread dot.
          const newAdminMsg = data.messages.slice(prev.length).some((m: Message) => m.sender === 'admin');
          if (newAdminMsg && !open) setUnread(true);
          return data.messages;
        });
        setTypingName(data.adminTyping || null);
      } catch { /* silent — will retry on next tick */ }
    };

    poll();
    pollRef.current = setInterval(poll, POLL_MS);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [sessionId, open]);

  useEffect(() => {
    if (open) setUnread(false);
  }, [open]);

  const selectInterest = (i: string) => {
    setInterest(i);
    setStep('contact');
  };

  const startChat = async () => {
    if (!form.name.trim() || !form.email.trim()) return;
    await startChatWith({
      name: form.name, email: form.email, phone: form.phone, company: form.company,
      interest, message: input.trim(),
    });
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || !sessionId) return;
    // Stop any in-progress voice recognition first — otherwise a late speech
    // result can silently repopulate the input right after we clear it.
    // Guard against a late speech-recognition result firing after Send is pressed,
    // even if it had already auto-ended (state can lag the actual recognition lifecycle).
    listeningActiveRef.current = false;
    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
    setInput('');
    // Optimistic append so the visitor's own message shows instantly.
    setMessages((prev) => [...prev, { sender: 'visitor', text }]);
    try {
      await fetch(`/api/chat/${sessionId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
    } catch { /* will still show via next poll retry */ }
  };

  return (
    <>
      {/* Floating toggle button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        {!open && (
          <span
            className="absolute top-1/2 -translate-y-1/2
              px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap
              opacity-0 translate-x-2
              group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-200 pointer-events-none"
            style={{
              right: 'calc(100% + 12px)',
              background: 'rgba(255,255,255,0.94)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,0,0,0.08)',
              color: '#374151',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.90)',
            }}
          >
            Chat with us
          </span>
        )}
        <button
          onClick={() => setOpen(o => !o)}
          className="relative w-14 h-14 rounded-full text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            background: 'linear-gradient(145deg, #FB7185 0%, #E11D48 55%, #9F1239 100%)',
            boxShadow:
              '0 2px 4px rgba(0,0,0,0.06), 0 8px 28px rgba(190,18,60,0.42), 0 20px 52px rgba(190,18,60,0.18), 0 0 0 1px rgba(190,18,60,0.25), inset 0 1px 0 rgba(255,255,255,0.18)',
          }}
          aria-label={open ? 'Close chat' : 'Open chat'}
        >
          {open ? <X size={22} /> : <MessageSquare size={22} />}
          {unread && !open && (
            <span
              className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full"
              style={{ background: '#22C55E', border: '2px solid #fff' }}
            />
          )}
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{ border: '1px solid rgba(0,0,0,0.10)', maxHeight: '520px', background: '#fff' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 shrink-0" style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)' }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <MessageSquare size={17} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Innovatiq Team</p>
              <p className="text-white/75 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                {step === 'chat' ? 'Live chat' : 'Online'}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-white/85 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Welcome: interest selection */}
          {step === 'welcome' && (
            <div className="flex-1 overflow-y-auto p-4" style={{ background: '#FFFFFF' }}>
              <div className="flex justify-start mb-3">
                <div
                  className="max-w-[82%] px-4 py-2.5 text-sm leading-relaxed"
                  style={{ background: '#F3F4F6', color: '#374151', borderRadius: '16px 16px 16px 4px' }}
                >
                  Hi! I&apos;m from the Innovatiq team. What can we help you with today?
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map(i => (
                  <button
                    key={i}
                    onClick={() => selectInterest(i)}
                    className="text-xs px-3 py-1.5 rounded-full border transition-all hover:-translate-y-0.5 font-medium cursor-pointer"
                    style={{ borderColor: 'rgba(190,18,60,0.4)', color: '#BE123C', background: 'rgba(190,18,60,0.05)' }}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contact details before starting the live chat */}
          {step === 'contact' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: '#FFFFFF' }}>
              <div className="flex justify-start">
                <div
                  className="max-w-[82%] px-4 py-2.5 text-sm leading-relaxed"
                  style={{ background: '#F3F4F6', color: '#374151', borderRadius: '16px 16px 16px 4px' }}
                >
                  Great, you&apos;re interested in {interest}. Please share your details so our team can connect with you directly.
                </div>
              </div>

              <div className="space-y-2 p-3 rounded-xl" style={{ background: '#F9FAFB', border: '1px solid rgba(0,0,0,0.07)' }}>
                {([
                  { key: 'name', placeholder: 'Your full name *', type: 'text' },
                  { key: 'email', placeholder: 'Email address *', type: 'email' },
                  { key: 'phone', placeholder: 'Phone number (optional)', type: 'tel' },
                  { key: 'company', placeholder: 'Company name (optional)', type: 'text' },
                ] as const).map(f => (
                  <input
                    key={f.key}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors"
                    style={{ borderColor: 'rgba(0,0,0,0.12)', color: '#374151', background: '#fff' }}
                    onFocus={e => (e.target.style.borderColor = '#BE123C')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
                  />
                ))}
                <textarea
                  placeholder="Your message (optional)"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors resize-none"
                  style={{ borderColor: 'rgba(0,0,0,0.12)', color: '#374151', background: '#fff' }}
                  onFocus={e => (e.target.style.borderColor = '#BE123C')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
                />
                <button
                  onClick={startChat}
                  disabled={!form.name.trim() || !form.email.trim() || submitting}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)' }}
                >
                  {submitting ? 'Starting...' : <><Send size={14} /> Start Chat</>}
                </button>
              </div>
            </div>
          )}

          {/* Live two-way chat */}
          {step === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: '#FFFFFF' }}>
                {messages.length === 0 && (
                  <div className="flex justify-start">
                    <div
                      className="max-w-[82%] px-4 py-2.5 text-sm leading-relaxed"
                      style={{ background: '#F3F4F6', color: '#374151', borderRadius: '16px 16px 16px 4px' }}
                    >
                      Thanks! Our team has been notified and will join this chat shortly.
                    </div>
                  </div>
                )}
                {messages.map((m, i) => (
                  m.sender === 'system' ? null : (
                    <div key={i} className={`flex ${m.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className="max-w-[82%] px-4 py-2.5 text-sm leading-relaxed break-words"
                        style={m.sender === 'visitor'
                          ? { background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)', color: '#fff', borderRadius: '16px 16px 4px 16px' }
                          : { background: '#F3F4F6', color: '#374151', borderRadius: '16px 16px 16px 4px' }}
                      >
                        {m.text}
                      </div>
                    </div>
                  )
                ))}
                {typingName && (
                  <div className="flex justify-start">
                    <div
                      className="px-4 py-2.5 text-sm italic"
                      style={{ background: '#F3F4F6', color: '#6B7280', borderRadius: '16px 16px 16px 4px' }}
                    >
                      Innovatiq is typing...
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="shrink-0 flex gap-2 p-3 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)', background: '#FAFAFA' }}>
                <input
                  type="text"
                  placeholder={listening ? 'Listening...' : 'Type your message...'}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors"
                  style={{ borderColor: listening ? '#BE123C' : 'rgba(0,0,0,0.12)', color: '#374151', background: '#fff' }}
                  onFocus={e => (e.target.style.borderColor = '#BE123C')}
                  onBlur={e => (e.target.style.borderColor = listening ? '#BE123C' : 'rgba(0,0,0,0.12)')}
                />
                {voiceSupported && (
                  <button
                    onClick={toggleVoice}
                    className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                    style={{
                      background: listening ? 'rgba(190,18,60,0.1)' : '#F3F4F6',
                      color: listening ? '#BE123C' : '#6B7280',
                      animation: listening ? 'pulse 1.5s ease-in-out infinite' : 'none',
                    }}
                    aria-label={listening ? 'Stop recording' : 'Speak your message'}
                    title="Voice to text"
                  >
                    {listening ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                )}
                <button
                  onClick={sendMessage}
                  className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-white transition-all hover:scale-105 cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)' }}
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}