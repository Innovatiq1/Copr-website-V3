'use client';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Cloud, Shield, BarChart2, Zap, Server, Network, Wrench } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const SERVICES = [
  {
    title: 'Cloud Services',
    desc: 'Scalable cloud infrastructure, seamless migration, and cost optimisation for growing businesses.',
    href: '/services/cloud',
    Icon: Cloud,
    clr: '#BE123C',
    bg: 'linear-gradient(135deg, #FFF1F2, #FFE4E6)',
    shadow: 'rgba(190,18,60,0.15)',
  },
  {
    title: 'Cyber Security',
    desc: 'End-to-end security solutions protecting your data, users and business operations 24/7.',
    href: '/services/cyber-security',
    Icon: Shield,
    clr: '#BE123C',
    bg: 'linear-gradient(135deg, #FFF1F2, #FFE4E6)',
    shadow: 'rgba(190,18,60,0.15)',
  },
  {
    title: 'IT Consulting',
    desc: 'Strategic technology advisory aligning your IT roadmap with core business goals.',
    href: '/services/consulting',
    Icon: BarChart2,
    clr: '#BE123C',
    bg: 'linear-gradient(135deg, #FFF1F2, #FFE4E6)',
    shadow: 'rgba(190,18,60,0.15)',
  },
  {
    title: 'Digital Transformation',
    desc: 'Reimagine your business with AI, automation, and modern platforms at scale.',
    href: '/services/digital-transformation',
    Icon: Zap,
    clr: '#BE123C',
    bg: 'linear-gradient(135deg, #FFF1F2, #FFE4E6)',
    shadow: 'rgba(190,18,60,0.15)',
  },
  {
    title: 'Managed IT Services',
    desc: 'Proactive 24/7 IT management with guaranteed SLA performance and rapid response.',
    href: '/services/managed-it',
    Icon: Server,
    clr: '#BE123C',
    bg: 'linear-gradient(135deg, #FFF1F2, #FFE4E6)',
    shadow: 'rgba(190,18,60,0.15)',
  },
  {
    title: 'Advanced Infrastructure',
    desc: 'Enterprise-grade network and server infrastructure built to scale with your growth.',
    href: '/services/advanced-infra',
    Icon: Network,
    clr: '#BE123C',
    bg: 'linear-gradient(135deg, #FFF1F2, #FFE4E6)',
    shadow: 'rgba(190,18,60,0.15)',
  },
  {
    title: 'Field Services',
    desc: 'Certified on-site technical support, maintenance, and deployment across the region.',
    href: '/services/field-service',
    Icon: Wrench,
    clr: '#BE123C',
    bg: 'linear-gradient(135deg, #FFF1F2, #FFE4E6)',
    shadow: 'rgba(190,18,60,0.15)',
  },
];

export default function ServicesSection() {
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
      className="relative pt-12 sm:pt-14 pb-16 sm:pb-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF8F9 0%, #FFFCFD 22%, #FFFEFE 55%, #FFFFFF 100%)',
        borderRadius: '28px 28px 0 0',
        marginTop: '-40px',
        zIndex: 10,
        position: 'relative',
        boxShadow: '0 -4px 32px rgba(190,18,60,0.06)',
      }}>

      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(190,18,60,0.07) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{ color: '#9F1239', background: '#FFFFFF', border: '1.5px solid rgba(159,18,57,0.38)', boxShadow: '0 2px 10px rgba(190,18,60,0.12)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#BE123C' }} />
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-gray-900 mb-5 leading-tight">
            Comprehensive IT Solutions
            <br />
            <span className="relative inline-block mt-1">
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 45%, #881337 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                For Modern Enterprises
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 10" fill="none" preserveAspectRatio="none" style={{ height: '7px' }}>
                <path d="M2 7 Q100 2 200 6 Q300 10 398 4" stroke="url(#sg)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F43F5E"/>
                    <stop offset="50%" stopColor="#E11D48"/>
                    <stop offset="100%" stopColor="#881337"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            From cloud infrastructure to cyber security — end-to-end services that accelerate your digital journey.
          </p>
        </AnimatedSection>

        {/* Cards grid — single observer, CSS animation per card */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <div
              key={s.href}
              className={gridVisible ? 'product-card-enter' : ''}
              style={{ opacity: gridVisible ? undefined : 0, animationDelay: `${i * 55}ms` }}
            >
            <Link href={s.href} className="group block h-full">
                <div className="relative h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5"
                  style={{
                    background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, ${s.clr} 0%, ${s.clr} 20%, ${s.clr}CC 45%, ${s.clr}55 70%, transparent 90%) border-box`,
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderTopWidth: '4px',
                    borderLeftWidth: '0',
                    borderRightWidth: '0',
                    borderBottomWidth: '0',
                    borderRadius: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 6px 20px rgba(0,0,0,0.07)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${s.shadow}, 0 12px 32px rgba(0,0,0,0.08)`;
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.07), 0 6px 20px rgba(0,0,0,0.06)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div className="p-6 flex flex-col flex-1">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3"
                      style={{
                        background: `linear-gradient(135deg, #FFF5F6 0%, #FFF1F2 100%)`,
                        border: `1.5px solid rgba(190,18,60,0.18)`,
                        boxShadow: `0 4px 12px rgba(190,18,60,0.10)`,
                      }}>
                      <s.Icon size={22} style={{ color: s.clr }} strokeWidth={1.75} />
                    </div>

                    {/* Content */}
                    <h3 className="font-extrabold text-gray-900 text-[16px] mb-2 leading-snug">{s.title}</h3>
                    <p className="text-slate-500 text-[13.5px] font-medium leading-relaxed flex-1">{s.desc}</p>

                    {/* Footer */}
                    <div className="flex items-center gap-1.5 mt-5 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                      <span className="text-[11.5px] font-bold uppercase tracking-wider" style={{ color: s.clr }}>
                        Learn More
                      </span>
                      <ArrowRight size={11} style={{ color: s.clr }} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* Custom Solution card */}
          <div
            className={gridVisible ? 'product-card-enter' : ''}
            style={{ opacity: gridVisible ? undefined : 0, animationDelay: `${SERVICES.length * 55}ms` }}
          >
            <Link href="/contact" className="group block h-full">
              <div className="relative h-full rounded-2xl p-7 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5"
                style={{
                  background: 'linear-gradient(145deg, rgba(190,18,60,0.04) 0%, rgba(255,140,66,0.03) 100%)',
                  border: '1.5px dashed rgba(190,18,60,0.50)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  minHeight: '260px',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(190,18,60,0.12)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(190,18,60,0.70)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(190,18,60,0.50)';
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(190,18,60,0.06) 0%, transparent 70%)' }} />

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: 'linear-gradient(135deg, #BE123C, #FF4D7C)',
                    boxShadow: '0 8px 24px rgba(190,18,60,0.30)',
                  }}>
                  <ArrowRight size={24} className="text-white" />
                </div>

                <h3 className="font-bold text-gray-900 text-[17px] mb-3">Custom Solution</h3>
                <p className="text-slate-500 text-[13.5px] font-semibold leading-relaxed mb-7 max-w-55">
                  Tell us your challenge — we&apos;ll design the perfect solution for you.
                </p>

                <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[12px] font-bold text-white uppercase tracking-wide transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)',
                    boxShadow: '0 4px 14px rgba(190,18,60,0.30)',
                  }}>
                  Talk to an Expert <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
