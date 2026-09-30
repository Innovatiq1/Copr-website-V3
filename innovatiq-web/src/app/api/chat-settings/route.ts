import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import ChatSettings from '@/models/ChatSettings';

// Admin-only: both reading and writing, since this only affects the internal
// admin-facing chat behaviour, not anything the public website needs.
export async function GET(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    let settings = await ChatSettings.findOne().sort({ createdAt: 1 });
    if (!settings) settings = await ChatSettings.create({});
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    delete body._id;
    delete body.__v;

    let settings = await ChatSettings.findOne().sort({ createdAt: 1 });
    if (!settings) {
      settings = await ChatSettings.create(body);
    } else {
      Object.assign(settings, body);
      await settings.save();
    }

    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}