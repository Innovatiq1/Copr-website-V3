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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const { id } = await params;
    await TalentProfile.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
