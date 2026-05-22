import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import JobApplication from '@/models/JobApplication';

export async function GET(req: NextRequest, { params }: { params: Promise<{ careerId: string }> }) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { careerId } = await params;
    const applications = await JobApplication.find({ careerId }).sort({ createdAt: -1 });
    return NextResponse.json(applications);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
