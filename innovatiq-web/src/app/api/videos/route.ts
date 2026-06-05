import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Video from '@/models/Video';

export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find({ active: { $ne: false } }).sort({ createdAt: -1 });
    return NextResponse.json(videos);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    const video = await Video.create(body);
    return NextResponse.json(video, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
