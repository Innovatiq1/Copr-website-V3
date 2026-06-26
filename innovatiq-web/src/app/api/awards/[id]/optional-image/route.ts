import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { connectDB } from '@/lib/mongodb';
import Award from '@/models/Award';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const award = await Award.findById(id).select('optionalImageData optionalImageMime').lean() as { optionalImageData?: string; optionalImageMime?: string } | null;
    if (!award?.optionalImageData) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    const buffer = Buffer.from(award.optionalImageData, 'base64');
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': award.optionalImageMime || 'image/jpeg',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
