'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Trophy, Zap, Users, Star } from 'lucide-react';

const stats = [
  { val: 100, suffix: '+', label: 'Successful Projects', Icon: Trophy,  color: '#D4174A', light: '#FFF9FA', mid: 'rgba(212,23,74,0.12)'  },
  { val: 15,  suffix: '+', label: 'Ongoing Projects',    Icon: Zap,     color: '#F59E0B', light: '#FFFEF9', mid: 'rgba(245,158,11,0.12)' },
  { val: 100, suffix: '+', label: 'Skilled Experts',     Icon: Users,   color: '#3B82F6', light: '#F8FBFF', mid: 'rgba(59,130,246,0.12)'  },
  { val: 200, suffix: '+', label: 'Happy Clients',       Icon: Star,    color: '#10B981', light: '#F6FEFA', mid: 'rgba(16,185,129,0.12)'  },
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
          ? `linear-gradient(to bottom, ${stat.light} 0%, #FAFAFA 100%) padding-box, linear-gradient(to bottom, ${stat.color} 0%, ${stat.color} 55%, ${stat.color}BB 80%, transparent 100%) border-box`
          : `linear-gradient(to bottom, ${stat.light} 0%, #FFFFFF 100%) padding-box, linear-gradient(to bottom, ${stat.color} 0%, ${stat.color} 25%, ${stat.color}BB 50%, transparent 100%) border-box`,
        borderRadius: '24px',
        padding: '28px 22px 24px',
        textAlign: 'left' as const,
        position: 'relative' as const,
        overflow: 'hidden',
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderLeftWidth: '4px',
        borderTopWidth: '1px',
        borderRightWidth: '1px',
        borderBottomWidth: '1px',
        boxShadow: hovered
          ? `0 24px 60px ${stat.color}22, 0 4px 16px rgba(0,0,0,0.06)`
          : '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        cursor: 'default',
      }}
    >
      {/* Diagonal color slice — bottom right */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: '24px',
        background: `linear-gradient(148deg, transparent 55%, ${stat.color}10 55%)`,
        opacity: hovered ? 1 : 0.6,
        transition: 'opacity 0.4s ease',
      }} />

      {/* Top-left accent glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: '24px',
        background: `linear-gradient(148deg, ${stat.color}08 0%, transparent 38%)`,
      }} />

      {/* Top bar — slides in on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${stat.color}, ${stat.color}AA 70%, transparent 100%)`,
        transformOrigin: 'left',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
        borderRadius: '24px 24px 0 0',
      }} />

      {/* Watermark number */}
      <div style={{
        position: 'absolute', bottom: '-6px', right: '10px',
        fontSize: '76px', fontWeight: 900, color: stat.color,
        opacity: 0.055, lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
        letterSpacing: '-3px',
      }}>
        {stat.val}{stat.suffix}
      </div>

      {/* Icon */}
      <div style={{ marginBottom: '16px', position: 'relative', display: 'inline-flex' }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '15px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `linear-gradient(148deg, ${stat.color}22, ${stat.color}0C)`,
          border: `1.5px solid ${stat.color}35`,
          boxShadow: hovered ? `0 8px 24px ${stat.color}30` : `0 4px 14px ${stat.color}18`,
          transform: hovered ? 'rotate(-6deg) scale(1.12)' : 'rotate(0) scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
        }}>
          <stat.Icon size={22} style={{ color: stat.color }} strokeWidth={1.7} />
        </div>
      </div>

      {/* Number */}
      <div style={{ marginBottom: '6px' }}>
        <Counter target={stat.val} suffix={stat.suffix} color={stat.color} visible={visible} />
      </div>

      {/* Expanding underline */}
      <div style={{
        height: '2px', borderRadius: '2px', marginBottom: '8px',
        width: hovered ? '48px' : '28px',
        background: `linear-gradient(90deg, ${stat.color}, ${stat.color}30)`,
        transition: 'width 0.35s ease',
      }} />

      {/* Label */}
      <p style={{
        fontSize: '12px', fontWeight: 800, letterSpacing: '0.09em',
        textTransform: 'uppercase', color: '#475569', margin: 0,
      }}>
        {stat.label}
      </p>
    </div>
  );
}

export default function CounterSection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%)'
    }}>

      {/* Premium ambient decorative radial glows */}
      <div className="absolute top-0 left-0 w-[45%] h-full pointer-events-none opacity-40" style={{
        background: 'radial-gradient(circle at 10% 20%, rgba(212,23,74,0.05) 0%, transparent 60%)',
      }} />
      <div className="absolute bottom-0 left-[20%] w-[35%] h-[60%] pointer-events-none opacity-40" style={{
        background: 'radial-gradient(circle at 50% 80%, rgba(59,130,246,0.05) 0%, transparent 65%)',
      }} />

      {/* Image panel — right half only, behind the cards */}
      <div className="absolute inset-y-0 right-0 w-[55%] pointer-events-none" style={{
        backgroundImage: "url('/images/statistics_bg_clarity.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* Modern gradient overlay fading the image left edge seamlessly into the section background */}
      <div className="absolute inset-y-0 right-0 w-[55%] pointer-events-none" style={{
        background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(248,250,252,0.85) 15%, rgba(248,250,252,0.3) 50%, transparent 100%)',
        zIndex: 1,
      }} />

      {/* Top and bottom gradient blend to match the section's background gradient */}
      <div className="absolute inset-y-0 right-0 w-[55%] pointer-events-none" style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, transparent 15%, transparent 85%, #F1F5F9 100%)',
        zIndex: 1,
      }} />

      {/* Modern subtle Slate/Blue scrim overlay to enhance readability and visual depth */}
      <div className="absolute inset-y-0 right-0 w-[55%] pointer-events-none" style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(30,41,59,0.06) 40%, rgba(30,41,59,0.12) 100%)',
        zIndex: 1,
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text + certs */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4174A] uppercase tracking-widest bg-[#D4174A]/8 border border-[#D4174A]/15 px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4174A]" />
              Our Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Numbers That<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #BE123C 0%, #D4174A 40%, #E11D48 100%)' }}>
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
                  className="rounded-xl px-3 py-2 flex items-center transition-all duration-200 hover:scale-105 hover:shadow-md"
                  style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(0,0,0,0.07)', backdropFilter: 'blur(8px)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                  <Image src={c.src} alt={c.alt} width={80} height={30} style={{ objectFit: 'contain', height: '28px', width: 'auto' }} />
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
