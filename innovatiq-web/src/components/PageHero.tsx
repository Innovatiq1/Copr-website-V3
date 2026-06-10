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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    function onScroll() {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
        if (orb1Ref.current)    orb1Ref.current.style.transform    = `translateY(${progress * 130}px)`;
        if (orb2Ref.current)    orb2Ref.current.style.transform    = `translateY(${progress * 90}px)`;
        if (contentRef.current) contentRef.current.style.transform = `translateY(${progress * 50}px)`;
      });
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-32 sm:pt-36 pb-16 sm:pb-24"
      style={{ background: 'linear-gradient(to right, #FFFFFF 0%, #F8FBFF 40%, #EFF6FF 75%, #E8F2FF 100%)' }}>

      {/* Ambient orbs — sized down on mobile */}
      <div ref={orb1Ref} className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(29,78,216,0.08) 0%, rgba(29,78,216,0.03) 45%, transparent 65%)' }} />
      <div ref={orb2Ref} className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 60%)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(29,78,216,0.06) 0%, transparent 70%)' }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #1E3A8A 20%, #1D4ED8 50%, #3B82F6 80%, transparent 100%)' }} />

      {/* Floating geometric shapes — hidden on mobile to avoid overflow clutter */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden">
        <div className="spin-s absolute"
          style={{ top: '15%', right: '8%', width: '90px', height: '90px', border: '1px solid rgba(29,78,216,0.14)', borderRadius: '14px', transform: 'rotate(20deg)' }} />
        <div className="float absolute rounded-full"
          style={{ top: '30%', left: '5%', width: '50px', height: '50px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.18)' }} />
        <div className="float-d absolute"
          style={{ bottom: '25%', right: '12%', width: '40px', height: '40px', background: 'rgba(29,78,216,0.05)', border: '1px solid rgba(29,78,216,0.18)', transform: 'rotate(45deg)' }} />
        <div className="float absolute rounded-full"
          style={{ top: '60%', left: '3%', width: '8px', height: '8px', background: '#1D4ED8', opacity: 0.5, boxShadow: '0 0 8px rgba(29,78,216,0.4)' }} />
        <div className="float-d absolute rounded-full"
          style={{ top: '20%', left: '45%', width: '6px', height: '6px', background: '#3B82F6', opacity: 0.5, boxShadow: '0 0 7px rgba(59,130,246,0.4)' }} />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 text-center">
        {badge && (
          <span className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest px-5 py-2 rounded-full mb-5 transition-all duration-300 hover:scale-105 cursor-default"
            style={{ 
              background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)',
              borderColor: 'rgba(255, 255, 255, 0.25)',
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: '0 4px 14px rgba(29,78,216,0.30)',
            }}>
            <span className="w-2 h-2 rounded-full bg-[#93C5FD]" />
            {badge}
          </span>
        )}
        {breadcrumb && (
          <p className="text-slate-400 text-sm mb-3">{breadcrumb}</p>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="h-[2px] w-16 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #1D4ED8)' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#1D4ED8', boxShadow: '0 0 10px rgba(29,78,216,0.4)' }} />
          <div className="h-[2px] w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #1D4ED8, transparent)' }} />
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #FFFFFF)' }} />
    </section>
  );
}
