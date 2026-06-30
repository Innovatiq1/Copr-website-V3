import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Blog from '@/models/Blog';
import sharp from 'sharp';

async function compressImage(file: File): Promise<{ data: string; mime: string }> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const compressed = await sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();
  return { data: compressed.toString('base64'), mime: 'image/jpeg' };
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const blog = await Blog.findById(id).select('-imageData').lean();
    if (!blog) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(JSON.parse(JSON.stringify(blog)));
  } catch (err) {
    console.error('[Blog GET]', err);
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let blogData: Record<string, any> = {};

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const imageFile = formData.get('image') as File | null;

      if (imageFile && imageFile.size > 0) {
        const { data, mime } = await compressImage(imageFile);
        blogData.imageData = data;
        blogData.imageMime = mime;
        blogData.image = `/api/blogs/${id}/image`;
      }

      blogData = {
        ...blogData,
        title: formData.get('title'),
        shortDescription: formData.get('shortDescription'),
        description: formData.get('description'),
        author: formData.get('author'),
        tags: formData.getAll('tags[]'),
      };
    } else {
      blogData = await req.json();
    }

    const blog = await Blog.findByIdAndUpdate(id, blogData, { returnDocument: 'after' }).select('-imageData').lean();
    revalidateTag('blogs');
    revalidateTag(`blog-${id}`);
    return NextResponse.json(JSON.parse(JSON.stringify(blog)));
  } catch (err) {
    console.error('[Blog PUT]', err);
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
      blog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { returnDocument: 'after' }).select('-imageData').lean();
    } else if ('dislike' in body) {
      blog = await Blog.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, { returnDocument: 'after' }).select('-imageData').lean();
    } else {
      const admin = requireAuth(req);
      if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      blog = await Blog.findByIdAndUpdate(id, body, { returnDocument: 'after' }).select('-imageData').lean();
    }
    revalidateTag('blogs');
    revalidateTag(`blog-${id}`);
    return NextResponse.json(JSON.parse(JSON.stringify(blog)));
  } catch (err) {
    console.error('[Blog PATCH]', err);
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
    revalidateTag('blogs');
    revalidateTag(`blog-${id}`);
    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    console.error('[Blog DELETE]', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
