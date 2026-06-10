'use client';

import { useState, useEffect } from 'react';
import AnimatedSection from '@/components/AnimatedSection';

interface VideoSectionProps {
  filterType: 'home' | 'career' | 'services' | 'products';
  filterKey?: string;
  heading?: string;
  subheading?: string;
  dark?: boolean;
}

function getEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

export default function VideoSection({ filterType, filterKey, heading, subheading, dark = false }: VideoSectionProps) {
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
  const headingColor = dark ? '#FFFFFF' : '#111827';
  const subColor = dark ? 'rgba(255,255,255,0.6)' : '#6B7280';

  const defaults: Record<string, { heading: string; sub: string }> = {
    home: { heading: 'Our Latest Video', sub: 'Explore our newest insight and success story' },
    career: { heading: 'Life at Innovatiq', sub: 'Explore our culture, people and career opportunities' },
    services: { heading: 'Latest Video', sub: 'Watch our latest service insights' },
    products: { heading: 'Product Overview', sub: 'See our product in action' },
  };
  const d = defaults[filterType] || defaults.home;

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: bg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#1D4ED8] uppercase tracking-widest bg-white border-[1.5px] border-blue-400/60 shadow-[0_2px_10px_rgba(29,78,216,0.12)] px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
            Video
          </span>
          <h2 className="text-3xl font-bold mb-2" style={{ color: headingColor }}>
            {heading || d.heading}
          </h2>
          <p className="text-sm" style={{ color: subColor }}>
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
