import PageHero from './PageHero';
import AnimatedSection from './AnimatedSection';
import CtaSection from './home/CtaSection';
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
}: Props) {
  return (
    <>
      <PageHero badge={subtitle} title={name} subtitle={tagline} />

      {/* Overview */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#080F20' }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${color}15 0%, transparent 60%)` }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Design.svg" alt="" aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[80%] max-h-[480px] w-auto opacity-[0.06] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              {badge && (
                <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
                  style={{ color: '#F59E0B', borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.08)' }}>
                  {badge}
                </span>
              )}
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                {name} —{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${color}, ${color}80)` }}>
                  {subtitle}
                </span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">{description}</p>
              <div className="space-y-3 mb-8">
                {highlights.map(h => (
                  <div key={h} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${color}20` }}>
                      <CheckCircle2 size={12} style={{ color }} />
                    </div>
                    <span className="text-gray-300 text-sm">{h}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}80)`, boxShadow: `0 8px 24px ${color}40` }}>
                  Start Free Trial <ArrowRight size={16} />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{ border: `1px solid ${color}40`, color, background: `${color}08` }}>
                  Request Demo
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div
                className="rounded-2xl p-10 text-white relative overflow-hidden"
                style={{ background: gradient, boxShadow: `0 20px 60px ${color}20` }}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
                  style={{ background: 'radial-gradient(circle, white, transparent)' }} />
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-2">{name}</h3>
                <p className="text-white/70 mb-6">{subtitle}</p>
                <div className="space-y-3">
                  {features.slice(0, 4).map(f => (
                    <div key={f.title} className="flex items-center gap-3">
                      <span className="text-xl">{f.icon}</span>
                      <span className="font-medium text-sm">{f.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#07101E' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${color}08 0%, transparent 70%)` }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/ImageUpdated.svg" alt="" aria-hidden="true"
          className="absolute left-0 bottom-0 h-[60%] max-h-[350px] w-auto opacity-[0.05] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">
              Powerful{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${color}, ${color}80)` }}>
                Features
              </span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Everything you need to {tagline.toLowerCase()}
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 80}>
                <div className="relative p-7 rounded-2xl group hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 4px 28px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 overflow-hidden" style={{ background: '#080F20' }}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${color}08 0%, transparent 60%)` }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Experience{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${color}, ${color}80)` }}>
                {name}?
              </span>
            </h2>
            <p className="text-gray-400 mb-8">
              Start your free trial today — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}80)`, boxShadow: `0 8px 24px ${color}40` }}>
                Start Free Trial <ArrowRight size={16} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: `1px solid ${color}40`, color, background: `${color}08` }}>
                Schedule Demo
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
