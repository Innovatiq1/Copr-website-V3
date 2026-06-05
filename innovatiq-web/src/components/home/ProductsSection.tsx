import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import TiltCard from '@/components/TiltCard';

const products = [
  {
    name: 'SkillEra',
    sub: 'Training Management System',
    desc: 'AI-powered training lifecycle management with intelligent recommendations and advanced analytics.',
    href: '/products/skillera',
    logo: '/images/Skillera-png-logo.png',
    heroImg: '/images/SkillEra Hero Section.svg',
    features: ['AI Recommendations', 'Analytics', 'Workflows', 'Mobile'],
    gradient: 'linear-gradient(160deg, #FFF0F2 0%, #FFE4E8 100%)',
    clr: '#D4174A',
    badge: 'Most Popular',
  },
  {
    name: 'LearnPro',
    sub: 'Learning Management System',
    desc: 'Comprehensive platform for creating, managing, and delivering engaging training programs at scale.',
    href: '/products/learnpro',
    logo: '/images/Learnpro-png-logo.png',
    heroImg: '/images/LMS Hero section.svg',
    features: ['Course Builder', 'Certifications', 'Social Learning'],
    gradient: 'linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 100%)',
    clr: '#3B82F6',
    badge: null,
  },
  {
    name: 'SecurOn',
    sub: 'Patch Management System',
    desc: 'Enterprise-grade patch management ensuring your infrastructure stays secure and compliant.',
    href: '/products/securon',
    logo: '/images/Securon-png-logo.png',
    heroImg: '/images/PMS Hero Section.svg',
    features: ['Auto Patching', 'Compliance', 'Vulnerability Scan'],
    gradient: 'linear-gradient(160deg, #ECFDF5 0%, #D1FAE5 100%)',
    clr: '#10B981',
    badge: null,
  },
  {
    name: 'LMP',
    sub: 'Learning Motivational Platform',
    desc: 'Gamification-powered platform that drives learner engagement and improves training completion.',
    href: '/products/lmp',
    logo: null,
    heroImg: '/images/LMP Hero Section.svg',
    features: ['Gamification', 'Leaderboards', 'Rewards'],
    gradient: 'linear-gradient(160deg, #F5F3FF 0%, #EDE9FE 100%)',
    clr: '#8B5CF6',
    badge: null,
  },
];

export default function ProductsSection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#F8FAFC' }}>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,23,74,0.07) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)' }} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/Group%2041156.svg" alt="" aria-hidden="true"
        className="absolute right-0 top-0 h-[60%] max-h-[400px] w-auto opacity-[0.05] pointer-events-none select-none object-contain" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#8B5CF6] uppercase tracking-widest bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-4 py-1.5 rounded-full mb-5">
            <Sparkles size={11} />
            Our Products
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
            Purpose-Built{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#D4174A] bg-clip-text text-transparent">
              SaaS Products
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Innovative platforms designed to transform how enterprises learn, secure, and grow.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-5">
          {products.map((p, i) => (
            <AnimatedSection key={p.name} delay={i * 80}>
              <TiltCard intensity={18} className="h-full">
              <div className="group overflow-hidden flex flex-col"
                style={{
                  background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, ${p.clr} 0%, ${p.clr} 20%, ${p.clr}CC 45%, ${p.clr}55 70%, transparent 90%) border-box`,
                  borderStyle: 'solid',
                  borderColor: 'transparent',
                  borderTopWidth: '4px',
                  borderLeftWidth: '0',
                  borderRightWidth: '0',
                  borderBottomWidth: '0',
                  borderRadius: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)',
                }}>

                <div className="relative h-48 overflow-hidden flex items-center justify-center" style={{ background: p.gradient }}>
                  <Image src={p.heroImg} alt={p.name} fill style={{ objectFit: 'contain', padding: '20px' }}
                    className="group-hover:scale-[1.04] transition-transform duration-500" />
                  {/* bottom fade into card */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, transparent, #FFFFFF)' }} />
                  {p.badge && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ background: p.clr, boxShadow: `0 2px 8px ${p.clr}40` }}>
                      {p.badge}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {p.logo ? (
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                        <Image src={p.logo} alt={p.name} width={28} height={28} style={{ objectFit: 'contain' }} />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: `linear-gradient(135deg, ${p.clr}, ${p.clr}CC)` }}>LMP</div>
                    )}
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg leading-none depth-mid">{p.name}</h3>
                      <p className="text-xs mt-0.5 font-medium depth-low" style={{ color: p.clr }}>{p.sub}</p>
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-5 depth-low">
                    {p.features.map(f => (
                      <span key={f} className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: `${p.clr}15`, color: p.clr, border: `1px solid ${p.clr}25` }}>
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4"
                    style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <Link href={p.href}
                      className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all"
                      style={{ color: p.clr }}>
                      Explore {p.name} <ArrowRight size={14} />
                    </Link>
                    <Link href="/contact"
                      className="ml-auto text-xs font-semibold px-4 py-2 rounded-lg transition-all hover:bg-gray-50"
                      style={{ border: `1px solid ${p.clr}40`, color: p.clr }}>
                      Free Trial
                    </Link>
                  </div>
                </div>
              </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <p className="text-slate-400 mb-5 text-sm">Unsure which product fits your needs?</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #D4174A)',
              boxShadow: '0 8px 32px rgba(139,92,246,0.3)',
            }}>
            Talk to a Product Expert <ArrowRight size={15} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
