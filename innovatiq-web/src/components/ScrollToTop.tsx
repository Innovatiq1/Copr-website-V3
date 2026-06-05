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
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'linear-gradient(135deg, #D4174A, #A8102E)',
        boxShadow: '0 4px 20px rgba(212,23,74,0.35)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
      }}>
      <ArrowUp size={17} />
    </button>
  );
}
