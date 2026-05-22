import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';

const TalentProfileSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  skills: String,
  experience: String,
  statement: String,
  resume: String,
}, { timestamps: true });

const TalentProfile = mongoose.models.TalentProfile || mongoose.model('TalentProfile', TalentProfileSchema);

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    const resumeFile = formData.get('resumefile') as File | null;
    let resumePath = '';

    if (resumeFile && resumeFile.size > 0) {
      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${resumeFile.name.replace(/\s/g, '_')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);
      resumePath = `/uploads/resumes/${filename}`;
    }

    const profile = await TalentProfile.create({
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      skills: formData.get('skills'),
      experience: formData.get('experience'),
      statement: formData.get('statement'),
      resume: resumePath,
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
