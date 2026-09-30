import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Admin from '@/models/Admin';

// Admin-only: list every team member who can access the admin panel.
export async function GET(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const members = await Admin.find().select('-password').sort({ createdAt: -1 });
    return NextResponse.json(members);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Admin-only: pre-approve a new team member by email — they can then sign in with
// Microsoft (their existing company account), no password needed on our side.
export async function POST(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { email, name, password } = await req.json();
    if (!email || !email.trim()) return NextResponse.json({ message: 'Email is required' }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await Admin.findOne({ email: normalizedEmail });
    if (existing) return NextResponse.json({ message: 'This email is already a team member' }, { status: 409 });

    // Password is optional — if provided, the person can also log in directly with
    // email + password; either way they can also sign in with Microsoft.
    const hashedPassword = password && password.trim() ? await bcrypt.hash(password.trim(), 10) : undefined;

    const member = await Admin.create({
      email: normalizedEmail,
      name: name || '',
      password: hashedPassword,
      provider: 'microsoft',
    });
    const memberObj = member.toObject();
    delete memberObj.password;
    return NextResponse.json(memberObj, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}