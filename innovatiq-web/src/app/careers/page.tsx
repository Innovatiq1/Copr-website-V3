import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import CtaSection from '@/components/home/CtaSection';
import { MapPin, Briefcase, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getCareers } from '@/lib/api';

export default async function CareersPage() {
  const data = await getCareers(1, 50);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const careers: any[] = (data as any)?.careers || [];

  return (
    <>
      <PageHero
        badge="Join Our Team"
        title="Build Your Career at Innovatiq"
        subtitle="Join a team of innovators, technologists, and problem-solvers working on challenging projects across Asia Pacific."
      />

      {/* Why Join Us */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#080F20' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(212,23,74,0.1) 0%, transparent 60%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Carrer%20Image.svg" alt="" aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[90%] max-h-[480px] w-auto opacity-[0.07] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              Why Work at{' '}
              <span className="bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">Innovatiq?</span>
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🚀', title: 'Challenging Work', description: 'Work on complex, high-impact projects for enterprise clients across the region.', color: '#D4174A' },
              { icon: '📚', title: 'Continuous Learning', description: 'Generous training and certification budgets to keep your skills current.', color: '#3B82F6' },
              { icon: '🌍', title: 'Global Exposure', description: 'Work with international clients and teams across Asia Pacific.', color: '#10B981' },
              { icon: '💡', title: 'Innovation Culture', description: 'We encourage experimentation, creative thinking, and bold ideas.', color: '#F59E0B' },
            ].map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 80}>
                <div className="relative text-center p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 4px 28px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${b.color}, transparent)` }} />
                  <div className="text-4xl mb-3">{b.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm">{b.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#07101E' }}>
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(212,23,74,0.18) 0%, transparent 60%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Design.svg" alt="" aria-hidden="true"
          className="absolute right-0 top-0 h-full max-h-[500px] w-auto opacity-[0.04] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Open{' '}
              <span className="bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">Positions</span>
            </h2>
            <p className="text-gray-500">{careers.length > 0 ? `${careers.length} opportunities available across our offices.` : 'New opportunities coming soon.'}</p>
          </AnimatedSection>

          {careers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl mb-6"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'rgba(212,23,74,0.1)', border: '1px solid rgba(212,23,74,0.2)' }}>
                <Briefcase size={28} className="text-[#D4174A]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No open positions right now</h3>
              <p className="text-gray-500 text-sm">We&apos;re not actively hiring at the moment. Submit your profile and we&apos;ll contact you.</p>
            </div>
          )}

          <div className="space-y-4">
            {careers.map((job, i) => (
              <AnimatedSection key={job._id} delay={i * 60}>
                <div className="relative rounded-2xl p-6 hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 4px 28px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
                  }}>
                  <div className="absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ background: 'linear-gradient(to bottom, #D4174A, transparent)' }} />
                  <div className="flex-1 pl-2">
                    <h3 className="font-bold text-white text-lg mb-1">{job.jobTitle}</h3>
                    <p className="text-sm font-medium mb-3" style={{ color: '#D4174A' }}>{job.companyName}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5"><MapPin size={13} style={{ color: '#D4174A' }} />{job.location}</span>
                      <span className="flex items-center gap-1.5"><Briefcase size={13} style={{ color: '#D4174A' }} />{job.experience}</span>
                      <span className="flex items-center gap-1.5"><Clock size={13} style={{ color: '#D4174A' }} />{job.employmentType}</span>
                    </div>
                    {job.primarySkills && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.primarySkills.split(',').slice(0, 4).map((skill: string) => (
                          <span key={skill.trim()} className="text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{ background: 'rgba(212,23,74,0.1)', color: '#D4174A', border: '1px solid rgba(212,23,74,0.2)' }}>
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <Link href={`/careers/${job._id}`}
                      className="inline-flex items-center gap-2 py-2.5 px-5 text-sm text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, #D4174A, #A8102E)', boxShadow: '0 4px 12px rgba(212,23,74,0.35)' }}>
                      Apply Now <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10">
            <div className="relative text-center p-10 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(212,23,74,0.12) 0%, rgba(10,18,37,0.8) 100%)',
                border: '1px solid rgba(212,23,74,0.2)',
              }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #D4174A, #FF8C42, transparent)' }} />
              <h3 className="text-xl font-bold text-white mb-3">Don&apos;t See a Role That Fits?</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                We&apos;re always looking for exceptional talent. Submit your profile and we&apos;ll reach out when the right opportunity arises.
              </p>
              <Link href="/join-us"
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                Submit Your Profile
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
