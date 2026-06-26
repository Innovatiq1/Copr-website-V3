import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const blog = await Blog.findById(id).select('imageData imageMime').lean() as { imageData?: string; imageMime?: string } | null;
    if (!blog?.imageData) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    const buffer = Buffer.from(blog.imageData, 'base64');
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': blog.imageMime || 'image/jpeg',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err) {
    console.error('[Blog Image GET]', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
