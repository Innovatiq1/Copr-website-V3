import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Blog from '@/models/Blog';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

function getCachedBlogs(page: number, limit: number) {
  return unstable_cache(
    async () => {
      await connectDB();
      const skip = (page - 1) * limit;
      const [blogs, total] = await Promise.all([
        Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        Blog.countDocuments(),
      ]);
      return JSON.parse(JSON.stringify({ blogs, total, page, pages: Math.ceil(total / limit) }));
    },
    [`blogs-list-${page}-${limit}`],
    { revalidate: 120, tags: ['blogs'] }
  )();
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    
    const authHeader = req.headers.get('Authorization');
    let data;
    if (authHeader) {
      await connectDB();
      const skip = (page - 1) * limit;
      const [blogs, total] = await Promise.all([
        Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        Blog.countDocuments(),
      ]);
      data = JSON.parse(JSON.stringify({ blogs, total, page, pages: Math.ceil(total / limit) }));
    } else {
      data = await getCachedBlogs(page, limit);
    }

    return NextResponse.json(data, {
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
    const contentType = req.headers.get('content-type') || '';

    let blogData: Record<string, unknown> = {};

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
        image: imagePath || undefined,
      };
    } else {
      blogData = await req.json();
    }

    const blog = await Blog.create(blogData);
    revalidateTag('blogs', {});
    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
