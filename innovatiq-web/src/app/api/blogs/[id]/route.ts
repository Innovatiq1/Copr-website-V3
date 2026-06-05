import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Blog from '@/models/Blog';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const getCachedBlog = unstable_cache(
      async () => {
        await connectDB();
        return Blog.findById(id).lean();
      },
      [`blog-${id}`],
      { revalidate: 300, tags: ['blogs', `blog-${id}`] }
    );
    const blog = await getCachedBlog();
    if (!blog) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(blog, {
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
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
    revalidateTag('blogs', {});
    revalidateTag(`blog-${id}`, {});
    return NextResponse.json(blog);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    let blog;
    if ('like' in body) {
      blog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true }).lean();
    } else if ('dislike' in body) {
      blog = await Blog.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, { new: true }).lean();
    } else {
      blog = await Blog.findByIdAndUpdate(id, body, { new: true }).lean();
    }
    revalidateTag('blogs', {});
    revalidateTag(`blog-${id}`, {});
    return NextResponse.json(blog);
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
    await Blog.findByIdAndDelete(id);
    revalidateTag('blogs', {});
    revalidateTag(`blog-${id}`, {});
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
