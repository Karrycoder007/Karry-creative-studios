'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const root = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Slow, staggered fade-up for all typography elements
      gsap.from('.about-fade', {
        opacity: 0,
        y: 28,
        duration: 1.4,
        stagger: 0.24,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%', // Starts animating when top of section hits 75% of viewport
        },
      });

      // 2. Image Reveal Mask (Simulating clip-path inset(100% 0 0 0) to 0%)
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: root.current,
              start: 'top 75%',
            },
          }
        );
      }

      // 3. Image Zoom Out (Simulating scale 1.25 to 1)
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.25 },
          {
            scale: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: root.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={root} 
      className="px-6 md:px-10 py-24 md:py-32 border-t" 
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-center">
        
        {/* Image Container with Reveal Effect */}
        <div
          ref={imageContainerRef}
          className="relative w-full max-w-sm mx-auto lg:mx-0 aspect-[4/5] overflow-hidden rounded-sm"
          style={{ border: '1px solid var(--line)' }}
        >
          {/* Inner wrapper managing the zoom animation */}
          <div ref={imageRef} className="relative w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1785099159811-b7781d0b3878?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D"
              alt="Kartik Bhat"
              fill
              className="object-cover "
              sizes="(min-width: 1024px) 28vw, 80vw"
            />
          </div>
        </div>

        {/* Text Area */}
        <div>
          <p className="about-fade font-mono text-xs uppercase tracking-widest opacity-50 mb-4">
            About
          </p>
          <h2 className="about-fade font-display text-big mb-6 max-w-xl">
            One person, <span style={{ color: 'var(--accent)' }}>two crafts.</span>
          </h2>
          <p className="about-fade font-body text-base md:text-lg opacity-80 leading-relaxed max-w-xl mb-4">
            I&apos;m Kartik Bhat — a web developer and photographer based in Goa, working under
            Karry Creative Studios. Every project is built and shot by me directly, end to end:
            no account managers, no handoffs, no diluted ownership of the outcome.
          </p>
          <p className="about-fade font-body text-base md:text-lg opacity-80 leading-relaxed max-w-xl mb-8">
            Sites are engineered in Next.js for speed and structure. Photography is shot
            on-location — from client work to solo Himalayan expeditions — with the same
            attention to detail on both sides of the lens.
          </p>

          {/* Stats/Tools Row */}
          <div className="about-fade flex flex-wrap gap-x-10 gap-y-6 font-mono text-xs uppercase tracking-widest">
            <div>
              <p className="text-2xl font-display italic mb-1" style={{ color: 'var(--accent)' }}>Next.js</p>
              <p className="opacity-60">TypeScript &amp; Tailwind</p>
            </div>
            <div>
              <p className="text-2xl font-display italic mb-1" style={{ color: 'var(--accent)' }}>Sony a6700</p>
              <p className="opacity-60">Viltrox 15mm f/1.7</p>
            </div>
            <div>
              <p className="text-2xl font-display italic mb-1" style={{ color: 'var(--accent)' }}>Goa</p>
              <p className="opacity-60">Available worldwide</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}