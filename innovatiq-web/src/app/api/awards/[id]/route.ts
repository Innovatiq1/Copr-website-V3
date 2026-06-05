import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Award from '@/models/Award';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

async function saveFile(file: File, folder: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${folder}/${filename}`;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const getCachedAward = unstable_cache(
      async () => {
        await connectDB();
        const award = await Award.findById(id).lean();
        return award ? JSON.parse(JSON.stringify(award)) : null;
      },
      [`award-${id}`],
      { revalidate: 300, tags: ['awards', `award-${id}`] }
    );
    const award = await getCachedAward();
    if (!award) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(award, {
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

    let awardData: Record<string, any> = {};

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();

      const awardImageFile = formData.get('awardImage') as File | null;
      const optionalImageFile = formData.get('optionalImage') as File | null;

      let awardImagePath = '';
      let optionalImagePath = '';

      if (awardImageFile && awardImageFile.size > 0) {
        awardImagePath = await saveFile(awardImageFile, 'awards');
      }
      if (optionalImageFile && optionalImageFile.size > 0) {
        optionalImagePath = await saveFile(optionalImageFile, 'awards');
      }

      awardData = {
        title: formData.get('title'),
        shortDescription: formData.get('shortDescription'),
        description: formData.get('description'),
        year: formData.get('year'),
      };

      if (awardImagePath) {
        awardData.awardImage = awardImagePath;
        awardData.image = awardImagePath; // sync with main image field if needed
      }
      if (optionalImagePath) {
        awardData.optionalImage = optionalImagePath;
      }
    } else {
      awardData = await req.json();
    }

    const award = await Award.findByIdAndUpdate(id, awardData, { new: true }).lean();
    revalidateTag('awards', {});
    revalidateTag(`award-${id}`, {});
    return NextResponse.json(award);
  } catch (err) {
    console.error(err);
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
