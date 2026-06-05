import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Video from '@/models/Video';

const getCachedVideos = unstable_cache(
  async () => {
    await connectDB();
    return Video.find({ active: { $ne: false } }).sort({ createdAt: -1 }).lean();
  },
  ['videos-list'],
  { revalidate: 300, tags: ['videos'] }
);

export async function GET() {
  try {
    const videos = await getCachedVideos();
    return NextResponse.json(videos, {
      headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=60' },
    });
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
    revalidateTag('videos', {});
    return NextResponse.json(video, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
