export const dynamic = 'force-dynamic';

import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import CtaSection from '@/components/home/CtaSection';
import VideoSection from '@/components/VideoSection';
import { MapPin, Briefcase, Clock, ChevronRight, Users } from 'lucide-react';
import Link from 'next/link';
import { getCareersDirect } from '@/lib/server-data';

export default async function CareersPage() {
  const data = await getCareersDirect(1, 50);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const careers: any[] = data?.careers || [];

  return (
    <>
      <PageHero
        badge="Join Our Team"
        title="Build Your Career at Innovatiq"
        subtitle="Join a team of innovators, technologists, and problem-solvers working on challenging projects across Asia Pacific."
      />

      {/* Why Join Us */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(29,78,216,0.05) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(59,130,246,0.03) 0%, transparent 60%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Two-column top: heading left, image right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#1D4ED8] uppercase tracking-widest bg-white border-[1.5px] border-blue-400/60 shadow-[0_2px_10px_rgba(29,78,216,0.12)] px-4 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
                Perks & Culture
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Work at{' '}
                <span className="bg-gradient-to-r from-[#1E40AF] via-[#1D4ED8] to-[#2563EB] bg-clip-text text-transparent">Innovatiq?</span>
              </h2>
              <p className="text-slate-500 font-medium mb-3 leading-relaxed">
                At Innovatiq we treasure our people as they are our most important assets. We encourage a diverse and inclusive culture working together in an open minded environment.
              </p>
              <p className="text-slate-500 font-medium leading-relaxed">
                Are you enthusiastic and passionate about innovation and technology? You are a perfect match and we have the right challenges to help you grow, upskill to nurture your career.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={120}>
              <div className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.12)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/aboutUs/medium-shot-people-working-desk.jpg"
                  alt="Team collaborating at Innovatiq"
                  className="w-full h-72 object-cover object-center" />
                {/* Brand colour overlay */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(29,78,216,0.12) 0%, transparent 60%)' }} />
                {/* Bottom caption strip */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-3"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}>
                  <p className="text-white text-sm font-medium">People-first culture · Asia Pacific</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {[
              { icon: '🚀', title: 'Challenging Work', description: 'Work on complex, high-impact projects for enterprise clients across the region.', color: '#1D4ED8' },
              { icon: '📚', title: 'Continuous Learning', description: 'Generous training and certification budgets to keep your skills current.', color: '#3B82F6' },
              { icon: '🌍', title: 'Global Exposure', description: 'Work with international clients and teams across Asia Pacific.', color: '#10B981' },
              { icon: '💡', title: 'Innovation Culture', description: 'We encourage experimentation, creative thinking, and bold ideas.', color: '#F59E0B' },
            ].map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 80} className="h-full">
                <div className="text-center p-7 hover:-translate-y-1 transition-all duration-300 h-full"
                  style={{
                    background: 'linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, #1D4ED8 0%, #1D4ED8 20%, rgba(29,78,216,0.80) 45%, rgba(29,78,216,0.33) 70%, transparent 90%) border-box',
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderTopWidth: '4px',
                    borderLeftWidth: '0',
                    borderRightWidth: '0',
                    borderBottomWidth: '0',
                    borderRadius: '16px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)',
                  }}>
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{b.title}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">{b.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #F9FAFE 100%)' }}>
        {/* Background treatments */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/Carrer%20Hero%20Section%20Background%201.svg" alt="" aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] h-auto opacity-[0.04] object-contain" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[400px]"
            style={{ background: 'radial-gradient(ellipse at bottom left, rgba(29,78,216,0.05) 0%, transparent 60%)' }} />
          <div className="absolute top-0 right-0 w-[400px] h-[400px]"
            style={{ background: 'radial-gradient(ellipse at top right, rgba(59,130,246,0.04) 0%, transparent 60%)' }} />
          {/* Subtle dot grid */}
          <div className="absolute inset-0 opacity-[0.018]"
            style={{ backgroundImage: 'radial-gradient(circle, #1D4ED8 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Open{' '}
              <span className="bg-gradient-to-r from-[#1E40AF] via-[#1D4ED8] to-[#2563EB] bg-clip-text text-transparent">Positions</span>
            </h2>
            <p className="text-slate-500 font-medium">{careers.length > 0 ? `${careers.length} opportunities available across our offices.` : 'New opportunities coming soon.'}</p>
          </AnimatedSection>

          {careers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl mb-6"
              style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.07)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: '#FFFFFF', border: '1.5px solid rgba(29,78,216,0.40)', boxShadow: '0 2px 10px rgba(29,78,216,0.12)' }}>
                <Briefcase size={28} className="text-[#1D4ED8]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No open positions right now</h3>
              <p className="text-slate-500 font-medium text-sm">We&apos;re not actively hiring at the moment. Submit your profile and we&apos;ll contact you.</p>
            </div>
          )}

          <div className="space-y-4">
            {careers.map((job, i) => (
              <AnimatedSection key={job._id} delay={i * 60}>
                <div className="p-5 pl-6 hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-5"
                  style={{
                    background: 'linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to bottom, #1D4ED8 0%, #1D4ED8 20%, #1D4ED8CC 45%, #1D4ED855 70%, transparent 90%) border-box',
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderTopWidth: '0',
                    borderLeftWidth: '4px',
                    borderRightWidth: '0',
                    borderBottomWidth: '0',
                    borderRadius: '16px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08)',
                  }}>

                  {/* Icon anchor */}
                  <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center self-start sm:self-center"
                    style={{ background: 'linear-gradient(135deg, rgba(29,78,216,0.12), rgba(29,78,216,0.05))', border: '1px solid rgba(29,78,216,0.18)' }}>
                    <Briefcase size={22} style={{ color: '#1D4ED8' }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">{job.jobTitle || job.title}</h3>
                      {job.employmentType && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                          style={{ background: 'rgba(29,78,216,0.08)', color: '#1D4ED8', border: '1px solid rgba(29,78,216,0.15)' }}>
                          {job.employmentType}
                        </span>
                      )}
                    </div>
                    {job.companyName && (
                      <p className="text-sm font-medium mb-3" style={{ color: '#1D4ED8' }}>{job.companyName}</p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                      {job.location && (
                        <span className="flex items-center gap-1.5"><MapPin size={13} style={{ color: '#1D4ED8' }} />{job.location}</span>
                      )}
                      {(job.experienceLevel || job.experience) && (
                        <span className="flex items-center gap-1.5"><Briefcase size={13} style={{ color: '#1D4ED8' }} />{job.experienceLevel || job.experience}</span>
                      )}
                      {job.employmentType && (
                        <span className="flex items-center gap-1.5"><Clock size={13} style={{ color: '#1D4ED8' }} />{job.employmentType}</span>
                      )}
                    </div>
                    {(() => {
                      const skills = (Array.isArray(job.primarySkills)
                        ? job.primarySkills
                        : String(job.primarySkills || '').split(',')
                      ).map((s: string) => s.trim()).filter(Boolean).slice(0, 4);
                      return skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {skills.map((skill: string) => (
                            <span key={skill} className="text-xs px-2.5 py-1 rounded-full font-medium"
                              style={{ background: '#F8FAFC', color: '#475569', border: '1px solid rgba(0,0,0,0.10)' }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Right: apply */}
                  <div className="shrink-0 flex flex-col items-end gap-3 self-center">
                    <Link href={`/careers/${job._id}`}
                      className="inline-flex items-center gap-2 py-2.5 px-6 text-sm text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)', boxShadow: '0 4px 12px rgba(29,78,216,0.30)' }}>
                      Apply Now <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA card — two-column: content left, visible image right */}
          <AnimatedSection className="mt-10">
            <div className="relative overflow-hidden rounded-2xl flex flex-col sm:flex-row items-stretch"
              style={{
                background: 'linear-gradient(135deg, #EFF6FF 0%, #FFF9F5 60%, #FFFBF5 100%)',
                border: '1.5px solid rgba(29,78,216,0.18)',
                boxShadow: '0 4px 24px rgba(29,78,216,0.08)',
              }}>
              {/* Ambient glow top-left */}
              <div className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{ background: 'radial-gradient(circle, rgba(29,78,216,0.07) 0%, transparent 70%)' }} />

              {/* Left: content */}
              <div className="relative z-10 flex-1 px-8 py-12">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(29,78,216,0.09)', border: '1px solid rgba(29,78,216,0.18)' }}>
                  <Users size={26} className="text-[#1D4ED8]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Don&apos;t See a Role That Fits?</h3>
                <p className="text-slate-500 font-medium mb-7 max-w-sm leading-relaxed">
                  We&apos;re always looking for exceptional talent. Submit your profile and we&apos;ll reach out when the right opportunity arises.
                </p>
                <Link href="/join-us"
                  className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)', boxShadow: '0 8px 24px rgba(29,78,216,0.30)' }}>
                  Submit Your Profile <ChevronRight size={16} />
                </Link>
              </div>

              {/* Right: visible career image */}
              <div className="hidden sm:flex items-end justify-center w-64 shrink-0 overflow-hidden"
                style={{ background: 'linear-gradient(to left, rgba(29,78,216,0.06), transparent)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Carrer%20Image.svg" alt="" aria-hidden="true"
                  className="h-[95%] max-h-64 w-auto object-contain opacity-30 select-none pointer-events-none" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <VideoSection filterType="career" />
      <CtaSection />
    </>
  );
}
