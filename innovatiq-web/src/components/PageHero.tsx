'use client';
import { useRef, useEffect } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumb?: string;
}

export default function PageHero({ title, subtitle, badge, breadcrumb }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const illus1Ref = useRef<HTMLDivElement>(null);
  const illus2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      // progress: 0 = hero at top of viewport, 1 = hero fully scrolled out
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      if (orb1Ref.current)    orb1Ref.current.style.transform    = `translateY(${progress * 130}px)`;
      if (orb2Ref.current)    orb2Ref.current.style.transform    = `translateY(${progress * 90}px)`;
      if (illus1Ref.current)  illus1Ref.current.style.transform  = `translateY(${progress * 160}px)`;
      if (illus2Ref.current)  illus2Ref.current.style.transform  = `translateY(${progress * 70}px)`;
      if (contentRef.current) contentRef.current.style.transform = `translateY(${progress * 50}px)`;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-36 pb-24"
      style={{ background: 'linear-gradient(145deg, #0A1628 0%, #0F2040 50%, #0B1830 100%)' }}>

      {/* Ambient orbs — parallax */}
      <div ref={orb1Ref} className="absolute -top-20 -right-20 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,23,74,0.30) 0%, rgba(212,23,74,0.06) 45%, transparent 65%)' }} />
      <div ref={orb2Ref} className="absolute -bottom-10 -left-10 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 60%)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, transparent 70%)' }} />

      {/* Top glowing line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(212,23,74,0.7) 30%, rgba(59,130,246,0.5) 70%, transparent 100%)' }} />

      {/* Decorative illustrations — parallax */}
      <div ref={illus1Ref} className="absolute right-0 top-0 h-full max-h-[480px] pointer-events-none select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/image%20189.svg" alt="" aria-hidden="true" className="h-full w-auto opacity-[0.08] object-contain" />
      </div>
      <div ref={illus2Ref} className="absolute left-0 bottom-0 h-64 pointer-events-none select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/image%20191.svg" alt="" aria-hidden="true" className="h-full w-auto opacity-[0.07] object-contain" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 text-center">
        {badge && (
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4174A] uppercase tracking-widest px-5 py-2 rounded-full mb-5"
            style={{ background: 'rgba(212,23,74,0.12)', border: '1px solid rgba(212,23,74,0.30)', backdropFilter: 'blur(12px)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4174A] pulse-glow" />
            {badge}
          </span>
        )}
        {breadcrumb && (
          <p className="text-gray-500 text-sm mb-3">{breadcrumb}</p>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
          style={{ textShadow: '0 0 80px rgba(212,23,74,0.2)' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="h-[2px] w-16 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #D4174A)' }} />
          <div className="w-2.5 h-2.5 rounded-full pulse-glow" style={{ background: '#D4174A', boxShadow: '0 0 12px rgba(212,23,74,0.8)' }} />
          <div className="h-[2px] w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #D4174A, transparent)' }} />
        </div>
      </div>

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #070D1C)' }} />
    </section>
  );
}
