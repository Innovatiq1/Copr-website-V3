import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import VideoSection from '@/components/VideoSection';
import TiltCard from '@/components/TiltCard';
import CounterSection from '@/components/CounterSection';
import CtaSection from '@/components/home/CtaSection';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Innovatiq Technologies | AI-Powered IT Solutions',
  description: 'Learn about Innovatiq Technologies, delivering AI-powered IT solutions, Digital Transformation, Managed IT Services, Cloud, and Cyber Security across Singapore.',
  keywords: 'About Innovatiq, IT Company Singapore, AI Solutions Company, Digital Transformation Company, Managed IT Provider, Cloud Services, Cyber Security, Enterprise Software, Innovatiq Technologies',
  alternates: { canonical: 'https://innovatiq.com.sg/about-us' },
  openGraph: {
    title: 'About Innovatiq Technologies',
    description: 'Discover how Innovatiq Technologies empowers businesses with AI, Cloud, Cyber Security, Managed IT Services, and Digital Transformation.',
    url: 'https://innovatiq.com.sg/about-us',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Innovatiq Technologies',
    description: 'Learn about our expertise in AI-powered enterprise software and digital transformation services.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://innovatiq.com.sg/#organization',
      name: 'Innovatiq Technologies',
      url: 'https://innovatiq.com.sg',
      logo: 'https://innovatiq.com.sg/logo/logo.png',
      email: 'info@innovatiq.com.sg',
      telephone: '+6567420955',
    },
    {
      '@type': 'AboutPage',
      '@id': 'https://innovatiq.com.sg/about-us#aboutpage',
      url: 'https://innovatiq.com.sg/about-us',
      name: 'About Innovatiq Technologies',
      description: 'Learn about Innovatiq Technologies, delivering AI-powered IT solutions, Digital Transformation, Managed IT Services, Cloud, and Cyber Security across Singapore.',
      isPartOf: { '@id': 'https://innovatiq.com.sg/#website' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://innovatiq.com.sg' },
        { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://innovatiq.com.sg/about-us' },
      ],
    },
  ],
};

const WHY_US = [
  {
    icon: '/images/aboutUs/whyUsSet1.svg',
    title: 'Focus on Digital Transformation',
    description: 'Digital Transformation is more than a service for us; it\'s a commitment. We specialise in comprehensive Digital Transformation solutions that revitalise businesses, enhance efficiency, and position them for sustained success.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        badge="About Us"
        title="About Innovatiq Technologies"
        subtitle="At Innovatiq, we believe in the power of innovation to transform businesses and elevate their digital presence. As a premier Information Technology Enabled Service (ITES) provider, we specialise in delivering cutting-edge solutions that drive digital transformation for our clients."
      />

      {/* Vision & Mission */}
      <section className="relative pt-8 pb-10 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(190,18,60,0.05) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(244,63,94,0.04) 0%, transparent 60%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Vision */}
            <AnimatedSection direction="left">
              <TiltCard intensity={8} className="h-full">
                <div className="rounded-3xl overflow-hidden h-full relative"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.07)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}>
                  <div className="relative flex items-center justify-center overflow-hidden" style={{ height: '300px', background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 50%, #fecdd3 100%)' }}>
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #fda4af 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                    <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #fb7185 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #BE123C 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <Image src="/images/ourVision.png" alt="Innovatiq Technologies Office" fill style={{ objectFit: 'contain', padding: '20px' }} sizes="50vw" />
                  </div>
                  <div className="p-8">
                    <div className="inline-flex items-center gap-2.5 mb-5">
                      <span className="flex items-center justify-center w-9 h-9 rounded-xl"
                        style={{ background: '#fce7ea', border: '1.5px solid rgba(190,18,60,0.22)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                          <path d="M9 18h6"/><path d="M10 22h4"/>
                        </svg>
                      </span>
                      <span className="text-base font-bold tracking-tight" style={{ color: '#BE123C' }}>Our Vision</span>
                    </div>
                    <p className="leading-relaxed text-[16px] font-medium" style={{ color: '#1a1a1a' }}>
                      Our vision is to be the trailblazer leading the way towards a digitally empowered future.
                      We envision a world where businesses integrate technology into every aspect of their operations,
                      driving growth, innovation, and sustainability. Through pursuit of excellence, we aim to be
                      the driving force behind this transformation — shaping the digital destiny of businesses worldwide.
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
                  <div className="relative flex items-center justify-center overflow-hidden" style={{ height: '300px', background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #c7d2fe 100%)' }}>
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #a5b4fc 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                    <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #4F46E5 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <Image src="/images/ourMission.png" alt="AI Solutions Team" fill style={{ objectFit: 'contain', padding: '20px' }} sizes="50vw" />
                  </div>
                  <div className="p-8">
                    <div className="inline-flex items-center gap-2.5 mb-5">
                      <span className="flex items-center justify-center w-9 h-9 rounded-xl"
                        style={{ background: '#e8eafd', border: '1.5px solid rgba(79,70,229,0.22)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                        </svg>
                      </span>
                      <span className="text-base font-bold tracking-tight" style={{ color: '#4F46E5' }}>Our Mission</span>
                    </div>
                    <p className="leading-relaxed text-[16px] font-medium" style={{ color: '#1a1a1a' }}>
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
      <section className="relative pt-10 md:pt-14 pb-10 md:pb-20 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top left, rgba(190,18,60,0.05) 0%, transparent 60%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
              style={{ color: '#BE123C', background: '#FFFFFF', border: '1.5px solid rgba(190,18,60,0.40)', boxShadow: '0 2px 10px rgba(190,18,60,0.12)' }}>
              Core Values
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              The Principles That{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #F43F5E 100%)' }}>Guide Us</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '/images/aboutUs/innovationicon.svg', title: 'Innovation', desc: 'We are driven by innovation, pushing the boundaries of what\'s possible to deliver bold digital solutions that create meaningful impact.', color: '#BE123C' },
              { icon: '/images/aboutUs/respecticon.svg', title: 'Respect', desc: 'We treat all individuals with respect, fostering an inclusive and supportive environment where everyone feels valued and empowered to contribute.', color: '#F59E0B' },
              { icon: '/images/aboutUs/agilityicon.svg', title: 'Agility', desc: 'We embrace agility as a core value, adapting quickly to change and leveraging emerging technologies to stay ahead of the curve every day.', color: '#F43F5E' },
              { icon: '/images/aboutUs/Integrityicon.svg', title: 'Integrity', desc: 'We act with integrity, ensuring honesty, transparency, and ethical practices in everything we do, building trust with clients and partners alike.', color: '#10B981' },
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
                    <h3 className="font-bold text-lg mb-2" style={{ color: '#1a1a1a' }}>{v.title}</h3>
                    <p className="text-[15.5px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>{v.desc}</p>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="relative pt-12 md:pt-24 pb-16 md:pb-20 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top left, rgba(245,158,11,0.04) 0%, transparent 60%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
                style={{ color: '#BE123C', background: '#FFFFFF', border: '1.5px solid rgba(190,18,60,0.38)', boxShadow: '0 2px 10px rgba(190,18,60,0.12)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#BE123C' }} />
                Who We Are
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Who{' '}
                <span style={{ color: '#BE123C' }}>We</span>
                {' '}Are
              </h2>
              <p className="text-[#3d3d3d] font-semibold leading-relaxed mb-6 text-[17px]">
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
                      style={{ background: 'rgba(190,18,60,0.10)' }}>
                      <CheckCircle2 size={13} style={{ color: '#BE123C' }} />
                    </div>
                    <span className="text-[#3d3d3d] text-[16px] font-semibold">{p}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <TiltCard intensity={6} className="relative">
                <div className="rounded-3xl overflow-hidden"
                  style={{ height: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <Image src="/images/aboutUs/AboutUsHeroSection.jpg" alt="Digital Transformation Experts" fill
                    style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" quality={65} priority />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 60%)' }} />
                </div>
                <div className="absolute -bottom-5 left-3 sm:-bottom-5 sm:-left-5 rounded-2xl p-4"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                  }}>
                  <p className="text-3xl font-bold" style={{ color: '#BE123C' }}>15+</p>
                  <p className="text-xs text-gray-600 font-semibold mt-0.5">Years of Excellence</p>
                </div>
                <div className="absolute -top-5 right-3 sm:-top-5 sm:-right-5 rounded-2xl p-4"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                  }}>
                  <p className="text-3xl font-bold" style={{ color: '#F59E0B' }}>3</p>
                  <p className="text-xs text-gray-600 font-semibold mt-0.5">Countries</p>
                </div>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <VideoSection filterType="aboutUs" filterKey="whoWeAre" heading="Who We Are" subheading="Learn more about the people and purpose behind Innovatiq Technologies." />

      <CounterSection />

      {/* Why Us? */}
      <section className="relative py-12 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
        {/* Ambient decorations */}
        <div className="absolute top-0 right-0 w-125 h-125 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(190,18,60,0.05) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-100 h-100 pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(244,63,94,0.04) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{ backgroundImage: 'radial-gradient(circle, #BE123C 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
              style={{ color: '#BE123C', background: '#FFFFFF', border: '1.5px solid rgba(190,18,60,0.40)', boxShadow: '0 2px 10px rgba(190,18,60,0.12)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#BE123C]" />
              Why Us?
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Innovatiq –{' '}
              <span className="bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] bg-clip-text text-transparent">
                Shaping Tomorrow&apos;s Digital Landscape
              </span>
              , Today
            </h2>
            <p className="text-[#3d3d3d] font-semibold max-w-2xl mx-auto leading-relaxed">
              We combine deep technology expertise with industry-specific knowledge to deliver transformative outcomes for businesses across Asia Pacific.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {WHY_US.map((item, i) => {
              const accent = ['#BE123C', '#F43F5E', '#10B981'][i];
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
                    <h3 className="font-bold text-lg mb-3" style={{ color: '#1a1a1a' }}>{item.title}</h3>
                    <p className="text-[16px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>{item.description}</p>
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
