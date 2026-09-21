import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PopupLead from '@/models/PopupLead';

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

// Public: used by the popup on page load to decide whether to show itself at all.
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const ip = getClientIp(req);
    const existing = await PopupLead.findOne({ ip });
    return NextResponse.json({ submitted: !!existing });
  } catch {
    return NextResponse.json({ submitted: false });
  }
}