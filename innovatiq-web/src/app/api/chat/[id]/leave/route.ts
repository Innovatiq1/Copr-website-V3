import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ChatSession from '@/models/ChatSession';

// Public: called via navigator.sendBeacon when the visitor closes the tab / navigates
// away while a chat is open, so the admin sees a clear "customer has left" marker
// instead of the conversation just going silent with no explanation.
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const session = await ChatSession.findById(id);
    if (!session) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    // Avoid spamming duplicate "left" markers if this fires more than once in a row.
    const last = session.messages[session.messages.length - 1];
    if (!last || last.sender !== 'system' || last.text !== 'Customer has left the chat') {
      session.messages.push({ sender: 'system', text: 'Customer has left the chat', createdAt: new Date() });
      session.seenByAdmin = false;
      await session.save();
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}