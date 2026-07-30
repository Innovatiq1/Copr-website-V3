import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import JobApplication from '@/models/JobApplication';
import Career from '@/models/Career';
import mongoose from 'mongoose';

const TalentProfile = mongoose.models.TalentProfile || mongoose.model('TalentProfile', new mongoose.Schema({
  fullName: String, email: String, skills: String, experience: String,
}, { timestamps: true }));

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', new mongoose.Schema({
  name: String, email: String, subject: String, read: { type: Boolean, default: false },
}, { timestamps: true, strict: false }));

export async function GET(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();

    // Remove applications whose career role was deleted
    const validCareerIds = await Career.distinct('_id');
    await JobApplication.deleteMany({ careerId: { $nin: validCareerIds } });

    const [talents, applications, enquiries] = await Promise.all([
      TalentProfile.find().sort({ createdAt: -1 }).limit(10).select('fullName email skills experience createdAt').lean(),
      JobApplication.find().sort({ createdAt: -1 }).limit(10).select('name email status createdAt').lean(),
      Enquiry.find().sort({ createdAt: -1 }).limit(10).select('name email subject read createdAt').lean(),
    ]);

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const items = [
      ...(talents as any[]).map(t => ({
        type: 'talent',
        name: t.fullName || 'Unknown',
        detail: t.email || '',
        sub: t.skills ? t.skills.split(',')[0].trim() : '',
        createdAt: t.createdAt,
        isNew: new Date(t.createdAt) > sevenDaysAgo,
      })),
      ...(applications as any[]).map(a => ({
        type: 'application',
        name: a.name || 'Unknown',
        detail: 'Job Application',
        sub: a.status || 'pending',
        createdAt: a.createdAt,
        isNew: a.status === 'pending',
      })),
      ...(enquiries as any[]).map(e => ({
        type: 'enquiry',
        name: e.name || e.fullName || (e.email ? e.email.split('@')[0] : 'Visitor'),
        detail: e.subject || e.lookingFor || 'New enquiry',
        sub: e.email || '',
        createdAt: e.createdAt,
        isNew: !e.read,
      })),
    ]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 20);

    const unreadCount = items.filter(i => i.isNew).length;

    const recentTalents = (talents as any[]).slice(0, 5).map(t => ({
      fullName: t.fullName || 'Unknown',
      email: t.email || '',
      skills: t.skills || '',
      experience: t.experience || '',
      createdAt: t.createdAt,
    }));

    const recentApplications = (applications as any[]).slice(0, 5).map(a => ({
      name: a.name || 'Unknown',
      email: a.email || '',
      status: a.status || 'pending',
      createdAt: a.createdAt,
    }));

    const recentEnquiries = (enquiries as any[]).slice(0, 5).map(e => ({
      name: e.name || e.fullName || (e.email ? e.email.split('@')[0] : 'Visitor'),
      email: e.email || '',
      subject: e.subject || e.lookingFor || e.message?.substring(0, 50) || 'General enquiry',
      read: e.read || false,
      createdAt: e.createdAt,
    }));

    return NextResponse.json({ items, unreadCount, recentTalents, recentApplications, recentEnquiries });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
