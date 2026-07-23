'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, .cursor-hover';

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // step 1: decide whether this device even gets a custom cursor
  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(isFinePointer);
  }, []);

  // step 2: only runs once `enabled` is true, i.e. AFTER the ring/dot
  // elements below have actually been rendered and refs are attached
  useEffect(() => {
    if (!enabled) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    document.body.classList.add('custom-cursor-active');

    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      setRingX(e.clientX);
      setRingY(e.clientY);
      setDotX(e.clientX);
      setDotY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(HOVER_SELECTOR)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(HOVER_SELECTOR)) setHovering(false);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* outer ring — shrinks on hover */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full will-change-transform transition-[width,height,margin] duration-300 ease-out"
        style={{
          width: hovering ? 14 : 70,
          height: hovering ? 14 : 70,
          marginLeft: hovering ? -7 : -17,
          marginTop: hovering ? -7 : -17,
          border: '1.5px solid var(--fg)',
          opacity: 0.9,
        }}
      />
      {/* inner dot/arrow — grows on hover */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[200] pointer-events-none flex items-center justify-center will-change-transform transition-[width,height,margin] duration-300 ease-out"
        style={{
          width: hovering ? 30 : 6,
          height: hovering ? 30 : 6,
          marginLeft: hovering ? -15 : -3,
          marginTop: hovering ? -15 : -3,
        }}
      >
        {hovering ? (
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontWeight: 800,
              fontSize: 20,
              lineHeight: 1,
              color: 'var(--accent)',
              display: 'inline-block',
              transform: 'rotate(-40deg)',
              transition: 'transform 0.3s ease-out',
            }}
          >
            →
          </span>
        ) : (
          <div className="rounded-full" style={{ width: 6, height: 6, background: 'var(--fg)' }} />
        )}
      </div>
    </>
  );
}