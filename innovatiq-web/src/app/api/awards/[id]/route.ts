import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Award from '@/models/Award';
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
    const getCachedAward = unstable_cache(
      async () => {
        await connectDB();
        const award = await Award.findById(id).select('-awardImageData -optionalImageData').lean();
        return award ? JSON.parse(JSON.stringify(award)) : null;
      },
      [`award-${id}`],
      { revalidate: 300, tags: ['awards', `award-${id}`] }
    );
    const award = await getCachedAward();
    if (!award) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(award, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let awardData: Record<string, any> = {};

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const awardImageFile = formData.get('awardImage') as File | null;
      const optionalImageFile = formData.get('optionalImage') as File | null;

      awardData = {
        title: formData.get('title'),
        shortDescription: formData.get('shortDescription'),
        description: formData.get('description'),
        year: formData.get('year'),
      };

      if (awardImageFile && awardImageFile.size > 0) {
        const { data, mime } = await compressImage(awardImageFile);
        awardData.awardImageData = data;
        awardData.awardImageMime = mime;
        awardData.awardImage = `/api/awards/${id}/image`;
        awardData.image = `/api/awards/${id}/image`;
      }
      if (optionalImageFile && optionalImageFile.size > 0) {
        const { data, mime } = await compressImage(optionalImageFile);
        awardData.optionalImageData = data;
        awardData.optionalImageMime = mime;
        awardData.optionalImage = `/api/awards/${id}/optional-image`;
      }
    } else {
      awardData = await req.json();
    }

    const award = await Award.findByIdAndUpdate(id, awardData, { returnDocument: 'after' }).select('-awardImageData -optionalImageData').lean();
    revalidateTag('awards');
    revalidateTag(`award-${id}`);
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
    revalidateTag('awards');
    revalidateTag(`award-${id}`);
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
