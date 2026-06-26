import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import mongoose from 'mongoose';

const TalentProfile = mongoose.models.TalentProfile || mongoose.model('TalentProfile', new mongoose.Schema({
  resumeData: String,
  resumeMime: String,
  resumeName: String,
}, { strict: false }));

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    const profile = await TalentProfile.findById(id).select('resumeData resumeMime resumeName').lean() as { resumeData?: string; resumeMime?: string; resumeName?: string } | null;

    if (!profile?.resumeData) {
      return NextResponse.json({ message: 'No resume found' }, { status: 404 });
    }

    const buffer = Buffer.from(profile.resumeData, 'base64');
    const mime = profile.resumeMime || 'application/octet-stream';
    const filename = profile.resumeName || 'resume';

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': mime,
        'Content-Disposition': `inline; filename="${filename}"`,
        'Content-Length': String(buffer.length),
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
