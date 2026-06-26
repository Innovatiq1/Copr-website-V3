import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Award from '@/models/Award';

async function toBase64(file: File) {
  return Buffer.from(await file.arrayBuffer()).toString('base64');
}

function getCachedAwards(page: number, limit: number) {
  return unstable_cache(
    async () => {
      await connectDB();
      const skip = (page - 1) * limit;
      const [awards, total] = await Promise.all([
        Award.find().sort({ createdAt: -1 }).skip(skip).limit(limit).select('-awardImageData -optionalImageData').lean(),
        Award.countDocuments(),
      ]);
      return JSON.parse(JSON.stringify({ awards, total, page, pages: Math.ceil(total / limit) }));
    },
    [`awards-list-${page}-${limit}`],
    { revalidate: 300, tags: ['awards'] }
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
      const [awards, total] = await Promise.all([
        Award.find().sort({ createdAt: -1 }).skip(skip).limit(limit).select('-awardImageData -optionalImageData').lean(),
        Award.countDocuments(),
      ]);
      data = JSON.parse(JSON.stringify({ awards, total, page, pages: Math.ceil(total / limit) }));
    } else {
      data = await getCachedAwards(page, limit);
    }

    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
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
    let awardData: Record<string, unknown> = {};
    let awardImgBuf: Buffer | null = null, awardImgMime = '';
    let optImgBuf: Buffer | null = null, optImgMime = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const awardImageFile = formData.get('awardImage') as File | null;
      const optionalImageFile = formData.get('optionalImage') as File | null;

      if (awardImageFile && awardImageFile.size > 0) {
        awardImgBuf = Buffer.from(await awardImageFile.arrayBuffer());
        awardImgMime = awardImageFile.type || 'image/jpeg';
      }
      if (optionalImageFile && optionalImageFile.size > 0) {
        optImgBuf = Buffer.from(await optionalImageFile.arrayBuffer());
        optImgMime = optionalImageFile.type || 'image/jpeg';
      }

      awardData = {
        title: formData.get('title'),
        shortDescription: formData.get('shortDescription'),
        description: formData.get('description'),
        year: formData.get('year'),
      };
    } else {
      awardData = await req.json();
    }

    const award = await Award.create(awardData);

    const updates: Record<string, unknown> = {};
    if (awardImgBuf) {
      updates.awardImageData = awardImgBuf.toString('base64');
      updates.awardImageMime = awardImgMime;
      updates.awardImage = `/api/awards/${award._id}/image`;
      updates.image = `/api/awards/${award._id}/image`;
    }
    if (optImgBuf) {
      updates.optionalImageData = optImgBuf.toString('base64');
      updates.optionalImageMime = optImgMime;
      updates.optionalImage = `/api/awards/${award._id}/optional-image`;
    }
    if (Object.keys(updates).length) {
      await Award.findByIdAndUpdate(award._id, updates);
    }

    revalidateTag('awards');
    return NextResponse.json(award, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
