'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import TiltCard from '@/components/TiltCard';

const testimonials = [
  {
    name: 'Daniel Tan',
    title: 'IT Director | Manufacturing Company',
    date: 'March 2025',
    quote: 'Innovatiq made our technology upgrade process much smoother than we expected. Their team was responsive, knowledgeable, and always willing to help. It\'s been a pleasure working with them.',
    rating: 3,
    avatar: 'DT',
    color: '#BE123C',
  },
  {
    name: 'Emma Williams',
    title: 'Operations Manager | Logistics & Supply Chain Company',
    date: 'July 2024',
    quote: 'We appreciate how Innovatiq takes the time to understand our business before recommending solutions. Their support has helped us improve efficiency and focus on what matters most.',
    rating: 4,
    avatar: 'EW',
    color: '#F43F5E',
  },
  {
    name: 'Michael Anderson',
    title: 'General Manager | Training Solutions Company',
    date: 'January 2026',
    quote: 'The team at Innovatiq feels like an extension of our own. They\'re proactive, reliable, and genuinely invested in our success.',
    rating: 5,
    avatar: 'MA',
    color: '#10B981',
  },
  {
    name: 'Jennifer Lim',
    title: 'Head of HR | Professional Services Company',
    date: 'September 2023',
    quote: 'From planning to implementation, Innovatiq guided us every step of the way. Their expertise and professionalism gave us confidence throughout the entire project.',
    rating: 4,
    avatar: 'JL',
    color: '#8B5CF6',
  },
  {
    name: 'James Carter',
    title: 'Managing Director | Healthcare Technology Company',
    date: 'July 2025',
    quote: 'Innovatiq has been a reliable technology partner for our business. Their team is knowledgeable, responsive, and always focused on delivering solutions that create real value.',
    rating: 5,
    avatar: 'JC',
    color: '#F59E0B',
  },
  {
    name: 'Rachel Johnson',
    title: 'Learning & Development Manager | Education & Training Company',
    date: 'November 2024',
    quote: 'We\'ve enjoyed working with Innovatiq from day one. They understand our needs, communicate clearly, and consistently deliver results that help our business move forward.',
    rating: 5,
    avatar: 'RJ',
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

  // Stable indices so TiltCard keeps the same DOM node across rotations
  const visibleIndices = [
    (current - 1 + testimonials.length) % testimonials.length,
    current,
    (current + 1) % testimonials.length,
  ];
  const visible = visibleIndices.map(idx => testimonials[idx]);

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#F8FAFC' }}>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(190,18,60,0.04) 0%, transparent 70%)' }} />

      {/* Illustration */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/Group%2041053.svg" alt="" aria-hidden="true"
        className="absolute left-0 bottom-0 h-[55%] max-h-[360px] w-auto opacity-[0.04] pointer-events-none select-none object-contain" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{ color: '#BE123C', background: '#FFFFFF', border: '1.5px solid rgba(190,18,60,0.38)', boxShadow: '0 2px 10px rgba(190,18,60,0.12)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#BE123C' }} />
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-gray-900 leading-tight">
            What Our{' '}
            <span className="relative inline-block">
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #BE123C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Clients Say
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 280 8" fill="none" preserveAspectRatio="none" style={{ height: '6px' }}>
                <path d="M2 5 Q70 1 140 5 Q210 9 278 3" stroke="url(#tg)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                <defs>
                  <linearGradient id="tg" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F59E0B"/>
                    <stop offset="50%" stopColor="#EF4444"/>
                    <stop offset="100%" stopColor="#BE123C"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6">
            {visible.map((t, i) => (
              <div key={visibleIndices[i]} className={`transition-transform duration-300 ${i === 1 ? 'md:scale-[1.04]' : ''}`}>
              <TiltCard intensity={12} className="h-full">
              <div
                className="rounded-2xl flex flex-col h-full overflow-hidden"
                style={{
                  background: '#FFFFFF',
                  border: i === 1 ? '1.5px solid rgba(190,18,60,0.22)' : '1px solid rgba(0,0,0,0.08)',
                  boxShadow: i === 1
                    ? '0 8px 32px rgba(190,18,60,0.10), 0 2px 8px rgba(0,0,0,0.06)'
                    : '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.28s ease',
                }}>

                {/* Coloured top accent bar */}
                <div style={{
                  height: '4px',
                  background: i === 1
                    ? 'linear-gradient(90deg, #9F1239, #BE123C, #F43F5E)'
                    : 'linear-gradient(90deg, #CBD5E1, #E2E8F0)',
                }} />

                <div className="p-6 flex flex-col h-full">

                  {/* Top row: quote icon + date badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: i === 1 ? 'rgba(190,18,60,0.08)' : 'rgba(100,116,139,0.08)', border: i === 1 ? '1px solid rgba(190,18,60,0.15)' : '1px solid rgba(100,116,139,0.15)' }}>
                      <Quote size={16} style={{ color: i === 1 ? '#BE123C' : '#94A3B8' }} />
                    </div>
                    <span className="text-[12px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: i === 1 ? 'rgba(190,18,60,0.07)' : '#F1F5F9', color: i === 1 ? '#BE123C' : '#64748B' }}>
                      {t.date}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} size={13} fill={si < t.rating ? '#F59E0B' : '#E2E8F0'} stroke="none" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[16px] leading-relaxed mb-6 flex-1 italic"
                    style={{ color: '#374151', fontWeight: 600 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Divider */}
                  <div className="mb-4" style={{ height: '1px', background: 'rgba(0,0,0,0.06)' }} />

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                      style={{ background: i === 1 ? 'linear-gradient(135deg, #9F1239, #BE123C)' : 'linear-gradient(135deg, #475569, #64748B)', boxShadow: i === 1 ? '0 4px 12px rgba(190,18,60,0.30)' : '0 2px 8px rgba(0,0,0,0.15)' }}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-[14.5px] leading-tight">{t.name}</p>
                      <p className="text-[13px] font-semibold leading-snug mt-0.5" style={{ color: '#64748B' }}>{t.title}</p>
                    </div>
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
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: '#FFFFFF', border: '1.5px solid rgba(190,18,60,0.20)', color: '#BE123C', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setAutoPlay(false); setCurrent(i); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '28px' : '8px',
                    height: '8px',
                    background: i === current ? 'linear-gradient(90deg, #BE123C, #F43F5E)' : 'rgba(0,0,0,0.12)',
                  }} />
              ))}
            </div>

            <button onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: '#FFFFFF', border: '1.5px solid rgba(190,18,60,0.20)', color: '#BE123C', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
