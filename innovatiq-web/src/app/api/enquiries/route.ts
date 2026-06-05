import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import mongoose from 'mongoose';

// Inline schema for enquiries (contact form submissions)
const EnquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  location: String,
  lookingFor: String,
  read: { type: Boolean, default: false },
}, { timestamps: true, strict: false });

EnquirySchema.index({ createdAt: -1 });

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);

export async function GET(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(enquiries);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const enquiry = await Enquiry.create(body);
    return NextResponse.json(enquiry, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
