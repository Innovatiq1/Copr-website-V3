'use client';
import { useRef, useEffect, type ReactNode, type CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  intensity?: number;
}

export default function TiltCard({ children, className, style, intensity = 22 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Non-null assertions are safe — element is mounted when useEffect runs
    const wrap = wrapRef.current!;
    const inner = innerRef.current!;
    const glare = glareRef.current;
    if (!wrap || !inner) return;

    let rafId = 0;
    let rawX = 0, rawY = 0, curX = 0, curY = 0;
    let tarScale = 1, curScale = 1;
    let inside = false;
    const ease = 0.09;

    function tick() {
      const e = inside ? ease : ease * 0.4;
      curX += (rawX - curX) * e;
      curY += (rawY - curY) * e;
      curScale += (tarScale - curScale) * ease;

      inner.style.transform = `rotateY(${curX}deg) rotateX(${curY}deg) scale3d(${curScale},${curScale},${curScale})`;

      // CSS vars for child depth elements (normalized -0.5 to 0.5)
      wrap.style.setProperty('--mx', (curX / intensity).toFixed(4));
      wrap.style.setProperty('--my', (curY / intensity).toFixed(4));

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    function onMove(e: MouseEvent) {
      const rect = wrap.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      rawX = nx * intensity;
      rawY = -ny * intensity;
      tarScale = 1.05;

      wrap.style.filter = `drop-shadow(${-nx * 32}px ${ny * 32}px 48px rgba(0,0,0,0.58))`;

      if (glare) {
        glare.style.background = `radial-gradient(circle at ${(nx + 0.5) * 100}% ${(ny + 0.5) * 100}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)`;
        glare.style.opacity = '1';
      }
    }

    function onEnter() { inside = true; }

    function onLeave() {
      inside = false;
      rawX = 0; rawY = 0; tarScale = 1;
      wrap.style.filter = '';
      if (glare) glare.style.opacity = '0';
    }

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(rafId);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={wrapRef}
      className={`relative ${className ?? ''}`}
      style={{ perspective: '700px', ...style }}
    >
      <div
        ref={innerRef}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
      >
        {children}
        <div
          ref={glareRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.35s ease',
            zIndex: 50,
            borderRadius: '16px',
            mixBlendMode: 'overlay',
          }}
        />
      </div>
    </div>
  );
}
