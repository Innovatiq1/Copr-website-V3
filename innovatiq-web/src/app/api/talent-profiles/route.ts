import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import mongoose from 'mongoose';

const TalentProfile = mongoose.models.TalentProfile || mongoose.model('TalentProfile', new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  skills: String,
  experience: String,
  statement: String,
  resume: String,
}, { timestamps: true }));

export async function GET(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const profiles = await TalentProfile.find().sort({ createdAt: -1 }).select('-resumeData').lean();
    return NextResponse.json(profiles);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
