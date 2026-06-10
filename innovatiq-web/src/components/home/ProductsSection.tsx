'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import TiltCard from '@/components/TiltCard';

const products = [
  {
    num: '01',
    name: 'SkillEra',
    sub: 'Training Management System',
    desc: 'AI-powered training lifecycle management with intelligent recommendations and advanced analytics.',
    href: '/products/skillera',
    logo: '/images/Skillera-png-logo.png',
    heroImg: '/images/SkillEra Hero Section.svg',
    features: ['AI Recommendations', 'Analytics Dashboard', 'Automated Workflows', 'Mobile Ready'],
    imgBg: 'linear-gradient(135deg, #9F1239 0%, #BE123C 35%, #E11D48 70%, #F43F5E 100%)',
    clr: '#BE123C',
    clrLight: '#FFF1F2',
    badge: 'Most Popular',
  },
  {
    num: '02',
    name: 'LearnPro',
    sub: 'Learning Management System',
    desc: 'Comprehensive platform for creating, managing, and delivering engaging training programs at scale.',
    href: '/products/learnpro',
    logo: '/images/Learnpro-png-logo.png',
    heroImg: '/images/LMS Hero Screen.svg',
    features: ['Course Builder', 'Certifications', 'Social Learning', 'Progress Tracking'],
    imgBg: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #2563EB 100%)',
    clr: '#1D4ED8',
    clrLight: '#EFF6FF',
    badge: null,
  },
  {
    num: '03',
    name: 'SecurOn',
    sub: 'Patch Management System',
    desc: 'Enterprise-grade patch management ensuring your infrastructure stays secure and compliant 24/7.',
    href: '/products/securon',
    logo: '/images/Securon-png-logo.png',
    heroImg: '/images/PMS Hero Section.svg',
    features: ['Auto Patching', 'Compliance Reports', 'Vulnerability Scan', 'Real-time Alerts'],
    imgBg: 'linear-gradient(135deg, #047857 0%, #10B981 50%, #34D399 100%)',
    clr: '#10B981',
    clrLight: '#ECFDF5',
    badge: null,
  },
  {
    num: '04',
    name: 'LMP',
    sub: 'Learning Motivational Platform',
    desc: 'Gamification-powered platform that drives learner engagement and improves training completion rates.',
    href: '/products/lmp',
    logo: null,
    heroImg: '/images/LMP Hero Section.svg',
    features: ['Gamification Engine', 'Leaderboards', 'Rewards System', 'Engagement Analytics'],
    imgBg: 'linear-gradient(135deg, #C2410C 0%, #EA580C 50%, #F97316 100%)',
    clr: '#EA580C',
    clrLight: '#FFF7ED',
    badge: null,
  },
];

export default function ProductsSection() {
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
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F5F9FF 0%, #F8FBFF 50%, #FFFFFF 100%)' }}
    >

      {/* Background — single radial gradient only (no expensive tiled CSS grid) */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(29,78,216,0.04) 0%, transparent 60%)' }} />

      {/* Decorative blob */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/Group%2041156.svg" alt="" aria-hidden="true"
        className="absolute right-0 top-0 h-[55%] w-auto opacity-[0.04] pointer-events-none select-none object-contain" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

        {/* Header — static, no entrance animation */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{ color: '#1E40AF', background: '#FFFFFF', border: '1.5px solid rgba(30,64,175,0.38)', boxShadow: '0 2px 10px rgba(29,78,216,0.12)' }}>
            <Sparkles size={11} />
            Our Products
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-gray-900 mb-5 leading-tight">
            Purpose-Built{' '}
            <span className="relative inline-block">
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 45%, #1E3A8A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                SaaS Products
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 10" fill="none" preserveAspectRatio="none" style={{ height: '8px' }}>
                <path d="M2 7 Q75 2 150 6 Q225 10 298 4" stroke="url(#ug)" strokeWidth="3" strokeLinecap="round" fill="none" />
                <defs>
                  <linearGradient id="ug" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1E3A8A" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-gray-600 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Innovative platforms designed to transform how enterprises learn, secure, and grow.
          </p>
        </div>

        {/* Cards grid — single observer on the parent, CSS animation per card */}
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
                  {/* Image area — split: left overlay + right image */}
                  <div className="relative overflow-hidden" style={{ height: '240px', background: p.imgBg }}>
                    {/* Ambient light blobs */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                      backgroundImage: `radial-gradient(circle at 10% 90%, rgba(255,255,255,0.18) 0%, transparent 45%), radial-gradient(circle at 85% 15%, rgba(255,255,255,0.10) 0%, transparent 40%)`,
                    }} />

                    {/* Product image — right-biased, drop-shadow only on hover via CSS */}
                    <Image src={p.heroImg} alt={p.name} fill
                      style={{ objectFit: 'contain', objectPosition: 'right center', paddingTop: '14px', paddingBottom: '14px', paddingRight: '12px', paddingLeft: '38%' }}
                      className="group-hover:scale-[1.04] transition-transform duration-500" />

                    {/* Left panel overlay */}
                    <div className="absolute left-0 top-0 bottom-0 w-[45%] flex flex-col justify-between p-5 pointer-events-none z-10"
                      style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 70%, transparent 100%)' }}>
                      {/* Number pill */}
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
                      {/* Name block at bottom */}
                      <div>
                        <p className="text-white text-[10px] font-bold uppercase tracking-widest mb-1"
                          style={{ opacity: 0.85, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>{p.sub}</p>
                        <h3 className="text-white font-black text-[22px] leading-tight" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.45)' }}>{p.name}</h3>
                      </div>
                    </div>

                    {/* Bottom fade to white */}
                    <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                      style={{ background: 'linear-gradient(to bottom, transparent, #FFFFFF)' }} />

                    {/* Most popular badge — solid bg instead of backdrop-filter */}
                    {p.badge && (
                      <span className="absolute top-4 right-4 text-[10px] font-bold px-3 py-1.5 rounded-full z-10"
                        style={{ background: 'rgba(255,255,255,0.95)', color: '#1E40AF', border: '1px solid rgba(255,255,255,0.60)', boxShadow: '0 2px 10px rgba(0,0,0,0.25)' }}>
                        ⭐ {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">

                    {/* Logo + subtitle row */}
                    <div className="flex items-center gap-3 mb-4">
                      {p.logo ? (
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: p.clrLight, border: `1.5px solid ${p.clr}20` }}>
                          <Image src={p.logo} alt={p.name} width={28} height={28} style={{ objectFit: 'contain' }} />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[10px] font-black shrink-0"
                          style={{ background: p.imgBg }}>LMP</div>
                      )}
                      <div>
                        <h3 className="font-bold text-gray-900 text-[17px] leading-none">{p.name}</h3>
                        <p className="text-[11.5px] mt-0.5 font-semibold" style={{ color: p.clr }}>{p.sub}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-[15px] font-medium leading-relaxed mb-5 flex-1">{p.desc}</p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-y-2 gap-x-3 mb-5">
                      {p.features.map(f => (
                        <div key={f} className="flex items-center gap-1.5">
                          <CheckCircle2 size={13} style={{ color: p.clr, flexShrink: 0 }} strokeWidth={2} />
                          <span className="text-[13px] text-gray-600 font-semibold">{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer CTAs */}
                    <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      <Link href={p.href}
                        className="flex items-center gap-1.5 text-[13px] font-bold transition-all duration-200 group/link"
                        style={{ color: p.clr }}>
                        Explore {p.name}
                        <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                      <Link href="/contact"
                        className="ml-auto text-[12px] font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          background: p.clrLight,
                          color: p.clr,
                          border: `1px solid ${p.clr}30`,
                        }}>
                        Free Trial
                      </Link>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* Talk to Expert CTA */}
        <AnimatedSection className="mt-14 text-center">
          <p className="text-gray-600 mb-5 text-sm font-semibold">Unsure which product fits your needs?</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 font-semibold rounded-xl text-white transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
            style={{
              background: 'linear-gradient(135deg, #1E40AF 0%, #1D4ED8 50%, #2563EB 100%)',
              boxShadow: '0 8px 32px rgba(29,78,216,0.35), 0 2px 8px rgba(29,78,216,0.20)',
            }}>
            Talk to a Product Expert <ArrowRight size={15} />
          </Link>
        </AnimatedSection>

      </div>
    </section>
  );
}
