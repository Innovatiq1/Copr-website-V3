export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CoursesGrid from '@/components/courses/CoursesGrid';
import { getLmsCourses, LMS_ORG_INVITE_CODE } from '@/lib/lms';

export const metadata: Metadata = {
  title: 'Courses | Innovatiq Technologies',
  description: 'Explore professional development and skills courses offered on the Innovatiq SkillEra Learning Management System.',
  alternates: { canonical: 'https://innovatiq.com.sg/courses' },
  openGraph: {
    title: 'Courses | Innovatiq Technologies',
    description: 'Explore professional development and skills courses offered on the Innovatiq SkillEra Learning Management System.',
    url: 'https://innovatiq.com.sg/courses',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
};

export default async function CoursesPage() {
  const data = await getLmsCourses();

  return (
    <>
      <PageHero
        badge="Learning & Development"
        title="Explore Our Courses"
        subtitle="Browse courses available on the Innovatiq SkillEra Learning Management System and register directly."
      />

      <section className="relative pt-4 pb-10 md:pt-0 md:pb-20 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoursesGrid courses={data.courses} orgName={data.org?.name} orgCode={LMS_ORG_INVITE_CODE} />
        </div>
      </section>
    </>
  );
}
