import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import CtaSection from '@/components/home/CtaSection';
import Link from 'next/link';
import LeadershipCard from '@/components/LeadershipCard';
import ExpertTeamGrid from '@/components/ExpertTeamGrid';

const leadership = [
  {
    name: 'Krishna Das',
    role: 'CEO',
    bio: '',
    sections: [
      {
        text: 'Krishna is a seasoned professional with 30 years of extensive experience in the IT industry, specializing in sales and business development. With a proven track record of success, Krishna has held pivotal roles in renowned companies such as HP, IBM, and Fujitsu. His journey in the corporate world has equipped him with a profound understanding of industry dynamics, market trends, and customer needs.',
      },
      {
        heading: 'Entrepreneurial Journey',
        text: 'Driven by a passion for innovation and a vision for transforming the IT services landscape, Krishna ventured into entrepreneurship and founded Innovatiq — a company built on excellence, customer-centricity, and technological innovation. Under his leadership, the company has flourished, delivering cutting-edge solutions and exceptional value to clients across diverse industries.',
      },
      {
        heading: 'Leadership Style',
        text: 'Krishna is a visionary leader known for his strategic foresight, charismatic leadership, and unwavering commitment to organizational success. He fosters a culture of collaboration, empowerment, and continuous learning, enabling teams to unleash their full potential and drive impactful results.',
      },
      {
        heading: 'Philosophy',
        text: 'Krishna believes in the power of innovation, integrity, and customer satisfaction as the cornerstone of business success. He is deeply committed to delivering value-driven solutions that exceed client expectations and drive sustainable growth.',
      },
      {
        heading: 'Future Outlook',
        text: 'As the CEO of his IT services company, Krishna remains steadfast in his commitment to driving innovation, fostering strategic partnerships, and delivering unparalleled value to clients. With his extensive industry expertise and entrepreneurial spirit, he is poised to lead the company towards greater heights of success and establish it as a leading player in the global IT services market.',
      },
    ],
    expertise: ['Sales & Business Development', 'Enterprise IT', 'Strategic Leadership'],
    photo: '/images/aboutUs/ourTeam/Krishna.jpeg',
    accent: '#D4174A',
  },
  {
    name: 'Prashanth',
    role: 'Director',
    bio: 'Prashanth is one of the Directors of Innovatiq Technologies, leading the Delivery and Technical teams. Drawing from a career spanning over 30 years at prominent multinational corporations including Wipro, he brings a wealth of expertise in project delivery, technical implementation, and team leadership.\n\nHis diverse experience across different corporate environments has equipped him with valuable insights into client needs, industry best practices, and the intricacies of managing complex, large-scale projects. Having navigated through varied roles across MNCs, Prashanth possesses a deep understanding of how to align technical execution with business goals.\n\nIn his role at Innovatiq, Prashanth leverages this rich background to drive innovation, streamline delivery processes, and ensure the technical excellence of the team\'s output. His leadership is instrumental in guiding teams towards consistently delivering superior results for clients.',
    expertise: ['IT Strategy', 'Program Management', 'Team Leadership'],
    photo: '/images/aboutUs/ourTeam/prashanth-removebg-preview-1.png',
    accent: '#D97706',
  },
  {
    name: 'Srinivas Rao',
    role: 'Business Head India',
    bio: 'An established and proven leader with over 28+ years of experience, including a significant tenure at a large German-based NYSE-listed company. A business-focused professional and thought leader in Management, Sales, and Business Consulting, Srinivas has built a career at the intersection of strategy and execution.\n\nHe has extensive experience managing company operations, P&L responsibilities, and driving cross-functional teams across the globe. His approach combines the strategic clarity of a seasoned consultant with the hands-on discipline of an executioner — consistently leveraging organizational competencies to align delivery with the business objectives of customers.\n\nAs Business Head India, Srinivas brings this global perspective and deep domain expertise to accelerate Innovatiq\'s growth, strengthen client relationships, and build a high-performing delivery engine in the Indian market.',
    expertise: ['Business Development', 'P&L Management', 'Strategic Leadership'],
    photo: '/images/aboutUs/ourTeam/Srinivash.PNG',
    accent: '#3B82F6',
  },
  {
    name: 'Sujatha',
    role: 'HR Manager',
    bio: 'Sujatha is an accomplished professional with a wealth of experience in the managed resources business. Currently serving as the Head of Resources Business at Innovatiq, she brings a powerful combination of strategic vision, operational expertise, and leadership acumen to drive business growth and achieve organizational objectives.\n\nWith an MBA degree and 18 years of diverse industry experience, Sujatha possesses a deep understanding of resource management dynamics, talent acquisition, and workforce planning. Her proven track record of delivering results in challenging environments reflects her ability to balance people-first values with sharp business focus.\n\nSujatha champions a culture of inclusivity and professional growth at Innovatiq, ensuring the organization attracts, develops, and retains the best talent to support its ambitious growth goals.',
    expertise: ['Resource Management', 'HR Strategy', 'Operational Excellence'],
    photo: '/images/aboutUs/ourTeam/Sujatha.jpg',
    accent: '#10B981',
  },
];

const teamMembers = [
  {
    name: 'Abhishek',
    role: 'Regional Sales Head - North',
    bio: 'Abhishek is a seasoned IT professional with 16 years of diverse industry experience spanning sales, business development, and channel management. He combines strong technical expertise with strategic business acumen to align technology solutions with evolving client needs. Known for his consultative approach and results-oriented mindset, he consistently transforms opportunities into sustainable business growth.',
    expertise: ['Sales Leadership', 'Business Development', 'Channel Management'],
    photo: '/images/aboutUs/ourTeam/Abhishek.png',
    accent: '#D97706',
    photoPosition: 'center',
  },
  {
    name: 'Thomas Chee',
    role: 'Sr. Sales Account Manager',
    bio: 'A dynamic and results-oriented sales leader, Thomas brings extensive experience in driving business growth and fostering long-term client success. With a strong track record in sales and marketing, he has consistently delivered multi-million-dollar revenues and secured key strategic accounts across competitive markets.',
    expertise: ['Strategic Account Management', 'Business Development', 'Team Leadership'],
    photo: '/images/aboutUs/ourTeam/Thomas-1195x1536.png',
    accent: '#3B82F6',
    photoPosition: 'center',
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
      <style>{`
        @keyframes blob-drift-1 {
          0%,100% { transform: translate(0px,0px) scale(1); }
          33% { transform: translate(40px,-35px) scale(1.08); }
          66% { transform: translate(-25px,20px) scale(0.94); }
        }
        @keyframes blob-drift-2 {
          0%,100% { transform: translate(0px,0px) scale(1); }
          33% { transform: translate(-30px,30px) scale(1.06); }
          66% { transform: translate(30px,-25px) scale(0.96); }
        }
        @keyframes diamond-spin-1 {
          0%,100% { transform: rotate(45deg) translate(0px,0px); }
          33% { transform: rotate(72deg) translate(12px,-18px); }
          66% { transform: rotate(18deg) translate(-10px,14px); }
        }
        @keyframes diamond-spin-2 {
          0%,100% { transform: rotate(45deg) translate(0px,0px); }
          33% { transform: rotate(18deg) translate(-14px,12px); }
          66% { transform: rotate(72deg) translate(10px,-10px); }
        }
        @keyframes tri-drift {
          0%,100% { transform: translate(0px,0px) rotate(0deg); }
          33% { transform: translate(10px,-14px) rotate(20deg); }
          66% { transform: translate(-8px,10px) rotate(-14deg); }
        }
        @keyframes hex-float {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(30deg); }
        }
        @keyframes hex-float-rev {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(18px) rotate(-30deg); }
        }
      `}</style>
      <PageHero
        badge="Our People"
        title="Meet the Team Behind Innovatiq"
        subtitle="Our leadership team brings together decades of technology, business, and digital transformation expertise."
      />

      {/* Leadership */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(212,23,74,0.07) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute top-0 right-0 w-175 h-150 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(212,23,74,0.09) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-125 h-100 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(59,130,246,0.07) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(212,23,74,0.03) 0%, transparent 70%)' }} />

        {/* Soft ambient blobs */}
        <div className="absolute top-16 right-16 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,23,74,0.11) 0%, transparent 70%)', animation: 'blob-drift-1 9s ease-in-out infinite' }} />
        <div className="absolute bottom-12 left-16 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)', animation: 'blob-drift-2 12s ease-in-out infinite' }} />
        {/* Shapes scattered randomly all over */}
        <div className="absolute top-10 left-[7%] w-9 h-9 pointer-events-none"
          style={{ background: 'rgba(212,23,74,0.16)', borderRadius: '3px', animation: 'diamond-spin-1 9s ease-in-out infinite' }} />
        <div className="absolute top-8 left-[38%] w-6 h-6 pointer-events-none"
          style={{ background: 'rgba(212,23,74,0.18)', borderRadius: '2px', animation: 'diamond-spin-2 8s ease-in-out infinite', animationDelay: '-1s' }} />
        <div className="absolute top-[18%] left-[63%] w-5 h-5 pointer-events-none"
          style={{ background: 'rgba(245,158,11,0.26)', borderRadius: '2px', animation: 'diamond-spin-1 7s ease-in-out infinite', animationDelay: '-2s' }} />
        <div className="absolute top-[42%] left-[22%] w-5 h-5 pointer-events-none"
          style={{ background: 'rgba(245,158,11,0.22)', borderRadius: '2px', animation: 'diamond-spin-2 10s ease-in-out infinite', animationDelay: '-4s' }} />
        <div className="absolute top-[50%] right-[9%] w-7 h-7 pointer-events-none"
          style={{ background: 'rgba(59,130,246,0.20)', borderRadius: '2px', animation: 'diamond-spin-1 11s ease-in-out infinite', animationDelay: '-3s' }} />
        <div className="absolute bottom-14 left-[57%] w-6 h-6 pointer-events-none"
          style={{ background: 'rgba(59,130,246,0.18)', borderRadius: '2px', animation: 'diamond-spin-2 9s ease-in-out infinite', animationDelay: '-6s' }} />
        <div className="absolute bottom-16 right-[7%] w-8 h-8 pointer-events-none"
          style={{ background: 'rgba(212,23,74,0.15)', borderRadius: '3px', animation: 'diamond-spin-1 12s ease-in-out infinite', animationDelay: '-2s' }} />

        <svg className="absolute top-16 right-[9%] pointer-events-none" width="60" height="60" style={{ animation: 'hex-float 11s ease-in-out infinite' }}>
          <polygon points="30,2 56,16 56,44 30,58 4,44 4,16" fill="none" stroke="rgba(212,23,74,0.22)" strokeWidth="1.5" />
        </svg>
        <svg className="absolute top-[32%] left-[4%] pointer-events-none" width="44" height="44" style={{ animation: 'hex-float 8s ease-in-out infinite', animationDelay: '-2s' }}>
          <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" fill="none" stroke="rgba(245,158,11,0.28)" strokeWidth="1.5" />
        </svg>
        <svg className="absolute top-[28%] left-[46%] pointer-events-none" width="52" height="52" style={{ animation: 'hex-float-rev 14s ease-in-out infinite', animationDelay: '-3s' }}>
          <polygon points="26,2 48,14 48,38 26,50 4,38 4,14" fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="1.5" />
        </svg>
        <svg className="absolute bottom-20 left-[26%] pointer-events-none" width="72" height="72" style={{ animation: 'hex-float-rev 15s ease-in-out infinite', animationDelay: '-5s' }}>
          <polygon points="36,2 67,19 67,53 36,70 5,53 5,19" fill="none" stroke="rgba(59,130,246,0.16)" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-10 right-[28%] pointer-events-none" width="40" height="40" style={{ animation: 'hex-float 9s ease-in-out infinite', animationDelay: '-7s' }}>
          <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="none" stroke="rgba(245,158,11,0.24)" strokeWidth="1.5" />
        </svg>

        <div className="absolute top-20 left-[22%] w-7 h-7 pointer-events-none"
          style={{ background: 'rgba(245,158,11,0.22)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'tri-drift 10s ease-in-out infinite', animationDelay: '-4s' }} />
        <div className="absolute top-[55%] left-[36%] w-6 h-6 pointer-events-none"
          style={{ background: 'rgba(212,23,74,0.20)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'tri-drift 8s ease-in-out infinite', animationDelay: '-1s' }} />
        <div className="absolute top-[12%] right-[30%] w-5 h-5 pointer-events-none"
          style={{ background: 'rgba(59,130,246,0.20)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'tri-drift 11s ease-in-out infinite', animationDelay: '-5s' }} />
        <div className="absolute bottom-[25%] right-[20%] w-7 h-7 pointer-events-none"
          style={{ background: 'rgba(245,158,11,0.20)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'tri-drift 9s ease-in-out infinite', animationDelay: '-3s' }} />
        <div className="absolute bottom-8 left-[11%] w-6 h-6 pointer-events-none"
          style={{ background: 'rgba(212,23,74,0.18)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'tri-drift 7s ease-in-out infinite', animationDelay: '-2s' }} />

        <div className="absolute top-[15%] left-[51%] w-20 h-20 rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(212,23,74,0.13)', animation: 'hex-float 13s ease-in-out infinite', animationDelay: '-6s' }} />
        <div className="absolute top-[62%] right-[16%] w-14 h-14 rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(59,130,246,0.16)', animation: 'hex-float-rev 11s ease-in-out infinite', animationDelay: '-4s' }} />
        <div className="absolute bottom-12 left-[43%] w-10 h-10 rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(245,158,11,0.20)', animation: 'hex-float 10s ease-in-out infinite', animationDelay: '-4s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
              style={{ color: '#D4174A', background: 'rgba(212,23,74,0.08)', border: '1px solid rgba(212,23,74,0.15)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4174A] animate-pulse" />
              Leadership
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Visionary{' '}
              <span className="bg-gradient-to-r from-[#BE123C] via-[#D4174A] to-[#E11D48] bg-clip-text text-transparent">Leaders</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto text-base leading-relaxed">
              Decades of combined experience driving digital transformation across Asia Pacific and beyond.
            </p>
          </AnimatedSection>

          {/* Top 2 featured leaders */}
          <div className="grid md:grid-cols-2 gap-7 mb-7 items-start">
            {leadership.slice(0, 2).map((m, i) => (
              <AnimatedSection key={m.name} delay={i * 100}>
                <LeadershipCard m={m} />
              </AnimatedSection>
            ))}
          </div>

          {/* Bottom 2 leaders */}
          <div className="grid md:grid-cols-2 gap-7 items-start">
            {leadership.slice(2).map((m, i) => (
              <AnimatedSection key={m.name} delay={(i + 2) * 100}>
                <LeadershipCard m={m} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="relative pt-12 pb-20 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute bottom-0 right-0 w-125 h-100 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom right, rgba(212,23,74,0.08) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 w-125 h-100 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(59,130,246,0.07) 0%, transparent 60%)' }} />

        {/* Soft ambient blobs */}
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)', animation: 'blob-drift-2 11s ease-in-out infinite' }} />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,23,74,0.08) 0%, transparent 70%)', animation: 'blob-drift-1 13s ease-in-out infinite', animationDelay: '-4s' }} />
        {/* Diamonds */}
        <div className="absolute top-16 right-20 w-8 h-8 pointer-events-none"
          style={{ background: 'rgba(59,130,246,0.20)', borderRadius: '2px', animation: 'diamond-spin-2 9s ease-in-out infinite' }} />
        <div className="absolute bottom-20 left-24 w-6 h-6 pointer-events-none"
          style={{ background: 'rgba(212,23,74,0.18)', borderRadius: '2px', animation: 'diamond-spin-1 11s ease-in-out infinite', animationDelay: '-3s' }} />
        {/* Hollow hexagons */}
        <svg className="absolute top-16 right-1/3 pointer-events-none" width="56" height="56" style={{ animation: 'hex-float 12s ease-in-out infinite' }}>
          <polygon points="28,2 52,15 52,41 28,54 4,41 4,15" fill="none" stroke="rgba(59,130,246,0.20)" strokeWidth="1.5" />
        </svg>
        <svg className="absolute bottom-16 left-1/3 pointer-events-none" width="72" height="72" style={{ animation: 'hex-float-rev 16s ease-in-out infinite', animationDelay: '-6s' }}>
          <polygon points="36,2 68,19 68,53 36,70 4,53 4,19" fill="none" stroke="rgba(212,23,74,0.16)" strokeWidth="1" />
        </svg>
        {/* Triangle */}
        <div className="absolute top-1/2 right-16 w-7 h-7 pointer-events-none"
          style={{ background: 'rgba(59,130,246,0.22)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'tri-drift 10s ease-in-out infinite', animationDelay: '-2s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Our{' '}
              <span className="bg-gradient-to-r from-[#BE123C] via-[#D4174A] to-[#E11D48] bg-clip-text text-transparent">Expert Team</span>
            </h2>
            <p className="text-slate-500 font-medium mt-2">100+ certified professionals delivering excellence daily.</p>
          </AnimatedSection>

          <ExpertTeamGrid members={teamMembers} />
        </div>
      </section>

      {/* Join CTA */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF5F7 0%, #FFF9F5 100%)' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">
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
