'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, .cursor-hover';

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(isFinePointer);
  }, []);

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

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.addEventListener('mouseenter', onOver, true);
document.addEventListener('mouseleave', onOut, true);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full will-change-transform transition-opacity duration-200 ease-out"
        style={{
          width: 64,
          height: 64,
          marginLeft: -17,
          marginTop: -17,
          border: '1.5px solid var(--fg)',
          opacity: hovering ? 0 : 0.9,
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full will-change-transform transition-opacity duration-200 ease-out"
        style={{
          width: 10,
          height: 10,
          marginLeft: -3,
          marginTop: -3,
          background: 'var(--fg)',
          opacity: hovering ? 0 : 0.9,
        }}
      />
    </>
  );
}