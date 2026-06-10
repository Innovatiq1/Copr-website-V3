'use client';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-21.5 right-8 z-50 group"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Tooltip */}
      <span
        className="absolute top-1/2 -translate-y-1/2
          px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap
          opacity-0 translate-x-2
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-200 pointer-events-none"
        style={{
          right: 'calc(100% + 12px)',
          background: 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(0,0,0,0.08)',
          color: '#374151',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.90)',
        }}
      >
        Back to top
      </span>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(255,228,236,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(212,23,74,0.16)',
          color: '#D4174A',
          boxShadow:
            '0 0 0 4px rgba(212,23,74,0.07), 0 2px 4px rgba(0,0,0,0.04), 0 10px 30px rgba(212,23,74,0.18), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(212,23,74,0.06)',
        }}
      >
        <ArrowUp size={15} strokeWidth={2.5} />
      </button>
    </div>
  );
}
