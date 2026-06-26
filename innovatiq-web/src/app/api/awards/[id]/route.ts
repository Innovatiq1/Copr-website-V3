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
        awardData.awardImageData = Buffer.from(await awardImageFile.arrayBuffer()).toString('base64');
        awardData.awardImageMime = awardImageFile.type || 'image/jpeg';
        awardData.awardImage = `/api/awards/${id}/image`;
        awardData.image = `/api/awards/${id}/image`;
      }
      if (optionalImageFile && optionalImageFile.size > 0) {
        awardData.optionalImageData = Buffer.from(await optionalImageFile.arrayBuffer()).toString('base64');
        awardData.optionalImageMime = optionalImageFile.type || 'image/jpeg';
        awardData.optionalImage = `/api/awards/${id}/optional-image`;
      }
    } else {
      awardData = await req.json();
    }

    const award = await Award.findByIdAndUpdate(id, awardData, { new: true }).select('-awardImageData -optionalImageData').lean();
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
