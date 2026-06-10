import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import ParallaxLayer from '@/components/ParallaxLayer';
import TiltCard from '@/components/TiltCard';
import CounterSection from '@/components/CounterSection';
import CtaSection from '@/components/home/CtaSection';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const WHY_US = [
  {
    icon: '/images/aboutUs/whyUsSet1.svg',
    title: 'Focus on Digital Transformation',
    description: 'Digital Transformation is more than a service for us; it\'s a commitment. We specialize in comprehensive Digital Transformation solutions that revitalize businesses, enhance efficiency, and position them for sustained success.',
  },
  {
    icon: '/images/aboutUs/whyUsSet2.svg',
    title: 'Holistic ITES Solutions',
    description: 'Innovatiq doesn\'t just provide services; we offer end-to-end ITES solutions. From customer support to data management, our suite of services is designed to cater to the diverse needs of businesses across industries.',
  },
  {
    icon: '/images/aboutUs/whyUsSet3.svg',
    title: 'Tech-Driven Excellence',
    description: 'Our team of experts is at the forefront of technology. We leverage the latest advancements in AI, IoT, and cloud computing to deliver solutions that not only meet industry standards but exceed expectations.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About Us"
        title="Innovatiq – Shaping Tomorrow's Digital Landscape, Today"
        subtitle="At Innovatiq, we believe in the power of innovation to transform businesses and elevate their digital presence. As a premier Information Technology Enabled Service (ITES) provider, we specialize in delivering cutting-edge solutions that drive digital transformation for our clients."
      />

      {/* Vision & Mission */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <ParallaxLayer
          speed={0.3}
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(212,23,74,0.05) 0%, transparent 60%)' }}
        />
        <ParallaxLayer
          speed={0.2}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(59,130,246,0.04) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 mb-8">

            {/* Vision */}
            <AnimatedSection direction="left">
              <TiltCard intensity={8} className="h-full">
                <div className="rounded-3xl overflow-hidden h-full relative"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.07)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}>
                  <div className="relative h-52 overflow-hidden" style={{ background: '#FFF5F7' }}>
                    <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[#D4174A] opacity-60" />
                    <Image src="/images/aboutUs/visionimg.svg" alt="Vision" fill style={{ objectFit: 'contain', padding: '24px' }} />
                  </div>
                  <div className="p-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
                      style={{ background: 'rgba(212,23,74,0.08)', color: '#D4174A', border: '1px solid rgba(212,23,74,0.15)' }}>
                      🎯 Our Vision
                    </div>
                    <p className="text-slate-500 leading-relaxed text-base font-medium">
                      Our vision at Innovatiq is to be the trailblazer in leading the way towards a digitally empowered future.
                      We envision a world where businesses seamlessly integrate technology into every aspect of their operations,
                      driving growth, innovation, and sustainability. Through our relentless pursuit of excellence and innovation,
                      we aim to be the driving force behind this transformation, shaping the digital destiny of businesses worldwide.
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
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.07)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}>
                  <div className="relative h-52 overflow-hidden" style={{ background: '#FFFBEB' }}>
                    <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-amber-400 opacity-70" />
                    <Image src="/images/aboutUs/missionImg.svg" alt="Mission" fill style={{ objectFit: 'contain', padding: '24px' }} />
                  </div>
                  <div className="p-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
                      style={{ background: 'rgba(245,158,11,0.08)', color: '#D97706', border: '1px solid rgba(245,158,11,0.18)' }}>
                      🚀 Our Mission
                    </div>
                    <p className="text-slate-500 leading-relaxed text-base font-medium">
                      Driven by a passion for innovation and a commitment to excellence, our mission at Innovatiq is to be
                      the trusted partner in digital transformation. Through our tailored IT-enabled services, we enable
                      businesses to navigate the complexities of digital disruption, unlocking new opportunities, and
                      driving sustainable growth in the digital era.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <ParallaxLayer
          speed={0.35}
          className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top left, rgba(212,23,74,0.05) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
              style={{ color: '#D4174A', background: 'rgba(212,23,74,0.08)', border: '1px solid rgba(212,23,74,0.15)' }}>
              Core Values
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              The Principles That{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #BE123C 0%, #D4174A 50%, #F43F5E 100%)' }}>Guide Us</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '/images/aboutUs/innovationicon.svg', title: 'Innovation', desc: 'We are driven by a passion for innovation, constantly pushing the boundaries of what\'s possible to deliver transformative digital transformation solutions and services.', color: '#D4174A' },
              { icon: '/images/aboutUs/respecticon.svg', title: 'Respect', desc: 'We treat all individuals with respect, fostering an inclusive and supportive environment where everyone feels valued and empowered to contribute their best.', color: '#F59E0B' },
              { icon: '/images/aboutUs/agilityicon.svg', title: 'Agility', desc: 'We embrace agility as a core value, adapting quickly to changing circumstances and leveraging emerging technologies to stay ahead of the curve.', color: '#3B82F6' },
              { icon: '/images/aboutUs/Integrityicon.svg', title: 'Integrity', desc: 'We act with integrity, ensuring honesty, transparency, and ethical practices in everything we do.', color: '#10B981' },
            ].map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 80}>
                <TiltCard intensity={12} className="h-full">
                  <div className="relative rounded-2xl text-center p-7 h-full overflow-hidden"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(0,0,0,0.07)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: `${v.color}10`, border: `1px solid ${v.color}20` }}>
                      <Image src={v.icon} alt={v.title} width={40} height={40} style={{ objectFit: 'contain' }} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{v.title}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{v.desc}</p>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <ParallaxLayer
          speed={0.25}
          className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top left, rgba(245,158,11,0.04) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
                style={{ color: '#D97706', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)' }}>
                Who We Are
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Who We{' '}
                <span className="bg-gradient-to-r from-[#F59E0B] to-[#D4A847] bg-clip-text text-transparent">Are</span>
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                Empowering digital transformations through a fusion of collaboration, excellence, and customer-centricity,
                we elevate standards, unite diverse perspectives, and place our clients at the heart of innovation.
                At the heart of Innovatiq, you&apos;ll find a team of dedicated professionals who are passionate about
                reshaping the digital future.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Digital Architects with a Purpose — reshaping the digital future',
                  'Innovation as a Guiding Principle — beyond solutions, creating experiences',
                  'Client-Centric Approach — tailored to each client\'s unique needs and goals',
                  'Tech-Driven Excellence — leveraging AI, IoT, and cloud computing',
                ].map(p => (
                  <div key={p} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(212,23,74,0.10)' }}>
                      <CheckCircle2 size={13} style={{ color: '#D4174A' }} />
                    </div>
                    <span className="text-slate-600 text-sm font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <TiltCard intensity={6} className="relative">
                <div className="rounded-3xl overflow-hidden"
                  style={{ height: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <Image src="/images/aboutUs/AboutUsHeroSection.jpg" alt="About Innovatiq" fill
                    style={{ objectFit: 'cover' }} />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 60%)' }} />
                </div>
                <div className="absolute -bottom-5 -left-5 rounded-2xl p-4"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                  }}>
                  <p className="text-3xl font-bold" style={{ color: '#D4174A' }}>15+</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Years of Excellence</p>
                </div>
                <div className="absolute -top-5 -right-5 rounded-2xl p-4"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                  }}>
                  <p className="text-3xl font-bold" style={{ color: '#F59E0B' }}>3</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Countries</p>
                </div>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CounterSection />

      {/* Why Us? */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
        {/* Ambient decorations */}
        <div className="absolute top-0 right-0 w-125 h-125 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(212,23,74,0.05) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-100 h-100 pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(59,130,246,0.04) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{ backgroundImage: 'radial-gradient(circle, #D4174A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
              style={{ color: '#D4174A', background: 'rgba(212,23,74,0.08)', border: '1px solid rgba(212,23,74,0.15)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4174A]" />
              Why Us?
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Innovatiq –{' '}
              <span className="bg-gradient-to-r from-[#BE123C] via-[#D4174A] to-[#E11D48] bg-clip-text text-transparent">
                Shaping Tomorrow&apos;s Digital Landscape
              </span>
              , today
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              We combine deep technology expertise with industry-specific knowledge to deliver transformative outcomes for businesses across Asia Pacific.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {WHY_US.map((item, i) => {
              const accent = ['#D4174A', '#3B82F6', '#10B981'][i];
              return (
                <AnimatedSection key={item.title} delay={i * 100} className="h-full">
                  <div className="p-7 hover:-translate-y-1 transition-all duration-300 h-full"
                    style={{
                      background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, ${accent} 0%, ${accent} 20%, ${accent}CC 45%, ${accent}55 70%, transparent 90%) border-box`,
                      borderStyle: 'solid',
                      borderColor: 'transparent',
                      borderTopWidth: '4px',
                      borderLeftWidth: '0',
                      borderRightWidth: '0',
                      borderBottomWidth: '0',
                      borderRadius: '16px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)',
                    }}>
                    {/* Icon row + number badge */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-14 h-14 flex items-center justify-center rounded-2xl shrink-0"
                        style={{ background: `${accent}12`, border: `1px solid ${accent}28` }}>
                        <Image src={item.icon} alt={item.title} width={32} height={32} style={{ objectFit: 'contain' }} />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full tabular-nums"
                        style={{ background: `${accent}08`, color: accent, border: `1px solid ${accent}20` }}>
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-3">{item.title}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
