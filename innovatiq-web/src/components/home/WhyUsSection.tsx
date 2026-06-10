'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Target, Award, Users, Globe, Clock, Star, Zap, Shield } from 'lucide-react';
import TiltCard from '@/components/TiltCard';

const reasons = [
  { num: '01', Icon: Target, title: 'Outcome Driven',         desc: 'Measured by real business results, not just delivery milestones.' },
  { num: '02', Icon: Award,  title: 'Award-Winning',          desc: 'Recognized by industry bodies across Singapore & Asia Pacific.'   },
  { num: '03', Icon: Users,  title: '100+ Certified Experts', desc: 'Specialists across cloud, cybersecurity, DevOps & AI.'            },
  { num: '04', Icon: Globe,  title: 'Regional Presence',      desc: 'On-the-ground operations in Singapore, India & Malaysia.'         },
];

const checks = [
  { text: 'End-to-end digital transformation capabilities', clr: '#1D4ED8', Icon: Zap    },
  { text: 'Dedicated account management & 24/7 support',   clr: '#1D4ED8', Icon: Clock  },
  { text: 'Transparent pricing with no hidden costs',       clr: '#1D4ED8', Icon: Shield },
  { text: 'Proven track record with 200+ enterprise clients', clr: '#1D4ED8', Icon: Star },
];

export default function WhyUsSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F5F9FF 0%, #F8FBFF 40%, #FFFFFF 100%)' }}>

      {/* ── Color blobs ── */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(29,78,216,0.07) 0%, transparent 65%)', filter: 'blur(50px)' }} />

      {/* ── Dot grid ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

      {/* ── Geometric shapes ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Filled circles */}
        <div className="absolute rounded-full" style={{ top:'15%',  left:'3%',   width:80,  height:80,  background:'rgba(29,78,216,0.08)',   border:'1.5px solid rgba(29,78,216,0.16)',   animation:'why-float   12s ease-in-out infinite' }} />
        <div className="absolute rounded-full" style={{ bottom:'20%', right:'4%', width:64,  height:64,  background:'rgba(100,116,139,0.07)', border:'1.5px solid rgba(100,116,139,0.14)', animation:'why-float-r 14s ease-in-out infinite', animationDelay:'-4s' }} />
        <div className="absolute rounded-full" style={{ top:'60%',  left:'8%',   width:48,  height:48,  background:'rgba(100,116,139,0.06)', border:'1.5px solid rgba(100,116,139,0.12)', animation:'why-float   10s ease-in-out infinite', animationDelay:'-3s' }} />
        <div className="absolute rounded-full" style={{ top:'8%',   right:'12%', width:56,  height:56,  background:'rgba(100,116,139,0.06)', border:'1.5px solid rgba(100,116,139,0.12)', animation:'why-float-r 11s ease-in-out infinite', animationDelay:'-6s' }} />

        {/* Hexagons */}
        <svg className="absolute" style={{ top:'8%',    left:'42%',  animation:'why-float   12s ease-in-out infinite' }}                      width="52" height="52"><polygon points="26,2 48,14 48,38 26,50 4,38 4,14"   fill="rgba(29,78,216,0.05)"   stroke="rgba(29,78,216,0.22)"   strokeWidth="1.5"/></svg>
        <svg className="absolute" style={{ top:'55%',   right:'5%',  animation:'why-float-r 14s ease-in-out infinite', animationDelay:'-4s' }} width="60" height="60"><polygon points="30,2 56,16 56,44 30,58 4,44 4,16"   fill="rgba(100,116,139,0.05)" stroke="rgba(100,116,139,0.16)" strokeWidth="1.5"/></svg>
        <svg className="absolute" style={{ bottom:'10%', left:'36%', animation:'why-float   10s ease-in-out infinite', animationDelay:'-6s' }} width="40" height="40"><polygon points="20,2 36,11 36,29 20,38 4,29 4,11"   fill="rgba(100,116,139,0.05)" stroke="rgba(100,116,139,0.16)" strokeWidth="1.5"/></svg>
        <svg className="absolute" style={{ top:'25%',   left:'5%',   animation:'why-float-r 16s ease-in-out infinite', animationDelay:'-2s' }} width="44" height="44"><polygon points="22,2 40,12 40,32 22,42 4,32 4,12"   fill="rgba(100,116,139,0.05)" stroke="rgba(100,116,139,0.14)" strokeWidth="1.5"/></svg>

        {/* Spinning squares */}
        <div className="absolute" style={{ top:'78%', right:'28%', width:28, height:28, border:'1.5px solid rgba(100,116,139,0.20)', borderRadius:4, background:'rgba(100,116,139,0.04)', animation:'why-spin 18s linear infinite' }} />
        <div className="absolute" style={{ top:'5%',  right:'8%',  width:22, height:22, border:'1.5px solid rgba(29,78,216,0.20)',   borderRadius:3, background:'rgba(29,78,216,0.04)',   animation:'why-spin 14s linear infinite reverse' }} />
        <div className="absolute" style={{ bottom:'35%', left:'46%', width:18, height:18, border:'1.5px solid rgba(100,116,139,0.18)', borderRadius:3, background:'rgba(100,116,139,0.03)', animation:'why-spin 20s linear infinite' }} />

        {/* Diamonds */}
        <div className="absolute" style={{ top:'10%',    left:'4%',   width:12, height:12, background:'rgba(29,78,216,0.28)',   transform:'rotate(45deg)', borderRadius:2, animation:'why-drift 8s  ease-in-out infinite' }} />
        <div className="absolute" style={{ top:'50%',    left:'48%',  width:8,  height:8,  background:'rgba(100,116,139,0.22)', transform:'rotate(45deg)', borderRadius:1, animation:'why-drift 11s ease-in-out infinite', animationDelay:'-1s' }} />
        <div className="absolute" style={{ bottom:'15%', right:'15%', width:10, height:10, background:'rgba(100,116,139,0.22)', transform:'rotate(45deg)', borderRadius:2, animation:'why-drift 9s  ease-in-out infinite', animationDelay:'-5s' }} />

        {/* Plus signs */}
        <svg className="absolute" style={{ top:'40%', right:'10%', animation:'why-drift 10s ease-in-out infinite', animationDelay:'-3s' }} width="16" height="16">
          <line x1="8" y1="0" x2="8" y2="16" stroke="rgba(29,78,216,0.32)"   strokeWidth="2"/>
          <line x1="0" y1="8" x2="16" y2="8" stroke="rgba(29,78,216,0.32)"   strokeWidth="2"/>
        </svg>
        <svg className="absolute" style={{ bottom:'40%', left:'20%', animation:'why-drift 12s ease-in-out infinite', animationDelay:'-7s' }} width="14" height="14">
          <line x1="7" y1="0" x2="7" y2="14" stroke="rgba(100,116,139,0.26)" strokeWidth="2"/>
          <line x1="0" y1="7" x2="14" y2="7" stroke="rgba(100,116,139,0.26)" strokeWidth="2"/>
        </svg>
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── LEFT: Image + floating badges ── */}
          <div
            className={visible ? 'product-card-enter' : ''}
            style={{ opacity: visible ? undefined : 0 }}
          >
            <TiltCard intensity={12}>
              <div className="relative">
                {/* Image */}
                <div className="rounded-3xl overflow-hidden h-[300px] sm:h-[400px] lg:h-[520px]">
                  <Image
                    src="/images/showing-good-results-group-young-freelancers-office-have-conversation-smiling (1).jpg"
                    alt="Innovatiq team" fill style={{ objectFit: 'cover' }}
                    className="brightness-[0.82]"
                  />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)' }} />
                  {/* Corner color accents */}
                  <div className="absolute top-0 right-0 w-52 h-52 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(29,78,216,0.22) 0%, transparent 70%)' }} />
                  <div className="absolute bottom-0 left-0 w-52 h-52 pointer-events-none"
                    style={{ background: 'linear-gradient(315deg, rgba(100,116,139,0.14) 0%, transparent 70%)' }} />
                </div>

                {/* Badge: ISO — stays inside image on mobile, overhangs on lg+ */}
                <div className="absolute top-3 right-3 lg:-top-4 lg:-right-4 float-d rounded-2xl px-3 py-2 lg:px-4 lg:py-3 flex items-center gap-2 lg:gap-3"
                  style={{ background:'rgba(255,255,255,0.97)', border:'1px solid rgba(0,0,0,0.09)', boxShadow:'0 4px 24px rgba(0,0,0,0.10)' }}>
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-white flex items-center justify-center shrink-0"
                    style={{ border:'1px solid rgba(0,0,0,0.07)' }}>
                    <Image src="/logo/image003-preview (1).png" alt="ISO" width={28} height={28} style={{ objectFit:'contain' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-xs lg:text-sm leading-none mb-0.5">ISO Certified</p>
                    <p className="text-gray-600 text-[11px] font-semibold">9001:2015</p>
                  </div>
                </div>

                {/* Badge: 24/7 support */}
                <div className="absolute bottom-3 left-3 lg:-bottom-4 lg:-left-4 float rounded-2xl px-3 py-2 lg:px-4 lg:py-3 flex items-center gap-2 lg:gap-3"
                  style={{ background:'#FFFFFF', border:'1.5px solid rgba(29,78,216,0.18)', boxShadow:'0 6px 28px rgba(29,78,216,0.14), 0 2px 8px rgba(0,0,0,0.08)' }}>
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background:'linear-gradient(135deg, #EFF6FF, #DBEAFE)', border:'1.5px solid rgba(29,78,216,0.22)' }}>
                    <Clock size={16} style={{ color:'#1D4ED8' }} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-xs lg:text-sm leading-none mb-0.5">24/7 Support</p>
                    <p className="text-slate-700 font-medium text-[11px]">Always Available</p>
                  </div>
                </div>

                {/* Badge: Award — hidden on mobile to avoid overflow, shows sm+ */}
                <div className="hidden sm:flex absolute bottom-10 right-3 lg:right-0 lg:translate-x-4 float-d rounded-2xl px-3 py-2 lg:px-4 lg:py-3 items-center gap-2 lg:gap-2.5"
                  style={{ background:'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #2563EB 100%)', boxShadow:'0 8px 28px rgba(29,78,216,0.45)', animationDelay:'1.5s' }}>
                  <Star size={15} className="text-white" fill="currentColor" />
                  <div>
                    <p className="font-bold text-white text-xs lg:text-sm leading-none mb-0.5">Award Winning</p>
                    <p className="text-white font-medium text-[11px]">Asia Pacific 2024</p>
                  </div>
                </div>

                {/* Corner glows */}
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none"
                  style={{ background:'radial-gradient(circle, rgba(29,78,216,0.15) 0%, transparent 70%)' }} />
              </div>
            </TiltCard>
          </div>

          {/* ── RIGHT: Content ── */}
          <div
            className={visible ? 'product-card-enter' : ''}
            style={{ opacity: visible ? undefined : 0, animationDelay: '120ms' }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
              style={{ color:'#1D4ED8', background:'#FFFFFF', border:'1.5px solid rgba(29,78,216,0.38)', boxShadow:'0 2px 10px rgba(29,78,216,0.12)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:'#1D4ED8' }} />
              Why Choose Innovatiq
            </span>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-gray-900 mb-5 leading-tight">
              <span className="block">Your Trusted Partner</span>
              <span className="block" style={{
                backgroundImage: 'linear-gradient(135deg, #1E40AF 0%, #1D4ED8 40%, #2563EB 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                for Digital Excellence
              </span>
            </h2>

            <p className="text-gray-600 text-[17px] font-medium leading-relaxed mb-8 max-w-lg">
              We don&apos;t just deliver technology — we build lasting partnerships.
              Every solution is tailored to your unique business needs and drives measurable growth.
            </p>

            {/* Checklist — each item has its own color */}
            <div className="space-y-3 mb-10">
              {checks.map(({ text, clr, Icon: CIcon }) => (
                <div key={text} className="flex items-center gap-3 group/chk">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/chk:scale-110"
                    style={{ background: clr + '14', border: `1px solid ${clr}30` }}>
                    <CIcon size={13} style={{ color: clr }} />
                  </div>
                  <span className="text-gray-600 text-[15px] font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* Reason cards — icon left, text right */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {reasons.map((r) => (
                <div key={r.title}
                  className="group relative flex items-start gap-4 rounded-2xl p-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(29,78,216,0.12)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(29,78,216,0.06)',
                    borderRadius: '16px',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(29,78,216,0.14), 0 2px 8px rgba(0,0,0,0.05)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(29,78,216,0.06)'}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'radial-gradient(ellipse at top left, rgba(29,78,216,0.05) 0%, transparent 65%)' }} />

                  {/* Icon — left */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg] relative z-10"
                    style={{ background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', border: '1.5px solid rgba(29,78,216,0.20)', boxShadow: '0 2px 8px rgba(29,78,216,0.12)' }}>
                    <r.Icon size={19} style={{ color: '#1D4ED8' }} strokeWidth={1.75} />
                  </div>

                  {/* Text — right */}
                  <div className="relative z-10 min-w-0">
                    <p className="font-extrabold text-gray-800 text-[14px] leading-snug mb-1">{r.title}</p>
                    <p className="text-gray-600 text-[12.5px] font-medium leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/about"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 font-semibold rounded-xl text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{ background:'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)', boxShadow:'0 8px 32px rgba(29,78,216,0.35)' }}>
              Learn More About Us <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
