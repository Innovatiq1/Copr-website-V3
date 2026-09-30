import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import ChatSession from '@/models/ChatSession';

// Admin-only: reply to a visitor from the Admin Panel's Live Chat page.
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    const { text } = await req.json();
    if (!text || !text.trim()) return NextResponse.json({ message: 'Empty message' }, { status: 400 });

    const session = await ChatSession.findById(id);
    if (!session) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    session.messages.push({
      sender: 'admin',
      senderName: (admin as { name?: string }).name || '',
      text: text.trim(),
      createdAt: new Date(),
    });
    session.seenByVisitor = false; // new admin message → visitor hasn't seen it yet
    session.seenByAdmin = true;
    // Sending a reply implies typing has stopped.
    session.adminTyping = { name: '', at: null };
    await session.save();

    return NextResponse.json({ messages: session.messages });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}