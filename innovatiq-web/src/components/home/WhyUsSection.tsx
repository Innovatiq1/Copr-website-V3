import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import TiltCard from '@/components/TiltCard';

const stats = [
  { value: '15+', label: 'Years Experience', color: '#D4174A' },
  { value: '200+', label: 'Happy Clients', color: '#F59E0B' },
  { value: '100+', label: 'Expert Team', color: '#3B82F6' },
  { value: '3', label: 'Countries', color: '#10B981' },
];

const reasons = [
  { icon: '🎯', title: 'Outcome Driven', desc: 'Measured by real business results, not just delivery.' },
  { icon: '🏆', title: 'Award-Winning', desc: 'Recognized by industry bodies for excellence.' },
  { icon: '👥', title: '100+ Certified Experts', desc: 'Specialists across cloud, security & DevOps.' },
  { icon: '🌏', title: 'Regional Presence', desc: 'On-the-ground in Singapore, India & Malaysia.' },
];

export default function WhyUsSection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#07101E' }}>

      {/* Ambient glows */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(59,130,246,0.20) 0%, transparent 70%)' }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(212,23,74,0.22) 0%, transparent 70%)' }} />

      {/* Illustration */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/aboutUs/whyUsSet1.svg" alt="" aria-hidden="true"
        className="absolute right-0 top-0 h-full max-h-[400px] w-auto opacity-[0.04] pointer-events-none select-none object-contain" />

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
                  className="brightness-[0.6]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,11,20,0.95) 0%, rgba(6,11,20,0.3) 50%, transparent 100%)' }} />
              </div>

              {/* Glass stat cards overlaid */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl p-4 text-center"
                    style={{
                      background: 'rgba(6,11,20,0.75)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(16px)',
                    }}>
                    <p className="text-2xl font-black mb-0.5" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-gray-400 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Floating ISO badge */}
              <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: 'rgba(6,11,20,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                  <Image src="/logo/image003-preview (1).png" alt="ISO" width={36} height={36} style={{ objectFit: 'contain' }} />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">ISO Certified</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Your Trusted Partner<br />
              <span className="bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">
                for Digital Excellence
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
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
                  <span className="text-gray-300 text-sm">{p}</span>
                </div>
              ))}
            </div>

            {/* Reason grid */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {reasons.map((c) => (
                <TiltCard key={c.title} intensity={22}>
                  <div className="rounded-2xl p-4"
                    style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                      border: '1px solid rgba(255,255,255,0.14)',
                    }}>
                    <div className="text-2xl mb-2 depth-pop">{c.icon}</div>
                    <p className="font-semibold text-white text-sm mb-1 depth-mid">{c.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
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
