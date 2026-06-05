import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Blog from '@/models/Blog';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const getCachedBlog = unstable_cache(
      async () => {
        await connectDB();
        const blog = await Blog.findById(id).lean();
        return blog ? JSON.parse(JSON.stringify(blog)) : null;
      },
      [`blog-${id}`],
      { revalidate: 300, tags: ['blogs', `blog-${id}`] }
    );
    const blog = await getCachedBlog();
    if (!blog) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(blog, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
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
    const contentType = req.headers.get('content-type') || '';

    let blogData: Record<string, any> = {};

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const imageFile = formData.get('image') as File | null;
      let imagePath = '';

      if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, '_')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blogs');
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);
        imagePath = `/uploads/blogs/${filename}`;
      }

      blogData = {
        title: formData.get('title'),
        shortDescription: formData.get('shortDescription'),
        description: formData.get('description'),
        author: formData.get('author'),
        tags: formData.getAll('tags[]'),
      };

      if (imagePath) {
        blogData.image = imagePath;
      }
    } else {
      blogData = await req.json();
    }

    const blog = await Blog.findByIdAndUpdate(id, blogData, { new: true }).lean();
    revalidateTag('blogs', {});
    revalidateTag(`blog-${id}`, {});
    return NextResponse.json(blog);
  } catch (err) {
    console.error(err);
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
