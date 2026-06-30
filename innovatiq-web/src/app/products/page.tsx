'use client';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import TiltCard from '@/components/TiltCard';
import CtaSection from '@/components/home/CtaSection';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const products = [
  {
    num: '01',
    name: 'Sales CRM',
    sub: 'AI-Powered Customer Relationship Management',
    desc: 'Empower your sales team with an intelligent, AI-powered CRM designed to streamline customer interactions, manage pipelines, and accelerate revenue growth.',
    href: '/products/sales-crm',
    heroImg: '/images/CRM.png',
    features: ['AI Lead Scoring & Qualification', 'AI Deal Analysis & Forecasting', 'Intelligent Sales Recommendations', 'Automated Follow-Up Reminders', 'Sales Target Tracking', 'AI Analytics & Performance Insights'],
    imgBg: 'linear-gradient(135deg, #881337 0%, #BE123C 28%, #D4174A 52%, #F43F5E 75%, #FB923C 100%)',
    clr: '#D4174A',
    clrLight: '#FFF0F3',
    badge: 'Our Latest Product',
    badgeLatest: true,
    objectPosition: 'right 10%',
    trialLabel: 'Free Trial',
  },
  {
    num: '02',
    name: 'HRMS (ATS)',
    sub: 'AI-Powered Recruitment Platform',
    desc: 'Transform your hiring process with intelligent recruitment automation. Streamline candidate sourcing, screening, evaluation, and hiring from a single platform.',
    href: '/products/ai-ats',
    heroImg: '/images/HRMS.png',
    features: ['AI Resume Parsing & Screening', 'AI Candidate Matching & Ranking', 'AI Job Description Generator', 'Smart Candidate Pipeline Management', 'Automated Interview Scheduling', 'Recruitment Analytics & Insights'],
    imgBg: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 30%, #6366F1 62%, #818CF8 100%)',
    clr: '#4F46E5',
    clrLight: '#EEF2FF',
    badge: 'Our Latest Product',
    badgeLatest: true,
    objectPosition: 'right 10%',
    trialLabel: 'Free Trial',
  },
  {
    num: '03',
    name: 'SkillEra',
    sub: 'AI-Powered Training Management System',
    desc: 'Supercharge your training programs with AI-driven course creation, personalised learning paths, and predictive performance analytics.',
    href: '/product/skilera-training-management-system',
    heroImg: '/images/SkillEra.png',
    features: ['AI Course Recommendations', 'Advanced Analytics Dashboard', 'Automated Training Workflows', 'Mobile Learning', 'SCORM Compliance', 'Certification Management'],
    imgBg: 'linear-gradient(135deg, #4a044e 0%, #86198f 50%, #a21caf 100%)',
    clr: '#a21caf',
    clrLight: '#fdf4ff',
    badge: 'Most Popular',
    badgeLatest: false,
    objectPosition: 'right center',
    trialLabel: 'Experience a FREE 3-Month Trial!',
  },
  {
    num: '04',
    name: 'LearnPro',
    sub: 'AI-Powered Learning Management System',
    desc: 'Deliver intelligent learning experiences at scale with AI course generation, automated assessments, and predictive student success analytics.',
    href: '/product/learnpro-learning-management-system',
    heroImg: '/images/LMS.png',
    features: ['Course Builder', 'Quiz Management', 'Progress Tracking', 'Certificate Generation', 'AI Course Content Generation', 'Personalised Learning Paths'],
    imgBg: 'linear-gradient(135deg, #164e63 0%, #0e7490 50%, #0891b2 100%)',
    clr: '#0e7490',
    clrLight: '#ecfeff',
    badge: null,
    badgeLatest: false,
    objectPosition: 'right center',
    trialLabel: 'Free Trial',
  },
  {
    num: '05',
    name: 'SecurOn',
    sub: 'AI-Powered Patch Management System',
    desc: 'Protect your enterprise infrastructure with AI-driven vulnerability detection, intelligent patch recommendations, and predictive threat analysis.',
    href: '/product/securon-patch-management-system',
    heroImg: '/images/SecurOn.png',
    features: ['Auto Patching', 'Compliance Reports', 'Vulnerability Scan', 'Real-time Alerts', 'AI-Based Vulnerability Detection', 'Intelligent Patch Recommendations'],
    imgBg: 'linear-gradient(135deg, #047857 0%, #10B981 50%, #34D399 100%)',
    clr: '#10B981',
    clrLight: '#ECFDF5',
    badge: null,
    badgeLatest: false,
    objectPosition: 'right center',
    trialLabel: 'Free Trial',
  },
  {
    num: '06',
    name: 'LMP',
    sub: 'AI-Powered Learning Motivational Platform',
    desc: 'AI-enhanced gamification platform that predicts dropout risk, personalises motivation triggers, and drives training completion rates.',
    href: '/product/learning-motivational-platform',
    heroImg: '/images/LMP.png',
    features: ['Gamification Engine', 'Leaderboards & Badges', 'Rewards System', 'Engagement Analytics', 'Personalised Learning Journeys', 'AI Learning Assistant'],
    imgBg: 'linear-gradient(135deg, #C2410C 0%, #EA580C 50%, #F97316 100%)',
    clr: '#EA580C',
    clrLight: '#FFF7ED',
    badge: null,
    badgeLatest: false,
    objectPosition: 'right 10%',
    trialLabel: 'Free Trial',
  },
];

export default function ProductsPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setGridVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageHero
        badge="Our Products"
        title="Purpose-Built SaaS Products"
        subtitle="Innovative software platforms designed to transform how enterprises learn, secure, and grow their workforce."
      />

      <section className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #FFF8F9 0%, #FFFCFD 50%, #FFFFFF 100%)' }}>

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(190,18,60,0.04) 0%, transparent 60%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div ref={gridRef} className="grid lg:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <div key={p.name}
                className={gridVisible ? 'product-card-enter' : ''}
                style={{ opacity: gridVisible ? undefined : 0, animationDelay: `${i * 100}ms` }}>
                <TiltCard intensity={14} className="h-full">
                  <div className="group h-full flex flex-col rounded-2xl overflow-hidden"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(0,0,0,0.08)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.05)',
                      transition: 'box-shadow 0.3s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 56px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)`}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.05)'}
                  >
                    {/* Hero image area — same as home page */}
                    <div className="relative overflow-hidden" style={{ height: '240px', background: p.imgBg }}>
                      {/* Ambient light blobs */}
                      <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: `radial-gradient(circle at 10% 90%, rgba(255,255,255,0.18) 0%, transparent 45%), radial-gradient(circle at 85% 15%, rgba(255,255,255,0.10) 0%, transparent 40%)`,
                      }} />

                      <Image src={p.heroImg} alt={p.name} fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={70}
                        style={{
                          objectFit: 'cover',
                          objectPosition: p.objectPosition,
                          paddingTop: '14px',
                          paddingBottom: '14px',
                          paddingRight: '12px',
                          paddingLeft: '32%',
                        }}
                        className="group-hover:scale-[1.04] transition-transform duration-500" />

                      {/* Left overlay with product name */}
                      <div className="absolute left-0 top-0 bottom-0 w-[45%] flex flex-col justify-between p-5 pointer-events-none z-10"
                        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 70%, transparent 100%)' }}>
                        <div className="inline-flex items-center gap-1.5 shrink-0 self-start">
                          <span className="inline-flex items-center justify-center font-black text-white shrink-0"
                            style={{
                              width: '36px', height: '36px', borderRadius: '10px',
                              background: 'rgba(0,0,0,0.40)',
                              border: '1.5px solid rgba(255,255,255,0.50)',
                              fontSize: '13px',
                              letterSpacing: '-0.02em',
                              boxShadow: '0 2px 12px rgba(0,0,0,0.30)',
                            }}>
                            {p.num}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-white font-black text-[22px] leading-tight" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.45)' }}>{p.name}</h3>
                        </div>
                      </div>

                      {/* Bottom fade to white */}
                      <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, transparent, #FFFFFF)' }} />

                      {/* Badge */}
                      {p.badge && (
                        p.badgeLatest ? (
                          <span className="absolute top-2 right-4 text-[10px] font-bold px-3 py-1.5 rounded-full z-10"
                            style={{ background: 'rgba(255,255,255,0.95)', color: '#4c1d95', border: '1px solid rgba(255,255,255,0.60)', boxShadow: '0 2px 10px rgba(0,0,0,0.25)' }}>
                            ✦ {p.badge}
                          </span>
                        ) : (
                          <span className="absolute top-2 right-4 text-[10px] font-bold px-3 py-1.5 rounded-full z-10"
                            style={{ background: 'rgba(255,255,255,0.95)', color: '#9F1239', border: '1px solid rgba(255,255,255,0.60)', boxShadow: '0 2px 10px rgba(0,0,0,0.25)' }}>
                            ⭐ {p.badge}
                          </span>
                        )
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">

                      {/* Logo icon + name + subtitle */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[9px] font-black shrink-0"
                          style={{ background: p.imgBg }}>
                          {p.name.slice(0, 3).toUpperCase()}
                        </div>
                        <div>
                          <Link href={p.href}
                            className="font-bold text-gray-900 text-[21px] leading-none block hover:underline"
                            style={{ color: 'inherit', textDecoration: 'none' }}
                            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = p.clr}
                            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'inherit'}>
                            {p.name}
                          </Link>
                          <p className="text-[15px] mt-0.5 font-semibold" style={{ color: p.clr }}>{p.sub}</p>
                        </div>
                      </div>

                      <p className="text-[16px] font-medium leading-relaxed mb-5" style={{ color: '#1a1a1a' }}>{p.desc}</p>

                      {/* Features — checklist grid exactly like home page */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-3 mb-5">
                        {p.features.map(f => (
                          <div key={f} className="flex items-start gap-1.5">
                            <CheckCircle2 size={15} style={{ color: p.clr, flexShrink: 0, marginTop: '3px' }} strokeWidth={2} />
                            <span className="text-[16px] font-medium leading-snug" style={{ color: '#1a1a1a' }}>{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer CTAs */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-4 mt-auto"
                        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                        <Link href={p.href}
                          className="flex items-center gap-1.5 text-[15px] transition-all duration-200 group/link"
                          style={{ color: p.clr, fontWeight: 650 }}>
                          View Product Page
                          <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/contact-us"
                          className="sm:ml-auto text-center text-[14px] font-bold px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                          style={{ background: p.clrLight, color: p.clr, border: `1px solid ${p.clr}30` }}>
                          {p.trialLabel}
                        </Link>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>

          {/* Bottom CTA — exactly matching home page style */}
          <AnimatedSection className="mt-14 text-center">
            <p className="mb-5 text-[16px] font-semibold" style={{ color: '#374151' }}>Unsure which product fits your needs?</p>
            <Link href="/contact-us"
              className="inline-flex items-center gap-2.5 px-8 py-4 font-semibold rounded-xl text-white transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
              style={{
                background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)',
                boxShadow: '0 8px 32px rgba(190,18,60,0.35), 0 2px 8px rgba(190,18,60,0.20)',
              }}>
              Talk to a Product Expert <ArrowRight size={15} />
            </Link>
          </AnimatedSection>

        </div>
      </section>

      <CtaSection />
    </>
  );
}
