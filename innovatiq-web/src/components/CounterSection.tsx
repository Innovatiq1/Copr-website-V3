'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Trophy, Zap, Users, Star } from 'lucide-react';

const stats = [
  { val: 100, suffix: '+', label: 'Successful Projects', Icon: Trophy,  color: '#1D4ED8', light: '#EFF6FF', mid: 'rgba(29,78,216,0.12)' },
  { val: 15,  suffix: '+', label: 'Ongoing Projects',    Icon: Zap,     color: '#1D4ED8', light: '#EFF6FF', mid: 'rgba(29,78,216,0.12)' },
  { val: 100, suffix: '+', label: 'Skilled Experts',     Icon: Users,   color: '#1D4ED8', light: '#EFF6FF', mid: 'rgba(29,78,216,0.12)' },
  { val: 200, suffix: '+', label: 'Happy Clients',       Icon: Star,    color: '#1D4ED8', light: '#EFF6FF', mid: 'rgba(29,78,216,0.12)' },
];

// visible is passed from StatCard — no separate IntersectionObserver needed
function Counter({ target, suffix, color, visible }: { target: number; suffix: string; color: string; visible: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (!visible || done.current) return;
    done.current = true;
    const el = ref.current;
    if (!el) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 2000, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = `${Math.round(ease * target)}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target, suffix]);

  return (
    <span ref={ref} className="font-black tabular-nums"
      style={{ fontSize: '48px', lineHeight: 1, color, filter: `drop-shadow(0 0 12px ${color}40)` }}>
      0{suffix}
    </span>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'
          : 'translateY(40px) scale(0.94)',
        transition: visible
          ? 'opacity 0.4s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, background 0.35s ease'
          : `opacity 0.6s ease ${index * 120}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
        background: hovered
          ? `linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(239,246,255,0.90) 100%) padding-box, linear-gradient(to right, #1D4ED8 0%, #1D4ED8 22%, rgba(29,78,216,0.70) 50%, transparent 90%) border-box`
          : `linear-gradient(160deg, rgba(255,255,255,0.88) 0%, rgba(239,246,255,0.82) 100%) padding-box, linear-gradient(to right, #1D4ED8 0%, #1D4ED8 22%, rgba(29,78,216,0.70) 50%, transparent 90%) border-box`,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '20px',
        padding: '24px 20px 22px',
        textAlign: 'left' as const,
        position: 'relative' as const,
        overflow: 'hidden',
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderTopWidth: '4px',
        borderLeftWidth: '1px',
        borderRightWidth: '1px',
        borderBottomWidth: '1px',
        boxShadow: hovered
          ? `0 20px 44px rgba(29,78,216,0.16), 0 8px 20px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,1)`
          : `0 4px 20px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.95)`,
        cursor: 'default',
      }}
    >
      {/* Glass sheen */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
        pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.50) 0%, transparent 100%)',
      }} />

      {/* Soft diagonal tint */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: '20px',
        background: `linear-gradient(148deg, transparent 45%, ${stat.color}08 100%)`,
      }} />

      {/* Icon row */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{
          width: '46px', height: '46px', borderRadius: '13px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `rgba(255,255,255,0.90)`,
          border: `1.5px solid rgba(29,78,216,0.18)`,
          boxShadow: `0 2px 12px rgba(29,78,216,0.12)`,
          transform: hovered ? 'scale(1.10)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}>
          <stat.Icon size={20} style={{ color: stat.color }} strokeWidth={1.8} />
        </div>
      </div>

      {/* Number */}
      <Counter target={stat.val} suffix={stat.suffix} color={stat.color} visible={visible} />

      {/* Divider */}
      <div style={{
        height: '2px', borderRadius: '2px', margin: '10px 0 10px',
        width: hovered ? '44px' : '24px',
        background: `linear-gradient(90deg, ${stat.color}, rgba(29,78,216,0.20))`,
        transition: 'width 0.3s ease',
      }} />

      {/* Label */}
      <p style={{
        fontSize: '11px', fontWeight: 700, letterSpacing: '0.10em',
        textTransform: 'uppercase', color: '#334155', margin: 0,
      }}>
        {stat.label}
      </p>
    </div>
  );
}

export default function CounterSection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{
      background: 'linear-gradient(180deg, #F8FBFF 0%, #EFF6FF 35%, #E8F4FF 65%, #F8FBFF 100%)'
    }}>

      {/* Premium ambient decorative radial glows */}
      <div className="absolute top-0 left-0 w-[45%] h-full pointer-events-none opacity-40" style={{
        background: 'radial-gradient(circle at 10% 20%, rgba(29,78,216,0.05) 0%, transparent 60%)',
      }} />
      <div className="absolute bottom-0 left-[20%] w-[35%] h-[60%] pointer-events-none opacity-40" style={{
        background: 'radial-gradient(circle at 50% 80%, rgba(59,130,246,0.05) 0%, transparent 65%)',
      }} />

      {/* Image panel — slanted left edge via clip-path */}
      <div className="absolute inset-y-0 right-0 w-[55%] pointer-events-none" style={{
        backgroundImage: "url('/images/statistics_bg_clarity.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }} />

      {/* Subtle dark scrim for readability */}
      <div className="absolute inset-y-0 right-0 w-[55%] pointer-events-none" style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(15,23,42,0.10) 50%, rgba(15,23,42,0.18) 100%)',
        clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
        zIndex: 1,
      }} />

      {/* Top/bottom fade to blend with section bg */}
      <div className="absolute inset-y-0 right-0 w-[55%] pointer-events-none" style={{
        background: 'linear-gradient(180deg, #F8FBFF 0%, transparent 12%, transparent 88%, #F8FBFF 100%)',
        clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
        zIndex: 2,
      }} />

      {/* Slant edge soft glow — sits right at the diagonal join */}
      <div className="absolute inset-y-0 pointer-events-none" style={{
        left: 'calc(45% - 60px)',
        width: '120px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(29,78,216,0.07) 50%, transparent 100%)',
        zIndex: 3,
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text + certs */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#1D4ED8] uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
              style={{ background: '#FFFFFF', border: '1.5px solid rgba(29,78,216,0.38)', boxShadow: '0 2px 10px rgba(29,78,216,0.12)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
              Our Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Numbers That<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #1E40AF 0%, #1D4ED8 40%, #2563EB 100%)' }}>
                Speak for Themselves
              </span>
            </h2>
            <p className="text-slate-600 text-base font-medium leading-relaxed mb-10 max-w-md">
              At Innovatiq, we believe in the power of innovation to transform businesses and elevate their digital presence — building trust one project at a time.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-3">
              {[
                { src: '/images/image004-preview-1.png', alt: 'ISO 27001:2022' },
                { src: '/logo/image003-preview (1).png', alt: 'ISO 9001:2015' },
                { src: '/images/SME-2024-25-Logo-TM-01.png', alt: 'SME Excellence' },
                { src: '/images/TBSQ-2024-25-Logo-TM-01-copy-2-1536x1326.png', alt: 'Top Business Service' },
                { src: '/images/image005-preview.png', alt: 'bizSAFE3' },
                { src: '/images/Data-Protection-Trustmark-Logo_Horizontal_Colour.png', alt: 'Data Protection' },
              ].map(c => (
                <div key={c.alt}
                  className="rounded-xl px-3 py-2.5 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(29,78,216,0.14)',
                    boxShadow: '0 2px 12px rgba(29,78,216,0.08), 0 1px 4px rgba(0,0,0,0.05)',
                  }}>
                  <Image src={c.src} alt={c.alt} width={60} height={28} style={{ objectFit: 'contain', height: '28px', maxWidth: '60px', width: 'auto' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Right — 2×2 white 3D cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <StatCard key={i} stat={s} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
