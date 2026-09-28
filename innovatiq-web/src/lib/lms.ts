export const LMS_API_BASE = 'https://skillera.innovatiqconsulting.com/api';
export const LMS_ORG_SLUG = 'innovatiq';
// The LMS's public course-catalog endpoint deliberately never returns an
// org's invite code (that would let anyone harvest join codes for any
// organization on the platform by guessing slugs). Our own org's code is
// fixed and known, so it's held here rather than read from that API.
export const LMS_ORG_INVITE_CODE = 'RCVJUJ';

export interface LmsCourse {
  id: string;
  title: string;
  code: string;
  version?: string;
  description: string;
  imageUrl: string | null;
  rating: number;
  reviewCount: number;
  feeType: 'free' | 'paid';
  fees: number;
  orgName: string;
}

export interface LmsCoursesResponse {
  courses: LmsCourse[];
  org?: { name: string; slug: string };
}

export async function getLmsCourses(): Promise<LmsCoursesResponse> {
  try {
    const res = await fetch(`${LMS_API_BASE}/public/courses?org=${LMS_ORG_SLUG}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return { courses: [] };
    const data = await res.json();
    return { courses: Array.isArray(data.courses) ? data.courses : [], org: data.org };
  } catch {
    return { courses: [] };
  }
}
