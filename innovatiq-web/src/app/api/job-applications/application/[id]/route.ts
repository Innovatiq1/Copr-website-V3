import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import JobApplication from '@/models/JobApplication';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const application = await JobApplication.findByIdAndUpdate(id, body, { new: true }).lean();
    return NextResponse.json(application);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
