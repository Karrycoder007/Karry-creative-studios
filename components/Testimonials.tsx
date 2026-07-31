'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Testimonial } from '@/lib/testimonials';

const ease = [0.65, 0, 0.35, 1] as const;
const AUTOPLAY_MS = 6000;

export function Testimonials({ items = [] }: { items?: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || items.length === 0) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, items.length]);

  if (items.length === 0) return null;

  const current = items[index];

  return (
    <section
      className="relative px-6 md:px-10 py-24 md:py-32 border-t overflow-hidden"
      style={{ borderColor: 'var(--line)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* subtle background — one soft wash + faint grain, nothing loud */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '38vw',
            height: '38vw',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--ambient-1)',
            opacity: 0.1,
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <filter id="testimonialGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#testimonialGrain)" />
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-8">Client Words</p>

        {/* avatar — crossfades in sync with the quote */}
        <div className="flex justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.avatar}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5, ease }}
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden"
              style={{ border: '1.5px solid var(--accent)' }}
            >
              <Image src={current.avatar} alt={current.name} fill className="object-cover" sizes="80px" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* oversized faint quote mark */}
        <span
          className="font-display block leading-none select-none"
          style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', color: 'var(--accent)', opacity: 0.15 }}
        >
          &ldquo;
        </span>

        <div className="min-h-[220px] md:min-h-[180px] flex items-center justify-center -mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="font-display text-2xl md:text-4xl leading-snug mb-8">
                {current.quote}
              </p>
              <p className="font-mono text-xs uppercase tracking-widest">
                <span style={{ color: 'var(--accent)' }}>{current.name}</span>
                <span className="opacity-50"> — {current.role}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* indicators */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {items.map((t, i) => (
            <button
              key={t.id}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className="h-[3px] rounded-full transition-all duration-500"
              style={{
                width: i === index ? 28 : 10,
                background: i === index ? 'var(--accent)' : 'var(--line)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}