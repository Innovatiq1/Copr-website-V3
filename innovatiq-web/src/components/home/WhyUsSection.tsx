import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Target, Award, Users, Globe } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import TiltCard from '@/components/TiltCard';

const stats = [
  { value: '100+', label: 'Successful Projects', color: '#D4174A' },
  { value: '200+', label: 'Happy Clients', color: '#F59E0B' },
  { value: '100+', label: 'Skilled Experts', color: '#3B82F6' },
  { value: '15+', label: 'Ongoing Projects', color: '#10B981' },
];

const reasons = [
  { Icon: Target, title: 'Outcome Driven', desc: 'Measured by real business results, not just delivery.', clr: '#D4174A', bg: '#FFF5F6' },
  { Icon: Award, title: 'Award-Winning', desc: 'Recognized by industry bodies for excellence.', clr: '#F59E0B', bg: '#FFFBEB' },
  { Icon: Users, title: '100+ Certified Experts', desc: 'Specialists across cloud, security & DevOps.', clr: '#3B82F6', bg: '#EFF6FF' },
  { Icon: Globe, title: 'Regional Presence', desc: 'On-the-ground in Singapore, India & Malaysia.', clr: '#10B981', bg: '#ECFDF5' },
];

export default function WhyUsSection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#FFFFFF' }}>

      {/* Ambient glows */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(59,130,246,0.05) 0%, transparent 70%)' }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(212,23,74,0.05) 0%, transparent 70%)' }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(212,23,74,0.06) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />

      {/* Scattered geometric shapes */}
      <style>{`
        @keyframes why-float { 0%,100%{transform:translateY(0px) rotate(0deg)} 50%{transform:translateY(-14px) rotate(20deg)} }
        @keyframes why-float-r { 0%,100%{transform:translateY(0px) rotate(0deg)} 50%{transform:translateY(14px) rotate(-20deg)} }
        @keyframes why-spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes why-drift { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(8px,-10px) rotate(15deg)} 66%{transform:translate(-6px,8px) rotate(-10deg)} }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Diamonds */}
        <div className="absolute" style={{ top: '10%', left: '4%', width: '10px', height: '10px', background: 'rgba(212,23,74,0.20)', transform: 'rotate(45deg)', borderRadius: '2px', animation: 'why-drift 8s ease-in-out infinite' }} />
        <div className="absolute" style={{ top: '60%', left: '2%', width: '8px', height: '8px', background: 'rgba(245,158,11,0.24)', transform: 'rotate(45deg)', borderRadius: '1px', animation: 'why-drift 10s ease-in-out infinite', animationDelay: '-3s' }} />
        <div className="absolute" style={{ top: '30%', right: '3%', width: '10px', height: '10px', background: 'rgba(59,130,246,0.22)', transform: 'rotate(45deg)', borderRadius: '2px', animation: 'why-drift 9s ease-in-out infinite', animationDelay: '-2s' }} />
        <div className="absolute" style={{ bottom: '20%', right: '6%', width: '8px', height: '8px', background: 'rgba(212,23,74,0.18)', transform: 'rotate(45deg)', borderRadius: '1px', animation: 'why-drift 7s ease-in-out infinite', animationDelay: '-5s' }} />
        <div className="absolute" style={{ top: '50%', left: '48%', width: '7px', height: '7px', background: 'rgba(16,185,129,0.22)', transform: 'rotate(45deg)', borderRadius: '1px', animation: 'why-drift 11s ease-in-out infinite', animationDelay: '-1s' }} />

        {/* Hollow hexagons */}
        <svg className="absolute" style={{ top: '8%', left: '42%', animation: 'why-float 12s ease-in-out infinite' }} width="44" height="44">
          <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" fill="none" stroke="rgba(212,23,74,0.18)" strokeWidth="1.5" />
        </svg>
        <svg className="absolute" style={{ top: '55%', right: '4%', animation: 'why-float-r 14s ease-in-out infinite', animationDelay: '-4s' }} width="56" height="56">
          <polygon points="28,2 52,15 52,41 28,54 4,41 4,15" fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="1.5" />
        </svg>
        <svg className="absolute" style={{ bottom: '12%', left: '38%', animation: 'why-float 10s ease-in-out infinite', animationDelay: '-6s' }} width="36" height="36">
          <polygon points="18,2 32,10 32,26 18,34 4,26 4,10" fill="none" stroke="rgba(245,158,11,0.22)" strokeWidth="1.5" />
        </svg>
        <svg className="absolute" style={{ top: '25%', left: '5%', animation: 'why-float-r 16s ease-in-out infinite', animationDelay: '-2s' }} width="48" height="48">
          <polygon points="24,2 44,13 44,35 24,46 4,35 4,13" fill="none" stroke="rgba(16,185,129,0.18)" strokeWidth="1.5" />
        </svg>

        {/* Triangles */}
        <div className="absolute" style={{ top: '15%', right: '20%', width: '10px', height: '10px', background: 'rgba(212,23,74,0.18)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'why-drift 9s ease-in-out infinite', animationDelay: '-3s' }} />
        <div className="absolute" style={{ bottom: '25%', left: '10%', width: '9px', height: '9px', background: 'rgba(245,158,11,0.22)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'why-drift 11s ease-in-out infinite', animationDelay: '-7s' }} />
        <div className="absolute" style={{ top: '70%', left: '55%', width: '8px', height: '8px', background: 'rgba(59,130,246,0.20)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'why-drift 8s ease-in-out infinite', animationDelay: '-4s' }} />

        {/* Hollow rings */}
        <div className="absolute rounded-full" style={{ top: '40%', right: '12%', width: '60px', height: '60px', border: '1px solid rgba(212,23,74,0.12)', animation: 'why-float 13s ease-in-out infinite', animationDelay: '-5s' }} />
        <div className="absolute rounded-full" style={{ bottom: '30%', left: '30%', width: '40px', height: '40px', border: '1px solid rgba(59,130,246,0.14)', animation: 'why-float-r 11s ease-in-out infinite', animationDelay: '-2s' }} />

        {/* Spinning border squares */}
        <div className="absolute" style={{ top: '78%', right: '28%', width: '28px', height: '28px', border: '1px solid rgba(245,158,11,0.22)', borderRadius: '4px', animation: 'why-spin 18s linear infinite' }} />
        <div className="absolute" style={{ top: '5%', right: '8%', width: '22px', height: '22px', border: '1px solid rgba(212,23,74,0.18)', borderRadius: '3px', animation: 'why-spin 14s linear infinite reverse' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left: Image + overlaid glass stats */}
          <AnimatedSection direction="left">
            <TiltCard intensity={14}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden" style={{ height: '520px' }}>
                <Image
                  src="/images/showing-good-results-group-young-freelancers-office-have-conversation-smiling (1).jpg"
                  alt="Innovatiq team" fill
                  style={{ objectFit: 'cover' }}
                  className="brightness-[0.75]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.20) 50%, transparent 100%)' }} />
              </div>

              {/* Glass stat cards overlaid */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl p-4 text-center"
                    style={{
                      background: 'rgba(255,255,255,0.92)',
                      border: '1px solid rgba(255,255,255,0.8)',
                      backdropFilter: 'blur(16px)',
                    }}>
                    <p className="text-2xl font-black mb-0.5" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-gray-500 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Floating ISO badge */}
              <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.09)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.08)',
                }}>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                  <Image src="/logo/image003-preview (1).png" alt="ISO" width={36} height={36} style={{ objectFit: 'contain' }} />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">ISO Certified</p>
                  <p className="text-gray-400 text-xs">9001:2015</p>
                </div>
              </div>

              {/* Accent corner glow */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(212,23,74,0.2) 0%, transparent 70%)' }} />
            </div>
            </TiltCard>
          </AnimatedSection>

          {/* Right: Content */}
          <AnimatedSection direction="right">
            <span className="inline-block text-xs font-bold text-[#F59E0B] uppercase tracking-widest bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-4 py-1.5 rounded-full mb-6">
              Why Choose Innovatiq
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Your Trusted Partner<br />
              <span className="bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">
                for Digital Excellence
              </span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              We don&apos;t just deliver technology — we build lasting partnerships.
              Every solution is tailored to your unique business needs and drives measurable growth.
            </p>

            {/* Checklist */}
            <div className="space-y-3 mb-10">
              {[
                'End-to-end digital transformation capabilities',
                'Dedicated account management & 24/7 support',
                'Transparent pricing with no hidden costs',
                'Proven track record with 200+ enterprise clients',
              ].map(p => (
                <div key={p} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,23,74,0.15)' }}>
                    <CheckCircle2 size={13} style={{ color: '#D4174A' }} />
                  </div>
                  <span className="text-slate-600 text-sm">{p}</span>
                </div>
              ))}
            </div>

            {/* Reason grid */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {reasons.map((c) => (
                <TiltCard key={c.title} intensity={14}>
                  <div className="rounded-2xl p-4"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(0,0,0,0.08)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 6px 18px rgba(0,0,0,0.05)',
                    }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: c.bg }}>
                      <c.Icon size={17} style={{ color: c.clr }} strokeWidth={1.75} />
                    </div>
                    <p className="font-semibold text-gray-800 text-sm mb-1">{c.title}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{c.desc}</p>
                  </div>
                </TiltCard>
              ))}
            </div>

            <Link href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #D4174A, #A8102E)',
                boxShadow: '0 8px 32px rgba(212,23,74,0.35)',
                color: 'white',
              }}>
              Learn More About Us <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
