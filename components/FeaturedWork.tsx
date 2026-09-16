'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Code2, Camera, Clapperboard, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Extend your existing Project type in @/lib/projects with these optional
// fields. Existing entries without them still render fine — every block
// below is conditional.
export type Project = {
  id: string;
  title: string;
  category: string; // e.g. 'Web Development', 'Photography', 'Filmmaking'
  year: string;
  image: string;
  href?: string;
  challenge?: string;   // 1 sentence — what the client needed
  approach?: string;    // 1 sentence — what was used / how it was done
  result?: string;      // 1 sentence — what changed
  metricLabel?: string; // e.g. 'Lighthouse Score'
  metricValue?: string; // e.g. '60 → 95'
};

function iconForCategory(category: string) {
  const c = category.toLowerCase();
  if (c.includes('photo')) return Camera;
  if (c.includes('film')) return Clapperboard;
  return Code2;
}

export function FeaturedWork({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const rows = section.querySelectorAll<HTMLDivElement>('.work-row');

      rows.forEach((row) => {
        const image = row.querySelector('.work-image');
        const fadeEls = row.querySelectorAll('.work-fade');

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 80%' },
          defaults: { ease: 'power3.out' },
        });

        if (image) {
          tl.fromTo(
            image,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut' }
          );
        }
        tl.from(fadeEls, { opacity: 0, y: 26, duration: 0.9, stagger: 0.1 }, '-=0.65');
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 md:px-10 py-16 md:py-24">
      <div className="flex flex-col gap-28 md:gap-44">
        {projects.map((project, i) => {
          const Icon = iconForCategory(project.category);
          const reversed = i % 2 === 1;
          const index = String(i + 1).padStart(2, '0');

          return (
            <div key={project.id} className="work-row relative">
              {/* large index numeral, sits behind the row */}
              <span
                className="font-display absolute -top-10 md:-top-16 select-none pointer-events-none"
                style={{
                  [reversed ? 'right' : 'left']: 0,
                  fontSize: 'clamp(64px, 10vw, 140px)',
                  lineHeight: 1,
                  color: 'var(--fg)',
                  opacity: 0.05,
                }}
              >
                {index}
              </span>

              <div
                className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
                  reversed ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Image */}
                <div
                  className="work-image group relative aspect-[4/3] overflow-hidden rounded-sm"
                  style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="(min-width: 1024px) 45vw, 90vw"
                  />
                </div>

                {/* Journey / narrative */}
                <div>
                  <div className="work-fade flex items-center gap-3 mb-7">
                    <div
                      className="flex items-center justify-center rounded-full shrink-0"
                      style={{ width: 44, height: 44, border: '1px solid var(--line)' }}
                    >
                      <Icon size={18} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest opacity-50">
                      {project.category} — {project.year}
                    </span>
                  </div>

                  <h3 className="work-fade font-display text-4xl md:text-5xl leading-[1.05] mb-8 max-w-md">
                    {project.title}
                  </h3>

                  <div className="flex flex-col gap-4 mb-8" style={{ borderLeft: '1px solid var(--line)' }}>
                    {project.challenge && (
                      <p className="work-fade text-sm md:text-base opacity-75 leading-relaxed max-w-md pl-5">
                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 block mb-1">
                          The brief
                        </span>
                        {project.challenge}
                      </p>
                    )}
                    {project.approach && (
                      <p className="work-fade text-sm md:text-base opacity-75 leading-relaxed max-w-md pl-5">
                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 block mb-1">
                          The approach
                        </span>
                        {project.approach}
                      </p>
                    )}
                    {project.result && (
                      <p className="work-fade text-sm md:text-base opacity-75 leading-relaxed max-w-md pl-5">
                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 block mb-1">
                          The outcome
                        </span>
                        {project.result}
                      </p>
                    )}
                  </div>

                  {project.metricLabel && project.metricValue && (
                    <div
                      className="work-fade inline-block rounded-md px-6 py-4 mb-8"
                      style={{ border: '1px solid var(--line)' }}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-1">
                        {project.metricLabel}
                      </p>
                      <p className="font-display text-2xl" style={{ color: 'var(--accent)' }}>
                        {project.metricValue}
                      </p>
                    </div>
                  )}

                  <a
                    href={project.href ?? '#'}
                    className="work-fade relative inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest group/link"
                  >
                    <span className="relative">
                      View project
                      <span
                        className="absolute left-0 -bottom-1 w-full h-px origin-left scale-x-100 transition-transform duration-300 group-hover/link:scale-x-0"
                        style={{ background: 'var(--fg)' }}
                      />
                      <span
                        className="absolute left-0 -bottom-1 w-full h-px origin-right scale-x-0 transition-transform duration-300 delay-100 group-hover/link:scale-x-100"
                        style={{ background: 'var(--accent)' }}
                      />
                    </span>
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}