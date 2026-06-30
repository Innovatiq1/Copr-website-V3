'use client';
import { useRef, useEffect, type CSSProperties } from 'react';

interface Props {
  speed?: number;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export default function ParallaxLayer({ speed = 0.3, className, style, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    function update() {
      const parent = el!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const viewCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      const offset = (viewCenter - sectionCenter) * speed;
      el!.style.transform = `translateY(${offset}px)`;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
