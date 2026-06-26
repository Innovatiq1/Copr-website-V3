import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import JobApplication from '@/models/JobApplication';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    const app = await JobApplication.findById(id).select('resumeData resumeMime resumeName').lean() as { resumeData?: string; resumeMime?: string; resumeName?: string } | null;

    if (!app?.resumeData) {
      return NextResponse.json({ message: 'No resume found' }, { status: 404 });
    }

    const buffer = Buffer.from(app.resumeData, 'base64');
    const mime = app.resumeMime || 'application/octet-stream';
    const filename = app.resumeName || 'resume';

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
