import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import CtaSection from '@/components/home/CtaSection';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Twitter } from 'lucide-react';

const leadership = [
  {
    name: 'Krishna Das',
    role: 'CEO',
    bio: 'Krishna is a seasoned professional with 30 years of extensive experience in the IT industry, specializing in sales and business development. With a proven track record of success, Krishna has held pivotal roles in renowned companies such as HP, IBM, and Fujitsu. Driven by a passion for innovation, he founded Innovatiq with a commitment to excellence, customer-centricity, and technological innovation.',
    expertise: ['Sales & Business Development', 'Enterprise IT', 'Strategic Leadership'],
    photo: '/images/aboutUs/ourTeam/Krishna.jpeg',
    accent: '#D4174A',
  },
  {
    name: 'Prashanth',
    role: 'Director',
    bio: 'Prashanth is one of the Directors of Innovatiq Technologies, leading the Delivery and Technical teams. Drawing from a career spanning over 30 years at MNCs including Wipro, he brings deep expertise in project delivery, technical implementation, and team leadership, guiding the team towards excellence.',
    expertise: ['IT Strategy', 'Program Management', 'Team Leadership'],
    photo: '/images/aboutUs/ourTeam/prashanth-removebg-preview-1.png',
    accent: '#F59E0B',
  },
  {
    name: 'Srinivas Rao',
    role: 'Business Head India',
    bio: 'An established and proven Leader for a large German based & NYSE Listed company with over 28+ years of experience. Business focused professional and thought leader in Management, Sales and Business consulting. Strategist & executioner with demonstrated ability by leveraging competence of the organization and aligning delivery with business objectives of the customer.',
    expertise: ['Business Development', 'P&L Management', 'Strategic Leadership'],
    photo: '/images/aboutUs/ourTeam/Srinivash.PNG',
    accent: '#3B82F6',
  },
  {
    name: 'Sujatha',
    role: 'HR Manager',
    bio: 'Sujatha is an accomplished professional with a wealth of experience in the managed resources business. Currently serving as the Head of Resources Business at Innovatiq, she brings a combination of strategic vision, operational expertise, and leadership acumen. With an MBA degree and 18 years of diverse experience, she has a proven track record of delivering results in challenging environments.',
    expertise: ['Resource Management', 'HR Strategy', 'Operational Excellence'],
    photo: '/images/aboutUs/ourTeam/Sujatha.jpg',
    accent: '#10B981',
  },
];

const teamMembers = [
  {
    name: 'George',
    role: 'Senior Consultant',
    bio: 'An experienced technology consultant with deep expertise in enterprise IT advisory and solution design, helping clients navigate complex digital transformation journeys across Asia Pacific.',
    expertise: ['IT Consulting', 'Solution Architecture', 'Digital Strategy'],
    photo: '/images/aboutUs/ourTeam/Our Team George.jpg',
    accent: '#D4174A',
  },
  {
    name: 'Abhishek',
    role: 'Regional Sales Head - North',
    bio: 'Abhishek is a seasoned IT professional with 16 years of diverse industry experience spanning sales, business development, and channel management. He combines strong technical expertise with strategic business acumen to align technology solutions with evolving client needs. Known for his consultative approach and results-oriented mindset, he consistently transforms opportunities into sustainable business growth.',
    expertise: ['Sales Leadership', 'Business Development', 'Channel Management'],
    photo: '/images/aboutUs/ourTeam/Abhishek.png',
    accent: '#F59E0B',
  },
  {
    name: 'Thomas Chee',
    role: 'Sr. Sales Account Manager',
    bio: 'A dynamic and results-oriented sales leader, Thomas brings extensive experience in driving business growth and fostering long-term client success. With a strong track record in sales and marketing, he has consistently delivered multi-million-dollar revenues and secured key strategic accounts across competitive markets.',
    expertise: ['Strategic Account Management', 'Business Development', 'Team Leadership'],
    photo: '/images/aboutUs/ourTeam/Thomas-1195x1536.png',
    accent: '#3B82F6',
  },
  {
    name: 'Sathish',
    role: 'Solution Manager',
    bio: 'Sathish is a dynamic presales professional with a sharp ability to align technology solutions with business goals. He thrives at the intersection of sales strategy and technical consulting, crafting compelling proposals and delivering impactful solution demonstrations that build lasting stakeholder trust and accelerate business growth.',
    expertise: ['Presales', 'Solution Design', 'Technical Consulting'],
    photo: '/images/aboutUs/ourTeam/sathish.jpg',
    accent: '#10B981',
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        badge="Our People"
        title="Meet the Team Behind Innovatiq"
        subtitle="Our leadership team brings together decades of technology, business, and digital transformation expertise."
      />

      {/* Leadership */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#080F20' }}>
        <div className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(212,23,74,0.1) 0%, transparent 60%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/aboutUs/whoWeAreSet2.svg" alt="" aria-hidden="true"
          className="absolute right-0 top-0 h-full max-h-[500px] w-auto opacity-[0.05] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
              style={{ color: '#D4174A', background: 'rgba(212,23,74,0.1)', border: '1px solid rgba(212,23,74,0.2)' }}>
              Leadership
            </span>
            <h2 className="text-4xl font-bold text-white">
              Visionary{' '}
              <span className="bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">Leaders</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {leadership.map((m, i) => (
              <AnimatedSection key={m.name} delay={i * 80}>
                <div className="relative rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 4px 28px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] z-10"
                    style={{ background: `linear-gradient(90deg, ${m.accent}, transparent)` }} />

                  {/* Photo */}
                  <div className="relative h-72 overflow-hidden"
                    style={{ background: `${m.accent}08` }}>
                    <Image src={m.photo} alt={m.name} fill
                      className="object-cover object-top" />
                    <div className="absolute inset-0"
                      style={{ background: `linear-gradient(to bottom, transparent 60%, rgba(8,15,32,0.85) 100%)` }} />
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-white text-base leading-tight">{m.name}</h3>
                        <p className="text-xs font-semibold mt-0.5" style={{ color: m.accent }}>{m.role}</p>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <a href="#" className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
                          <Linkedin size={12} />
                        </a>
                        <a href="#" className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
                          <Twitter size={12} />
                        </a>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1">{m.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.expertise.map(e => (
                        <span key={e} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: `${m.accent}12`, color: m.accent, border: `1px solid ${m.accent}20` }}>
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#07101E' }}>
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom right, rgba(212,23,74,0.18) 0%, transparent 60%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/aboutUs/whoWeAreSet3.svg" alt="" aria-hidden="true"
          className="absolute left-0 bottom-0 h-[70%] max-h-[400px] w-auto opacity-[0.05] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              Our{' '}
              <span className="bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">Expert Team</span>
            </h2>
            <p className="text-gray-500 mt-2">100+ certified professionals delivering excellence daily.</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((m, i) => (
              <AnimatedSection key={m.name} delay={i * 80}>
                <div className="relative rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 4px 28px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] z-10"
                    style={{ background: `linear-gradient(90deg, ${m.accent}, transparent)` }} />
                  <div className="relative h-64 overflow-hidden" style={{ background: 'rgba(10,18,37,0.5)' }}>
                    <Image src={m.photo} alt={m.name} fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(7,16,30,0.85) 100%)' }} />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-white text-base leading-tight">{m.name}</h3>
                    <p className="text-xs font-semibold mt-0.5 mb-3" style={{ color: m.accent }}>{m.role}</p>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1">{m.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.expertise.map(e => (
                        <span key={e} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: `${m.accent}12`, color: m.accent, border: `1px solid ${m.accent}20` }}>
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#080F20' }}>
        <div className="absolute top-0 left-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top left, rgba(212,23,74,0.22) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              We&apos;re always looking for talented individuals passionate about technology and innovation.
            </p>
            <Link href="/careers"
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #D4174A, #A8102E)', boxShadow: '0 8px 24px rgba(212,23,74,0.35)' }}>
              View Open Positions
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
