'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import type { PhotoCategory } from '@/lib/photoCategories';

gsap.registerPlugin(ScrollTrigger);

export function PhotographyCategories({ categories }: { categories: PhotoCategory[] }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      });
      tl.from('.pc-header > *', { opacity: 0, y: 24, duration: 0.7, stagger: 0.1, ease: 'power3.out' })
        .from('.pc-card', { opacity: 0, y: 40, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, '-=0.4');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="px-6 md:px-10 py-24 md:py-32 border-t" style={{ borderColor: 'var(--line)' }}>
      <div className="pc-header flex items-end justify-between mb-14 flex-wrap gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">Behind the Lens</p>
          <h2 className="font-display text-big max-w-xl">
            What I <span style={{ color: 'var(--accent)' }}>shoot.</span>
          </h2>
        </div>
        <Link
          href="/photography"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border-b pb-1 shrink-0"
          style={{ borderColor: 'var(--fg)' }}
        >
          View full gallery
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/photography?category=${cat.id}`}
            className="pc-card group block"
          >
            <div
              className="relative w-full aspect-[4/5] overflow-hidden rounded-sm"
              style={{ border: '1px solid var(--line)' }}
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(min-width: 768px) 32vw, 92vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)' }}
              />
              <span
                className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#FDFAF6' }}
              >
                View category →
              </span>
            </div>
            <h3 className="font-display text-2xl mt-4 mb-1">{cat.label}</h3>
            <p className="text-sm opacity-60 leading-relaxed">{cat.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}