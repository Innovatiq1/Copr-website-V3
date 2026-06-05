import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, interest, message, chatHistory } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const historyHtml = Array.isArray(chatHistory) && chatHistory.length
      ? `<h3 style="color:#E8174B;margin-top:20px;">Chat History</h3>
         ${chatHistory.map((m: { role: string; text: string }) => `
           <div style="margin-bottom:8px;padding:8px;border-radius:6px;background:${m.role === 'user' ? '#fef2f4' : '#f3f4f6'}">
             <strong style="color:${m.role === 'user' ? '#D4174A' : '#374151'}">${m.role === 'user' ? 'User' : 'Bot'}:</strong>
             <span style="color:#374151;margin-left:6px;">${m.text}</span>
           </div>`).join('')}`
      : '';

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#E8174B,#A8102E);padding:24px;border-radius:8px 8px 0 0;">
          <h2 style="color:#fff;margin:0;font-size:20px;">New Chatbot Inquiry</h2>
          <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">${interest || 'General Inquiry'}</p>
        </div>
        <div style="background:#f9f9f9;padding:24px;border:1px solid #eee;border-top:none;">
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
            <tr><td style="padding:8px 0;color:#666;font-size:14px;width:120px;font-weight:600;">Name:</td><td style="padding:8px 0;font-weight:bold;font-size:14px;">${name || 'N/A'}</td></tr>
            <tr><td style="padding:8px 0;color:#666;font-size:14px;font-weight:600;">Email:</td><td style="padding:8px 0;font-size:14px;">${email || 'N/A'}</td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#666;font-size:14px;font-weight:600;">Phone:</td><td style="padding:8px 0;font-size:14px;">${phone}</td></tr>` : ''}
            ${company ? `<tr><td style="padding:8px 0;color:#666;font-size:14px;font-weight:600;">Company:</td><td style="padding:8px 0;font-size:14px;">${company}</td></tr>` : ''}
            ${interest ? `<tr><td style="padding:8px 0;color:#666;font-size:14px;font-weight:600;">Interest:</td><td style="padding:8px 0;font-size:14px;color:#E8174B;font-weight:600;">${interest}</td></tr>` : ''}
          </table>
          ${message ? `<div style="padding:16px;background:#fff;border-left:4px solid #E8174B;border-radius:4px;margin-bottom:16px;">
            <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">${message}</p>
          </div>` : ''}
          ${historyHtml}
        </div>
        <div style="background:#1f2937;padding:14px 24px;border-radius:0 0 8px 8px;text-align:center;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">Innovatiq Technologies &copy; 2025 &nbsp;|&nbsp; support.learning@innovatiqconsulting.com</p>
        </div>
      </div>`;

    await transporter.sendMail({
      from: `"Innovatiq Chatbot" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email || undefined,
      subject: `[Chatbot Inquiry] ${interest || 'General'} - ${name || 'Anonymous'}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Chatbot email error:', err);
    return NextResponse.json({ message: 'Failed to send' }, { status: 500 });
  }
}
