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
    function onScroll() {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      if (orb1Ref.current)    orb1Ref.current.style.transform    = `translateY(${progress * 130}px)`;
      if (orb2Ref.current)    orb2Ref.current.style.transform    = `translateY(${progress * 90}px)`;
      if (contentRef.current) contentRef.current.style.transform = `translateY(${progress * 50}px)`;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-36 pb-24"
      style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #F0F5FF 55%, #FFF5F7 100%)' }}>

      {/* Ambient orbs */}
      <div ref={orb1Ref} className="absolute -top-20 -right-20 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,23,74,0.08) 0%, rgba(212,23,74,0.03) 45%, transparent 65%)' }} />
      <div ref={orb2Ref} className="absolute -bottom-10 -left-10 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 60%)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)' }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #D4174A 30%, #FF4D7C 60%, transparent 100%)' }} />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="spin-s absolute"
          style={{ top: '15%', right: '8%', width: '90px', height: '90px', border: '1px solid rgba(212,23,74,0.14)', borderRadius: '14px', transform: 'rotate(20deg)' }} />
        <div className="float absolute rounded-full"
          style={{ top: '30%', left: '5%', width: '50px', height: '50px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.18)' }} />
        <div className="float-d absolute"
          style={{ bottom: '25%', right: '12%', width: '40px', height: '40px', background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.18)', transform: 'rotate(45deg)' }} />
        <div className="float absolute rounded-full"
          style={{ top: '60%', left: '3%', width: '8px', height: '8px', background: '#D4174A', opacity: 0.5, boxShadow: '0 0 8px rgba(212,23,74,0.4)' }} />
        <div className="float-d absolute rounded-full"
          style={{ top: '20%', left: '45%', width: '6px', height: '6px', background: '#3B82F6', opacity: 0.5, boxShadow: '0 0 7px rgba(59,130,246,0.4)' }} />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 text-center">
        {badge && (
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4174A] uppercase tracking-widest px-5 py-2 rounded-full mb-5"
            style={{ background: 'rgba(212,23,74,0.08)', border: '1px solid rgba(212,23,74,0.20)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4174A] pulse-glow" />
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
          <div className="h-[2px] w-16 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #D4174A)' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#D4174A', boxShadow: '0 0 10px rgba(212,23,74,0.4)' }} />
          <div className="h-[2px] w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #D4174A, transparent)' }} />
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #F8FAFC)' }} />
    </section>
  );
}
