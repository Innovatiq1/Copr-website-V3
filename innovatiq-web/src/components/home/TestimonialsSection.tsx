'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import TiltCard from '@/components/TiltCard';

const testimonials = [
  {
    name: 'Alex',
    title: 'IT Operations Manager',
    quote: 'Partnering with Innovatiq transformed our IT operations. Their proactive approach to infrastructure management and strategic business consulting helped us reduce downtime by 40% and improve overall efficiency. They\'re not just a vendor — they\'re a growth partner.',
    rating: 5,
    avatar: 'AL',
    color: '#D4174A',
  },
  {
    name: 'Kalina',
    title: 'Technology Leader',
    quote: 'Innovatiq\'s business development team understood our goals from day one. Their tailored IT roadmap and seamless cloud migration strategy positioned us for scalability and growth across Southeast Asia. Truly impressed by their commitment and expertise.',
    rating: 5,
    avatar: 'KA',
    color: '#3B82F6',
  },
  {
    name: 'Thomas',
    title: 'Chief Executive Officer',
    quote: 'Innovatiq brought clarity and structure to our digital transformation journey. Their ability to align technology with our business objectives was exceptional. Every milestone was met with transparency and professionalism.',
    rating: 5,
    avatar: 'TH',
    color: '#10B981',
  },
  {
    name: 'James',
    title: 'IT Director',
    quote: 'Our experience with Innovatiq has been outstanding. They helped us align technology with our growth plans, ensuring smooth operations and enhanced productivity. Their clear communication, quick response, and dependable service make them an invaluable partner for any organization.',
    rating: 5,
    avatar: 'JA',
    color: '#8B5CF6',
  },
  {
    name: 'Anna Scott',
    title: 'Head of Digital Transformation',
    quote: 'The Innovatiq team consistently goes above and beyond. They brought structure, vision, and innovation to our IT processes, helping us scale our business with confidence. Their genuine dedication to client success sets them apart in today\'s fast-changing digital world.',
    rating: 5,
    avatar: 'AS',
    color: '#F59E0B',
  },
  {
    name: 'Clarke',
    title: 'VP Technology',
    quote: 'Innovatiq\'s business development team combines deep technical expertise with a clear understanding of business needs. They provided us with scalable solutions that improved performance across all departments. We admire their commitment, professionalism, and ability to deliver beyond expectations.',
    rating: 5,
    avatar: 'CL',
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
    <section className="relative py-24 overflow-hidden" style={{ background: '#F8FAFC' }}>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.04) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(212,23,74,0.04) 0%, transparent 70%)' }} />

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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
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
                  background: '#FFFFFF',
                  border: i === 1 ? `1px solid ${testimonials[current].color}35` : '1px solid rgba(0,0,0,0.09)',
                  boxShadow: i === 1
                    ? `0 2px 8px rgba(0,0,0,0.05), 0 16px 40px rgba(0,0,0,0.08)`
                    : '0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.05)',
                  transition: 'box-shadow 0.28s ease',
                }}>

                {/* Quote icon */}
                <Quote size={28} className="mb-4 depth-pop" style={{ color: t.color, opacity: i === 1 ? 0.55 : 0.22 }} />

                {/* Stars */}
                <div className="flex gap-1 mb-4 depth-mid">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={14} fill="#F59E0B" stroke="none" />
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 italic">
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
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.title}</p>
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
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.10)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setAutoPlay(false); setCurrent(i); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    background: i === current ? '#D4174A' : 'rgba(0,0,0,0.15)',
                  }} />
              ))}
            </div>

            <button onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.10)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
