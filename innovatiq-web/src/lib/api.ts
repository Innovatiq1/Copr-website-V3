// Server-side fetcher — uses absolute URL because Next.js server components
// can't use relative URLs. Falls back to localhost:3000 in development.
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

async function fetchApi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getCareers(page = 1, limit = 9) {
  return fetchApi<{ careers?: unknown[]; data?: unknown[]; total?: number }>(`/careers?page=${page}&limit=${limit}`);
}

export async function getCareerById(id: string) {
  return fetchApi<unknown>(`/careers/${id}`);
}

export async function getBlogs(page = 1, limit = 9) {
  return fetchApi<{ blogs?: unknown[]; data?: unknown[]; total?: number }>(`/blogs?page=${page}&limit=${limit}`);
}

export async function getBlogById(id: string) {
  return fetchApi<unknown>(`/blogs/${id}`);
}

export async function getAwards(page = 1, limit = 9) {
  return fetchApi<{ awards?: unknown[]; data?: unknown[]; total?: number }>(`/awards?page=${page}&limit=${limit}`);
}

export async function getVideos() {
  return fetchApi<unknown[]>('/videos');
}

export async function likeBlog(id: string) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/blogs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ like: true }),
    });
    return res.ok;
  } catch { return false; }
}

export async function dislikeBlog(id: string) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/blogs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dislike: true }),
    });
    return res.ok;
  } catch { return false; }
}

// Image URLs — images are now served from Next.js public/uploads
export function getBlogImageUrl(image?: string): string | null {
  if (!image) return null;
  if (image.startsWith('http') || image.startsWith('/')) return image;
  return `/uploads/blogs/${image}`;
}

export function getAwardImageUrl(image?: string): string | null {
  if (!image) return null;
  if (image.startsWith('http') || image.startsWith('/')) return image;
  return `/uploads/awards/${image}`;
}
