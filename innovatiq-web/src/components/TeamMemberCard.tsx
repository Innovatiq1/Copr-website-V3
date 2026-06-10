'use client';
import Image from 'next/image';
import { LinkedinIcon, Instagram, ChevronDown, ChevronUp } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  photo: string;
  accent: string;
  photoPosition?: string;
}

export default function TeamMemberCard({
  m,
  expanded,
  onToggle,
}: {
  m: TeamMember;
  expanded: boolean;
  onToggle: () => void;
}) {

  return (
    <div
      className="group relative flex flex-col transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.07)',
      }}
    >
      {/* Photo */}
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
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.60) 100%)' }}
        />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{m.name}</h3>
            <p className="text-xs font-semibold mt-0.5" style={{ color: m.accent }}>
              {m.role}
            </p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <a href="#" className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ background: '#F1F5F9', border: '1px solid rgba(0,0,0,0.10)', color: '#64748B' }}>
              <LinkedinIcon size={11} />
            </a>
            <a href="#" className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ background: '#F1F5F9', border: '1px solid rgba(0,0,0,0.10)', color: '#64748B' }}>
              <Instagram size={11} />
            </a>
          </div>
        </div>

        {/* Bio with bottom fade when collapsed */}
        <div>
          <div className="relative">
            <div
              className="text-gray-600 text-[15px] leading-relaxed"
              style={{
                maxHeight: expanded ? '320px' : '96px',
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {m.bio}
            </div>
            {/* Fade mask — only visible when collapsed */}
            {!expanded && (
              <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent, #FFFFFF)' }} />
            )}
          </div>
          <button
            onClick={onToggle}
            className="flex items-center gap-1 mt-2 text-[13px] font-semibold transition-colors cursor-pointer"
            style={{ color: m.accent }}
          >
            {expanded ? (
              <><ChevronUp size={12} /> Show less</>
            ) : (
              <><ChevronDown size={12} /> Read more</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
