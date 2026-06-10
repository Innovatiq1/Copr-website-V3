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

    // Cache rect — refreshed on mouseenter and resize to avoid layout thrash on every mousemove
    let rect = wrap.getBoundingClientRect();

    function scheduleRaf() {
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    function tick() {
      rafId = 0;
      const e = inside ? ease : ease * 0.4;
      curX += (rawX - curX) * e;
      curY += (rawY - curY) * e;
      curScale += (tarScale - curScale) * ease;

      inner.style.transform = `rotateY(${curX}deg) rotateX(${curY}deg) scale3d(${curScale},${curScale},${curScale})`;

      // CSS vars for child depth elements (normalized -0.5 to 0.5)
      wrap.style.setProperty('--mx', (curX / intensity).toFixed(4));
      wrap.style.setProperty('--my', (curY / intensity).toFixed(4));

      const atRest = !inside && Math.abs(curX) < 0.01 && Math.abs(curY) < 0.01 && Math.abs(curScale - 1) < 0.001;
      if (!atRest) scheduleRaf();
    }

    function onMove(e: MouseEvent) {
      // Use cached rect — no getBoundingClientRect() on every mousemove
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      rawX = nx * intensity;
      rawY = -ny * intensity;
      tarScale = 1.05;

      if (glare) {
        glare.style.backgroundImage = `radial-gradient(circle at ${(nx + 0.5) * 100}% ${(ny + 0.5) * 100}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)`;
        glare.style.opacity = '1';
      }
      scheduleRaf();
    }

    function onEnter() {
      rect = wrap.getBoundingClientRect(); // refresh on entry
      inside = true;
      scheduleRaf();
    }

    function onLeave() {
      inside = false;
      rawX = 0; rawY = 0; tarScale = 1;
      if (glare) glare.style.opacity = '0';
      scheduleRaf();
    }

    // Refresh cached rect on resize
    const onResize = () => { rect = wrap.getBoundingClientRect(); };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [intensity]);

  return (
    <div
      ref={wrapRef}
      className={`relative ${className ?? ''}`}
      style={{ perspective: '700px', willChange: 'transform', ...style }}
    >
      <div
        ref={innerRef}
        style={{ width: '100%', height: '100%' }}
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
            borderRadius: '20px',
            mixBlendMode: 'overlay',
          }}
        />
      </div>
    </div>
  );
}
