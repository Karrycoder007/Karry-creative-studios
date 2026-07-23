'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-line span', {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        delay: 0.5,
      })
        .from(
          '.hero-image-wrap',
          { clipPath: 'inset(100% 0 0 0)', duration: 1.1, ease: 'power4.inOut' },
          '-=0.7'
        )
        .from('.hero-image-wrap img', { scale: 1.25, duration: 1.4, ease: 'power3.out' }, '<')
        .from('.hero-sub', { opacity: 0, y: 16, duration: 0.8 }, '-=0.9')
        .from('.hero-meta > *', { opacity: 0, y: 10, duration: 0.6, stagger: 0.1 }, '-=0.5');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-28 pb-16">
      <p className="hero-sub font-mono text-xs md:text-sm uppercase tracking-widest opacity-60 mb-6">
        Karry Creative Studios — Goa, India
      </p>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 md:gap-10 lg:gap-14 items-center">
  <h1 className="font-display font-medium">
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

  {/* portrait — replace public/hero/portrait.jpg with a real shot of you trekking/shooting */}
  <div
    className="hero-image-wrap relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-none mx-auto lg:mx-0 aspect-[4/5] overflow-hidden rounded-sm"
    style={{ border: '1px solid var(--line)' }}
  >
    <Image
      src="/hero/portrait.jpg"
      alt="Kartik Bhat on location — trek and shoot"
      fill
      priority
      className="object-cover"
      sizes="(min-width: 1024px) 32vw, (min-width: 768px) 320px, 280px"
    />
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(to top, var(--ink, #1C1008)33, transparent 45%)' }}
    />
    <div
      className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm"
      style={{ background: 'color-mix(in srgb, var(--ink, #1C1008) 55%, transparent)', color: '#FDFAF6' }}
    >
      Panch Kedar, 2026
    </div>
  </div>
</div>

      <div className="hero-meta flex flex-col md:flex-row md:items-end md:justify-between mt-14 gap-8">
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