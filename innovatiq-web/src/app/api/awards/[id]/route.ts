import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Award from '@/models/Award';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const getCachedAward = unstable_cache(
      async () => {
        await connectDB();
        return Award.findById(id).lean();
      },
      [`award-${id}`],
      { revalidate: 300, tags: ['awards', `award-${id}`] }
    );
    const award = await getCachedAward();
    if (!award) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(award, {
      headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=60' },
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
    const award = await Award.findByIdAndUpdate(id, body, { new: true }).lean();
    revalidateTag('awards', {});
    revalidateTag(`award-${id}`, {});
    return NextResponse.json(award);
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
    await Award.findByIdAndDelete(id);
    revalidateTag('awards', {});
    revalidateTag(`award-${id}`, {});
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
