'use client';

import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

interface VideoSectionProps {
  filterType: 'home' | 'career' | 'contact' | 'aboutUs' | 'services' | 'products';
  filterKey?: string;
  heading?: string;
  subheading?: string;
  dark?: boolean;
  sectionClassName?: string;
}

function getEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

export default function VideoSection({ filterType, filterKey, heading, subheading, dark = false, sectionClassName }: VideoSectionProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [video, setVideo] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/videos')
      .then(r => r.json())
      .then(videos => {
        if (!Array.isArray(videos)) return;
        const found = videos.find(v => {
          if (filterType === 'home') return v.home === true;
          if (filterType === 'career') return v.career === true;
          if (filterType === 'contact') return v.contact === true;
          if (filterType === 'aboutUs' && filterKey) return v.aboutUs === true && v.aboutUsTypes?.[filterKey] === true;
          if (filterType === 'services' && filterKey) return v.services === true && v.serviceTypes?.[filterKey] === true;
          if (filterType === 'products' && filterKey) return v.products === true && v.productTypes?.[filterKey] === true;
          return false;
        });
        setVideo(found || null);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [filterType, filterKey]);

  if (!loaded || !video) return null;

  const bg = dark ? '#0A1628' : '#F8FAFC';
  const subColor = dark ? 'rgba(255,255,255,0.6)' : '#1a1a1a';

  const defaults: Record<string, { heading: string; sub: string }> = {
    home: { heading: 'Our Latest Video', sub: 'Explore our newest insight and success story' },
    career: { heading: 'Life at Innovatiq', sub: 'Explore our culture, people and career opportunities' },
    contact: { heading: 'Get in Touch', sub: 'See how we work with our clients' },
    aboutUs: { heading: 'About Innovatiq', sub: 'Learn more about who we are and what drives us' },
    services: { heading: 'Latest Video', sub: 'Watch our latest service insights' },
    products: { heading: 'Product Overview', sub: 'See our product in action' },
  };
  const d = defaults[filterType] || defaults.home;

  const fullHeading = heading || d.heading;
  const words = fullHeading.split(' ');
  const mainWords = words.length > 1 ? words.slice(0, -1).join(' ') : '';
  const accentWord = words[words.length - 1];

  return (
    <section className={`relative overflow-hidden ${sectionClassName ?? 'pt-0 pb-10 md:pb-20'}`} style={{ background: bg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 md:mb-14">

          {/* Badge — matches ProductsSection outline style */}
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{
              color: '#9F1239',
              background: '#FFFFFF',
              border: '1.5px solid rgba(159,18,57,0.38)',
              boxShadow: '0 2px 10px rgba(190,18,60,0.12)',
            }}
          >
            <Play size={11} className="fill-current" />
            Video
          </span>

          {/* Heading with gradient accent word + SVG wavy underline */}
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-gray-900 mb-5 leading-tight">
            {mainWords && <span>{mainWords} </span>}
            <span className="relative inline-block">
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 45%, #881337 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {accentWord}
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 10" fill="none" preserveAspectRatio="none" style={{ height: '8px' }}>
                <path d="M2 7 Q75 2 150 6 Q225 10 298 4" stroke="url(#vug)" strokeWidth="3" strokeLinecap="round" fill="none" />
                <defs>
                  <linearGradient id="vug" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F43F5E" />
                    <stop offset="50%" stopColor="#E11D48" />
                    <stop offset="100%" stopColor="#881337" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg font-medium leading-relaxed max-w-2xl mx-auto" style={{ color: subColor }}>
            {subheading || d.sub}
          </p>

        </AnimatedSection>

        <AnimatedSection>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src={getEmbedUrl(video.videoLink)}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title={video.title || 'Innovatiq Video'}
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
