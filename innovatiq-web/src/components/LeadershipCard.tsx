'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Linkedin, Twitter, ChevronDown, ChevronUp } from 'lucide-react';

interface LeaderSection {
  heading?: string;
  text: string;
}

interface Leader {
  name: string;
  role: string;
  bio: string;
  sections?: LeaderSection[];
  expertise: string[];
  photo: string;
  accent: string;
}

export default function LeadershipCard({ m }: { m: Leader }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group relative flex flex-col sm:flex-row transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.07)',
      }}
    >
      {/* Photo */}
      <div
        className="relative sm:w-52 shrink-0 h-60 sm:h-auto overflow-hidden"
        style={{ background: '#E2E8F0', transform: 'translateZ(0)' }}
      >
        <Image
          src={m.photo}
          alt={m.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: '50% 15%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, transparent 50%, rgba(248,250,252,0.3) 100%), linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        <div
          className="absolute bottom-4 left-4 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
          style={{ background: m.accent, color: '#fff', boxShadow: `0 4px 12px ${m.accent}55` }}
        >
          {m.role}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-bold text-gray-900 text-xl leading-tight">{m.name}</h3>
            <p className="text-sm mt-0.5 font-medium" style={{ color: m.accent }}>
              {m.role}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <a
              href="#"
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
              style={{ background: '#F1F5F9', border: '1px solid rgba(0,0,0,0.10)', color: '#64748B' }}
            >
              <Linkedin size={13} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
              style={{ background: '#F1F5F9', border: '1px solid rgba(0,0,0,0.10)', color: '#64748B' }}
            >
              <Twitter size={13} />
            </a>
          </div>
        </div>

        {/* Bio with smooth expand */}
        <div className="mb-4">
          <div
            style={{
              maxHeight: expanded ? '1600px' : '84px',
              overflow: 'hidden',
              transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {m.sections ? m.sections.map((section, i) => (
              <div key={i} className="mb-2 last:mb-0">
                {section.heading && (
                  <h4 className="text-[11px] font-bold uppercase tracking-wide mb-0.5" style={{ color: m.accent }}>
                    {section.heading}
                  </h4>
                )}
                <p className="text-slate-500 text-[13px] leading-relaxed">{section.text}</p>
              </div>
            )) : m.bio.split('\n\n').map((para, i) => (
              <p key={i} className="text-slate-500 text-[13px] leading-relaxed mb-2 last:mb-0">
                {para}
              </p>
            ))}
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 mt-2 text-[11px] font-semibold transition-colors"
            style={{ color: m.accent }}
          >
            {expanded ? (
              <><ChevronUp size={12} /> Show less</>
            ) : (
              <><ChevronDown size={12} /> Read more</>
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {m.expertise.map((e) => (
            <span
              key={e}
              className="text-[11px] px-3 py-1 rounded-full font-semibold"
              style={{ background: `${m.accent}15`, color: m.accent, border: `1px solid ${m.accent}25` }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
