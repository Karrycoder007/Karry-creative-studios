'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import type { Project } from '@/lib/projects';

gsap.registerPlugin(ScrollTrigger);

export function ProjectStrip({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const scrollDistance = track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance + window.innerHeight}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(track, { x: -scrollDistance, ease: 'none' });

      // curved / draped effect: each card tilts based on its position
      // relative to the viewport centre as the strip moves.
      cardRefs.current.forEach((card) => {
        if (!card) return;
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance + window.innerHeight}`,
          scrub: true,
          onUpdate: () => {
            const rect = card.getBoundingClientRect();
            const centre = window.innerWidth / 2;
            const distance = (rect.left + rect.width / 2 - centre) / centre; // -1..1
            const rotateY = distance * -18;
            const translateY = Math.abs(distance) * 40;
            const scale = 1 - Math.min(Math.abs(distance), 1) * 0.12;
            gsap.set(card, {
              rotateY,
              y: translateY,
              scale,
              transformPerspective: 1200,
            });
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex flex-col pt-24 md:pt-28 pb-8 md:pb-10"
    >
      <div className="shrink-0 px-6 md:px-10 mb-4 md:mb-6 font-mono text-xs uppercase tracking-widest opacity-60">
        Selected Work — Scroll
      </div>

      <div
        ref={trackRef}
        className="flex-1 min-h-0 flex items-center gap-8 md:gap-14 px-[8vw] md:px-[10vw] will-change-transform"
        style={{ width: 'max-content' }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="relative w-[78vw] md:w-[34vw] shrink-0 h-full flex flex-col group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <a href={project.href ?? '#'} className="flex flex-col h-full">
              <div
                className="relative flex-1 min-h-0 overflow-hidden rounded-sm"
                style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover  group-hover:grayscale-0 transition-all duration-700 ease-signature scale-105 group-hover:scale-100"
                  sizes="40vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top, var(--ink, #1C1008)55, transparent 60%)' }}
                />
              </div>
              <div className="shrink-0 flex items-start justify-between mt-3 md:mt-5">
                <div>
                  <span className="font-mono text-[11px] md:text-xs opacity-50">
                    {project.id} — {project.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl mt-1">{project.title}</h3>
                </div>
                <span className="font-mono text-[11px] md:text-xs opacity-50 pt-1">{project.year}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}