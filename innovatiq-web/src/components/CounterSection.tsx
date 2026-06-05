'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import TiltCard from '@/components/TiltCard';

const stats = [
  { val: 100, suffix: '+', label: 'Successful Projects', icon: '🏆', color: '#D4174A', glow: 'rgba(212,23,74,0.3)' },
  { val: 15, suffix: '+', label: 'Ongoing Projects', icon: '⚡', color: '#F59E0B', glow: 'rgba(245,158,11,0.3)' },
  { val: 100, suffix: '+', label: 'Skilled Experts', icon: '👥', color: '#3B82F6', glow: 'rgba(59,130,246,0.3)' },
  { val: 200, suffix: '+', label: 'Happy Clients', icon: '🌟', color: '#10B981', glow: 'rgba(16,185,129,0.3)' },
];

function Counter({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let cur = 0;
        const step = target / 60;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { setN(target); clearInterval(t); }
          else setN(Math.floor(cur));
        }, 2000 / 60);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-5xl font-black" style={{ color }}>
      {n}{suffix}
    </span>
  );
}

export default function CounterSection() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: '#FFFFFF' }}>

      {/* Large ambient blobs */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at left, rgba(212,23,74,0.05) 0%, transparent 70%)' }} />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right, rgba(59,130,246,0.04) 0%, transparent 70%)' }} />

      {/* Illustration */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/aboutUs/AdobeExpress1.svg" alt="" aria-hidden="true"
        className="absolute right-0 top-0 h-full max-h-[400px] w-auto opacity-[0.05] pointer-events-none select-none object-contain" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: text + certs */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4174A] uppercase tracking-widest bg-[#D4174A]/10 border border-[#D4174A]/20 px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4174A] animate-pulse" />
              Our Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Numbers That<br />
              <span className="bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">
                Speak for Themselves
              </span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md">
              At Innovatiq, we believe in the power of innovation to transform businesses and elevate their digital presence — building trust one project at a time.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-3">
              {[
                { src: '/images/image004-preview-1.png', alt: 'ISO 27001:2022' },
                { src: '/logo/image003-preview (1).png', alt: 'ISO 9001:2015' },
                { src: '/images/SME-2024-25-Logo-TM-01.png', alt: 'SME Excellence 2024-25' },
                { src: '/images/TBSQ-2024-25-Logo-TM-01-copy-2-1536x1326.png', alt: 'Top Business Service & Quality' },
                { src: '/images/image005-preview.png', alt: 'bizSAFE3' },
                { src: '/images/Data-Protection-Trustmark-Logo_Horizontal_Colour.png', alt: 'Data Protection' },
              ].map(c => (
                <div key={c.alt}
                  className="bg-white rounded-xl px-4 py-2.5 flex items-center transition-transform hover:scale-105"
                  style={{ border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)' }}>
                  <Image src={c.src} alt={c.alt} width={90} height={35} style={{ objectFit: 'contain', height: '30px', width: 'auto' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <TiltCard key={i} intensity={20}>
                <div className="rounded-2xl p-6 text-center"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.09)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
                  }}>
                  <div className="h-[2px] w-12 rounded-full mx-auto mb-4" style={{ background: s.color }} />
                  <div className="text-3xl mb-3 depth-pop">{s.icon}</div>
                  <div className="mb-1 depth-mid">
                    <Counter target={s.val} suffix={s.suffix} color={s.color} />
                  </div>
                  <p className="text-slate-400 text-xs font-medium depth-low">{s.label}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
