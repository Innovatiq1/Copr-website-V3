import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Admin from '@/models/Admin';

// Admin-only: revoke a team member's access.
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;

    // Don't let someone accidentally delete their own account and lock themselves out.
    if (id === (admin as { id?: string }).id) {
      return NextResponse.json({ message: 'You cannot remove your own account' }, { status: 400 });
    }

    await Admin.findByIdAndDelete(id);
    return NextResponse.json({ deleted: id });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}