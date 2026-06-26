import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import JobApplication from '@/models/JobApplication';

export async function POST(req: NextRequest, { params }: { params: Promise<{ careerId: string }> }) {
  try {
    await connectDB();
    const { careerId } = await params;
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const portfolioLink = formData.get('portfolioLink') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const resumeFile = formData.get('resume') as File | null;

    let resumeData = '';
    let resumeMime = '';
    let resumeName = '';
    if (resumeFile && resumeFile.size > 0) {
      const bytes = await resumeFile.arrayBuffer();
      resumeData = Buffer.from(bytes).toString('base64');
      resumeMime = resumeFile.type || 'application/octet-stream';
      resumeName = resumeFile.name;
    }

    const application = await JobApplication.create({
      careerId,
      name,
      email,
      phone,
      portfolioLink: portfolioLink || '',
      coverLetter,
      resumeData,
      resumeMime,
      resumeName,
    });

    return NextResponse.json(application, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
