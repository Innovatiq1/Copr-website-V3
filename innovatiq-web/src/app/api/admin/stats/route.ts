import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Blog from '@/models/Blog';
import Career from '@/models/Career';
import Award from '@/models/Award';
import Video from '@/models/Video';
import JobApplication from '@/models/JobApplication';
import mongoose from 'mongoose';

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', new mongoose.Schema({ read: Boolean }, { timestamps: true }));

export async function GET(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const [blogs, careers, awards, videos, applications, enquiries] = await Promise.all([
      Blog.countDocuments(),
      Career.countDocuments({ active: true }),
      Award.countDocuments(),
      Video.countDocuments(),
      JobApplication.countDocuments(),
      Enquiry.countDocuments(),
    ]);

    return NextResponse.json({ blogs, careers, awards, videos, applications, enquiries });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
