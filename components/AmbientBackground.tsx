'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// reduced from 5 blobs to 2 — fewer blurred, animating elements is the
// single biggest lever for lowering this component's ongoing GPU cost
const blobs = [
  { color: 'var(--ambient-1)', size: 46, top: '8%', left: '6%', dur: 22, depth: 1.2 },
  { color: 'var(--ambient-2)', size: 40, top: '52%', left: '68%', dur: 26, depth: 2.4 },
];

export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let driftTweens: gsap.core.Tween[] = [];
    let glowTween: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      driftTweens = root.querySelectorAll<HTMLDivElement>('.ambient-drift').length
        ? Array.from(root.querySelectorAll<HTMLDivElement>('.ambient-drift')).map((blob, i) =>
            gsap.to(blob, {
              x: () => gsap.utils.random(-60, 60),
              y: () => gsap.utils.random(-50, 50),
              duration: blobs[i]?.dur ?? 20,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            })
          )
        : [];

      const glow = root.querySelector<HTMLDivElement>('.ambient-glow');
      if (glow) {
        gsap.set(glow, { willChange: 'transform' });
        glowTween = gsap.to(glow, {
          rotate: 360,
          repeat: -1,
          duration: 60,
          ease: 'none',
          transformOrigin: '50% 50%',
        });
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

    let raf: number | null = null;
    let lastEvent: MouseEvent | null = null;
    let parallaxEnabled = true;

    const applyMove = () => {
      raf = null;
      if (!lastEvent || !parallaxEnabled) return;
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

    // pause every animation in this component the moment the hero scrolls
    // out of view, so nothing keeps burning frames once nobody can see it —
    // this is the main fix: previously all of this ran for the entire
    // session regardless of scroll position
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        parallaxEnabled = visible;
        driftTweens.forEach((t) => (visible ? t.play() : t.pause()));
        if (glowTween) visible ? glowTween.play() : glowTween.pause();
      },
      { threshold: 0 }
    );
    io.observe(root);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
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
          {/* mix-blend-mode removed — blend modes force the browser to
              recompute compositing against everything behind them on every
              frame the element moves, which was the most expensive part of
              this component. Plain opacity gives a near-identical look for
              far less GPU cost. */}
          <div
            className="ambient-drift ambient-blob w-full h-full rounded-full blur-3xl"
            style={{ background: b.color, opacity: 0.16 }}
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