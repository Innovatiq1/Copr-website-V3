'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ChevronDown, Zap } from 'lucide-react';
import TiltCard from '@/components/TiltCard';

const words = ['Digital Transformation', 'Cloud Innovation', 'Cyber Security', 'Managed IT Services'];

export default function HeroSection() {
  const [wi, setWi] = useState(0);
  const [vis, setVis] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function apply() {
      const sy = scrollYRef.current;
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;
      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${mx * 35}px, ${sy * 0.18 + my * 22}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${mx * -25}px, ${sy * -0.12 + my * -16}px)`;
      if (orb3Ref.current) orb3Ref.current.style.transform = `translate(${mx * 18}px, ${sy * 0.10 + my * 10}px)`;
      if (rightColRef.current) rightColRef.current.style.transform = `translateY(${sy * -0.14}px)`;
    }

    function onScroll() {
      scrollYRef.current = window.scrollY;
      apply();
    }

    const sectionEl = sectionRef.current;
    function onMouse(e: MouseEvent) {
      if (!sectionEl) return;
      const { left, top, width, height } = sectionEl.getBoundingClientRect();
      mousePosRef.current = {
        x: ((e.clientX - left) / width - 0.5) * 2,
        y: ((e.clientY - top) / height - 0.5) * 2,
      };
      apply();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    sectionEl?.addEventListener('mousemove', onMouse);
    return () => {
      window.removeEventListener('scroll', onScroll);
      sectionEl?.removeEventListener('mousemove', onMouse);
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
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden flex items-center pt-[108px]"
      style={{ background: 'linear-gradient(160deg, #070D1E 0%, #0D1F3C 50%, #0A1228 100%)' }}>

      {/* Ambient orbs — combined scroll + mouse parallax */}
      <div ref={orb1Ref} className="absolute top-0 right-0 w-[900px] h-[900px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(212,23,74,0.32) 0%, rgba(212,23,74,0.22) 40%, transparent 65%)' }} />
      <div ref={orb2Ref} className="absolute bottom-0 left-0 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(59,130,246,0.22) 0%, transparent 65%)' }} />
      <div ref={orb3Ref} className="absolute pointer-events-none"
        style={{ top: '50%', left: '50%', marginTop: '-200px', marginLeft: '-300px', width: '600px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.14) 0%, transparent 65%)' }} />

      {/* Diagonal gradient stripe */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(212,23,74,0.04) 50%, transparent 60%)' }} />

      {/* Floating geometric decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large spinning wireframe square — top left */}
        <div className="spin-s absolute"
          style={{ top: '10%', left: '2%', width: '140px', height: '140px',
            border: '1px solid rgba(212,23,74,0.28)', borderRadius: '18px', transform: 'rotate(15deg)' }} />
        {/* Large spinning wireframe circle — bottom right */}
        <div className="absolute"
          style={{ bottom: '18%', right: '3%', width: '120px', height: '120px',
            border: '1px dashed rgba(59,130,246,0.32)', borderRadius: '50%',
            animation: 'spin-slow 22s linear infinite reverse' }} />
        {/* Medium floating diamond — left */}
        <div className="float absolute"
          style={{ top: '52%', left: '1.5%', width: '60px', height: '60px',
            background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.45)',
            transform: 'rotate(45deg)' }} />
        {/* Medium floating diamond — right */}
        <div className="float-d absolute"
          style={{ top: '16%', right: '7%', width: '52px', height: '52px',
            background: 'rgba(212,23,74,0.10)', border: '1px solid rgba(212,23,74,0.45)',
            transform: 'rotate(45deg)' }} />
        {/* Large floating circle — top center */}
        <div className="float absolute rounded-full"
          style={{ top: '6%', left: '36%', width: '68px', height: '68px',
            background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.35)' }} />
        {/* Small wireframe square — mid left */}
        <div className="float-d absolute"
          style={{ top: '22%', left: '20%', width: '28px', height: '28px',
            border: '1px solid rgba(16,185,129,0.45)', borderRadius: '4px', transform: 'rotate(30deg)' }} />
        {/* Small wireframe square — lower center */}
        <div className="float absolute"
          style={{ top: '62%', left: '44%', width: '32px', height: '32px',
            border: '1px solid rgba(245,158,11,0.4)', borderRadius: '4px', transform: 'rotate(20deg)' }} />
        {/* Glowing dots */}
        <div className="float absolute rounded-full"
          style={{ top: '40%', left: '8%', width: '14px', height: '14px',
            background: '#D4174A', boxShadow: '0 0 14px rgba(212,23,74,0.9)' }} />
        <div className="float-d absolute rounded-full"
          style={{ top: '70%', right: '11%', width: '12px', height: '12px',
            background: '#F59E0B', boxShadow: '0 0 12px rgba(245,158,11,0.9)' }} />
        <div className="float absolute rounded-full"
          style={{ top: '83%', left: '26%', width: '10px', height: '10px',
            background: '#3B82F6', boxShadow: '0 0 12px rgba(59,130,246,0.9)' }} />
        <div className="float-d absolute rounded-full"
          style={{ top: '28%', right: '40%', width: '8px', height: '8px',
            background: '#10B981', boxShadow: '0 0 10px rgba(16,185,129,0.9)' }} />
        <div className="float absolute rounded-full"
          style={{ top: '75%', left: '46%', width: '7px', height: '7px',
            background: '#8B5CF6', boxShadow: '0 0 10px rgba(139,92,246,0.9)' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_560px] gap-14 xl:gap-20 items-center">

          {/* ── LEFT ── */}
          <div className="max-w-2xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.25)',
              }}>
              <Zap size={12} className="text-yellow-400" fill="currentColor" />
              <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">
                Trusted by 200+ Enterprises Worldwide
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] font-bold text-white leading-[1.1] mb-6">
              Transforming<br />Business Through
              <span
                className="block mt-2 bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent"
                style={{
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  minHeight: '1.1em',
                }}>
                {words[wi]}
              </span>
            </h1>

            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
              Innovatiq delivers end-to-end IT solutions, cloud infrastructure, and digital
              innovation to help enterprises across Asia Pacific scale and compete globally.
            </p>

            {/* Trust checks */}
            <div className="space-y-3 mb-10">
              {[
                'ISO 9001:2015 Certified Quality Management',
                'Offices in Singapore, India & Malaysia',
                '24/7 Managed Support with SLA Guarantee',
              ].map(t => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,23,74,0.15)' }}>
                    <CheckCircle2 size={13} className="text-[#D4174A]" />
                  </div>
                  <span className="text-gray-300 text-sm">{t}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/contact"
                className="flex items-center gap-2 px-8 py-4 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #D4174A, #A8102E)',
                  boxShadow: '0 8px 32px rgba(212,23,74,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}>
                Get Free Demo <ArrowRight size={18} />
              </Link>
              <Link href="/services/cloud"
                className="flex items-center gap-2 px-8 py-4 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(8px)',
                }}>
                Explore Services
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}>
              {[
                { v: '100+', l: 'Projects Delivered', c: '#D4174A' },
                { v: '200+', l: 'Happy Clients', c: '#F59E0B' },
                { v: '15+', l: 'Years Experience', c: '#3B82F6' },
                { v: '3', l: 'Countries', c: '#10B981' },
              ].map(s => (
                <div key={s.l}>
                  <p className="text-2xl font-bold" style={{ color: s.c, textShadow: '0 0 20px currentColor' }}>{s.v}</p>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — scroll parallax outer, mouse tilt inner ── */}
          <div ref={rightColRef} className="hidden lg:block relative">
            <TiltCard intensity={15} className="relative">

              {/* Outer glow ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[520px] h-[520px] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(212,23,74,0.18) 30%, transparent 70%)',
                    border: '1px solid rgba(212,23,74,0.25)',
                  }} />
              </div>

              {/* Spinning dashed ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[490px] h-[490px] rounded-full border border-dashed border-[#D4174A]/30 spin-s" />
              </div>

              {/* Inner spinning ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[420px] h-[420px] rounded-full border border-dashed border-white/10"
                  style={{ animation: 'spin-slow 12s linear infinite reverse' }} />
              </div>

              {/* Main image */}
              <div className="relative w-[460px] h-[460px] mx-auto">
                <div className="absolute inset-8 rounded-full overflow-hidden border-2 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <Image
                    src="/images/executives-paying-attention-digital-tablet 1.jpg"
                    alt="Innovatiq team" fill
                    className="object-cover brightness-90"
                    priority />
                  <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(circle at 70% 20%, rgba(212,23,74,0.35) 0%, transparent 60%)' }} />
                </div>

                {/* Floating card 1 — ISO */}
                <div className="absolute -top-2 right-2 float-d">
                  <div className="rounded-2xl px-4 py-3 flex items-center gap-3"
                    style={{
                      background: 'rgba(10,18,40,0.90)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    }}>
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🏆</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">ISO Certified</p>
                      <p className="text-[10px] text-gray-400">9001:2015</p>
                    </div>
                  </div>
                </div>

                {/* Floating card 2 — Asia Pacific */}
                <div className="absolute -bottom-2 -left-8 float">
                  <div className="rounded-2xl px-4 py-3 flex items-center gap-3"
                    style={{
                      background: 'rgba(10,18,40,0.90)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(245,158,11,0.15)' }}>
                      <span className="text-lg">🌏</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Asia Pacific</p>
                      <p className="text-[10px] text-gray-400">SG · IN · MY</p>
                    </div>
                  </div>
                </div>

                {/* Floating card 3 — stat */}
                <div className="absolute top-1/2 -right-10 -translate-y-1/2 float-d" style={{ animationDelay: '1s' }}>
                  <div className="rounded-2xl px-5 py-4 text-white text-center"
                    style={{
                      background: 'linear-gradient(135deg, #D4174A, #A8102E)',
                      boxShadow: '0 8px 32px rgba(212,23,74,0.5)',
                    }}>
                    <p className="text-3xl font-black">200+</p>
                    <p className="text-[10px] font-medium opacity-80 mt-0.5">Happy Clients</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #070D1C)' }} />

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-600">
        <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
