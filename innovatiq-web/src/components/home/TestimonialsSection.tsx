'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import TiltCard from '@/components/TiltCard';

const testimonials = [
  {
    name: 'Alex Thompson',
    title: 'CTO, TechCorp Asia',
    quote: 'Innovatiq transformed our entire IT infrastructure. The cloud migration was seamless and our operational costs dropped by 35%. Exceptional team!',
    rating: 5,
    avatar: 'AT',
    color: '#D4174A',
  },
  {
    name: 'Kalina Petrov',
    title: 'VP Technology, FinServe Group',
    quote: 'The SkillEra platform revolutionized how we train our 5,000+ employees. Completion rates went from 40% to 92%. Truly outstanding product.',
    rating: 5,
    avatar: 'KP',
    color: '#3B82F6',
  },
  {
    name: 'Thomas Ng',
    title: 'CEO, RetailConnect SG',
    quote: 'SecurOn gave us complete visibility into our patch compliance. We went from always behind on updates to fully automated and 100% compliant.',
    rating: 5,
    avatar: 'TN',
    color: '#10B981',
  },
  {
    name: 'James Wilson',
    title: 'IT Director, ManufacturePro',
    quote: 'The managed IT services team is incredibly responsive. They feel like an extension of our internal team — proactive, knowledgeable, and dedicated.',
    rating: 5,
    avatar: 'JW',
    color: '#8B5CF6',
  },
  {
    name: 'Anna Scott',
    title: 'CISO, BankFirst Malaysia',
    quote: 'Innovatiq\'s cyber security team conducted a thorough assessment and implemented robust controls. We now sleep better knowing our systems are protected.',
    rating: 5,
    avatar: 'AS',
    color: '#F59E0B',
  },
  {
    name: 'Clarke Rodriguez',
    title: 'Head of Digital, HealthPlus',
    quote: 'The digital transformation roadmap Innovatiq developed for us was spot-on. Their consultants understood our business deeply and delivered real results.',
    rating: 5,
    avatar: 'CR',
    color: '#06B6D4',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const prev = () => { setAutoPlay(false); setCurrent(i => (i - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setAutoPlay(false); setCurrent(i => (i + 1) % testimonials.length); };

  const visible = [
    testimonials[(current - 1 + testimonials.length) % testimonials.length],
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
  ];

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#07101E' }}>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(155,117,34,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(212,23,74,0.07) 0%, transparent 70%)' }} />

      {/* Illustration */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/Group%2041053.svg" alt="" aria-hidden="true"
        className="absolute left-0 bottom-0 h-[55%] max-h-[360px] w-auto opacity-[0.04] pointer-events-none select-none object-contain" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#F59E0B] uppercase tracking-widest bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            What Our{' '}
            <span className="bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#D4174A] bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-5">
            {visible.map((t, i) => (
              <div key={`${t.name}-${i}`} className={i === 1 ? 'scale-[1.03]' : ''}>
              <TiltCard intensity={16} className="h-full">
              <div
                className="rounded-2xl p-7 flex flex-col h-full"
                style={{
                  background: i === 1
                    ? 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)'
                    : 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
                  border: i === 1 ? `1px solid ${testimonials[current].color}40` : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: i === 1 ? `0 0 40px ${testimonials[current].color}15, 0 20px 60px rgba(0,0,0,0.4)` : '0 4px 24px rgba(0,0,0,0.2)',
                }}>

                {/* Quote icon */}
                <Quote size={28} className="mb-4 opacity-40 depth-pop" style={{ color: i === 1 ? testimonials[current].color : '#fff' }} />

                {/* Stars */}
                <div className="flex gap-1 mb-4 depth-mid">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={14} fill="#F59E0B" stroke="none" />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 depth-low">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.title}</p>
                  </div>
                </div>
              </div>
              </TiltCard>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setAutoPlay(false); setCurrent(i); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    background: i === current ? '#D4174A' : 'rgba(255,255,255,0.15)',
                  }} />
              ))}
            </div>

            <button onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
