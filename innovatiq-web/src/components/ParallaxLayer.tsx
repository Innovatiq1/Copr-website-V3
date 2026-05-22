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

    function update() {
      const parent = el!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const viewCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      // Offset increases as section moves away from viewport center
      const offset = (viewCenter - sectionCenter) * speed;
      el!.style.transform = `translateY(${offset}px)`;
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
