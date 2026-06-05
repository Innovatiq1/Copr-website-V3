import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import { signToken } from '@/lib/auth';
import Admin from '@/models/Admin';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email }).lean();
    if (!admin) return NextResponse.json({ message: 'Admin not found' }, { status: 400 });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return NextResponse.json({ message: 'Invalid password' }, { status: 400 });

    const token = signToken({ id: admin._id });
    return NextResponse.json({ token, admin: { _id: admin._id, email: admin.email, name: admin.name } });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
