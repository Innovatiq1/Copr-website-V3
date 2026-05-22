import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import TiltCard from '@/components/TiltCard';

const SERVICES = [
  { title: 'Cloud Services', desc: 'Scalable cloud infrastructure, seamless migration, and cost optimisation.', href: '/services/cloud', img: '/images/service/CloudImg/clodeService.svg', clr: '#3B82F6', glow: 'rgba(59,130,246,0.25)' },
  { title: 'Cyber Security', desc: 'End-to-end security solutions protecting your data and business 24/7.', href: '/services/cyber-security', img: '/images/service/CyberSecurityImg/CyberSecurityImg.svg', clr: '#D4174A', glow: 'rgba(212,23,74,0.25)' },
  { title: 'IT Consulting', desc: 'Strategic technology advisory aligning IT with your business goals.', href: '/services/consulting', img: '/images/business-success-report-graph-concept 1 (1).jpg', clr: '#F59E0B', glow: 'rgba(245,158,11,0.25)', isPhoto: true },
  { title: 'Digital Transformation', desc: 'Reimagine your business with AI, automation, and modern platforms.', href: '/services/digital-transformation', img: '/images/service/DigitalTransformation/DigitalTransformationImage.svg', clr: '#8B5CF6', glow: 'rgba(139,92,246,0.25)' },
  { title: 'Managed IT Services', desc: 'Proactive 24/7 IT management with guaranteed SLA performance.', href: '/services/managed-it', img: '/images/service/managedITServiceImg/ManagedItServicesImage.svg', clr: '#10B981', glow: 'rgba(16,185,129,0.25)' },
  { title: 'Advanced Infrastructure', desc: 'Enterprise-grade network and server infrastructure built to scale.', href: '/services/advanced-infra', img: '/images/service/advanceInfraServiceImg/Advancedinfranetwork.svg', clr: '#F97316', glow: 'rgba(249,115,22,0.25)' },
  { title: 'Field Services', desc: 'Certified on-site technical support and deployment across the region.', href: '/services/field-service', img: '/images/service/fieldServiceImg/FieldServicesImage.svg', clr: '#06B6D4', glow: 'rgba(6,182,212,0.25)' },
];

export default function ServicesSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#080F20' }}>

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(212,23,74,0.26) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(59,130,246,0.18) 0%, transparent 65%)' }} />

      {/* Illustration */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/Group%2041062.svg" alt="" aria-hidden="true"
        className="absolute left-0 bottom-0 h-[50%] max-h-[320px] w-auto opacity-[0.05] pointer-events-none select-none object-contain" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4174A] uppercase tracking-widest bg-[#D4174A]/10 border border-[#D4174A]/20 px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4174A] animate-pulse" />
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Comprehensive IT Solutions<br />
            <span className="bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">
              For Modern Enterprises
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            From cloud infrastructure to cyber security — end-to-end services that accelerate your digital journey.
          </p>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <AnimatedSection key={s.href} delay={i * 60}>
              <Link href={s.href} className="group block h-full">
                <TiltCard intensity={18} className="h-full">
                <div className="h-full rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 4px 28px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
                  }}>

                  {/* Colored top accent */}
                  <div className="h-[2px] w-full flex-shrink-0"
                    style={{ background: `linear-gradient(90deg, ${s.clr}, transparent)` }} />

                  {/* Image area */}
                  <div className="relative h-44 flex items-center justify-center overflow-hidden flex-shrink-0"
                    style={{ background: `${s.clr}0D` }}>
                    {s.isPhoto ? (
                      <Image src={s.img} alt={s.title} fill className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                    ) : (
                      <Image src={s.img} alt={s.title} width={140} height={110}
                        className="object-contain max-h-[110px] max-w-[75%] group-hover:scale-105 transition-transform duration-500"
                        style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5)) brightness(1.1)' }} />
                    )}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at center, ${s.glow} 0%, transparent 70%)` }} />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-white text-[15px] group-hover:text-[#D4174A] transition-colors leading-snug pr-2 depth-mid">{s.title}</h3>
                      <ArrowUpRight size={14} className="text-gray-600 group-hover:text-[#D4174A] flex-shrink-0 mt-0.5 transition-colors" />
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{s.desc}</p>
                    <div className="mt-4 h-[1px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${s.clr}, transparent)` }} />
                  </div>
                </div>
                </TiltCard>
              </Link>
            </AnimatedSection>
          ))}

          {/* CTA tile */}
          <AnimatedSection delay={SERVICES.length * 60}>
            <Link href="/contact" className="group block h-full">
              <TiltCard intensity={18} className="h-full">
              <div className="h-full rounded-2xl flex flex-col items-center justify-center text-center p-8 cursor-pointer"
                style={{
                  background: 'linear-gradient(145deg, rgba(212,23,74,0.12) 0%, rgba(212,23,74,0.04) 100%)',
                  border: '1px solid rgba(212,23,74,0.2)',
                  minHeight: '280px',
                }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 depth-pop"
                  style={{ background: 'linear-gradient(135deg, #D4174A, #FF4D7C)', boxShadow: '0 8px 32px rgba(212,23,74,0.4)' }}>
                  <ArrowRight size={26} className="text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2 depth-mid">Custom Solution</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  Tell us your challenge — we&apos;ll design the perfect solution.
                </p>
                <span className="text-sm font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">Talk to an Expert →</span>
              </div>
              </TiltCard>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
