import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['visitor', 'admin', 'bot', 'system'], required: true },
  senderName: { type: String, default: '' }, // which team member sent this, when sender === 'admin'
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const ChatSessionSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  company: { type: String, default: '' },
  interest: { type: String, default: '' },
  ip: { type: String, default: '' },
  location: { type: String, default: '' }, // e.g. "Mumbai, India" — derived from IP, no browser permission needed
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  // true once admin has opened/seen this session — drives the unread indicator in admin panel
  seenByAdmin: { type: Boolean, default: false },
  // true once visitor has seen the latest admin reply — drives the unread bubble on the widget
  seenByVisitor: { type: Boolean, default: true },
  // When the last "team is busy" auto-notice was sent, so we don't spam it repeatedly
  // while the visitor is still waiting for the same unanswered message.
  busyNoticeAt: { type: Date, default: null },
  // Whether the full chat-history email has already been sent for this idle period,
  // so a slow-but-eventual reply doesn't trigger a duplicate email later.
  historyEmailed: { type: Boolean, default: false },
  // Every team member who has opened this conversation, with when they last
  // viewed it — shown as "Seen by X, Y" (excluding whoever's currently looking).
  seenBy: {
    type: [{ name: { type: String }, at: { type: Date } }],
    default: [],
  },
  // Live "typing" state so the visitor (and other admins) can see when a team
  // member is actively composing a reply. Treated as stale after a few seconds
  // of no update — there's no separate "stop typing" event.
  adminTyping: {
    name: { type: String, default: '' },
    at: { type: Date, default: null },
  },
  messages: { type: [ChatMessageSchema], default: [] },
}, { timestamps: true });

export default mongoose.models.ChatSession || mongoose.model('ChatSession', ChatSessionSchema);