import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

const TalentProfileSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  skills: String,
  experience: String,
  statement: String,
  resumeData: String,
  resumeMime: String,
  resumeName: String,
}, { timestamps: true });

const TalentProfile = mongoose.models.TalentProfile || mongoose.model('TalentProfile', TalentProfileSchema);

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    const resumeFile = formData.get('resumefile') as File | null;
    let resumeData = '';
    let resumeMime = '';
    let resumeName = '';

    if (resumeFile && resumeFile.size > 0) {
      const bytes = await resumeFile.arrayBuffer();
      resumeData = Buffer.from(bytes).toString('base64');
      resumeMime = resumeFile.type || 'application/octet-stream';
      resumeName = resumeFile.name;
    }

    const profile = await TalentProfile.create({
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      skills: formData.get('skills'),
      experience: formData.get('experience'),
      statement: formData.get('statement'),
      resumeData,
      resumeMime,
      resumeName,
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
