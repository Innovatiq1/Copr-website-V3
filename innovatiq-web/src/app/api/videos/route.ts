import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Video from '@/models/Video';

const getCachedVideos = unstable_cache(
  async () => {
    await connectDB();
    const videos = await Video.find({ active: { $ne: false } }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(videos));
  },
  ['videos-list'],
  { revalidate: 300, tags: ['videos'] }
);

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    let videos;
    if (authHeader) {
      await connectDB();
      const rawVideos = await Video.find({ active: { $ne: false } }).sort({ createdAt: -1 }).lean();
      videos = JSON.parse(JSON.stringify(rawVideos));
    } else {
      videos = await getCachedVideos();
    }
    return NextResponse.json(videos, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
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
