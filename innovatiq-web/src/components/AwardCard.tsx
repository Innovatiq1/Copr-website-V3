'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Trophy, Star, ChevronDown } from 'lucide-react';

interface AwardCardProps {
  award: any;
  color: string;
  imageUrl: string | null;
}

export default function AwardCard({ award, color, imageUrl }: AwardCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.07)',
      }}
    >
      {/* Image / trophy section */}
      <div className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #F8FAFC 0%, #EEF2F7 100%)' }}>
        <Trophy size={100} className="absolute right-2 bottom-0 pointer-events-none"
          style={{ color, opacity: 0.07 }} />
        <div className="absolute top-0 left-0 w-28 h-28 pointer-events-none"
          style={{ background: `radial-gradient(circle at top left, ${color}18 0%, transparent 70%)` }} />

        {imageUrl ? (
          <Image src={imageUrl} alt={award.title} fill
            className="object-contain p-8 group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="flex flex-col items-center gap-3 relative z-10">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: `${color}12`, border: `1.5px solid ${color}28` }}>
              <Trophy size={36} style={{ color }} />
            </div>
            {award.year && (
              <span className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: color, color: '#fff', boxShadow: `0 2px 8px ${color}55` }}>
                {award.year}
              </span>
            )}
          </div>
        )}

        {award.year && imageUrl && (
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg text-xs font-bold z-10"
            style={{ background: color, color: '#fff', boxShadow: `0 2px 8px ${color}55` }}>
            {award.year}
          </div>
        )}
      </div>

      {/* Color gradient divider */}
      <div className="h-[2px] w-full shrink-0"
        style={{ background: `linear-gradient(to right, ${color}, ${color}60, transparent)` }} />

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-3">
          <Star size={12} style={{ color, fill: color }} />
          <Star size={10} style={{ color, fill: color, opacity: 0.6 }} />
          <Star size={8} style={{ color, fill: color, opacity: 0.3 }} />
        </div>
        <h3 className="font-bold text-gray-900 mb-3 leading-snug text-lg">{award.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-1">{award.shortDescription}</p>

        {award.description && award.description !== award.shortDescription && (
          <div className="mt-4">
            {/* Smooth expand panel */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: open ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.38s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <div
                  className="text-gray-600 text-sm leading-relaxed pb-4 pt-1"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateY(0)' : 'translateY(-6px)',
                    transition: 'opacity 0.32s ease 0.06s, transform 0.32s ease 0.06s',
                  }}
                  dangerouslySetInnerHTML={{ __html: award.description }}
                />
              </div>
            </div>

            {/* Toggle button */}
            <button
              onClick={() => setOpen(o => !o)}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full transition-all duration-200 hover:gap-2"
              style={{
                color,
                background: `${color}0D`,
                border: `1px solid ${color}28`,
              }}
            >
              {open ? 'Show less' : 'Read more'}
              <ChevronDown
                size={13}
                style={{
                  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
