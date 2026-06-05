import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Career from '@/models/Career';

function getCachedCareers(page: number, limit: number) {
  return unstable_cache(
    async () => {
      await connectDB();
      const skip = (page - 1) * limit;
      const filter = { active: { $ne: false } };
      const [careers, total] = await Promise.all([
        Career.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        Career.countDocuments(filter),
      ]);
      return JSON.parse(JSON.stringify({ careers, total, page, pages: Math.ceil(total / limit) }));
    },
    [`careers-list-${page}-${limit}`],
    { revalidate: 120, tags: ['careers'] }
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
      const filter = { active: { $ne: false } };
      const [careers, total] = await Promise.all([
        Career.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        Career.countDocuments(filter),
      ]);
      data = JSON.parse(JSON.stringify({ careers, total, page, pages: Math.ceil(total / limit) }));
    } else {
      data = await getCachedCareers(page, limit);
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
    const body = await req.json();
    const career = await Career.create(body);
    revalidateTag('careers', {});
    return NextResponse.json(career, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
