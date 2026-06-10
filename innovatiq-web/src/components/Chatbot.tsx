'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ChevronRight } from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
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

type Step = 'welcome' | 'chat' | 'contact' | 'done';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('welcome');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! I'm the Innovatiq assistant. How can I help you today? Please select your area of interest:" },
  ]);
  const [interest, setInterest] = useState('');
  const [input, setInput] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [submitting, setSubmitting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, step]);

  const reset = () => {
    setStep('welcome');
    setMessages([{ role: 'bot', text: "Hi! I'm the Innovatiq assistant. How can I help you today? Please select your area of interest:" }]);
    setInterest('');
    setInput('');
    setForm({ name: '', email: '', phone: '', company: '' });
  };

  const selectInterest = (i: string) => {
    setInterest(i);
    setMessages(prev => [
      ...prev,
      { role: 'user', text: i },
      { role: 'bot', text: `Great! You're interested in ${i}. Please type your message or question below and we'll connect you with the right team.` },
    ]);
    setStep('chat');
  };

  const sendMessage = () => {
    const msg = input.trim();
    if (!msg) return;
    setInput('');
    setMessages(prev => [
      ...prev,
      { role: 'user', text: msg },
      { role: 'bot', text: "Thanks for sharing! To ensure our team can follow up with you, please provide your contact details below." },
    ]);
    setStep('contact');
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) return;
    setSubmitting(true);
    try {
      await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          interest,
          message: messages.filter(m => m.role === 'user').map(m => m.text).join('\n'),
          chatHistory: messages,
        }),
      });
    } catch { /* silent */ }
    setMessages(prev => [
      ...prev,
      { role: 'bot', text: `Thank you, ${form.name}! Our team will reach out to you at ${form.email} shortly. Have a great day!` },
    ]);
    setStep('done');
    setSubmitting(false);
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
          className="w-14 h-14 rounded-full text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(145deg, #0EA5E9 0%, #2563EB 55%, #1E40AF 100%)',
            boxShadow:
              '0 2px 4px rgba(0,0,0,0.06), 0 8px 28px rgba(29,78,216,0.42), 0 20px 52px rgba(29,78,216,0.18), 0 0 0 1px rgba(29,78,216,0.25), inset 0 1px 0 rgba(255,255,255,0.18)',
          }}
          aria-label={open ? 'Close chat' : 'Open chat'}
        >
          {open ? <X size={22} /> : <MessageSquare size={22} />}
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{ border: '1px solid rgba(0,0,0,0.10)', maxHeight: '520px', background: '#fff' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 shrink-0" style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)' }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <MessageSquare size={17} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Innovatiq Assistant</p>
              <p className="text-white/70 text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: '#FFFFFF' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[82%] px-4 py-2.5 text-sm leading-relaxed"
                  style={m.role === 'user'
                    ? { background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)', color: '#fff', borderRadius: '16px 16px 4px 16px' }
                    : { background: '#F3F4F6', color: '#374151', borderRadius: '16px 16px 16px 4px' }}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Interest selection buttons */}
            {step === 'welcome' && (
              <div className="flex flex-wrap gap-2 mt-1">
                {INTERESTS.map(i => (
                  <button
                    key={i}
                    onClick={() => selectInterest(i)}
                    className="text-xs px-3 py-1.5 rounded-full border transition-all hover:-translate-y-0.5 font-medium"
                    style={{ borderColor: 'rgba(29,78,216,0.4)', color: '#1D4ED8', background: 'rgba(29,78,216,0.05)' }}
                  >
                    {i}
                  </button>
                ))}
              </div>
            )}

            {/* Contact form */}
            {step === 'contact' && (
              <div className="space-y-2 mt-1 p-3 rounded-xl" style={{ background: '#F9FAFB', border: '1px solid rgba(0,0,0,0.07)' }}>
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
                    onFocus={e => (e.target.style.borderColor = '#1D4ED8')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
                  />
                ))}
                <button
                  onClick={handleSubmit}
                  disabled={!form.name.trim() || !form.email.trim() || submitting}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)' }}
                >
                  {submitting ? 'Sending...' : <><Send size={14} /> Send Message</>}
                </button>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Message input */}
          {step === 'chat' && (
            <div className="shrink-0 flex gap-2 p-3 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)', background: '#FAFAFA' }}>
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors"
                style={{ borderColor: 'rgba(0,0,0,0.12)', color: '#374151', background: '#fff' }}
                onFocus={e => (e.target.style.borderColor = '#1D4ED8')}
                onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
              />
              <button
                onClick={sendMessage}
                className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)' }}
                aria-label="Send"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {step === 'done' && (
            <div className="shrink-0 p-3 text-center border-t" style={{ borderColor: 'rgba(0,0,0,0.08)', background: '#FAFAFA' }}>
              <button
                onClick={() => { reset(); }}
                className="text-sm font-medium transition-colors hover:underline"
                style={{ color: '#1D4ED8' }}
              >
                Start a new conversation
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
