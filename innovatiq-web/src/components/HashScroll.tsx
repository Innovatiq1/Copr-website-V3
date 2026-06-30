'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace('#', '');
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const navbarHeight = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };
    // Small delay to let page content render
    const t = setTimeout(scroll, 300);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
