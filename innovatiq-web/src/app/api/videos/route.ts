import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import Video from '@/models/Video';

const getCachedVideos = unstable_cache(
  async () => {
    await connectDB();
    const videos = await Video.find({ active: { $ne: false } }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(videos));
  },
  ['videos-list'],
  { revalidate: 300, tags: ['videos'] }
);

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    let videos;
    if (authHeader) {
      await connectDB();
      const rawVideos = await Video.find({ active: { $ne: false } }).sort({ createdAt: -1 }).lean();
      videos = JSON.parse(JSON.stringify(rawVideos));
    } else {
      videos = await getCachedVideos();
    }
    return NextResponse.json(videos, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

const PRODUCT_LABELS: Record<string, string> = { tms: 'TMS', lms: 'LMS', lmp: 'LMP', pms: 'PMS', salesCrm: 'Sales CRM', aiAts: 'AI ATS' };
const SERVICE_LABELS: Record<string, string> = { cloud: 'Cloud', cyber: 'Cyber Security', consulting: 'Consulting', digital: 'Digital Transformation', managedIT: 'Managed IT', infrastructure: 'Infrastructure', field: 'Field Services', ai: 'AI Services' };
const ABOUT_LABELS: Record<string, string> = { whoWeAre: 'Who We Are', awards: 'Awards' };

async function checkDuplicateLocations(body: Record<string, unknown>): Promise<string | null> {
  const conflicts: string[] = [];

  if (body.home) {
    const exists = await Video.findOne({ home: true, active: { $ne: false } }).lean();
    if (exists) conflicts.push('Home Page');
  }
  if (body.contact) {
    const exists = await Video.findOne({ contact: true, active: { $ne: false } }).lean();
    if (exists) conflicts.push('Contact');
  }
  if (body.aboutUs && body.aboutUsTypes && typeof body.aboutUsTypes === 'object') {
    const key = Object.entries(body.aboutUsTypes as Record<string, unknown>).find(([, v]) => v)?.[0];
    if (key) {
      const exists = await Video.findOne({ aboutUs: true, [`aboutUsTypes.${key}`]: true, active: { $ne: false } }).lean();
      if (exists) conflicts.push(`About Us → ${ABOUT_LABELS[key] || key}`);
    }
  }
  if (body.products && body.productTypes && typeof body.productTypes === 'object') {
    const key = Object.entries(body.productTypes as Record<string, unknown>).find(([, v]) => v)?.[0];
    if (key) {
      const exists = await Video.findOne({ products: true, [`productTypes.${key}`]: true, active: { $ne: false } }).lean();
      if (exists) conflicts.push(`Products → ${PRODUCT_LABELS[key] || key}`);
    }
  }
  if (body.services && body.serviceTypes && typeof body.serviceTypes === 'object') {
    const key = Object.entries(body.serviceTypes as Record<string, unknown>).find(([, v]) => v)?.[0];
    if (key) {
      const exists = await Video.findOne({ services: true, [`serviceTypes.${key}`]: true, active: { $ne: false } }).lean();
      if (exists) conflicts.push(`Services → ${SERVICE_LABELS[key] || key}`);
    }
  }

  if (conflicts.length > 0) {
    return `A video is already assigned to: ${conflicts.join(', ')}. Please edit the existing video instead.`;
  }
  return null;
}

export async function POST(req: NextRequest) {
  const admin = requireAuth(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();

    const conflict = await checkDuplicateLocations(body);
    if (conflict) return NextResponse.json({ message: conflict }, { status: 400 });

    const video = await Video.create(body);
    revalidateTag('videos');
    return NextResponse.json(video, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
