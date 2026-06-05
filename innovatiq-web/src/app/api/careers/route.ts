import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Career from '@/models/Career';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const skip = (page - 1) * limit;

    const filter = { active: { $ne: false } };
    const [careers, total] = await Promise.all([
      Career.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Career.countDocuments(filter),
    ]);

    return NextResponse.json({ careers, total, page, pages: Math.ceil(total / limit) });
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
    return NextResponse.json(career, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
