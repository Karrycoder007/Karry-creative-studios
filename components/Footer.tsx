'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: 'Email', href: 'mailto:hello@karrycreative.studio', text: 'hello@karrycreative.studio' },
  { label: 'Instagram', href: 'https://www.instagram.com/karrycoder007' },
  { label: 'YouTube', href: 'https://www.youtube.com/@unfiltered_karry' },
  { label: 'Portfolio', href: 'https://kartikbhat.me' },
];



export function Footer() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-line span', {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });

      gsap.from('.footer-fade', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 60%' },
      });

      gsap.from('.footer-card', {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      });

      const marquee = root.current?.querySelector('.marquee-track');
      if (marquee) {
        gsap.to(marquee, { xPercent: -50, repeat: -1, duration: 14, ease: 'none' });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={root}
      className="relative min-h-[50vh] flex flex-col justify-between overflow-hidden border-t"
      style={{ borderColor: 'var(--line)' }}
    >
      {/* marquee strip */}
      <div className="overflow-hidden py-4 border-b" style={{ borderColor: 'var(--line)' }}>
        <div className="marquee-track flex w-max font-mono text-xs uppercase tracking-widest opacity-50 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center gap-4 pr-4">
              {Array.from({ length: 6 }).map((_, j) => (
                <span key={j} className="flex items-center gap-4">
                  Available for projects
                  <span style={{ color: 'var(--accent)' }}>●</span>
                  Web &amp; Photography
                  <span style={{ color: 'var(--accent)' }}>●</span>
                  Based in Goa, worldwide
                  <span style={{ color: 'var(--accent)' }}>●</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* headline · card stack · socials */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6 px-6 md:px-10 py-14 lg:py-0">
        <a href="mailto:hello@karrycreative.studio" className="group block shrink-0">
          <h2
            className="font-body font-extrabold leading-[0.85] text-[16vw] sm:text-[13vw] lg:text-[7vw]"
            style={{ transform: 'skewX(-6deg)', letterSpacing: '-0.03em' }}
          >
            <div className="footer-line overflow-hidden">
              <span className="block transition-colors duration-500 group-hover:opacity-70">Let&apos;s</span>
            </div>
            <div className="footer-line overflow-hidden">
              <span className="block transition-colors duration-500" style={{ color: 'var(--accent)' }}>
                talk.
              </span>
            </div>
          </h2>
        </a>

        {/* playing-card photo stack — fills the middle gap */}
        {/* <div className="relative w-48 h-64 sm:w-56 sm:h-72 shrink-0 mx-auto lg:mx-0">
          {cards.map((card, i) => (
            <div
              key={card.src}
              className="footer-card absolute inset-0 rounded-md overflow-hidden shadow-xl"
              style={{
                transform: `rotate(${card.rotate}deg) translate(${card.x}px, ${card.y}px)`,
                zIndex: card.z,
                border: '1px solid var(--line)',
              }}
            >
              <Image
                src={card.src}
                alt={`Himalaya photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
          ))}
        </div> */}

        {/* socials — moved to the far side, always visible */}
        <div className="footer-fade flex flex-col items-center lg:items-end gap-3 font-mono text-xs md:text-sm uppercase tracking-widest opacity-70 shrink-0">
          {socials.map((s) => (
            
              <a key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
              className="hover:opacity-100 transition-opacity border-b border-transparent hover:border-current pb-0.5"
            >
              {s.text ?? s.label}
            </a>
          ))}
        </div>
      </div>

      {/* bottom bar */}
      <div className="px-6 md:px-10 pb-8 md:pb-10">
        <div
          className="footer-fade flex flex-col md:flex-row justify-between pt-6 border-t font-mono text-[11px] opacity-50"
          style={{ borderColor: 'var(--line)' }}
        >
          <p>© {new Date().getFullYear()} Karry Creative Studios. Kartik Bhat.</p>
          <p>Goa, India — available worldwide</p>
        </div>
      </div>
    </footer>
  );
}