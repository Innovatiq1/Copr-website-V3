import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import PushSubscription from '@/models/PushSubscription';

// Admin-only: save this browser's push subscription so it starts receiving notifications.
export async function POST(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { endpoint, keys } = await req.json();
    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return NextResponse.json({ message: 'Invalid subscription' }, { status: 400 });
    }

    await PushSubscription.findOneAndUpdate(
      { endpoint },
      { endpoint, keys, adminEmail: (admin as { email?: string })?.email || '' },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Admin-only: remove this browser's subscription (e.g. when notifications are turned off).
export async function DELETE(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { endpoint } = await req.json();
    if (endpoint) await PushSubscription.deleteOne({ endpoint });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}