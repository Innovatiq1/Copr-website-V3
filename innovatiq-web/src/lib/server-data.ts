// Server-only: direct MongoDB access for server components.
// Never import this in client components — it will break the build.
import { unstable_cache } from 'next/cache';
import { connectDB } from './mongodb';
import Career from '@/models/Career';
import Blog from '@/models/Blog';
import Award from '@/models/Award';
import Video from '@/models/Video';

const getCachedCareers = (page: number, limit: number) => unstable_cache(
  async () => {
    await connectDB();
    const skip = (page - 1) * limit;
    const filter = { active: { $ne: false } };
    const [careers, total] = await Promise.all([
      Career.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Career.countDocuments(filter),
    ]);
    return {
      careers: JSON.parse(JSON.stringify(careers)),
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  },
  [`careers-direct-${page}-${limit}`],
  { revalidate: 120, tags: ['careers'] }
);

export async function getCareersDirect(page = 1, limit = 9) {
  try {
    return await getCachedCareers(page, limit)();
  } catch (err) {
    console.error('getCareersDirect error:', err);
    return { careers: [], total: 0, page, pages: 0 };
  }
}

const getCachedBlogs = (page: number, limit: number) => unstable_cache(
  async () => {
    await connectDB();
    const skip = (page - 1) * limit;
    const filter = { active: { $ne: false } };
    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Blog.countDocuments(filter),
    ]);
    return {
      blogs: JSON.parse(JSON.stringify(blogs)),
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  },
  [`blogs-direct-${page}-${limit}`],
  { revalidate: 120, tags: ['blogs'] }
);

export async function getBlogsDirect(page = 1, limit = 9) {
  try {
    return await getCachedBlogs(page, limit)();
  } catch (err) {
    console.error('getBlogsDirect error:', err);
    return { blogs: [], total: 0, page, pages: 0 };
  }
}

const getCachedAwards = (page: number, limit: number) => unstable_cache(
  async () => {
    await connectDB();
    const filter = { active: { $ne: false } };
    const awards = await Award.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
    return JSON.parse(JSON.stringify(awards));
  },
  [`awards-direct-${page}-${limit}`],
  { revalidate: 300, tags: ['awards'] }
);

export async function getAwardsDirect(page = 1, limit = 50) {
  try {
    return await getCachedAwards(page, limit)();
  } catch (err) {
    console.error('getAwardsDirect error:', err);
    return [];
  }
}

const getCachedVideos = unstable_cache(
  async () => {
    await connectDB();
    const videos = await Video.find({ active: { $ne: false } }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(videos));
  },
  ['videos-direct'],
  { revalidate: 300, tags: ['videos'] }
);

export async function getVideosDirect() {
  try {
    return await getCachedVideos();
  } catch (err) {
    console.error('getVideosDirect error:', err);
    return [];
  }
}
