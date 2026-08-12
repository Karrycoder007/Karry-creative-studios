'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { AmbientBackground } from './AmbientBackground';
import { useLoader } from './LoaderContext';

// splits a word into individual letter spans so GSAP can flip each one
function FlipWord({ text }: { text: string }) {
  return (
    <span className="hero-flip-word inline-block" style={{ perspective: 500 }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="hero-flip-letter inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const { loaded } = useLoader();

  useLayoutEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-eyebrow', { opacity: 0, y: -10, duration: 1.1 }, 0.2)
        .from(
          '.hero-word-inner',
          { yPercent: 115, opacity: 0, duration: 1.6, stagger: 0.32, transformOrigin: '0% 100%' },
          0.6
        )
        // entrance flip — plays once, on load
        .from(
          '.hero-flip-letter',
          {
            rotateX: -100,
            opacity: 0,
            duration: 0.7,
            stagger: 0.045,
            transformOrigin: '50% 100%',
            ease: 'back.out(1.7)',
          },
          '-=1.1'
        )
        .from('.hero-subtitle', { opacity: 0, y: 14, duration: 1 }, '-=0.3')
        .from('.hero-cta', { opacity: 0, y: 12, scale: 0.96, duration: 0.9 }, '-=0.3')
        .from('.ambient-blob', { opacity: 0, scale: 0.6, duration: 2.2, stagger: 0.18 }, 0)
        .from('.hero-grid', { opacity: 0, duration: 2.4, ease: 'power2.out' }, 0);

      // once the entrance settles, start a separate infinite loop: a full
      // 3D cube spin per letter, staggered, repeating every ~2.5s forever
      tl.eventCallback('onComplete', () => {
        gsap.to('.hero-flip-letter', {
          rotateX: '+=360',
          duration: 0.9,
          stagger: 0.06,
          repeat: -1,
          repeatDelay: 2.2,
          ease: 'power2.inOut',
          transformOrigin: '50% 50%',
        });
      });
    }, root);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <section
      ref={root}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 md:px-10 overflow-hidden"
    >
      <AmbientBackground />

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
        <p
          className="hero-eyebrow font-display italic text-lg md:text-xl mb-6"
          style={{ color: 'var(--fg-muted)' }}
        >
          Est. 2026 — Goa, India
        </p>

        <h1 className="font-display font-medium leading-[1.05]">
          <div className="hero-line overflow-hidden">
            <span className="hero-word-inner block text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight">
              Craft that{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                <FlipWord text="travels" />
              </em>{' '}
              &amp;
            </span>
          </div>
          <div className="hero-line overflow-hidden">
            <span className="hero-word-inner block text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight">
              code that{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                <FlipWord text="performs" />
              </em>
            </span>
          </div>
        </h1>

       <p className="hero-subtitle max-w-lg mt-8 font-body text-sm md:text-base opacity-70 leading-relaxed">
  Web development and photography for hotels, hospitality, and premium brands —
  built by one person who ships both, Kartik Bhat. Sites engineered in Next.js,
  stories shot in the Himalaya.
</p>

        <Link
          href="/work"
          className="hero-cta mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest transition-transform hover:scale-[1.03]"
          style={{ background: 'var(--fg)', color: 'var(--bg)' }}
        >
          View the work
        </Link>
      </div>
    </section>
  );
}