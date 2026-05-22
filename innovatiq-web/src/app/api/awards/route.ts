import { NextRequest, NextResponse } from 'next/server';
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

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const skip = (page - 1) * limit;

    const [awards, total] = await Promise.all([
      Award.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Award.countDocuments(),
    ]);

    return NextResponse.json({ awards, total, page, pages: Math.ceil(total / limit) });
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
        awardImage: awardImagePath || undefined,
        optionalImage: optionalImagePath || undefined,
        image: awardImagePath || undefined,
      };
    } else {
      awardData = await req.json();
    }

    const award = await Award.create(awardData);
    return NextResponse.json(award, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
