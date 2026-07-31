'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Instagram, Youtube, Globe, ArrowUpRight } from 'lucide-react';
import { ContactModal } from './ContactModal';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: 'Email', href: 'mailto:hello@karrycreative.studio', text: 'hello@karrycreative.studio', Icon: Mail },
  { label: 'Instagram', href: 'https://www.instagram.com/karrycoder007', text: '@karrycoder007', Icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com/@unfiltered_karry', text: '@unfiltered_karry', Icon: Youtube },
  { label: 'Portfolio', href: 'https://kartikbhat.me', text: 'kartikbhat.me', Icon: Globe },
];

export function Footer() {
  const root = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<SVGSVGElement>(null);
  const [contactOpen, setContactOpen] = useState(false);

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

      const marquee = root.current?.querySelector('.marquee-track');
      if (marquee) {
        gsap.to(marquee, { xPercent: -50, repeat: -1, duration: 14, ease: 'none' });
      }

      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          rotate: 360,
          repeat: -1,
          duration: 18,
          ease: 'none',
          transformOrigin: '50% 50%',
        });
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

      {/* headline · rotating badge · socials */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8 px-6 md:px-10 py-14 lg:py-0">
        <div className="shrink-0 text-center lg:text-left">
          <h2
            className="font-body font-extrabold leading-[0.85] text-[16vw] sm:text-[13vw] lg:text-[7vw]"
            style={{ transform: 'skewX(-6deg)', letterSpacing: '-0.03em' }}
          >
            <div className="footer-line overflow-hidden">
              <span className="block">Let&apos;s</span>
            </div>
            <div className="footer-line overflow-hidden">
              <span className="block" style={{ color: 'var(--accent)' }}>
                talk.
              </span>
            </div>
          </h2>

          <button
            onClick={() => setContactOpen(true)}
            className="footer-fade group inline-flex items-center gap-3 mt-6 md:mt-8 font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-transform hover:scale-[1.03]"
            style={{ background: 'var(--accent)', color: '#FDFAF6' }}
          >
            Start a project
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* rotating "available for work" badge — fills the middle gap */}
        <div className="footer-fade relative w-36 h-36 md:w-44 md:h-44 shrink-0 hidden sm:block">
          <svg ref={badgeRef} viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <path id="footerCirclePath" d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0" />
            </defs>
            <text
              fontSize="11.5"
              letterSpacing="3"
              fill="var(--fg-muted)"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <textPath href="#footerCirclePath">
                AVAILABLE FOR PROJECTS • WEB &amp; PHOTOGRAPHY • AVAILABLE FOR PROJECTS • WEB &amp; PHOTOGRAPHY •
              </textPath>
            </text>
          </svg>
          <div
            className="absolute inset-0 m-auto flex items-center justify-center rounded-full"
            style={{ width: '46%', height: '46%', background: 'var(--accent)' }}
          >
            <ArrowUpRight size={26} color="#FDFAF6" strokeWidth={1.75} />
          </div>
        </div>

        {/* socials — luxury editorial list */}
        <div className="footer-fade flex flex-col gap-0 shrink-0 w-full sm:w-auto max-w-xs sm:max-w-none">
          {socials.map(({ label, href, text, Icon }, i) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="group flex items-center gap-4 py-3 border-t last:border-b"
              style={{ borderColor: 'var(--line)' }}
            >
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:border-transparent"
                style={{ border: '1px solid var(--line)' }}
              >
                <Icon
                  size={14}
                  strokeWidth={1.5}
                  className="opacity-70 group-hover:opacity-100 transition-colors duration-300 group-hover:text-[#FDFAF6]"
                />
              </span>

              <span className="flex flex-col leading-tight">
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">{label}</span>
                <span className="font-body text-sm md:text-base">{text}</span>
              </span>

              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                className="ml-auto shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                style={{ color: 'var(--accent)', transform: 'rotate(12deg)' }}
              />
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


      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </footer>
  );
}