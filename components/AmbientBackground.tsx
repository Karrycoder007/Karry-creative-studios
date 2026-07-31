'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const blobs = [
  { color: 'var(--ambient-1)', size: 46, top: '10%', left: '8%', dur: 22, depth: 1.2 },
  { color: 'var(--ambient-2)', size: 38, top: '55%', left: '68%', dur: 26, depth: 2.4 },
  { color: 'var(--ambient-1)', size: 30, top: '68%', left: '15%', dur: 19, depth: 3.6 },
  { color: 'var(--ambient-2)', size: 34, top: '5%', left: '70%', dur: 24, depth: 4.8 },
];

export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLDivElement>('.ambient-drift').forEach((blob, i) => {
        gsap.to(blob, {
          x: () => gsap.utils.random(-60, 60),
          y: () => gsap.utils.random(-50, 50),
          scale: () => gsap.utils.random(0.85, 1.2),
          duration: blobs[i]?.dur ?? 20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, root);

    const setters = parallaxRefs.current.map((el, i) => {
      if (!el) return null;
      return {
        x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3.out' }),
        depth: blobs[i]?.depth ?? 2,
      };
    });

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      setters.forEach((s) => {
        if (!s) return;
        s.x(nx * s.depth * -22);
        s.y(ny * s.depth * -22);
      });
    };

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {blobs.map((b, i) => (
        <div
          key={i}
          ref={(el) => { parallaxRefs.current[i] = el; }}
          className="ambient-parallax absolute will-change-transform"
          style={{ top: b.top, left: b.left, width: `${b.size}vw`, height: `${b.size}vw` }}
        >
          <div
            className="ambient-drift ambient-blob w-full h-full rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen"
            style={{ background: b.color, opacity: 0.22 }}
          />
        </div>
      ))}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
        <filter id="heroGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroGrain)" />
      </svg>
    </div>
  );
}