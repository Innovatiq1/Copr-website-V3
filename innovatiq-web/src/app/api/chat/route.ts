import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import ChatSession from '@/models/ChatSession';
import PopupSettings from '@/models/PopupSettings';
import { notifyAdminsPush } from '@/lib/push';
import { getLocationFromIp } from '@/lib/geo';
import { processChatTimeouts } from '@/lib/chatTimeouts';

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

async function notifyAdmin(session: {
  name: string; email: string; phone: string; company: string; interest: string; firstMessage: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  // Reuse the same recipient list configured for popup leads, so there's one
  // place to manage "who gets notified about website enquiries".
  const settings = await PopupSettings.findOne().sort({ createdAt: 1 });
  const recipients = settings?.recipientEmails?.length ? settings.recipientEmails : [process.env.SMTP_USER];

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Innovatiq Live Chat" <${process.env.SMTP_USER}>`,
    to: recipients.join(','),
    replyTo: session.email || undefined,
    subject: `[Live Chat] New conversation — ${session.name || 'Anonymous'}`,
    html: `
      <h2>New live chat started</h2>
      <p><strong>Name:</strong> ${session.name || 'N/A'}</p>
      <p><strong>Email:</strong> ${session.email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${session.phone || 'N/A'}</p>
      <p><strong>Interest:</strong> ${session.interest || 'N/A'}</p>
      <p><strong>Message:</strong> ${session.firstMessage || '(no message yet)'}</p>
      <p>Reply from Admin Panel &gt; Live Chat.</p>
    `,
  }).catch((err) => console.error('[chat] notify email failed:', err?.message || err));
}

// Public: visitor starts a new chat session.
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, company, interest, message, greeting } = body || {};

    const ip = getClientIp(req);
    const location = await getLocationFromIp(ip).catch(() => '');

    // "greeting" is an auto-generated intro from our side (e.g. based on what the
    // visitor typed in the lead popup) — it appears as coming FROM Innovatiq, not
    // from the visitor. "message" is something the visitor genuinely typed themselves.
    const messages = [];
    if (greeting) messages.push({ sender: 'bot', text: greeting, createdAt: new Date() });
    if (message) messages.push({ sender: 'visitor', text: message, createdAt: new Date() });

    const session = await ChatSession.create({
      name, email, phone, company, interest,
      ip, location,
      messages,
      seenByAdmin: false,
      seenByVisitor: true,
    });

    notifyAdmin({ name, email, phone, company, interest, firstMessage: message || greeting }).catch(() => {});
    notifyAdminsPush({
      title: `New chat — ${name || 'Anonymous'}`,
      body: message || greeting || `Interested in ${interest || 'General Inquiry'}`,
      url: '/admin/live-chat',
    }).catch(() => {});

    return NextResponse.json({ id: session._id, messages: session.messages });
  } catch (err) {
    console.error('[chat] start error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Admin-only: list all chat sessions, most recently active first.
export async function GET(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const sessions = await ChatSession.find().sort({ updatedAt: -1 });

    // Piggyback the same lazy timeout checks here too, so "team is busy" notices
    // and end-of-chat emails still fire even if the visitor isn't actively polling
    // (as long as an admin has the Live Chat page open).
    await Promise.all(sessions.map((s) => processChatTimeouts(s).catch(() => {})));

    return NextResponse.json(sessions);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}