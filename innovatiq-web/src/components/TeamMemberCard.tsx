'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Linkedin, Twitter, ChevronDown, ChevronUp } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  photo: string;
  accent: string;
  photoPosition?: string;
}

export default function TeamMemberCard({ m }: { m: TeamMember }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group relative flex flex-col h-full transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.07)',
      }}
    >
      {/* Photo — translateZ forces GPU layer, eliminating sub-pixel gap on hover */}
      <div
        className="relative h-56 shrink-0 overflow-hidden"
        style={{ background: '#E2E8F0', transform: 'translateZ(0)' }}
      >
        <Image
          src={m.photo}
          alt={m.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: m.photoPosition ?? 'center' }}
        />
        {/* Gradient fades to fully opaque at bottom to eliminate seam with card body */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.70) 100%)' }}
        />
        <div
          className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
          style={{ background: m.accent, color: '#fff', boxShadow: `0 2px 8px ${m.accent}66` }}
        >
          {m.role}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{m.name}</h3>
            <p className="text-xs font-semibold mt-0.5" style={{ color: m.accent }}>
              {m.role}
            </p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <a
              href="#"
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: '#F1F5F9',
                border: '1px solid rgba(0,0,0,0.10)',
                color: '#64748B',
              }}
            >
              <Linkedin size={11} />
            </a>
            <a
              href="#"
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: '#F1F5F9',
                border: '1px solid rgba(0,0,0,0.10)',
                color: '#64748B',
              }}
            >
              <Twitter size={11} />
            </a>
          </div>
        </div>

        {/* Bio — scrollable when expanded so card height never changes */}
        <div className="mb-3">
          <div
            className="text-slate-500 text-xs leading-relaxed"
            style={{
              maxHeight: expanded ? '200px' : '54px',
              overflow: 'hidden',
              transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {m.bio}
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 mt-1.5 text-[11px] font-semibold transition-colors"
            style={{ color: m.accent }}
          >
            {expanded ? (
              <>
                <ChevronUp size={12} /> Show less
              </>
            ) : (
              <>
                <ChevronDown size={12} /> Read more
              </>
            )}
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {m.expertise.map((e) => (
            <span
              key={e}
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: `${m.accent}12`, color: m.accent, border: `1px solid ${m.accent}20` }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
