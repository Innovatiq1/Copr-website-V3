import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Career from '@/models/Career';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const getCachedCareer = unstable_cache(
      async () => {
        await connectDB();
        return Career.findById(id).lean();
      },
      [`career-${id}`],
      { revalidate: 300, tags: ['careers', `career-${id}`] }
    );
    const career = await getCachedCareer();
    if (!career) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(career, {
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
    const career = await Career.findByIdAndUpdate(id, body, { new: true }).lean();
    revalidateTag('careers', {});
    revalidateTag(`career-${id}`, {});
    return NextResponse.json(career);
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
    await Career.findByIdAndDelete(id);
    revalidateTag('careers', {});
    revalidateTag(`career-${id}`, {});
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
