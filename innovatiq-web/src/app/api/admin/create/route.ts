import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password, name } = await req.json();

    const exists = await Admin.findOne({ email }).lean();
    if (exists) return NextResponse.json({ message: 'Admin already exists' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, password: hashedPassword, name });

    return NextResponse.json({ _id: admin._id, email: admin.email, name: admin.name }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
