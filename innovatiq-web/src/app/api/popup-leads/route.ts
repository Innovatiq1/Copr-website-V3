import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import PopupLead from '@/models/PopupLead';
import PopupSettings from '@/models/PopupSettings';

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

// Replaces {{token}} placeholders with actual values. Tokens that have no matching
// data (e.g. a field was removed from settings after this lead was submitted) are
// left as-is rather than silently disappearing, so a broken/renamed token is obvious.
function renderTemplate(template: string, tokens: Record<string, string>): string {
  return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key) => {
    return key in tokens ? String(tokens[key]) : match;
  });
}

async function sendNotificationEmail(
  recipients: string[],
  data: Record<string, unknown>,
  page: string,
  template: { emailSubject?: string; emailBodyTemplate?: string }
) {
  if (!recipients || recipients.length === 0) return;
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const tokens: Record<string, string> = { page: page || '' };
  Object.entries(data).forEach(([key, value]) => {
    tokens[key] = String(value ?? '');
  });

  const defaultBody =
    'New enquiry received\n\nSubmitted from: {{page}}\n\n' +
    Object.keys(data).map((key) => `${key}: {{${key}}}`).join('\n');

  const subject = template.emailSubject || 'New Website Enquiry — Lead Capture Popup';
  const bodyTemplate = template.emailBodyTemplate || defaultBody;
  const renderedBody = renderTemplate(bodyTemplate, tokens).replace(/\n/g, '<br>');

  await transporter.sendMail({
    from: `"Innovatiq Website" <${process.env.SMTP_USER}>`,
    to: recipients.join(','),
    subject: renderTemplate(subject, tokens),
    html: renderedBody,
  });
}

// Public: visitor submits the popup form.
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { data, page } = body || {};

    if (!data || typeof data !== 'object') {
      return NextResponse.json({ message: 'Invalid submission' }, { status: 400 });
    }

    const ip = getClientIp(req);
    const userAgent = req.headers.get('user-agent') || '';

    // Server-side guard: same IP should not be able to submit again,
    // even if the visitor clears localStorage/cookies.
    const existing = await PopupLead.findOne({ ip });
    if (existing) {
      return NextResponse.json({ alreadySubmitted: true }, { status: 200 });
    }

    const lead = await PopupLead.create({ data, ip, userAgent, page });

    const settings = await PopupSettings.findOne().sort({ createdAt: 1 });
    const recipients = settings?.recipientEmails || [];

    // Fire-and-forget: don't make the visitor wait for the email to send.
    // The lead is already saved, so a slow/failed email should never block the response.
    // If it fails, log the reason so it's not a silent, undebuggable failure.
    sendNotificationEmail(recipients, data, page || '', {
      emailSubject: settings?.emailSubject,
      emailBodyTemplate: settings?.emailBodyTemplate,
    }).catch((err) => {
      console.error('[popup-leads] Failed to send notification email:', err?.message || err);
    });

    return NextResponse.json(lead, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Admin-only: view all captured leads.
export async function GET(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const leads = await PopupLead.find().sort({ createdAt: -1 });
    return NextResponse.json(leads);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Admin-only: delete a single lead by id (?id=...), or all leads (?all=true) — mainly for testing/cleanup.
export async function DELETE(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const all = searchParams.get('all');

    if (all === 'true') {
      await PopupLead.deleteMany({});
      return NextResponse.json({ deleted: 'all' });
    }

    if (id) {
      await PopupLead.findByIdAndDelete(id);
      return NextResponse.json({ deleted: id });
    }

    return NextResponse.json({ message: 'Provide id or all=true' }, { status: 400 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}