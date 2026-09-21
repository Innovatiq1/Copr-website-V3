import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import PopupSettings from '@/models/PopupSettings';

// Public: frontend popup reads its own configuration from here.
// Nothing about the popup (timing, text, fields, recipients) is hardcoded in the UI.
export async function GET() {
  try {
    await connectDB();
    // Always use the oldest settings document, in case duplicates were ever created
    // by a race condition (e.g. two simultaneous first-load requests).
    let settings = await PopupSettings.findOne().sort({ createdAt: 1 });
    if (!settings) {
      settings = await PopupSettings.create({});
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Admin-only: update popup configuration (text, fields, timing, recipient emails).
export async function PUT(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();

    // Never let the client overwrite immutable fields like _id / __v
    delete body._id;
    delete body.__v;

    let settings = await PopupSettings.findOne().sort({ createdAt: 1 });
    if (!settings) {
      settings = await PopupSettings.create(body);
    } else {
      Object.assign(settings, body);
      await settings.save();
    }

    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}