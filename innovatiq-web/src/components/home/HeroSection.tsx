'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Zap, Trophy, Users, GraduationCap, Sparkles, Shield, Handshake, Cloud } from 'lucide-react';

const words: string[] = [
  'DIGITAL TRANSFORMATION',
  'CYBERSECURITY & THREAT PROTECTION',
  'CLOUD INFRASTRUCTURE & MIGRATION',
  'MANAGED IT SUPPORT & OPERATIONS',
];

const STATS = [
  { v: '150+', l: 'Clients',        c: '#BE123C', bg: '#FFF1F2', icon: Users },
  { v: '200+', l: 'Projects',       c: '#BE123C', bg: '#FFF1F2', icon: Trophy },
  { v: '500+', l: 'Experts',        c: '#BE123C', bg: '#FFF1F2', icon: GraduationCap },
  { v: '25+',  l: 'AI Use Cases',   c: '#BE123C', bg: '#FFF1F2', icon: Sparkles },
];


function StatCard({
  v, l, icon: Icon, index, isDesktop,
}: {
  v: string; l: string; c: string; bg: string; icon: React.ElementType; index: number; total: number; isPhone?: boolean; isDesktop?: boolean;
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
      {/* ── Parallelogram card background (skewed on desktop only) ── */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: isDesktop ? 'skewX(-9deg)' : 'none',
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

      {/* ── Content ── */}
      <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '24px 12px',
        }}>

        {/* Icon */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(190,18,60,0.10)',
            border: '1.5px solid rgba(190,18,60,0.22)',
            boxShadow: hovered ? '0 8px 24px rgba(190,18,60,0.25)' : '0 2px 8px rgba(190,18,60,0.12)',
            transform: hovered ? 'rotate(-5deg) scale(1.1)' : 'rotate(0deg) scale(1)',
            transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
          }}>
            <Icon size={20} style={{ color: '#BE123C' }} strokeWidth={1.7} />
          </div>
        </div>

        {/* Number */}
        <p ref={countRef} style={{
          fontSize: '32px',
          fontWeight: 900, lineHeight: 1, marginBottom: '4px',
          letterSpacing: '-1px', fontVariantNumeric: 'tabular-nums',
          backgroundImage: 'linear-gradient(135deg, #BE123C 0%, rgba(190,18,60,0.80) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 2px 6px rgba(190,18,60,0.25))',
        }}>0{suffix}</p>

        {/* Underline */}
        <div style={{
          height: '2px', borderRadius: '2px', marginBottom: '6px',
          width: hovered ? '44px' : '24px',
          background: 'linear-gradient(90deg, #BE123C, rgba(190,18,60,0.25))',
          transition: 'width 0.35s ease',
        }} />

        {/* Label */}
        <p style={{
          fontSize: '15px', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.06em', color: '#334155', margin: 0, textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
        }}>
          {l === 'AI Use Cases' ? (
            <>
              <span style={{
                color: '#BE123C',
                fontSize: '20px',
                fontWeight: 900,
                position: 'relative',
                top: '-2px',
              }}>AI</span>
              {' USE CASES'}
            </>
          ) : l}
        </p>
      </div>
    </div>
  );
}

function CategoryCard({ icon: Icon, title, items }: { icon: React.ElementType; title: string; items: string[] }) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl px-4.5 py-4"
      style={{
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(190,18,60,0.10)',
        boxShadow: '0 6px 30px rgba(0,0,0,0.06), 0 2px 8px rgba(190,18,60,0.04)',
        width: '200px',
      }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: 'linear-gradient(135deg, rgba(190,18,60,0.14) 0%, rgba(190,18,60,0.07) 100%)', border: '1.5px solid rgba(190,18,60,0.18)', boxShadow: '0 2px 8px rgba(190,18,60,0.12)' }}>
        <Icon size={19} style={{ color: '#BE123C' }} strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-[12.5px] font-black uppercase tracking-wide leading-tight" style={{ color: '#0F172A' }}>{title}</p>
        {items.map((item: string) => (
          <p key={item} className="text-[12px] font-semibold leading-snug mt-0.5" style={{ color: '#334155' }}>{item}</p>
        ))}
      </div>
    </div>
  );
}


export default function HeroSection() {
  const [wi, setWi] = useState(0);
  const [vis, setVis] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => {
      setIsPhone(window.innerWidth < 640);
      setIsDesktop(window.innerWidth >= 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-10 lg:pt-10 lg:pb-12">
        <div className="grid lg:grid-cols-[1fr_560px] xl:grid-cols-[1fr_620px] gap-10 xl:gap-20 items-center">

          {/* ── LEFT ── */}
          <div className="max-w-2xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full mb-7"
              style={{ background: '#FFFFFF', border: '1.5px solid rgba(190,18,60,0.40)', boxShadow: '0 2px 12px rgba(190,18,60,0.14)' }}>
              <Zap size={12} style={{ color: '#BE123C' }} fill="currentColor" />
              <span className="text-[10.5px] sm:text-[12.5px] font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: '#E11D48' }}>
                Trusted by 200+ Enterprises Worldwide
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[33px] md:text-[37px] lg:text-[42px] font-extrabold leading-[1.14] mb-5 tracking-tight"
              style={{ color: '#0F172A' }}>
              <span className="block">AI-POWERED</span>
              <span
                className="block mt-3 bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #9F1239 0%, #BE123C 35%, #E11D48 65%, #F43F5E 100%)',
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  minHeight: '2.4em',
                  display: 'block',
                  lineHeight: '1.2',
                }}>
                {words[wi]}
              </span>
              <span className="block mt-3">FOR SMARTER GROWTH</span>
            </h1>

            <p className="text-[16.5px] leading-[1.75] mb-6 max-w-lg font-medium"
              style={{ color: '#1A1A1A' }}>
              Transform your business with AI-powered software solutions designed to streamline learning, training, cybersecurity, recruitment, and customer relationship management. Innovatiq helps organisations automate processes, improve productivity, and accelerate growth through intelligent technology.
            </p>

            {/* Feature checklist */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-8">
              {[
                'AI-Powered Learning & Training Platforms',
                'Intelligent Security & Patch Management',
                'AI Recruitment & Talent Acquisition',
                'AI-Powered Sales & CRM Solutions',
                'Scalable Cloud & Managed IT Services',
                '24/7 Expert Support',
              ].map((text) => (
                <div key={text} className="flex items-start gap-2">
                  <CheckCircle2 size={15} style={{ color: '#BE123C', flexShrink: 0, marginTop: '2px' }} strokeWidth={2.5} />
                  <span className="text-[15.5px] font-medium leading-snug" style={{ color: '#1a1a1a' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/products/sales-crm"
                className="flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)' }}>
                Explore Our Products <ArrowRight size={16} />
              </Link>
              <Link href="/services/ai-services"
                className="flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-gray-700 rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1.5px solid rgba(0,0,0,0.28)', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}>
                Explore Our Services
              </Link>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div ref={rightColRef} className="hidden lg:block" style={{ marginTop: '-60px' }}>
            <div className="relative mx-auto" style={{ width: '600px', height: '580px' }}>

              {/* SVG connector lines — behind everything */}
              <svg className="absolute inset-0 pointer-events-none" width="600" height="580" fill="none" style={{ zIndex: 1 }}>
                <defs>
                  <linearGradient id="cl1" x1="300" y1="280" x2="300" y2="55" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#BE123C" stopOpacity="0.35" /><stop offset="100%" stopColor="#BE123C" stopOpacity="0.08" />
                  </linearGradient>
                  <linearGradient id="cl2" x1="300" y1="280" x2="490" y2="195" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#BE123C" stopOpacity="0.35" /><stop offset="100%" stopColor="#BE123C" stopOpacity="0.08" />
                  </linearGradient>
                  <linearGradient id="cl3" x1="300" y1="280" x2="435" y2="448" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#BE123C" stopOpacity="0.35" /><stop offset="100%" stopColor="#BE123C" stopOpacity="0.08" />
                  </linearGradient>
                  <linearGradient id="cl4" x1="300" y1="280" x2="165" y2="448" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#BE123C" stopOpacity="0.35" /><stop offset="100%" stopColor="#BE123C" stopOpacity="0.08" />
                  </linearGradient>
                  <linearGradient id="cl5" x1="300" y1="280" x2="110" y2="195" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#BE123C" stopOpacity="0.35" /><stop offset="100%" stopColor="#BE123C" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
                <line x1="300" y1="280" x2="300" y2="55" stroke="url(#cl1)" strokeWidth="1.5" strokeDasharray="5 3" />
                <line x1="300" y1="280" x2="490" y2="195" stroke="url(#cl2)" strokeWidth="1.5" strokeDasharray="5 3" />
                <line x1="300" y1="280" x2="435" y2="448" stroke="url(#cl3)" strokeWidth="1.5" strokeDasharray="5 3" />
                <line x1="300" y1="280" x2="165" y2="448" stroke="url(#cl4)" strokeWidth="1.5" strokeDasharray="5 3" />
                <line x1="300" y1="280" x2="110" y2="195" stroke="url(#cl5)" strokeWidth="1.5" strokeDasharray="5 3" />
                {/* Endpoint dots */}
                <circle cx="300" cy="55" r="3.5" fill="rgba(190,18,60,0.30)" />
                <circle cx="490" cy="195" r="3.5" fill="rgba(190,18,60,0.30)" />
                <circle cx="435" cy="448" r="3.5" fill="rgba(190,18,60,0.30)" />
                <circle cx="165" cy="448" r="3.5" fill="rgba(190,18,60,0.30)" />
                <circle cx="110" cy="195" r="3.5" fill="rgba(190,18,60,0.30)" />
              </svg>

              {/* Glow rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
                <div className="w-[320px] h-[320px] rounded-full pulse-glow"
                  style={{ background: 'radial-gradient(circle, rgba(190,18,60,0.10) 30%, transparent 70%)', border: '1px solid rgba(190,18,60,0.18)' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
                <div className="w-[380px] h-[380px] rounded-full border border-dashed border-[#BE123C]/18 spin-s" />
              </div>

              {/* Central AI image */}
              <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', zIndex: 3, borderRadius: '50%', overflow: 'hidden' }}>
                <Image src="/images/better_ai_hub_user.png" alt="AI Powered Products"
                  fill style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} priority />
              </div>

              {/* Card 1 — Learning & Training (top center) */}
              <div className="absolute float" style={{ left: '200px', top: '38px', zIndex: 10 }}>
                <CategoryCard icon={GraduationCap} title="Learning & Training" items={['LearnPro LMS', 'SkillEra TMS']} />
              </div>

              {/* Card 2 — Recruitment (top right) */}
              <div className="absolute float-d" style={{ left: '412px', top: '130px', zIndex: 10 }}>
                <CategoryCard icon={Users} title="Recruitment Solutions" items={['HRMS (ATS)', 'AI-Powered Recruitment']} />
              </div>

              {/* Card 3 — Cloud & IT (bottom right) */}
              <div className="absolute float" style={{ left: '335px', top: '445px', zIndex: 10 }}>
                <CategoryCard icon={Cloud} title="Cloud & Managed IT" items={['Scalable & Secure', 'Reliable Solutions']} />
              </div>

              {/* Card 4 — CRM (bottom left) */}
              <div className="absolute float-d" style={{ left: '65px', top: '445px', zIndex: 10 }}>
                <CategoryCard icon={Handshake} title="Customer Relationship" items={['Sales CRM', 'Smarter Relationships']} />
              </div>

              {/* Card 5 — Security Solutions (top left) */}
              <div className="absolute float" style={{ left: '-12px', top: '158px', zIndex: 10 }}>
                <CategoryCard icon={Shield} title="Security Solutions" items={['SecurOn PMS', 'Intelligent Patch Mgmt']} />
              </div>

            </div>
          </div>
        </div>

        {/* ── Stats bar — 1-col phone / 2×2 tablet / 4-across desktop ── */}
        <div className="mt-10 sm:mt-14">
          <div className="grid grid-cols-2 lg:flex lg:items-stretch gap-3 sm:gap-4">
            {STATS.map((s, i) => (
              <StatCard key={s.l} v={s.v} l={s.l} c={s.c} bg={s.bg} icon={s.icon} index={i} total={STATS.length} isPhone={isPhone} isDesktop={isDesktop} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
