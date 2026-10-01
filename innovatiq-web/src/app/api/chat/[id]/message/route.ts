import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ChatSession from '@/models/ChatSession';
import { notifyAdminsPush } from '@/lib/push';

// Public: visitor sends a message into an existing chat session.
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const { text } = await req.json();
    if (!text || !text.trim()) return NextResponse.json({ message: 'Empty message' }, { status: 400 });

    const session = await ChatSession.findById(id);
    if (!session) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    session.messages.push({ sender: 'visitor', text: text.trim(), createdAt: new Date() });
    session.seenByAdmin = false; // new visitor message → admin hasn't seen it yet
    await session.save();

    notifyAdminsPush({
      title: `New message — ${session.name || 'Anonymous'}`,
      body: text.trim(),
      url: '/admin/live-chat',
    }).catch(() => {});

    return NextResponse.json({ messages: session.messages });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}