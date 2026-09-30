import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import ChatSession from '@/models/ChatSession';
import { processChatTimeouts } from '@/lib/chatTimeouts';

// Public: visitor polls this to get the full message list (used every few seconds
// while the chat widget is open, so admin replies show up without a page reload).
// Marks the session as seen-by-visitor since they're actively looking at it.
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const session = await ChatSession.findById(id);
    if (!session) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    if (!session.seenByVisitor) {
      session.seenByVisitor = true;
      await session.save();
    }

    await processChatTimeouts(session).catch(() => {});

    // Let the visitor's widget show a live "team is typing" indicator — treat
    // it as stale after 6 seconds so it doesn't get stuck showing forever.
    const typingIsRecent = session.adminTyping?.at && (Date.now() - new Date(session.adminTyping.at).getTime() < 6000);

    return NextResponse.json({
      messages: session.messages,
      status: session.status,
      adminTyping: typingIsRecent ? session.adminTyping.name : null,
    });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Admin-only: close/reopen a session, or mark it as seen without opening the full list again.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const session = await ChatSession.findById(id);
    if (!session) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    if (typeof body.status === 'string') session.status = body.status;
    if (body.markSeen) {
      session.seenByAdmin = true;
      const adminName = (admin as { name?: string }).name || '';
      const existing = session.seenBy.find((s: { name: string }) => s.name === adminName);
      if (existing) {
        existing.at = new Date();
      } else {
        session.seenBy.push({ name: adminName, at: new Date() });
      }
    }
    if (typeof body.typing === 'boolean') {
      session.adminTyping = body.typing
        ? { name: (admin as { name?: string }).name || '', at: new Date() }
        : { name: '', at: null };
    }

    await session.save();
    return NextResponse.json(session);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Admin-only: permanently delete a chat session (e.g. spam, or an old resolved conversation).
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    await ChatSession.findByIdAndDelete(id);
    return NextResponse.json({ deleted: id });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}