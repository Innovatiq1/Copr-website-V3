import PageHero from './PageHero';
import AnimatedSection from './AnimatedSection';
import CtaSection from './home/CtaSection';
import VideoSection from './VideoSection';
import { CheckCircle2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

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

const renderIcon = (iconName: string, size: number = 24, style?: React.CSSProperties) => {
  const IconComponent = (LucideIcons as any)[iconName];
  if (IconComponent) {
    return <IconComponent size={size} style={style} strokeWidth={1.75} />;
  }

  // Fallback map for emoji characters to Lucide icons
  const emojiMap: Record<string, any> = {
    '📈': LucideIcons.TrendingUp,
    '⚡': LucideIcons.Zap,
    '💰': LucideIcons.Coins,
    '🔒': LucideIcons.Lock,
    '🌐': LucideIcons.Globe,
    '⚙️': LucideIcons.Settings,
    '⚙': LucideIcons.Settings,
    '🚀': LucideIcons.Rocket,
    '📋': LucideIcons.ClipboardList,
    '🔄': LucideIcons.RefreshCw,
    '🖥': LucideIcons.Monitor,
    '⚠': LucideIcons.AlertTriangle,
    '⚠️': LucideIcons.AlertTriangle,
    '🎯': LucideIcons.Target,
    '📊': LucideIcons.BarChart3,
    '🤝': LucideIcons.Handshake,
    '🎓': LucideIcons.GraduationCap,
    '🔍': LucideIcons.Search,
    '🚨': LucideIcons.Siren,
    '🛡': LucideIcons.Shield,
    '✨': LucideIcons.Sparkles,
    '💡': LucideIcons.Lightbulb,
    '🤖': LucideIcons.Bot,
    '🧠': LucideIcons.Brain,
    '🏆': LucideIcons.Trophy,
    '👷': LucideIcons.HardHat,
    '📍': LucideIcons.MapPin,
    '👥': LucideIcons.Users,
    '📡': LucideIcons.Radio,
    '🎨': LucideIcons.Palette,
    '🎬': LucideIcons.Film,
    '🏢': LucideIcons.Building2,
    '📝': LucideIcons.FileText,
    '🔗': LucideIcons.Link2,
    '💬': LucideIcons.MessageSquare,
    '🗺️': LucideIcons.Map,
    '🗺': LucideIcons.Map,
    '🏅': LucideIcons.Medal,
    '👏': LucideIcons.ThumbsUp,
    '🔭': LucideIcons.Telescope,
    '👤': LucideIcons.User,
    '📌': LucideIcons.Pin,
    '📤': LucideIcons.Upload,
    '🔑': LucideIcons.Key,
    '🔔': LucideIcons.Bell,
    '🗃️': LucideIcons.FolderOpen,
    '🗃': LucideIcons.FolderOpen,
    '✅': LucideIcons.CheckCircle2,
    '↩️': LucideIcons.Undo,
    '📱': LucideIcons.Smartphone,
  };

  const MappedComponent = emojiMap[iconName];
  if (MappedComponent) {
    return <MappedComponent size={size} style={style} strokeWidth={1.75} />;
  }

  // Fallback to text (e.g. if it's a character or emoji we didn't map)
  return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>{iconName}</span>;
};

export default function ServicePageTemplate({
  badge,
  title,
  subtitle,
  overview,
  overviewPoints,
  benefits,
  processSteps,
  color = '#BE123C',
  detailCards,
  investmentCards,
  serviceType,
}: Props) {
  return (
    <>
      <PageHero badge={badge} title={title} subtitle={subtitle} />

      {/* Overview */}
      <section className="relative pt-8 pb-24 overflow-hidden" style={{ background: '#FFFFFF' }}>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
                style={{ color, background: '#FFFFFF', borderColor: color, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                Overview
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{title}</h2>
              <p className="text-[17px] leading-relaxed mb-8" style={{ color: '#1a1a1a', fontWeight: 500 }}>{overview}</p>
              <div className="space-y-3">
                {overviewPoints.map(point => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${color}12` }}>
                      <CheckCircle2 size={12} style={{ color }} />
                    </div>
                    <span className="text-[17px]" style={{ color: '#1a1a1a', fontWeight: 500 }}>{point}</span>
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
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {benefits.slice(0, 4).map(b => (
                    <div key={b.title} className="p-3 sm:p-4 rounded-xl flex flex-col gap-2 sm:gap-3"
                      style={{ background: `${color}06`, border: `1px solid ${color}12` }}>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${color}12`, border: `1px solid ${color}20`, color: color }}>
                        {renderIcon(b.icon, 18, { color })}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-1 text-[15px] sm:text-[17px] leading-snug">{b.title}</h4>
                        <p className="hidden sm:block text-[16px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>{b.description}</p>
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
          style={{ background: 'radial-gradient(ellipse at top right, rgba(244,63,94,0.04) 0%, transparent 70%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Design.svg" alt="" aria-hidden="true"
          className="absolute right-0 bottom-0 h-[70%] max-h-[400px] w-auto opacity-[0.12] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
              style={{ color, background: '#FFFFFF', borderColor: color, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              What We Deliver
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              Key{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #F43F5E 100%)` }}>
                Benefits
              </span>
            </h2>
            <p className="font-semibold mt-3 max-w-xl mx-auto" style={{ color: '#1a1a1a' }}>
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
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}10`, border: `1.5px solid ${color}20`, color: color }}>
                    {renderIcon(b.icon, 22, { color })}
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#1a1a1a' }}>{b.title}</h3>
                  <p className="text-[16px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>{b.description}</p>
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
                style={{ color, background: '#FFFFFF', borderColor: color, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                How We Work
              </span>
              <h2 className="text-4xl font-bold text-gray-900">
                Our{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #F43F5E 100%)` }}>
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
                    <p className="text-[16px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>{step.description}</p>
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
                style={{ color, background: '#FFFFFF', borderColor: color, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
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
                    <h3 className="font-bold text-[17px] mb-3" style={{ color }}>{card.title}</h3>
                    <p className="text-[16px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>{card.description}</p>
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
                style={{ color, background: '#FFFFFF', borderColor: color, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                ROI & Value
              </span>
              <h2 className="text-4xl font-bold text-gray-900">
                Protect Your{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${color}, ${color}80)` }}>
                  Investments
                </span>
              </h2>
              <p className="font-medium mt-3 max-w-xl mx-auto" style={{ color: '#1a1a1a' }}>
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
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0 transition-transform duration-300 group-hover:scale-110 mx-auto"
                      style={{ background: `${color}10`, border: `1.5px solid ${color}20`, color: color }}>
                      {renderIcon(card.icon, 22, { color })}
                    </div>
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">{card.title}</h3>
                    <p className="text-[16px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>{card.description}</p>
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
