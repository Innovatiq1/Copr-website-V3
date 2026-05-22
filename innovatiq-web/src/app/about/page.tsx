import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import ParallaxLayer from '@/components/ParallaxLayer';
import TiltCard from '@/components/TiltCard';
import CounterSection from '@/components/CounterSection';
import CtaSection from '@/components/home/CtaSection';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="Our Story"
        title="Empowering Enterprises Through Digital Innovation"
        subtitle="Innovatiq Technologies is a Singapore-based IT solutions company transforming how enterprises leverage technology across Asia Pacific."
      />

      {/* Vision & Mission */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#080F20' }}>
        <ParallaxLayer
          speed={0.3}
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(212,23,74,0.12) 0%, transparent 60%)' }}
        />
        <ParallaxLayer
          speed={0.2}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(155,117,34,0.08) 0%, transparent 60%)' }}
        />
        <ParallaxLayer speed={0.4} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/aboutUs/About%20US%20HERO%20IMAGE.svg" alt="" aria-hidden="true"
            className="h-[90%] max-h-[500px] w-auto opacity-[0.06] object-contain" />
        </ParallaxLayer>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 mb-8">

            {/* Vision */}
            <AnimatedSection direction="left">
              <TiltCard intensity={8} className="h-full">
                <div className="rounded-3xl overflow-hidden h-full relative"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: 'linear-gradient(90deg, #D4174A, transparent)' }} />
                  <div className="relative h-52 overflow-hidden" style={{ background: 'rgba(11,29,53,0.5)' }}>
                    <Image src="/images/aboutUs/visionimg.svg" alt="Vision" fill style={{ objectFit: 'contain', padding: '24px' }} />
                  </div>
                  <div className="p-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
                      style={{ background: 'rgba(212,23,74,0.15)', color: '#FAC86B', border: '1px solid rgba(212,23,74,0.2)' }}>
                      🎯 Our Vision
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      To be the most trusted technology partner for enterprises across Asia Pacific,
                      empowering them through intelligent digital solutions that create sustainable competitive advantage.
                      We envision a future where every business can harness cutting-edge technology to achieve its full potential.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>

            {/* Mission */}
            <AnimatedSection direction="right">
              <TiltCard intensity={8} className="h-full">
                <div className="rounded-3xl overflow-hidden h-full relative"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: 'linear-gradient(90deg, #F59E0B, transparent)' }} />
                  <div className="relative h-52 overflow-hidden" style={{ background: 'rgba(30,20,5,0.5)' }}>
                    <Image src="/images/aboutUs/missionImg.svg" alt="Mission" fill style={{ objectFit: 'contain', padding: '24px' }} />
                  </div>
                  <div className="p-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
                      style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' }}>
                      🚀 Our Mission
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      To deliver transformative digital experiences through expert consulting, innovative software products,
                      and reliable managed services. We partner with clients on their digital transformation journeys,
                      providing end-to-end solutions that accelerate growth and build future-ready organizations.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#07101E' }}>
        <ParallaxLayer
          speed={0.35}
          className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top left, rgba(212,23,74,0.18) 0%, transparent 60%)' }}
        />
        <ParallaxLayer speed={0.45} className="absolute right-0 bottom-0 pointer-events-none select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/aboutUs/ourValueImg.svg" alt="" aria-hidden="true"
            className="h-[80%] max-h-[450px] w-auto opacity-[0.06] object-contain" />
        </ParallaxLayer>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
              style={{ color: '#D4174A', background: 'rgba(212,23,74,0.1)', border: '1px solid rgba(212,23,74,0.2)' }}>
              Core Values
            </span>
            <h2 className="text-4xl font-bold text-white">
              The Principles That{' '}
              <span className="bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">Guide Us</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '/images/aboutUs/innovationicon.svg', title: 'Innovation', desc: 'Continuously pushing boundaries to develop cutting-edge solutions.', color: '#D4174A' },
              { icon: '/images/aboutUs/respecticon.svg', title: 'Respect', desc: 'Cultivating an inclusive environment where every perspective is valued.', color: '#F59E0B' },
              { icon: '/images/aboutUs/agilityicon.svg', title: 'Agility', desc: 'Adapting rapidly to help clients navigate evolving markets.', color: '#3B82F6' },
              { icon: '/images/aboutUs/Integrityicon.svg', title: 'Integrity', desc: 'Operating with absolute honesty and transparency in everything we do.', color: '#10B981' },
            ].map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 80}>
                <TiltCard intensity={12} className="h-full">
                  <div className="relative rounded-2xl text-center p-7 h-full overflow-hidden"
                    style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      boxShadow: '0 4px 28px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
                    }}>
                    <div className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: `linear-gradient(90deg, ${v.color}, transparent)` }} />
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: `${v.color}15`, border: `1px solid ${v.color}25` }}>
                      <Image src={v.icon} alt={v.title} width={40} height={40} style={{ objectFit: 'contain' }} />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{v.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#080F20' }}>
        <ParallaxLayer
          speed={0.25}
          className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top left, rgba(155,117,34,0.1) 0%, transparent 60%)' }}
        />
        <ParallaxLayer speed={0.4} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/aboutUs/whoWeAreSet1.svg" alt="" aria-hidden="true"
            className="h-[80%] max-h-[440px] w-auto opacity-[0.06] object-contain" />
        </ParallaxLayer>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
                style={{ color: '#F59E0B', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                Who We Are
              </span>
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                Built for the{' '}
                <span className="bg-gradient-to-r from-[#F59E0B] to-[#D4A847] bg-clip-text text-transparent">Digital Age</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Innovatiq Technologies was founded with a clear purpose: to make enterprise-grade
                digital transformation accessible to organizations of all sizes across Asia Pacific.
                From our headquarters in Singapore, we serve clients in over 10 industries.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Digital architects with purpose-led design',
                  'Innovation as our guiding principle',
                  'Client-centric approach to every engagement',
                  'Long-term partnerships over transactional relationships',
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
            </AnimatedSection>

            <AnimatedSection direction="right">
              <TiltCard intensity={6} className="relative">
                <div className="rounded-3xl overflow-hidden" style={{ height: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                  <Image src="/images/aboutUs/AboutUsHeroSection.jpg" alt="About Innovatiq" fill
                    style={{ objectFit: 'cover' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,11,20,0.4) 0%, transparent 60%)' }} />
                </div>
                <div className="absolute -bottom-5 -left-5 rounded-2xl p-4"
                  style={{
                    background: 'rgba(6,11,20,0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}>
                  <p className="text-3xl font-bold" style={{ color: '#D4174A' }}>15+</p>
                  <p className="text-xs text-gray-400 mt-0.5">Years of Excellence</p>
                </div>
                <div className="absolute -top-5 -right-5 rounded-2xl p-4"
                  style={{
                    background: 'rgba(6,11,20,0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}>
                  <p className="text-3xl font-bold" style={{ color: '#F59E0B' }}>3</p>
                  <p className="text-xs text-gray-400 mt-0.5">Countries</p>
                </div>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CounterSection />
      <CtaSection />
    </>
  );
}
