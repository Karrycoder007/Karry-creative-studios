'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const blobs = [
  { color: 'var(--ambient-1)', size: 46, top: '8%', left: '6%', dur: 22, depth: 1.2 },
  { color: 'var(--ambient-2)', size: 40, top: '52%', left: '68%', dur: 26, depth: 2.4 },
  { color: 'var(--ambient-1)', size: 30, top: '66%', left: '12%', dur: 19, depth: 3.6 },
  { color: 'var(--ambient-2)', size: 36, top: '2%', left: '68%', dur: 24, depth: 4.8 },
  { color: 'var(--accent)', size: 20, top: '38%', left: '42%', dur: 17, depth: 3 },
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
          // scale removed — was forcing re-rasterization of the blur every frame
          duration: blobs[i]?.dur ?? 20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // slow rotating conic glow behind everything — adds depth without noise
      const glow = root.querySelector<HTMLDivElement>('.ambient-glow');
      if (glow) {
        gsap.set(glow, { willChange: 'transform' });
        gsap.to(glow, { rotate: 360, repeat: -1, duration: 60, ease: 'none', transformOrigin: '50% 50%' });
      }
    }, root);

    const setters = parallaxRefs.current.map((el, i) => {
      if (!el) return null;
      return {
        x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3.out' }),
        depth: blobs[i]?.depth ?? 2,
      };
    });

    // throttled to one update per animation frame instead of once per raw
    // mousemove event — this was firing 5 tween starts on every pixel of
    // mouse movement, stacked on top of CustomCursor's own 4 tweens
    let raf: number | null = null;
    let lastEvent: MouseEvent | null = null;

    const applyMove = () => {
      raf = null;
      if (!lastEvent) return;
      const nx = lastEvent.clientX / window.innerWidth - 0.5;
      const ny = lastEvent.clientY / window.innerHeight - 0.5;
      setters.forEach((s) => {
        if (!s) return;
        s.x(nx * s.depth * -22);
        s.y(ny * s.depth * -22);
      });
    };

    const onMove = (e: MouseEvent) => {
      lastEvent = e;
      if (raf) return;
      raf = requestAnimationFrame(applyMove);
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* slow rotating soft conic glow, sits behind the blobs for extra depth */}
      <div
        className="ambient-glow absolute rounded-full blur-3xl"
        style={{
          width: '70vw',
          height: '70vw',
          top: '-15vw',
          left: '15vw',
          background: 'conic-gradient(from 0deg, var(--ambient-1), transparent 30%, var(--ambient-2), transparent 70%, var(--ambient-1))',
          opacity: 0.08,
        }}
      />

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

      {/* subtle engineering grid — ties into the "engineered" positioning,
          reads as structure/precision rather than decoration */}
      <div
        className="hero-grid absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0.25,
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)',
        }}
      />

      {/* fine grain for tactility */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
        <filter id="heroGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroGrain)" />
      </svg>

      {/* soft vignette — pulls focus to the centre, gives the flat blobs
          more atmospheric depth, closer to a photographic backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 40%, var(--bg) 100%)',
          opacity: 0.5,
        }}
      />
    </div>
  );
}