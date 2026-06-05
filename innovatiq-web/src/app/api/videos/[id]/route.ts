import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Video from '@/models/Video';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const getCachedVideo = unstable_cache(
      async () => {
        await connectDB();
        return Video.findById(id).lean();
      },
      [`video-${id}`],
      { revalidate: 600, tags: ['videos', `video-${id}`] }
    );
    const video = await getCachedVideo();
    if (!video) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(video, {
      headers: { 'Cache-Control': 'public, max-age=600, stale-while-revalidate=60' },
    });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const video = await Video.findByIdAndUpdate(id, body, { new: true }).lean();
    revalidateTag('videos', {});
    revalidateTag(`video-${id}`, {});
    return NextResponse.json(video);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    await Video.findByIdAndDelete(id);
    revalidateTag('videos', {});
    revalidateTag(`video-${id}`, {});
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
