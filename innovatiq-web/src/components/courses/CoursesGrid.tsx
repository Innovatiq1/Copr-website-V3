'use client';
import { useState } from 'react';
import { Star, BookOpen } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import CourseRegisterModal from './CourseRegisterModal';
import type { LmsCourse } from '@/lib/lms';

function formatFee(course: LmsCourse) {
  if (course.feeType !== 'paid' || !course.fees) return 'Free';
  return `$${course.fees.toLocaleString()}`;
}

// course.description comes from the external LMS, not our own DB — render as
// plain text rather than dangerouslySetInnerHTML to avoid stored-XSS risk.
function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export default function CoursesGrid({ courses, orgName, orgCode }: { courses: LmsCourse[]; orgName?: string; orgCode?: string }) {
  const [selected, setSelected] = useState<LmsCourse | null>(null);

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl"
        style={{ background: '#FFFFFF', border: '1.5px solid rgba(190,18,60,0.20)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ background: '#FFFFFF', border: '1.5px solid rgba(190,18,60,0.40)' }}>
          <BookOpen size={28} className="text-[#BE123C]" />
        </div>
        <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">No courses available right now</h3>
        <p className="text-[#1a1a1a] font-medium text-sm px-6 sm:px-0">Check back soon — new courses are added regularly.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {courses.map((course, i) => (
          <AnimatedSection key={course.id} delay={i * 60} className="h-full">
            <div className="h-full flex flex-col rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
              style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)' }}>

              <div className="relative h-40 shrink-0 flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(190,18,60,0.10), rgba(244,63,94,0.05))' }}>
                {course.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <BookOpen size={40} style={{ color: '#BE123C', opacity: 0.35 }} />
                )}
                <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: course.feeType === 'paid' ? 'rgba(15,23,42,0.85)' : '#059669',
                    color: '#FFFFFF',
                  }}>
                  {course.feeType === 'paid' ? 'Paid' : 'Free'}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#BE123C' }}>
                  {course.code}{course.version ? ` · v${course.version}` : ''}
                </p>
                <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug">{course.title}</h3>
                {course.description && (
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {stripHtml(course.description)}
                  </p>
                )}

                <div className="mt-auto flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-gray-700">{course.rating?.toFixed(1) ?? '0.0'}</span>
                    <span>({course.reviewCount ?? 0})</span>
                  </div>
                  <span className="font-bold" style={{ color: '#BE123C' }}>{formatFee(course)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(course)}
                  className="mt-4 w-full rounded-xl text-white text-sm font-semibold py-2.5 transition-all hover:-translate-y-0.5 cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)', boxShadow: '0 4px 12px rgba(190,18,60,0.30)' }}
                >
                  Register
                </button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {selected && (
        <CourseRegisterModal
          course={selected}
          orgName={orgName}
          orgCode={orgCode}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
