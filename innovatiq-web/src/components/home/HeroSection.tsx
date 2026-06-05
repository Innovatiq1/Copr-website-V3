'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import TiltCard from '@/components/TiltCard';

const words: React.ReactNode[] = ['Digital Transformation', <>Cyber<br />Security</>, <>Cloud<br />Innovation</>, 'Managed IT Services'];

export default function HeroSection() {
  const [wi, setWi] = useState(0);
  const [vis, setVis] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    function onScroll() {
      scrollYRef.current = window.scrollY;
      if (rightColRef.current) rightColRef.current.style.transform = `translateY(${window.scrollY * -0.10}px)`;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setVis(false);
      setTimeout(() => { setWi(i => (i + 1) % words.length); setVis(true); }, 350);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-screen pt-[108px] pb-20 flex items-center"
      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fff5f7 40%, #f8fafc 75%, #f0f4ff 100%)' }}>

      {/* Dot grid pattern */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(212,23,74,0.10) 1.2px, transparent 1.2px)',
          backgroundSize: '36px 36px',
        }} />

      {/* Top-right dramatic glow */}
      <div className="absolute -top-20 -right-20 w-[750px] h-[750px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(212,23,74,0.13) 0%, rgba(212,23,74,0.06) 40%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Bottom-left glow */}
      <div ref={orb2Ref} className="absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(212,23,74,0.07) 0%, transparent 65%)', filter: 'blur(30px)' }} />

      {/* Center-mid purple tint */}
      <div ref={orb3Ref} className="absolute pointer-events-none"
        style={{ top: '40%', left: '42%', width: '500px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 65%)', filter: 'blur(20px)' }} />

      {/* Diagonal accent strip */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute"
          style={{
            top: '-10%', right: '-5%',
            width: '55%', height: '130%',
            background: 'linear-gradient(135deg, transparent 0%, rgba(212,23,74,0.025) 40%, rgba(255,140,66,0.02) 100%)',
            transform: 'skewX(-8deg)',
            borderLeft: '1px solid rgba(212,23,74,0.07)',
          }} />
      </div>

      {/* Floating geometric decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="spin-s absolute"
          style={{ top: '10%', left: '2%', width: '140px', height: '140px', border: '1.5px solid rgba(212,23,74,0.16)', borderRadius: '18px', transform: 'rotate(15deg)' }} />
        <div className="absolute"
          style={{ bottom: '18%', right: '3%', width: '80px', height: '80px', border: '1.5px solid rgba(212,23,74,0.14)', borderRadius: '16px', transform: 'rotate(30deg)', animation: 'spin-slow 20s linear infinite' }} />
        <div className="float-d absolute"
          style={{ top: '16%', right: '7%', width: '52px', height: '52px', background: 'rgba(212,23,74,0.05)', border: '1px solid rgba(212,23,74,0.20)', transform: 'rotate(45deg)' }} />
        <div className="float absolute rounded-full"
          style={{ top: '6%', left: '36%', width: '68px', height: '68px', background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.18)' }} />
        <div className="float-d absolute"
          style={{ top: '22%', left: '20%', width: '28px', height: '28px', border: '1px solid rgba(16,185,129,0.24)', borderRadius: '4px', transform: 'rotate(30deg)' }} />
        <div className="float absolute"
          style={{ top: '62%', left: '44%', width: '32px', height: '32px', border: '1px solid rgba(245,158,11,0.24)', borderRadius: '4px', transform: 'rotate(20deg)' }} />

        {/* Hollow hexagons */}
        <svg className="float absolute" style={{ top: '38%', left: '5%' }} width="36" height="36">
          <polygon points="18,2 32,10 32,26 18,34 4,26 4,10" fill="none" stroke="rgba(212,23,74,0.22)" strokeWidth="1.5" />
        </svg>
        <svg className="float-d absolute" style={{ top: '72%', left: '30%' }} width="28" height="28">
          <polygon points="14,2 25,8 25,20 14,26 3,20 3,8" fill="none" stroke="rgba(245,158,11,0.28)" strokeWidth="1.5" />
        </svg>
        <svg className="float absolute" style={{ top: '14%', right: '18%' }} width="44" height="44">
          <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" fill="none" stroke="rgba(139,92,246,0.20)" strokeWidth="1.5" />
        </svg>
        <svg className="float-d absolute" style={{ top: '58%', right: '5%' }} width="32" height="32">
          <polygon points="16,2 29,9 29,23 16,30 3,23 3,9" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="1.5" />
        </svg>

        {/* Plus / cross markers */}
        <div className="float-d absolute" style={{ top: '45%', left: '14%', width: '14px', height: '14px' }}>
          <div style={{ position: 'absolute', top: '6px', left: '0', width: '14px', height: '2px', background: 'rgba(212,23,74,0.30)', borderRadius: '1px' }} />
          <div style={{ position: 'absolute', top: '0', left: '6px', width: '2px', height: '14px', background: 'rgba(212,23,74,0.30)', borderRadius: '1px' }} />
        </div>
        <div className="float absolute" style={{ top: '20%', left: '42%', width: '14px', height: '14px' }}>
          <div style={{ position: 'absolute', top: '6px', left: '0', width: '14px', height: '2px', background: 'rgba(245,158,11,0.32)', borderRadius: '1px' }} />
          <div style={{ position: 'absolute', top: '0', left: '6px', width: '2px', height: '14px', background: 'rgba(245,158,11,0.32)', borderRadius: '1px' }} />
        </div>
        <div className="float-d absolute" style={{ top: '78%', right: '14%', width: '12px', height: '12px' }}>
          <div style={{ position: 'absolute', top: '5px', left: '0', width: '12px', height: '2px', background: 'rgba(16,185,129,0.30)', borderRadius: '1px' }} />
          <div style={{ position: 'absolute', top: '0', left: '5px', width: '2px', height: '12px', background: 'rgba(16,185,129,0.30)', borderRadius: '1px' }} />
        </div>

        {/* Small solid diamonds */}
        <div className="float absolute"
          style={{ top: '55%', left: '8%', width: '10px', height: '10px', background: 'rgba(212,23,74,0.22)', transform: 'rotate(45deg)', borderRadius: '2px' }} />
        <div className="float-d absolute"
          style={{ top: '10%', right: '35%', width: '8px', height: '8px', background: 'rgba(245,158,11,0.28)', transform: 'rotate(45deg)', borderRadius: '1px' }} />
        <div className="float absolute"
          style={{ top: '82%', left: '52%', width: '9px', height: '9px', background: 'rgba(59,130,246,0.24)', transform: 'rotate(45deg)', borderRadius: '1px' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_560px] gap-14 xl:gap-20 items-center">

          {/* LEFT */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.22)' }}>
              <Zap size={12} className="text-amber-500" fill="currentColor" />
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">
                Trusted by 200+ Enterprises Worldwide
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] font-bold text-gray-900 leading-[1.1] mb-6">
              Transforming<br />Business Through
              <span
                className="block mt-2 bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent"
                style={{
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  minHeight: '2.5em',
                  display: 'block',
                }}>
                {words[wi]}

              </span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
              Looking to create a digital product that makes an impact? Transform your ideas into
              intelligent, AI-driven digital experiences — from concept to launch. Our expert team
              helps you design, develop, and scale solutions that engage your audience and
              accelerate business growth.
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
                    style={{ background: 'rgba(212,23,74,0.10)' }}>
                    <CheckCircle2 size={13} className="text-[#D4174A]" />
                  </div>
                  <span className="text-slate-600 text-sm">{t}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/contact"
                className="flex items-center gap-2 px-8 py-4 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #D4174A, #A8102E)',
                  boxShadow: '0 8px 32px rgba(212,23,74,0.30)',
                }}>
                Get Free Demo <ArrowRight size={18} />
              </Link>
              <Link href="/services/cloud"
                className="flex items-center gap-2 px-8 py-4 text-gray-700 text-base font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50"
                style={{ border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(255,255,255,0.8)' }}>
                Explore Services
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-7" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              {[
                { v: '100+', l: 'Successful Projects', c: '#D4174A' },
                { v: '200+', l: 'Happy Clients', c: '#F59E0B' },
                { v: '100+', l: 'Skilled Experts', c: '#3B82F6' },
                { v: '15+', l: 'Ongoing Projects', c: '#10B981' },
              ].map(s => (
                <div key={s.l}>
                  <p className="text-2xl font-bold" style={{ color: s.c }}>{s.v}</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div ref={rightColRef} className="hidden lg:block relative">
            <TiltCard intensity={15} className="relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[520px] h-[520px] rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(212,23,74,0.07) 30%, transparent 70%)', border: '1px solid rgba(212,23,74,0.14)' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[490px] h-[490px] rounded-full border border-dashed border-[#D4174A]/20 spin-s" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[420px] h-[420px] rounded-full border border-dashed border-gray-200"
                  style={{ animation: 'spin-slow 12s linear infinite reverse' }} />
              </div>

              <div className="relative w-[460px] h-[460px] mx-auto">
                <div className="absolute inset-8 rounded-full overflow-hidden border-2 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                  style={{ borderColor: 'rgba(212,23,74,0.15)' }}>
                  <Image
                    src="/images/executives-paying-attention-digital-tablet 1.jpg"
                    alt="Innovatiq team" fill className="object-cover" priority />
                  <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(circle at 70% 20%, rgba(212,23,74,0.15) 0%, transparent 60%)' }} />
                </div>

                {/* Floating card — ISO */}
                <div className="absolute -top-2 right-2 float-d">
                  <div className="rounded-2xl px-4 py-3 flex items-center gap-3"
                    style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
                    <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0"
                      style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                      <span className="text-lg">🏆</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">ISO Certified</p>
                      <p className="text-[10px] text-gray-400">9001:2015</p>
                    </div>
                  </div>
                </div>

                {/* Floating card — Asia Pacific */}
                <div className="absolute -bottom-2 -left-8 float">
                  <div className="rounded-2xl px-4 py-3 flex items-center gap-3"
                    style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(245,158,11,0.10)' }}>
                      <span className="text-lg">🌏</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Asia Pacific</p>
                      <p className="text-[10px] text-gray-400">SG · IN · MY</p>
                    </div>
                  </div>
                </div>

                {/* Floating card — stat */}
                <div className="absolute top-1/2 -right-10 -translate-y-1/2 float-d" style={{ animationDelay: '1s' }}>
                  <div className="rounded-2xl px-5 py-4 text-white text-center"
                    style={{ background: 'linear-gradient(135deg, #D4174A, #A8102E)', boxShadow: '0 8px 32px rgba(212,23,74,0.35)' }}>
                    <p className="text-3xl font-black">200+</p>
                    <p className="text-[10px] font-medium opacity-80 mt-0.5">Happy Clients</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>

    </section>
  );
}
