import nodemailer from 'nodemailer';
import PopupSettings from '@/models/PopupSettings';
import ChatSettings from '@/models/ChatSettings';
import ChatSession from '@/models/ChatSession';

type ChatMessage = { sender: string; text: string; createdAt?: Date };
type ChatSessionDoc = {
  _id: unknown;
  name: string;
  email: string;
  phone: string;
  interest: string;
  messages: ChatMessage[];
  busyNoticeAt: Date | null;
  historyEmailed: boolean;
  status: string;
};

async function sendHistoryEmail(session: ChatSessionDoc) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  const settings = await PopupSettings.findOne().sort({ createdAt: 1 });
  const recipients = settings?.recipientEmails?.length ? settings.recipientEmails : [process.env.SMTP_USER];

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const rows = session.messages
    .map((m) => `<tr><td style="padding:4px 10px;font-weight:600;">${m.sender}</td><td style="padding:4px 10px;">${m.text}</td></tr>`)
    .join('');

  await transporter.sendMail({
    from: `"Innovatiq Live Chat" <${process.env.SMTP_USER}>`,
    to: recipients.join(','),
    subject: `[Live Chat Ended] Conversation with ${session.name || 'Anonymous'}`,
    html: `
      <h2>Chat conversation ended</h2>
      <p><strong>Name:</strong> ${session.name || 'N/A'} &nbsp; <strong>Email:</strong> ${session.email || 'N/A'} &nbsp; <strong>Phone:</strong> ${session.phone || 'N/A'}</p>
      <p><strong>Interest:</strong> ${session.interest || 'N/A'}</p>
      <table>${rows}</table>
    `,
  }).catch((err) => console.error('[chat] history email failed:', err?.message || err));
}

// Called opportunistically whenever a poll request touches a session (visitor or
// admin side) — there's no cron job in this app, so time-based behaviour piggybacks
// on the regular polling that's already happening while either side has the chat open.
//
// IMPORTANT: several browser tabs (visitor widget + one or more admin windows) can all
// poll around the same moment and each independently decide "the busy-notice is due" —
// without a guard, that used to push the same auto-message multiple times. Both actions
// below use an atomic MongoDB findOneAndUpdate with a matching condition, so only the
// FIRST concurrent caller's write actually succeeds; the others simply find no match.
export async function processChatTimeouts(session: ChatSessionDoc) {
  if (!session.messages.length) return;

  const settings = await ChatSettings.findOne().sort({ createdAt: 1 });
  const busyThresholdMs = (settings?.busyThresholdMinutes ?? 2) * 60 * 1000;
  const emailThresholdMs = (settings?.idleEmailThresholdMinutes ?? 20) * 60 * 1000;

  const last = session.messages[session.messages.length - 1];
  const lastAt = last.createdAt ? new Date(last.createdAt) : new Date();
  const idleMs = Date.now() - lastAt.getTime();

  // Auto "team is busy" notice: only when the visitor is the one waiting (last
  // message is theirs) and no notice has been sent for this same wait yet.
  if (last.sender === 'visitor' && idleMs > busyThresholdMs) {
    const busyMessageText = settings?.busyMessageText
      || "It seems our team is busy with other conversations at the moment. Please bear with us — our team will connect with you here shortly.";

    const updated = await ChatSession.findOneAndUpdate(
      {
        _id: session._id,
        // Only proceed if no busy-notice has been recorded yet, or the last one was
        // sent BEFORE this visitor message (i.e. for an earlier, already-answered wait).
        $expr: {
          $or: [
            { $eq: [{ $ifNull: ['$busyNoticeAt', null] }, null] },
            { $lt: ['$busyNoticeAt', lastAt] },
          ],
        },
      },
      {
        $push: { messages: { sender: 'bot', text: busyMessageText, createdAt: new Date() } },
        $set: { busyNoticeAt: new Date() },
      },
      { new: true }
    );

    // Only the caller that actually won the race gets a non-null result — reflect
    // the change onto the in-memory object so this same request's response is correct.
    if (updated) {
      session.messages = updated.messages;
      session.busyNoticeAt = updated.busyNoticeAt;
    }
  }

  // Chat considered ended after a longer idle period — email the full history exactly once.
  if (idleMs > emailThresholdMs && !session.historyEmailed) {
    const updated = await ChatSession.findOneAndUpdate(
      { _id: session._id, historyEmailed: false },
      { $set: { historyEmailed: true, status: 'closed' } },
      { new: true }
    );

    if (updated) {
      await sendHistoryEmail(updated);
      session.historyEmailed = true;
      session.status = 'closed';
    }
  }
}