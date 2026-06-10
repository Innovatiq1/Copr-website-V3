import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import CtaSection from '@/components/home/CtaSection';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    name: 'SkillEra',
    subtitle: 'Training Management System',
    tagline: 'Smart Learning. Simplified Growth.',
    description: 'AI-powered training lifecycle management with intelligent recommendations, advanced analytics, and automated workflows.',
    href: '/products/skillera',
    gradient: 'linear-gradient(135deg, #1D4ED8 0%, #A8102E 100%)',
    color: '#1D4ED8',
    features: ['AI Recommendations', 'Analytics Dashboard', 'Automated Workflows', 'Mobile Learning'],
    badge: 'Most Popular',
  },
  {
    name: 'LearnPro',
    subtitle: 'Learning Management System',
    tagline: 'Next-Gen LMS Platform.',
    description: 'Comprehensive learning platform enabling organizations to create, manage, and deliver training programs at scale.',
    href: '/products/learnpro',
    gradient: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
    color: '#3B82F6',
    features: ['Course Builder', 'Progress Tracking', 'Certifications', 'Social Learning'],
    badge: null,
  },
  {
    name: 'SecurOn',
    subtitle: 'Patch Management System',
    tagline: 'Automated Security Patching.',
    description: 'Enterprise-grade patch management ensuring your infrastructure stays secure and compliant.',
    href: '/products/securon',
    gradient: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)',
    color: '#10B981',
    features: ['Auto Patching', 'Compliance Reports', 'Vulnerability Scan', 'Zero-Downtime'],
    badge: null,
  },
  {
    name: 'LMP',
    subtitle: 'Learning Motivational Platform',
    tagline: 'Boost Learner Engagement.',
    description: 'Gamification-powered platform that drives learner engagement and improves training completion rates.',
    href: '/products/lmp',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
    color: '#8B5CF6',
    features: ['Gamification', 'Leaderboards', 'Rewards', 'Engagement Analytics'],
    badge: null,
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        badge="Our Products"
        title="Purpose-Built SaaS Products"
        subtitle="Innovative software platforms designed to transform how enterprises learn, secure, and grow their workforce."
      />

      <section className="relative py-24 overflow-hidden" style={{ background: '#080F20' }}>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top left, rgba(29,78,216,0.1) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom right, rgba(139,92,246,0.08) 0%, transparent 60%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/image%20191.svg" alt="" aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[90%] max-h-[500px] w-auto opacity-[0.05] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, i) => (
              <AnimatedSection key={product.name} delay={i * 100}>
                <div
                  className="group rounded-2xl overflow-hidden p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 relative"
                  style={{ background: product.gradient, boxShadow: `0 10px 40px ${product.color}25` }}
                >
                  {product.badge && (
                    <span className="self-start text-xs font-semibold px-3 py-1 rounded-full mb-4"
                      style={{ background: '#F59E0B', color: '#7A5A0A' }}>
                      {product.badge}
                    </span>
                  )}
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{product.subtitle}</p>
                  <h3 className="text-3xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-white/80 font-medium mb-4">{product.tagline}</p>
                  <p className="text-white/70 text-sm leading-relaxed mb-5">{product.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6 flex-1">
                    {product.features.map(f => (
                      <span key={f} className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Link href={product.href}
                      className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-lg transition-all"
                      style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                      Learn More <ArrowRight size={14} />
                    </Link>
                    <Link href="/contact"
                      className="inline-flex items-center gap-2 font-medium text-sm px-4 py-2.5 rounded-lg border transition-all"
                      style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.75)' }}>
                      Free Trial
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-16 text-center">
            <div className="relative p-8 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #1D4ED8, #8B5CF6, transparent)' }} />
              <h3 className="text-xl font-bold text-white mb-3">Not Sure Which Product Fits Your Needs?</h3>
              <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                Our product experts can help you find the right solution for your organization.
                Schedule a free 30-minute consultation today.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #1D4ED8, #A8102E)', boxShadow: '0 4px 16px rgba(29,78,216,0.35)' }}>
                Talk to an Expert <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
