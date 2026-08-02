'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { AmbientBackground } from './AmbientBackground';
import { useLoader } from './LoaderContext';

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const { loaded } = useLoader();

  useLayoutEffect(() => {
    // wait for the preloader to actually finish before playing the
    // entrance animation — otherwise it plays invisibly behind the curtain
    if (!loaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-line span', {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        delay: 0.1,
      })
        .from('.hero-sub', { opacity: 0, y: 16, duration: 0.8 }, '-=0.7')
        .from('.hero-meta > *', { opacity: 0, y: 10, duration: 0.6, stagger: 0.1 }, '-=0.5')
        .from('.ambient-blob', { opacity: 0, scale: 0.6, duration: 1.4, stagger: 0.1 }, 0);
    }, root);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <section ref={root} className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-28 pb-16 overflow-hidden">
      <AmbientBackground />

      <p className="hero-sub relative font-mono text-xs md:text-sm uppercase tracking-widest opacity-60 mb-6">
        Karry Creative Studios — Goa, India
      </p>

      <h1 className="relative font-display font-medium">
        <div className="hero-line overflow-hidden">
          <span className="block text-[3.1rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-huge">
            Craft that
          </span>
        </div>
        <div className="hero-line overflow-hidden">
          <span
            className="block text-[3.1rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-huge"
            style={{ color: 'var(--accent)' }}
          >
            travels.
          </span>
        </div>
        <div className="hero-line overflow-hidden">
          <span className="block text-[3.1rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-huge">
            Code that
          </span>
        </div>
        <div className="hero-line overflow-hidden">
          <span className="block text-[3.1rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-huge text-outline">
            performs.
          </span>
        </div>
      </h1>

      <div className="hero-meta relative flex flex-col md:flex-row md:items-end md:justify-between mt-14 gap-8">
        <p className="max-w-md font-body text-base md:text-lg opacity-80 leading-relaxed">
          Web development and photography, built by one person who ships both:
          Kartik Bhat. Sites engineered in Next.js, stories shot in the Himalaya —
          same eye for detail on both sides of the lens.
        </p>

        <div className="flex gap-10 font-mono text-xs uppercase tracking-widest">
          <div>
            <p className="text-2xl font-display italic mb-1" style={{ color: 'var(--accent)' }}>6+</p>
            <p className="opacity-60">Projects Shipped</p>
          </div>
          <div>
            <p className="text-2xl font-display italic mb-1" style={{ color: 'var(--accent)' }}>100%</p>
            <p className="opacity-60">Solo-Built &amp; Owned</p>
          </div>
        </div>

        <Link
          href="/work"
          className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest border-b pb-1"
          style={{ borderColor: 'var(--fg)' }}
        >
          View the work
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}