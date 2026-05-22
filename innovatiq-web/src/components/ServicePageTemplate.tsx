import PageHero from './PageHero';
import AnimatedSection from './AnimatedSection';
import CtaSection from './home/CtaSection';
import { CheckCircle2 } from 'lucide-react';

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface Props {
  badge: string;
  title: string;
  subtitle: string;
  overview: string;
  overviewPoints: string[];
  benefits: Benefit[];
  processSteps?: { step: string; title: string; description: string }[];
  color?: string;
}

export default function ServicePageTemplate({
  badge,
  title,
  subtitle,
  overview,
  overviewPoints,
  benefits,
  processSteps,
  color = '#D4174A',
}: Props) {
  return (
    <>
      <PageHero badge={badge} title={title} subtitle={subtitle} />

      {/* Overview */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#080F20' }}>
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${color}15 0%, transparent 60%)` }} />
        {/* Illustration */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Service%20Hero%20section%201.svg" alt="" aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[90%] max-h-[500px] w-auto opacity-[0.06] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
                style={{ color, background: `${color}12`, borderColor: `${color}30` }}>
                Overview
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{title}</h2>
              <p className="text-gray-400 leading-relaxed mb-8">{overview}</p>
              <div className="space-y-3">
                {overviewPoints.map(point => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${color}20` }}>
                      <CheckCircle2 size={12} style={{ color }} />
                    </div>
                    <span className="text-gray-300 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="rounded-2xl p-10 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 100%)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: `0 0 60px ${color}15`,
                }}>
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                <div className="grid grid-cols-2 gap-6">
                  {benefits.slice(0, 4).map(b => (
                    <div key={b.title}>
                      <div className="text-3xl mb-3">{b.icon}</div>
                      <h4 className="font-semibold text-white mb-1 text-sm">{b.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{b.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* All Benefits */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#07101E' }}>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at bottom left, ${color}10 0%, transparent 70%)` }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Design.svg" alt="" aria-hidden="true"
          className="absolute right-0 bottom-0 h-[70%] max-h-[400px] w-auto opacity-[0.05] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">
              Key{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${color}, ${color}80)` }}>
                Benefits
              </span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Discover how our {title} expertise transforms your business outcomes.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 80}>
                <div className="relative p-7 rounded-2xl group hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 4px 28px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      {processSteps && (
        <section className="relative py-24 overflow-hidden" style={{ background: '#080F20' }}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
            style={{ background: `radial-gradient(circle at top right, ${color}08 0%, transparent 60%)` }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ImageUpdated.svg" alt="" aria-hidden="true"
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[80%] max-h-[400px] w-auto opacity-[0.05] pointer-events-none select-none object-contain" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white">
                Our{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${color}, ${color}80)` }}>
                  Approach
                </span>
              </h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <AnimatedSection key={step.title} delay={i * 100}>
                  <div className="text-center relative">
                    {i < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-5 left-full w-full h-0.5 -translate-y-0.5"
                        style={{ background: `linear-gradient(90deg, ${color}50, transparent)` }} />
                    )}
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${color}, ${color}80)`,
                        boxShadow: `0 8px 24px ${color}40`,
                      }}
                    >
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
