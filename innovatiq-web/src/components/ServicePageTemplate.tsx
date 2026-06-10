import PageHero from './PageHero';
import AnimatedSection from './AnimatedSection';
import CtaSection from './home/CtaSection';
import VideoSection from './VideoSection';
import { CheckCircle2 } from 'lucide-react';

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface DetailCard {
  title: string;
  description: string;
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
  detailCards?: DetailCard[];
  investmentCards?: Benefit[];
  serviceType?: string;
}

export default function ServicePageTemplate({
  badge,
  title,
  subtitle,
  overview,
  overviewPoints,
  benefits,
  processSteps,
  color = '#1D4ED8',
  detailCards,
  investmentCards,
  serviceType,
}: Props) {
  return (
    <>
      <PageHero badge={badge} title={title} subtitle={subtitle} />

      {/* Overview */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#FFFFFF', borderTop: '1px solid rgba(0,0,0,0.06)' }}>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
                style={{ color, background: `${color}10`, borderColor: `${color}30` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                Overview
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{title}</h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-8">{overview}</p>
              <div className="space-y-3">
                {overviewPoints.map(point => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${color}12` }}>
                      <CheckCircle2 size={12} style={{ color }} />
                    </div>
                    <span className="text-slate-600 text-[15px] font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="rounded-2xl p-8"
                style={{
                  background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, ${color} 0%, ${color} 20%, ${color}CC 45%, ${color}55 70%, transparent 90%) border-box`,
                  borderStyle: 'solid',
                  borderColor: 'transparent',
                  borderTopWidth: '4px',
                  borderLeftWidth: '0',
                  borderRightWidth: '0',
                  borderBottomWidth: '0',
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)',
                }}>
                <div className="grid grid-cols-2 gap-4">
                  {benefits.slice(0, 4).map(b => (
                    <div key={b.title} className="p-4 rounded-xl flex flex-col gap-3"
                      style={{ background: `${color}06`, border: `1px solid ${color}12` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
                        {b.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-1 text-[15.5px] leading-snug">{b.title}</h4>
                        <p className="text-slate-600 text-[13.5px] font-medium leading-relaxed">{b.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* All Benefits */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at bottom left, ${color}05 0%, transparent 70%)` }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(59,130,246,0.04) 0%, transparent 70%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Design.svg" alt="" aria-hidden="true"
          className="absolute right-0 bottom-0 h-[70%] max-h-[400px] w-auto opacity-[0.12] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
              style={{ color, borderColor: `${color}25`, background: `${color}08` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              What We Deliver
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              Key{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, #1E40AF 0%, #1D4ED8 50%, #3B82F6 100%)` }}>
                Benefits
              </span>
            </h2>
            <p className="text-slate-600 font-medium mt-3 max-w-xl mx-auto">
              Discover how our {title} expertise transforms your business outcomes.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 80} className="h-full">
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
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{b.title}</h3>
                  <p className="text-slate-600 text-base font-medium leading-relaxed">{b.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      {processSteps && (
        <section className="relative py-24 overflow-hidden" style={{ background: '#FFFFFF' }}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
            style={{ background: `radial-gradient(circle at top right, ${color}05 0%, transparent 60%)` }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ImageUpdated.svg" alt="" aria-hidden="true"
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[80%] max-h-[400px] w-auto opacity-[0.12] pointer-events-none select-none object-contain" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
                style={{ color, borderColor: `${color}25`, background: `${color}08` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                How We Work
              </span>
              <h2 className="text-4xl font-bold text-gray-900">
                Our{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, #1E40AF 0%, #1D4ED8 50%, #3B82F6 100%)` }}>
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
                        style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
                    )}
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                        boxShadow: `0 8px 24px ${color}35`,
                      }}>
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">{step.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Detail Cards */}
      {detailCards && detailCards.length > 0 && (
        <section className="relative py-24 overflow-hidden" style={{ background: '#FFFFFF' }}>
          <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse at top left, ${color}04 0%, transparent 70%)` }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
                style={{ color, borderColor: `${color}25`, background: `${color}08` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                Our Expertise
              </span>
              <h2 className="text-4xl font-bold text-gray-900">
                Service{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${color}, ${color}80)` }}>
                  Capabilities
                </span>
              </h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {detailCards.map((card, i) => (
                <AnimatedSection key={card.title} delay={i * 80}>
                  <div className="p-7 h-full hover:-translate-y-1 transition-all duration-300"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(0,0,0,0.07)',
                      borderRadius: '16px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)',
                      borderLeft: `3px solid ${color}`,
                    }}>
                    <h3 className="font-semibold text-gray-800 mb-3" style={{ color }}>{card.title}</h3>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">{card.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Protect Your Investments */}
      {investmentCards && investmentCards.length > 0 && (
        <section className="relative py-24 overflow-hidden" style={{ background: '#F8FAFC' }}>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse at bottom right, ${color}05 0%, transparent 70%)` }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
                style={{ color, borderColor: `${color}25`, background: `${color}08` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                ROI & Value
              </span>
              <h2 className="text-4xl font-bold text-gray-900">
                Protect Your{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${color}, ${color}80)` }}>
                  Investments
                </span>
              </h2>
              <p className="text-slate-600 font-medium mt-3 max-w-xl mx-auto">
                Our managed services deliver measurable return on investment while protecting your business assets.
              </p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-3 gap-6">
              {investmentCards.map((card, i) => (
                <AnimatedSection key={card.title} delay={i * 100}>
                  <div className="p-8 text-center rounded-2xl h-full hover:-translate-y-1 transition-all duration-300"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(0,0,0,0.07)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
                    }}>
                    <div className="text-4xl mb-4">{card.icon}</div>
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">{card.title}</h3>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">{card.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {serviceType && <VideoSection filterType="services" filterKey={serviceType} />}
      <CtaSection />
    </>
  );
}
