'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import type { FeaturedProject } from '@/lib/featuredProject';

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProjects({ projects }: { projects: FeaturedProject[] }) {
  const root = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLAnchorElement[]>([]);
  const revealRefs = useRef<HTMLDivElement[]>([]);
  const zoomRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Slow, elegant header reveal (1.2s Duration)
      gsap.from('.projects-header-fade', {
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        },
      });

      // 2. Project Cards Grid Animations
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        // Base card container fade up
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
          },
        });

        // Clip-path mask reveal (top to bottom)
        const revealEl = revealRefs.current[index];
        if (revealEl) {
          gsap.fromTo(
            revealEl,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.2,
              ease: 'power4.inOut',
              scrollTrigger: {
                trigger: card,
                start: 'top 82%',
              },
            }
          );
        }

        // Inner Image Zoom down stabilization
        const zoomEl = zoomRefs.current[index];
        if (zoomEl) {
          gsap.fromTo(
            zoomEl,
            { scale: 1.2 },
            {
              scale: 1,
              duration: 1.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 82%',
              },
            }
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section 
      ref={root} 
      className="px-6 md:px-10 py-24 md:py-32 border-t" 
      style={{ borderColor: 'var(--line)' }}
    >
      {/* Header Container */}
      <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
        <div>
          <p className="projects-header-fade font-mono text-xs uppercase tracking-widest opacity-50 mb-4">
            Selected Work
          </p>
          <h2 className="projects-header-fade font-display text-big max-w-xl">
            Two projects, <span style={{ color: 'var(--accent)' }}>one standard.</span>
          </h2>
        </div>
        <div className="projects-header-fade">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border-b pb-1 shrink-0"
            style={{ borderColor: 'var(--fg)' }}
          >
            View all work
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Grid Container */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
        {projects.map((project, i) => (
          <a
            key={project.id}
            ref={(el) => { if (el) cardRefs.current[i] = el; }}
            href={project.href ?? '#'}
            target={project.href ? '_blank' : undefined}
            rel={project.href ? 'noreferrer' : undefined}
            className="group block"
          >
            <div
              className="relative w-full overflow-hidden rounded-sm"
              style={{ aspectRatio: project.imageAspect, border: '1px solid var(--line)' }}
            >
              {/* Image Reveal Mask Frame */}
              <div 
                ref={(el) => { if (el) revealRefs.current[i] = el; }} 
                className="absolute inset-0 overflow-hidden"
              >
                {/* Inner Zoom Framework element */}
                <div 
                  ref={(el) => { if (el) zoomRefs.current[i] = el; }} 
                  className="relative w-full h-full"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(min-width: 768px) 46vw, 92vw"
                  />
                </div>
              </div>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 55%)' }}
              />
            </div>

            <div className="flex items-start justify-between mt-5">
              <div>
                <span className="font-mono text-xs opacity-50">{project.category}</span>
                <h3 className="font-display text-2xl md:text-3xl mt-1 group-hover:opacity-70 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-sm opacity-60 mt-2 max-w-sm leading-relaxed">{project.description}</p>
              </div>
              <span className="font-mono text-xs opacity-50 pt-1 shrink-0">{project.year}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}