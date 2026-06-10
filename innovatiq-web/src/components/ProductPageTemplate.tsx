import PageHero from './PageHero';
import AnimatedSection from './AnimatedSection';
import CtaSection from './home/CtaSection';
import VideoSection from './VideoSection';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface Props {
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  features: Feature[];
  highlights: string[];
  gradient: string;
  color: string;
  badge?: string;
  productType?: string;
}

export default function ProductPageTemplate({
  name,
  subtitle,
  tagline,
  description,
  features,
  highlights,
  gradient,
  color,
  badge,
  productType,
}: Props) {
  return (
    <>
      <PageHero badge={subtitle} title={name} subtitle={tagline} />

      {/* Overview */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${color}08 0%, transparent 60%)` }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(59,130,246,0.04) 0%, transparent 60%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Design.svg" alt="" aria-hidden="true"
          className="absolute right-0 bottom-0 h-[65%] max-h-105 w-auto opacity-[0.12] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              {badge && (
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
                  style={{ color, background: '#FFFFFF', borderColor: color, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                  {badge}
                </span>
              )}
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {name} —{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradient }}>
                  {subtitle}
                </span>
              </h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-8">{description}</p>
              <div className="space-y-3 mb-8">
                {highlights.map(h => (
                  <div key={h} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${color}15` }}>
                      <CheckCircle2 size={12} style={{ color }} />
                    </div>
                    <span className="text-slate-600 text-[15px] font-medium">{h}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 8px 24px ${color}35` }}>
                  Start Free Trial <ArrowRight size={16} />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50"
                  style={{ border: `1px solid ${color}35`, color, background: 'transparent' }}>
                  Request Demo
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="rounded-3xl overflow-hidden text-white relative"
                style={{ background: gradient, boxShadow: `0 28px 70px ${color}35` }}>

                {/* Background orbs */}
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.20) 0%, transparent 65%)' }} />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 65%)' }} />

                {/* Header */}
                <div className="relative px-7 pt-7 pb-5">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.22)' }}>
                      🚀
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{name}</h3>
                      <p className="text-white/85 text-xs font-semibold mt-0.5">{subtitle}</p>
                    </div>
                  </div>
                  <div className="h-px" style={{ background: 'rgba(255,255,255,0.25)' }} />
                </div>

                {/* Feature pills */}
                <div className="relative px-5 pb-7 space-y-2.5">
                  {features.slice(0, 4).map(f => (
                    <div key={f.title} className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{ background: 'rgba(255,255,255,0.22)' }}>
                      <span className="text-xl">{f.icon}</span>
                      <span className="font-semibold text-sm text-white">{f.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${color}06 0%, transparent 70%)` }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/ImageUpdated.svg" alt="" aria-hidden="true"
          className="absolute left-0 bottom-0 h-[60%] max-h-[350px] w-auto opacity-[0.12] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
              style={{ color, background: '#FFFFFF', borderColor: color, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              Core Features
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              Powerful{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradient }}>
                Features
              </span>
            </h2>
            <p className="text-slate-600 font-medium mt-3 max-w-xl mx-auto">
              Everything you need to {tagline.toLowerCase()}
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 80} className="h-full">
                <div className="p-7 group hover:-translate-y-1 transition-all duration-300 h-full"
                  style={{
                    background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, ${color} 0%, ${color} 20%, ${color}CC 45%, ${color}55 70%, transparent 90%) border-box`,
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderTopWidth: '4px',
                    borderLeftWidth: '0',
                    borderRightWidth: '0',
                    borderBottomWidth: '0',
                    borderRadius: '16px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)',
                  }}>
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">{f.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Product CTA */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${color}05 0%, transparent 65%)` }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${color}20, transparent)` }} />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border"
              style={{ color, background: '#FFFFFF', borderColor: color, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              Get Started Today
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Experience{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradient }}>
                {name}?
              </span>
            </h2>
            <p className="text-slate-600 font-medium mb-10 text-lg">
              Start your free trial today — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 8px 24px ${color}35` }}>
                Start Free Trial <ArrowRight size={16} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50"
                style={{ border: `1px solid ${color}35`, color }}>
                Schedule Demo
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {productType && <VideoSection filterType="products" filterKey={productType} />}
      <CtaSection />
    </>
  );
}
