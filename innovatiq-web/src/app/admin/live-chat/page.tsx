'use client';

import { useEffect, useRef, useState } from 'react';
import { API, authFetch } from '@/lib/adminApi';
import { Send, User, Trash2, Settings, Save, Mic, MicOff } from 'lucide-react';

type ChatMessage = { sender: 'visitor' | 'admin' | 'bot' | 'system'; senderName?: string; text: string; createdAt?: string };
type ChatSession = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  ip: string;
  location: string;
  status: 'open' | 'closed';
  seenByAdmin: boolean;
  seenBy?: { name: string; at: string }[];
  adminTyping?: { name: string; at: string | null };
  messages: ChatMessage[];
  updatedAt: string;
};

type ChatSettings = {
  busyThresholdMinutes: number;
  busyMessageText: string;
  idleEmailThresholdMinutes: number;
};

const POLL_MS = 5000;

export default function LiveChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [currentAdminName, setCurrentAdminName] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const listeningActiveRef = useRef(false);

  // Know our own name so we don't show "You are typing" to ourselves — only
  // when a DIFFERENT team member is composing a reply on this same conversation.
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.name) setCurrentAdminName(payload.name);
    } catch { /* ignore */ }
  }, []);

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
      if (!listeningActiveRef.current) return;
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setReply(transcript);
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
      setReply('');
      listeningActiveRef.current = true;
      recognitionRef.current.start();
      setListening(true);
    }
  };
  const bottomRef = useRef<HTMLDivElement>(null);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chatSettings, setChatSettings] = useState<ChatSettings>({
    busyThresholdMinutes: 2,
    busyMessageText: "It seems our team is busy with other conversations at the moment. Please bear with us — our team will connect with you here shortly.",
    idleEmailThresholdMinutes: 20,
  });
  const [savingSettings, setSavingSettings] = useState(false);

  const fetchSessions = async () => {
    try {
      const res = await authFetch(`${API}/chat`);
      const data = await res.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch { /* silent, retry on next poll */ }
  };

  useEffect(() => {
    fetchSessions();
    const id = setInterval(fetchSessions, POLL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    authFetch(`${API}/chat-settings`).then((r) => r.json()).then((data) => {
      setChatSettings({
        busyThresholdMinutes: data.busyThresholdMinutes ?? 2,
        busyMessageText: data.busyMessageText || "It seems our team is busy with other conversations at the moment. Please bear with us — our team will connect with you here shortly.",
        idleEmailThresholdMinutes: data.idleEmailThresholdMinutes ?? 20,
      });
    }).catch(() => {});
  }, []);

  const saveChatSettings = async () => {
    setSavingSettings(true);
    try {
      await authFetch(`${API}/chat-settings`, { method: 'PUT', body: JSON.stringify(chatSettings) });
    } catch { /* silent */ }
    setSavingSettings(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, sessions]);

  const active = sessions.find((s) => s._id === activeId) || null;

  const openSession = async (s: ChatSession) => {
    setActiveId(s._id);
    // Always refresh "seen by" to whoever is opening it now — not just the first
    // time it's unread — so the label reflects the most recent viewer, not the
    // first one who ever saw it.
    try {
      const res = await authFetch(`${API}/chat/${s._id}`, { method: 'PATCH', body: JSON.stringify({ markSeen: true }) });
      const data = await res.json();
      setSessions((prev) => prev.map((x) => (x._id === s._id ? { ...x, seenByAdmin: true, seenBy: data.seenBy } : x)));
    } catch { /* non-critical */ }
  };

  // Throttled "typing" signal — sent at most once every 2 seconds while the reply
  // box has content, so colleagues (and the visitor) see a live typing indicator
  // without hammering the API on every keystroke.
  const lastTypingSentRef = useRef(0);
  const sendTypingSignal = (id: string) => {
    const now = Date.now();
    if (now - lastTypingSentRef.current < 2000) return;
    lastTypingSentRef.current = now;
    authFetch(`${API}/chat/${id}`, { method: 'PATCH', body: JSON.stringify({ typing: true }) }).catch(() => {});
  };

  // Keep the "typing" indicator alive for as long as there's unsent text in the
  // reply box — even during a pause with no new keystrokes — and clear it the
  // moment the box is emptied (or a reply is sent, which already clears it server-side).
  useEffect(() => {
    if (!activeId || !reply.trim()) return;
    const heartbeat = setInterval(() => {
      authFetch(`${API}/chat/${activeId}`, { method: 'PATCH', body: JSON.stringify({ typing: true }) }).catch(() => {});
    }, 2500);
    return () => clearInterval(heartbeat);
  }, [activeId, reply]);

  const prevReplyRef = useRef('');
  useEffect(() => {
    // Reply box was just emptied (manually cleared, not via a fresh conversation switch) — signal "stopped typing" immediately.
    if (prevReplyRef.current.trim() && !reply.trim() && activeId) {
      authFetch(`${API}/chat/${activeId}`, { method: 'PATCH', body: JSON.stringify({ typing: false }) }).catch(() => {});
    }
    prevReplyRef.current = reply;
  }, [reply, activeId]);

  const sendReply = async () => {
    const text = reply.trim();
    if (!text || !activeId) return;
    listeningActiveRef.current = false;
    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
    setSending(true);
    setReply('');
    try {
      const res = await authFetch(`${API}/chat/${activeId}/reply`, {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setSessions((prev) => prev.map((x) => (x._id === activeId ? { ...x, messages: data.messages } : x)));
    } catch { /* keep text? simplest is silent fail */ }
    setSending(false);
  };

  const deleteSession = async (id: string) => {
    if (!confirm('Delete this conversation? This cannot be undone.')) return;
    try {
      await authFetch(`${API}/chat/${id}`, { method: 'DELETE' });
      setSessions((prev) => prev.filter((s) => s._id !== id));
      if (activeId === id) setActiveId(null);
    } catch { /* silent */ }
  };

  const cardStyle = { background: '#FFFFFF', border: '1px solid #EEF2F7', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' };
  const accentGradient = 'linear-gradient(135deg, #9F1239 0%, #E11D48 100%)';

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 112px)' }}>
      <div className="mb-6 shrink-0 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F172A' }}>Live Chat</h1>
          <p className="text-sm mt-1" style={{ color: '#64748B' }}>Conversations started via the website chat widget</p>
        </div>
        <button
          onClick={() => setSettingsOpen((o) => !o)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shrink-0"
          style={{ background: '#F8FAFC', color: '#334155', border: '1px solid #EEF2F7' }}
        >
          <Settings size={16} /> Chat Timing Settings
        </button>
      </div>

      {settingsOpen && (
        <div className="mb-6 shrink-0 rounded-2xl p-5" style={cardStyle}>
          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>
                Auto &quot;team is busy&quot; notice after (minutes)
              </label>
              <input
                type="number"
                min={1}
                value={chatSettings.busyThresholdMinutes}
                onChange={(e) => setChatSettings((s) => ({ ...s, busyThresholdMinutes: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
              <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
                If the team hasn&apos;t replied to the visitor&apos;s last message within this time, an automatic &quot;we&apos;re busy&quot; message is sent.
              </p>
              <label className="block text-xs font-semibold mb-1.5 mt-3" style={{ color: '#64748B' }}>
                Busy message text
              </label>
              <textarea
                value={chatSettings.busyMessageText}
                onChange={(e) => setChatSettings((s) => ({ ...s, busyMessageText: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>
                Send chat-history email after (minutes of inactivity)
              </label>
              <input
                type="number"
                min={1}
                value={chatSettings.idleEmailThresholdMinutes}
                onChange={(e) => setChatSettings((s) => ({ ...s, idleEmailThresholdMinutes: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A' }}
              />
              <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
                If neither side sends a message for this long, the chat is treated as ended and the full history is emailed.
              </p>
            </div>
          </div>
          <button
            onClick={saveChatSettings}
            disabled={savingSettings}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
            style={{ background: accentGradient }}
          >
            <Save size={16} /> {savingSettings ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      )}

      <div className="grid gap-6 flex-1 min-h-0" style={{ gridTemplateColumns: '320px 1fr' }}>
        {/* Session list */}
        <div className="rounded-2xl overflow-hidden flex flex-col min-h-0" style={cardStyle}>
          <div className="overflow-y-auto flex-1 min-h-0">
            {sessions.length === 0 ? (
              <p className="text-sm p-6 text-center" style={{ color: '#94A3B8' }}>No conversations yet</p>
            ) : (
              sessions.map((s) => (
                <div
                  key={s._id}
                  onClick={() => openSession(s)}
                  className="w-full text-left px-4 py-3 flex items-start gap-3 transition-colors cursor-pointer group"
                  style={{
                    background: activeId === s._id ? '#FDF2F5' : '#FFFFFF',
                    borderBottom: '1px solid #F1F5F9',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
                    style={{ background: accentGradient }}
                  >
                    {(s.name || '?').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold truncate" style={{ color: '#0F172A' }}>{s.name || 'Anonymous'}</p>
                      {!s.seenByAdmin && (
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#E11D48' }} />
                      )}
                    </div>
                    <p className="text-xs truncate" style={{ color: '#94A3B8' }}>{s.interest || 'General'}</p>
                    <p className="text-xs truncate mt-0.5" style={{ color: '#64748B' }}>
                      {s.messages[s.messages.length - 1]?.text || '(no messages yet)'}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteSession(s._id); }}
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: '#94A3B8' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#E11D48')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                    aria-label="Delete conversation"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Conversation */}
        <div className="rounded-2xl overflow-hidden flex flex-col min-h-0" style={cardStyle}>
          {!active ? (
            <div className="flex-1 flex items-center justify-center p-10">
              <div className="text-center">
                <User size={28} style={{ color: '#CBD5E1', margin: '0 auto 8px' }} />
                <p className="text-sm" style={{ color: '#94A3B8' }}>Select a conversation to view and reply</p>
              </div>
            </div>
          ) : (
            <>
              <div className="px-5 py-4 shrink-0" style={{ borderBottom: '1px solid #EEF2F7' }}>
                <p className="font-semibold" style={{ color: '#0F172A' }}>{active.name || 'Anonymous'}</p>
                <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>
                  {active.email} {active.phone ? `· ${active.phone}` : ''} {active.company ? `· ${active.company}` : ''}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                  Interested in: {active.interest || 'General'}
                  {active.location && <> · Location: {active.location}</>}
                  {active.ip && <> · IP: {active.ip}</>}
                </p>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-3" style={{ background: '#FAFAFA' }}>
                {active.messages.map((m, i) => (
                  m.sender === 'system' ? (
                    <div key={i} className="flex justify-center">
                      <span className="text-[11px] px-3 py-1 rounded-full" style={{ background: '#F1F5F9', color: '#94A3B8' }}>
                        {m.text}
                      </span>
                    </div>
                  ) : (
                  <div key={i} className={`flex flex-col ${(m.sender === 'admin' || m.sender === 'bot') ? 'items-end' : 'items-start'}`}>
                    {m.sender === 'admin' && m.senderName && (
                      <span className="text-[10px] font-semibold mb-0.5 mr-1" style={{ color: '#9F1239' }}>{m.senderName}</span>
                    )}
                    <div
                      className="max-w-[75%] px-4 py-2.5 text-sm leading-relaxed break-words"
                      style={(m.sender === 'admin' || m.sender === 'bot')
                        ? { background: accentGradient, color: '#fff', borderRadius: '16px 16px 4px 16px' }
                        : { background: '#FFFFFF', color: '#334155', border: '1px solid #EEF2F7', borderRadius: '16px 16px 16px 4px' }}
                    >
                      {m.text}
                    </div>
                  </div>
                  )
                ))}
                {(() => {
                  const nonSystemMessages = active.messages.filter((m) => m.sender !== 'system');
                  const lastMsgAt = nonSystemMessages.length
                    ? new Date(nonSystemMessages[nonSystemMessages.length - 1].createdAt || 0).getTime()
                    : 0;
                  // Only show someone as having "seen" it if their last view was AFTER
                  // the newest message — otherwise they haven't seen the latest one yet.
                  const others = (active.seenBy || [])
                    .filter((s) => s.name && s.name !== currentAdminName && new Date(s.at).getTime() >= lastMsgAt)
                    .map((s) => s.name);
                  if (others.length === 0) return null;
                  return (
                    <p className="text-[11px] text-right pr-1" style={{ color: '#94A3B8' }}>
                      Seen by {others.join(', ')}
                    </p>
                  );
                })()}
                {active.adminTyping?.name &&
                  active.adminTyping.name !== currentAdminName &&
                  active.adminTyping.at &&
                  (Date.now() - new Date(active.adminTyping.at).getTime() < 6000) && (
                  <div className="flex justify-end">
                    <div
                      className="px-4 py-2 text-xs italic font-medium"
                      style={{ background: 'rgba(159,18,57,0.08)', color: '#9F1239', borderRadius: '16px 16px 4px 16px' }}
                    >
                      {active.adminTyping.name} is typing... please wait before replying
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="flex gap-2 p-4 shrink-0" style={{ borderTop: '1px solid #EEF2F7' }}>
                <input
                  type="text"
                  placeholder={listening ? 'Listening...' : 'Type a reply...'}
                  value={reply}
                  onChange={(e) => { setReply(e.target.value); if (activeId) sendTypingSignal(activeId); }}
                  onKeyDown={(e) => e.key === 'Enter' && sendReply()}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: '#FFFFFF', border: `1px solid ${listening ? '#BE123C' : '#E2E8F0'}`, color: '#0F172A' }}
                />
                {voiceSupported && (
                  <button
                    onClick={toggleVoice}
                    className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center"
                    style={{ background: listening ? 'rgba(190,18,60,0.1)' : '#F8FAFC', color: listening ? '#BE123C' : '#64748B', border: '1px solid #EEF2F7' }}
                    title="Voice to text"
                  >
                    {listening ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                )}
                <button
                  onClick={sendReply}
                  disabled={sending || !reply.trim()}
                  className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-white disabled:opacity-50"
                  style={{ background: accentGradient }}
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}