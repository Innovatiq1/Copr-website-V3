'use client';
import Link from 'next/link';
import { ArrowRight, Cloud, Shield, BarChart2, Zap, Server, Network, Wrench } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const SERVICES = [
  {
    title: 'Cloud Services',
    desc: 'Scalable cloud infrastructure, seamless migration, and cost optimisation for growing businesses.',
    href: '/services/cloud',
    Icon: Cloud,
    clr: '#3B82F6',
    bg: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
    shadow: 'rgba(59,130,246,0.18)',
  },
  {
    title: 'Cyber Security',
    desc: 'End-to-end security solutions protecting your data, users and business operations 24/7.',
    href: '/services/cyber-security',
    Icon: Shield,
    clr: '#D4174A',
    bg: 'linear-gradient(135deg, #FFF5F7, #FFE4EA)',
    shadow: 'rgba(212,23,74,0.18)',
  },
  {
    title: 'IT Consulting',
    desc: 'Strategic technology advisory aligning your IT roadmap with core business goals.',
    href: '/services/consulting',
    Icon: BarChart2,
    clr: '#F59E0B',
    bg: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
    shadow: 'rgba(245,158,11,0.18)',
  },
  {
    title: 'Digital Transformation',
    desc: 'Reimagine your business with AI, automation, and modern platforms at scale.',
    href: '/services/digital-transformation',
    Icon: Zap,
    clr: '#8B5CF6',
    bg: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)',
    shadow: 'rgba(139,92,246,0.18)',
  },
  {
    title: 'Managed IT Services',
    desc: 'Proactive 24/7 IT management with guaranteed SLA performance and rapid response.',
    href: '/services/managed-it',
    Icon: Server,
    clr: '#10B981',
    bg: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
    shadow: 'rgba(16,185,129,0.18)',
  },
  {
    title: 'Advanced Infrastructure',
    desc: 'Enterprise-grade network and server infrastructure built to scale with your growth.',
    href: '/services/advanced-infra',
    Icon: Network,
    clr: '#F97316',
    bg: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
    shadow: 'rgba(249,115,22,0.18)',
  },
  {
    title: 'Field Services',
    desc: 'Certified on-site technical support, maintenance, and deployment across the region.',
    href: '/services/field-service',
    Icon: Wrench,
    clr: '#06B6D4',
    bg: 'linear-gradient(135deg, #ECFEFF, #CFFAFE)',
    shadow: 'rgba(6,182,212,0.18)',
  },
];

export default function ServicesSection() {
  return (
    <section
      className="relative pt-14 pb-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FEF5F7 0%, #FDFAFE 22%, #FFFFFF 50%)',
        borderRadius: '40px 40px 0 0',
        marginTop: '-72px',
        zIndex: 10,
        position: 'relative',
        boxShadow: '0 -4px 32px rgba(212,23,74,0.06)',
      }}>

      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(212,23,74,0.07) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(59,130,246,0.04) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4174A] uppercase tracking-widest bg-[#D4174A]/10 border border-[#D4174A]/20 px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4174A] animate-pulse" />
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
            Comprehensive IT Solutions<br />
            <span className="bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">
              For Modern Enterprises
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            From cloud infrastructure to cyber security — end-to-end services that accelerate your digital journey.
          </p>
        </AnimatedSection>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <AnimatedSection key={s.href} delay={i * 60}>
              <Link href={s.href} className="group block h-full">
                <div className="relative h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5"
                  style={{
                    background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, ${s.clr} 0%, ${s.clr} 20%, ${s.clr}CC 45%, ${s.clr}55 70%, transparent 90%) border-box`,
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderTopWidth: '4px',
                    borderLeftWidth: '0',
                    borderRightWidth: '0',
                    borderBottomWidth: '0',
                    borderRadius: '20px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px ${s.shadow}, 0 4px 16px rgba(0,0,0,0.05), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
                    style={{ background: `radial-gradient(ellipse at 10% 0%, ${s.clr}0D 0%, transparent 65%)` }} />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Number badge */}
                    <span className="text-[11px] font-black tracking-widest mb-4 block"
                      style={{ color: `${s.clr}60` }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ background: s.bg, boxShadow: `0 4px 14px ${s.shadow}` }}>
                      <s.Icon size={22} style={{ color: s.clr }} strokeWidth={1.6} />
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-gray-900 text-[15px] mb-2 leading-snug">{s.title}</h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed flex-1">{s.desc}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-5 pt-4"
                      style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      <span className="text-[11px] font-bold uppercase tracking-wider"
                        style={{ color: s.clr }}>
                        Explore
                      </span>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                        style={{ background: `${s.clr}12`, border: `1px solid ${s.clr}20` }}>
                        <ArrowRight size={12} style={{ color: s.clr }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}

          {/* Custom Solution card */}
          <AnimatedSection delay={SERVICES.length * 60}>
            <Link href="/contact" className="group block h-full">
              <div className="relative h-full rounded-2xl p-7 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5"
                style={{
                  background: 'linear-gradient(145deg, rgba(212,23,74,0.04) 0%, rgba(255,140,66,0.03) 100%)',
                  border: '1.5px dashed rgba(212,23,74,0.22)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  minHeight: '260px',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(212,23,74,0.12)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,23,74,0.40)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,23,74,0.22)';
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(212,23,74,0.06) 0%, transparent 70%)' }} />

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: 'linear-gradient(135deg, #D4174A, #FF4D7C)',
                    boxShadow: '0 8px 24px rgba(212,23,74,0.30)',
                  }}>
                  <ArrowRight size={24} className="text-white" />
                </div>

                <h3 className="font-bold text-gray-900 text-[17px] mb-3">Custom Solution</h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed mb-7 max-w-[220px]">
                  Tell us your challenge — we&apos;ll design the perfect solution for you.
                </p>

                <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[12px] font-bold text-white uppercase tracking-wide transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #D4174A, #A8102E)',
                    boxShadow: '0 4px 14px rgba(212,23,74,0.30)',
                  }}>
                  Talk to an Expert <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
