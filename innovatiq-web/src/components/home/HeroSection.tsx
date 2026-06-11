'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Zap, Trophy, Users, GraduationCap, Rocket, Shield, Globe } from 'lucide-react';
import TiltCard from '@/components/TiltCard';

const words: React.ReactNode[] = [
  <>Digital<br />Transformation</>,
  <>Cyber<br />Security</>,
  <>Cloud<br />Innovation</>,
  <>Managed IT<br />Services</>,
];

const STATS = [
  { v: '100+', l: 'Successful Projects', c: '#BE123C', bg: '#FFF1F2', icon: Trophy },
  { v: '200+', l: 'Happy Clients',       c: '#BE123C', bg: '#FFF1F2', icon: Users },
  { v: '100+', l: 'Skilled Experts',     c: '#BE123C', bg: '#FFF1F2', icon: GraduationCap },
  { v: '15+',  l: 'Ongoing Projects',    c: '#BE123C', bg: '#FFF1F2', icon: Rocket },
];

function CardDecor({ index, c }: { index: number; c: string }) {
  /* shared helpers */
  const blob = (cls: string, extra?: React.CSSProperties) => (
    <div className={`absolute rounded-full pointer-events-none transition-all duration-700 ${cls}`} style={extra} />
  );
  const dot = (cls: string, size: string, extra?: React.CSSProperties) => (
    <div className={`absolute rounded-full pointer-events-none transition-all duration-300 ${cls}`}
      style={{ width: size, height: size, ...extra }} />
  );
  const ring = (cls: string, size: string, border: string, extra?: React.CSSProperties) => (
    <div className={`absolute rounded-full pointer-events-none transition-all duration-500 ${cls}`}
      style={{ width: size, height: size, border, ...extra }} />
  );
  const cross = (cls: string, x: number, y: number) => (
    <svg className={`absolute pointer-events-none transition-opacity duration-400 ${cls}`}
      style={{ left: x, top: y }} width="12" height="12">
      <line x1="6" y1="0" x2="6" y2="12" stroke={c} strokeWidth="1.5" />
      <line x1="0" y1="6" x2="12" y2="6" stroke={c} strokeWidth="1.5" />
    </svg>
  );
  const hex = (cls: string, x: number, y: number, size = 16) => (
    <svg className={`absolute pointer-events-none transition-opacity duration-500 ${cls}`}
      style={{ left: x, top: y }} width={size} height={size}>
      <polygon points={`${size/2},1 ${size-2},${size/4} ${size-2},${size*3/4} ${size/2},${size-1} 2,${size*3/4} 2,${size/4}`}
        fill="none" stroke={c} strokeWidth="1.5" />
    </svg>
  );
  const square = (cls: string, x: number, y: number, deg: number) => (
    <div className={`absolute pointer-events-none transition-opacity duration-400 ${cls}`}
      style={{ left: x, top: y, width: 12, height: 12, border: `1.5px solid ${c}`, borderRadius: 3, transform: `rotate(${deg}deg)` }} />
  );

  if (index === 0) return (
    <>
      {blob('-top-10 -right-6 w-48 h-48 opacity-70 group-hover:opacity-100 group-hover:scale-[1.5]',
        { background: `radial-gradient(circle,${c}30 0%,${c}10 50%,transparent 70%)`, filter:'blur(18px)' })}
      {blob('-bottom-6 -left-4 w-32 h-32 opacity-50 group-hover:opacity-90 group-hover:scale-125',
        { background: `radial-gradient(circle,${c}22 0%,transparent 70%)`, filter:'blur(12px)' })}
      {ring('-bottom-12 -left-12 float opacity-55 group-hover:opacity-90', '140px', `1.5px solid ${c}45`)}
      {ring('-top-4 right-6 float-d opacity-60 group-hover:opacity-100', '80px', `1.5px dashed ${c}50`)}
      {ring('top-[40%] -left-4 float opacity-45 group-hover:opacity-80', '44px', `1.5px solid ${c}40`)}
      {dot('top-4 left-6 float opacity-80 group-hover:opacity-100', '8px',
        { background: c, boxShadow: `0 0 10px ${c}80` })}
      {dot('bottom-5 right-8 float-d opacity-60 group-hover:opacity-90', '6px', { background: c })}
      {dot('top-7 right-14 float opacity-50 group-hover:opacity-80', '4px', { background: c })}
      {square('top-5 right-7 float opacity-55 group-hover:opacity-90', 0, 0, 45)}
      {cross('opacity-50 group-hover:opacity-90 float-d', 20, 0)}
      {hex('opacity-45 group-hover:opacity-80 float', 0, 0)}
    </>
  );
  if (index === 1) return (
    <>
      {blob('-top-8 -left-10 w-48 h-48 opacity-70 group-hover:opacity-100 group-hover:scale-[1.5]',
        { background: `radial-gradient(circle,${c}30 0%,${c}10 50%,transparent 70%)`, filter:'blur(18px)' })}
      {blob('-bottom-4 -right-6 w-36 h-36 opacity-50 group-hover:opacity-90 group-hover:scale-125',
        { background: `radial-gradient(circle,${c}22 0%,transparent 70%)`, filter:'blur(12px)' })}
      {ring('-top-14 -left-14 float opacity-55 group-hover:opacity-90', '150px', `1.5px dashed ${c}45`)}
      {ring('-bottom-2 -right-3 float-d opacity-60 group-hover:opacity-100', '80px', `1.5px solid ${c}50`)}
      {ring('bottom-[30%] -right-4 float-d opacity-45 group-hover:opacity-80', '42px', `1.5px dashed ${c}40`)}
      {dot('top-5 right-5 float-d opacity-80 group-hover:opacity-100', '8px',
        { background: c, boxShadow: `0 0 10px ${c}80` })}
      {dot('bottom-6 left-8 float opacity-60 group-hover:opacity-90', '6px', { background: c })}
      {dot('bottom-10 right-16 float-d opacity-50 group-hover:opacity-80', '4px', { background: c })}
      {square('bottom-6 left-7 float-d opacity-55 group-hover:opacity-90', 0, 0, 30)}
      {cross('opacity-50 group-hover:opacity-90 float', 0, 20)}
      {hex('opacity-45 group-hover:opacity-80 float-d', 0, 0)}
    </>
  );
  if (index === 2) return (
    <>
      {blob('-top-6 -right-10 w-44 h-44 opacity-70 group-hover:opacity-100 group-hover:scale-[1.5]',
        { background: `radial-gradient(circle,${c}30 0%,${c}10 50%,transparent 70%)`, filter:'blur(18px)' })}
      {blob('-top-2 -left-6 w-32 h-32 opacity-50 group-hover:opacity-90 group-hover:scale-125',
        { background: `radial-gradient(circle,${c}20 0%,transparent 70%)`, filter:'blur(12px)' })}
      {ring('-top-14 -right-14 float-d opacity-55 group-hover:opacity-90', '150px', `1.5px solid ${c}45`)}
      {ring('-bottom-3 left-10 float opacity-60 group-hover:opacity-100', '64px', `1.5px dashed ${c}50`)}
      {ring('bottom-[32%] -right-3 float-d opacity-45 group-hover:opacity-80', '42px', `1.5px solid ${c}40`)}
      {dot('bottom-5 right-5 float opacity-80 group-hover:opacity-100', '8px',
        { background: c, boxShadow: `0 0 10px ${c}80` })}
      {dot('top-5 left-8 float-d opacity-60 group-hover:opacity-90', '6px', { background: c })}
      {dot('bottom-9 left-14 float opacity-50 group-hover:opacity-80', '4px', { background: c })}
      {square('top-5 left-7 float-d opacity-55 group-hover:opacity-90', 0, 0, 20)}
      {cross('opacity-50 group-hover:opacity-90 float', 0, 0)}
      {hex('opacity-45 group-hover:opacity-80 float-d', 0, 20)}
    </>
  );
  return (
    <>
      {blob('-bottom-10 -right-8 w-48 h-48 opacity-70 group-hover:opacity-100 group-hover:scale-[1.5]',
        { background: `radial-gradient(circle,${c}30 0%,${c}10 50%,transparent 70%)`, filter:'blur(18px)' })}
      {blob('-top-4 -left-4 w-32 h-32 opacity-50 group-hover:opacity-90 group-hover:scale-125',
        { background: `radial-gradient(circle,${c}22 0%,transparent 70%)`, filter:'blur(12px)' })}
      {ring('-top-12 right-8 float opacity-55 group-hover:opacity-90', '140px', `1.5px dashed ${c}45`)}
      {ring('-bottom-12 -left-12 float-d opacity-60 group-hover:opacity-100', '140px', `1.5px solid ${c}50`)}
      {ring('top-[26%] -right-3 float opacity-45 group-hover:opacity-80', '42px', `1.5px dashed ${c}40`)}
      {dot('top-4 right-5 float-d opacity-80 group-hover:opacity-100', '8px',
        { background: c, boxShadow: `0 0 10px ${c}80` })}
      {dot('bottom-5 left-6 float opacity-60 group-hover:opacity-90', '6px', { background: c })}
      {dot('top-8 left-14 float-d opacity-50 group-hover:opacity-80', '4px', { background: c })}
      {square('bottom-5 right-6 float opacity-55 group-hover:opacity-90', 0, 0, 60)}
      {cross('opacity-50 group-hover:opacity-90 float-d', 20, 20)}
      {hex('opacity-45 group-hover:opacity-80 float', 0, 0)}
    </>
  );
}

function StatCard({
  v, l, c, icon: Icon, index, total,
}: {
  v: string; l: string; c: string; bg: string; icon: React.ElementType; index: number; total: number;
}) {
  const num = parseInt(v);
  const suffix = v.slice(String(num).length);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const animated = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || animated.current) return;
    animated.current = true;
    const countEl = countRef.current;
    if (!countEl) return;
    const timer = setTimeout(() => {
      const start = performance.now();
      function step(now: number) {
        const p = Math.min((now - start) / 1800, 1);
        // Write directly to DOM — no React setState in the RAF loop
        if (countEl) countEl.textContent = `${Math.round((1 - Math.pow(1 - p, 3)) * num)}${suffix}`;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, index * 150);
    return () => clearTimeout(timer);
  }, [visible, num, suffix, index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex-1 cursor-default${visible ? ' stat-card-pop' : ' opacity-0'}`}
      style={{ animationDelay: visible ? `${index * 140}ms` : undefined }}
    >
      {/* ── Parallelogram card background (skewed) ── */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: 'skewX(-9deg)',
        transformOrigin: 'bottom center',
        background: hovered
          ? 'linear-gradient(to bottom, #FFF1F2 0%, #FAFAFA 100%) padding-box, linear-gradient(to right, #BE123C 0%, #BE123C 22%, rgba(190,18,60,0.75) 48%, rgba(190,18,60,0.28) 72%, transparent 92%) border-box'
          : 'linear-gradient(to bottom, #FFF1F2 0%, #FFFFFF 100%) padding-box, linear-gradient(to right, #BE123C 0%, #BE123C 22%, rgba(190,18,60,0.75) 48%, rgba(190,18,60,0.28) 72%, transparent 92%) border-box',
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderTopWidth: '4px',
        borderLeftWidth: '1px',
        borderRightWidth: '1px',
        borderBottomWidth: '1px',
        borderRadius: '16px',
        boxShadow: hovered
          ? '0 20px 48px rgba(190,18,60,0.15), 0 6px 20px rgba(0,0,0,0.07)'
          : '0 2px 14px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        transition: 'box-shadow 0.35s ease, background 0.35s ease',
      }}>
        {/* Hover glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at top center, rgba(190,18,60,0.08) 0%, transparent 65%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }} />
      </div>

      {/* ── Content — sits in the un-skewed outer wrapper, reads perfectly straight ── */}
      <div className="relative flex flex-col items-center justify-center py-6 px-3 sm:py-10 sm:px-5"
        style={{ zIndex: 1 }}>

        {/* Icon */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '15px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(190,18,60,0.10)',
            border: '1.5px solid rgba(190,18,60,0.22)',
            boxShadow: hovered ? '0 8px 24px rgba(190,18,60,0.25)' : '0 2px 8px rgba(190,18,60,0.12)',
            transform: hovered ? 'rotate(-5deg) scale(1.1)' : 'rotate(0deg) scale(1)',
            transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
          }}>
            <Icon size={22} style={{ color: '#BE123C' }} strokeWidth={1.7} />
          </div>
        </div>

        {/* Number */}
        <p ref={countRef} className="text-[32px] sm:text-[46px]" style={{
          fontWeight: 900, lineHeight: 1, marginBottom: '6px',
          letterSpacing: '-1px', fontVariantNumeric: 'tabular-nums',
          backgroundImage: 'linear-gradient(135deg, #BE123C 0%, rgba(190,18,60,0.80) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 2px 6px rgba(190,18,60,0.25))',
        }}>0{suffix}</p>

        {/* Expanding underline */}
        <div style={{
          height: '2px', borderRadius: '2px', marginBottom: '8px',
          width: hovered ? '44px' : '24px',
          background: 'linear-gradient(90deg, #BE123C, rgba(190,18,60,0.25))',
          transition: 'width 0.35s ease',
        }} />

        {/* Label */}
        <p style={{
          fontSize: '12px', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.07em', color: '#334155', margin: 0, textAlign: 'center',
        }}>{l}</p>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [wi, setWi] = useState(0);
  const [vis, setVis] = useState(true);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        if (rightColRef.current)
          rightColRef.current.style.transform = `translateY(${window.scrollY * -0.10}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setVis(false);
      setTimeout(() => { setWi(i => (i + 1) % words.length); setVis(true); }, 350);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative overflow-hidden min-h-screen pt-[104px] sm:pt-[108px] pb-16 sm:pb-20 flex items-start lg:items-center"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFCFD 30%, #FFF7F8 60%, #FFFCFD 100%)',
      }}
    >

      {/* ── Aurora blob 1 — Rose/Pink — TOP-LEFT (keeps right side clean) ── */}
      <div className="absolute rounded-full pointer-events-none blob-drift"
        style={{
          width: '900px', height: '900px',
          top: '-200px', left: '-180px',
          background: 'radial-gradient(circle at 55% 55%, rgba(190,18,60,0.12) 0%, rgba(225,29,72,0.06) 45%, transparent 70%)',
          filter: 'blur(90px)',
          contain: 'strict',
        }} />


      {/* ── Grid line overlay (tech depth, masked at edges) ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(190,18,60,0.05) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(190,18,60,0.05) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)',
        }} />


      {/* ── Geometric decorations — hidden on mobile so they don't overlap text ── */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden">
        <div className="spin-s absolute"
          style={{ top: '8%', left: '1.5%', width: '160px', height: '160px', border: '1.5px solid rgba(190,18,60,0.15)', borderRadius: '20px', transform: 'rotate(12deg)' }} />
        <div className="absolute"
          style={{ bottom: '14%', right: '2.5%', width: '90px', height: '90px', border: '1.5px solid rgba(100,116,139,0.14)', borderRadius: '18px', transform: 'rotate(25deg)', animation: 'spin-slow 22s linear infinite reverse' }} />
        <div className="float-d absolute"
          style={{ top: '14%', right: '7%', width: '56px', height: '56px', background: 'rgba(100,116,139,0.04)', border: '1px solid rgba(100,116,139,0.14)', transform: 'rotate(45deg)', borderRadius: '8px' }} />
        <div className="float absolute rounded-full"
          style={{ top: '5%', left: '35%', width: '72px', height: '72px', background: 'rgba(100,116,139,0.04)', border: '1px solid rgba(100,116,139,0.13)' }} />
        <div className="float-d absolute"
          style={{ top: '42%', left: '7%', width: '32px', height: '32px', border: '1px solid rgba(100,116,139,0.18)', borderRadius: '6px', transform: 'rotate(30deg)' }} />
        <div className="float absolute"
          style={{ top: '65%', left: '43%', width: '28px', height: '28px', border: '1px solid rgba(100,116,139,0.18)', borderRadius: '5px', transform: 'rotate(20deg)' }} />

        <svg className="float absolute" style={{ top: '36%', left: '4.5%' }} width="38" height="38">
          <polygon points="19,2 34,11 34,28 19,36 4,28 4,11" fill="none" stroke="rgba(190,18,60,0.22)" strokeWidth="1.5" />
        </svg>
        <svg className="float absolute" style={{ top: '13%', right: '17%' }} width="46" height="46">
          <polygon points="23,2 42,12 42,33 23,44 4,33 4,12" fill="none" stroke="rgba(100,116,139,0.14)" strokeWidth="1.5" />
        </svg>
        <svg className="float-d absolute" style={{ top: '57%', right: '4.5%' }} width="34" height="34">
          <polygon points="17,2 31,10 31,24 17,32 3,24 3,10" fill="none" stroke="rgba(100,116,139,0.15)" strokeWidth="1.5" />
        </svg>

        <div className="float absolute rounded-full"
          style={{ top: '52%', left: '7%', width: '10px', height: '10px', background: 'rgba(190,18,60,0.22)' }} />
        <div className="float-d absolute rounded-full"
          style={{ top: '9%', right: '34%', width: '8px', height: '8px', background: 'rgba(100,116,139,0.20)' }} />
        <div className="float absolute rounded-full"
          style={{ top: '80%', left: '50%', width: '9px', height: '9px', background: 'rgba(100,116,139,0.18)' }} />
      </div>

      {/* ══ Main content ══ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 sm:pt-12 sm:pb-10 lg:pt-16 lg:pb-12">
        <div className="grid lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_560px] gap-10 xl:gap-20 items-center">

          {/* ── LEFT ── */}
          <div className="max-w-2xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-7"
              style={{ background: '#FFFFFF', border: '1.5px solid rgba(190,18,60,0.40)', boxShadow: '0 2px 12px rgba(190,18,60,0.14)' }}>
              <Zap size={13} style={{ color: '#BE123C' }} fill="currentColor" />
              <span className="text-[12.5px] font-bold uppercase tracking-widest" style={{ color: '#E11D48' }}>
                Trusted by 200+ Enterprises Worldwide
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-[58px] xl:text-[64px] font-extrabold leading-[1.08] mb-6 tracking-tight"
              style={{ color: '#0F172A' }}>
              Transforming<br />Business Through
              <span
                className="block mt-2 bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #9F1239 0%, #BE123C 35%, #E11D48 65%, #F43F5E 100%)',
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  minHeight: '2.5em',
                  display: 'block',
                  lineHeight: '1.18',
                }}>
                {words[wi]}
              </span>
            </h1>

            <p className="text-[16px] leading-[1.75] mb-8 max-w-lg font-medium"
              style={{ color: '#1a1a1a', letterSpacing: '0.01em' }}>
              Looking to create a digital product that makes an impact? Transform your ideas into
              intelligent, AI-driven digital experiences — from concept to launch. Our expert team
              helps you design, develop, and scale solutions that engage your audience and
              accelerate business growth.
            </p>

            {/* Trust checks */}
            <div className="space-y-3 mb-10">
              {[
                { text: 'ISO 9001:2015 Certified Quality Management', icon: Shield },
                { text: 'Offices in Singapore, India & Malaysia',     icon: Globe },
                { text: '24/7 Managed Support with SLA Guarantee',    icon: CheckCircle2 },
              ].map(({ text, icon: Icon }) => (
                <div key={text} className="flex items-center gap-3 group/check">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover/check:scale-110"
                    style={{ background: 'rgba(190,18,60,0.10)', border: '1px solid rgba(190,18,60,0.20)' }}>
                    <Icon size={13} className="text-[#BE123C]" />
                  </div>
                  <span className="text-[14px] font-medium transition-colors duration-300 group-hover/check:text-slate-800"
                    style={{ color: '#1a1a1a' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/contact"
                className="flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)' }}>
                Get Free Demo <ArrowRight size={16} />
              </Link>
              <Link href="/services/cloud"
                className="flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-gray-700 rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1.5px solid rgba(0,0,0,0.28)', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}>
                Explore Services
              </Link>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div ref={rightColRef} className="hidden lg:block relative">
            <TiltCard intensity={15} className="relative">

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[530px] h-[530px] rounded-full pulse-glow"
                  style={{ background: 'radial-gradient(circle, rgba(190,18,60,0.07) 30%, transparent 70%)', border: '1px solid rgba(190,18,60,0.14)' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[495px] h-[495px] rounded-full border border-dashed border-[#BE123C]/20 spin-s" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[425px] h-[425px] rounded-full border border-dashed border-slate-200"
                  style={{ animation: 'spin-slow 14s linear infinite reverse' }} />
              </div>

              <div className="relative w-[460px] h-[460px] mx-auto">
                {/* Main image — NO dark overlay */}
                <div className="absolute inset-8 rounded-full overflow-hidden border-2"
                  style={{
                    borderColor: 'rgba(190,18,60,0.15)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.13), 0 0 0 6px rgba(190,18,60,0.05)',
                  }}>
                  <Image
                    src="/images/executives-paying-attention-digital-tablet 1.jpg"
                    alt="Innovatiq team" fill className="object-cover" priority />
                </div>

                {/* Floating card — ISO */}
                <div className="absolute -top-2 right-2 float-d">
                  <div className="rounded-2xl px-4 py-3 flex items-center gap-3"
                    style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(190,18,60,0.12)', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(190,18,60,0.08)', border: '1px solid rgba(190,18,60,0.18)' }}>
                      <Trophy size={18} className="text-[#BE123C]" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900">ISO Certified</p>
                      <p className="text-[11px] font-semibold text-gray-500">9001:2015</p>
                    </div>
                  </div>
                </div>

                {/* Floating card — Asia Pacific */}
                <div className="absolute -bottom-2 -left-8 float">
                  <div className="rounded-2xl px-4 py-3 flex items-center gap-3"
                    style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.09)' }}>
                      <Globe size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900">Asia Pacific</p>
                      <p className="text-[11px] font-semibold text-gray-500">SG · IN · MY</p>
                    </div>
                  </div>
                </div>

                {/* Floating stat card */}
                <div className="absolute top-1/2 -right-10 -translate-y-1/2 float-d" style={{ animationDelay: '1s' }}>
                  <div className="rounded-2xl px-5 py-4 text-white text-center"
                    style={{
                      background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)',
                      boxShadow: '0 8px 40px rgba(190,18,60,0.40)',
                    }}>
                    <p className="text-[32px] font-black">200+</p>
                    <p className="text-[11px] font-bold opacity-90 mt-0.5">Happy Clients</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* ── Stats bar — 2×2 on mobile, 4-across on lg+ ── */}
        <div className="mt-10 sm:mt-14">
          <div className="grid grid-cols-2 lg:flex lg:items-stretch gap-3 sm:gap-4">
            {STATS.map((s, i) => (
              <StatCard key={s.l} v={s.v} l={s.l} c={s.c} bg={s.bg} icon={s.icon} index={i} total={STATS.length} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
