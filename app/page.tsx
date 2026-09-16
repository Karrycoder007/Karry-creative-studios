'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';


import { Testimonials } from '@/components/Testimonials';
import { testimonials } from '@/lib/testimonial';
import { Pricing } from '@/components/Pricing';
import { pricingTiers } from '@/lib/pricing';
import { FAQ } from '@/components/Faq';
import { faqs } from '@/lib/faqs';
import { About } from '@/components/About';
import { FeaturedProjects } from '@/components/FeauturedProjects';
import { featuredProjects } from '@/lib/featuredProject';
import { PhotographyCategories } from '@/components/PhotographyCategories';
import { photoCategories } from '@/lib/photoCategories';
import { CombinedOfferBanner } from '@/components/Banner';
import { Compass, PenTool, Code2, PackageCheck, Camera, Clapperboard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const process = [
  { n: '01', title: 'Discover', copy: 'A direct call to understand the goal, not a form that disappears into a pipeline.', Icon: Compass },
  { n: '02', title: 'Design', copy: 'A visual direction specific to your brand — never a recycled template.', Icon: PenTool },
  { n: '03', title: 'Build', copy: 'Next.js, TypeScript, and motion built for speed — engineered, not assembled.', Icon: Code2 },
  { n: '04', title: 'Deliver', copy: 'You own the codebase, the domain, and the deployment. No lock-in.', Icon: PackageCheck },
];

const services = [
  {
    title: 'Web Development',
    copy: 'Next.js / TypeScript / Tailwind sites — from portfolios to full e-commerce builds — that load fast and convert. Built and owned by one engineer end to end.',
    Icon: Code2,
  },
  {
    title: 'Photography',
    copy: 'Travel, landscape, and expedition photography shot on-location across the Himalaya and beyond.',
    Icon: Camera,
  },
  {
    title: 'Filmmaking',
    copy: 'Cinematic travel and brand video — shot, edited, and graded for YouTube and campaign use.',
    Icon: Clapperboard,
  },
];

export default function Home() {
  const processRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- "How it works" reveal ----
      if (processRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: processRef.current, start: 'top 78%' },
          defaults: { ease: 'power3.out' },
        });

        tl.from('.process-header > *', { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 })
          .from('.process-icon-wrap', { opacity: 0, scale: 0.6, duration: 0.6, stagger: 0.15 }, '-=0.2')
          .from('.process-title', { opacity: 0, y: 20, duration: 0.6, stagger: 0.15 }, '-=0.4')
          .from('.process-copy', { opacity: 0, y: 16, duration: 0.6, stagger: 0.15 }, '-=0.4');
      }

      // ---- "What we do" reveal ----
      if (servicesRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: servicesRef.current, start: 'top 78%' },
          defaults: { ease: 'power3.out' },
        });

        tl.from('.services-header', { opacity: 0, y: 20, duration: 0.7 })
          .from('.service-icon-wrap', { opacity: 0, scale: 0.6, duration: 0.6, stagger: 0.18 }, '-=0.2')
          .from('.service-title', { opacity: 0, y: 20, duration: 0.6, stagger: 0.18 }, '-=0.4')
          .from('.service-copy', { opacity: 0, y: 16, duration: 0.6, stagger: 0.18 }, '-=0.4');
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Hero />
      <About/>

      {/* Trust / process */}
      <section ref={processRef} className="px-6 md:px-10 py-24 border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="process-header flex items-baseline justify-between mb-12">
          <h2 className="font-display text-big">How it works</h2>
          <span className="font-mono text-xs uppercase tracking-widest opacity-50 hidden md:block">
            Direct, transparent, yours
          </span>
        </div>
        <div className="grid md:grid-cols-4 gap-10">
          {process.map((step, i) => (
            <div
              key={step.n}
              className="group relative border-t pt-6 transition-transform duration-300 hover:-translate-y-1"
              style={{ borderColor: 'var(--line)' }}
            >
              {i < process.length - 1 && (
                <span
                  className="hidden md:block absolute top-[-1px] right-[-20px] w-[40px] h-px"
                  style={{ background: 'var(--line)' }}
                />
              )}

              {/* large faint background numeral */}
              <span
                className="font-display absolute top-0 right-0 select-none pointer-events-none"
                style={{ fontSize: '84px', lineHeight: 1, color: 'var(--fg)', opacity: 0.05 }}
              >
                {step.n}
              </span>

              <div
                className="process-icon-wrap relative flex items-center justify-center rounded-full mb-6 transition-colors duration-300 group-hover:border-[var(--accent)]"
                style={{ width: 64, height: 64, border: '1px solid var(--line)' }}
              >
                <step.Icon size={26} strokeWidth={1.25} style={{ color: 'var(--accent)' }} />
              </div>

              <h3 className="process-title font-display text-2xl mb-2">{step.title}</h3>
              <p className="process-copy text-sm opacity-70 leading-relaxed max-w-[220px]">{step.copy}</p>
            </div>
          ))}
        </div>
      </section>
      <FeaturedProjects projects={featuredProjects} />

      {/* Services */}
      <section ref={servicesRef} className="px-6 md:px-10 py-24 border-t" style={{ borderColor: 'var(--line)' }}>
        <h2 className="services-header font-display text-big mb-12">What we do</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden p-8 md:p-10 transition-colors duration-300"
              style={{ background: 'var(--bg)' }}
            >
              <span
                className="font-display absolute -top-4 -right-2 select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-10"
                style={{ fontSize: '120px', lineHeight: 1, color: 'var(--fg)', opacity: 0.04 }}
              >
                {s.title[0]}
              </span>

              <div
                className="service-icon-wrap relative flex items-center justify-center rounded-full mb-6 transition-colors duration-300 group-hover:border-[var(--accent)]"
                style={{ width: 72, height: 72, border: '1px solid var(--line)' }}
              >
                <s.Icon size={30} strokeWidth={1.25} style={{ color: 'var(--accent)' }} />
              </div>

              <h3 className="service-title font-display text-3xl mb-3" style={{ color: 'var(--accent)' }}>{s.title}</h3>
              <p className="service-copy text-sm opacity-70 leading-relaxed max-w-[280px]">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>
      <PhotographyCategories categories={photoCategories} />
      <CombinedOfferBanner/>
      <Pricing tiers={pricingTiers}/>
      <Testimonials items={testimonials} />

      
      <FAQ items={faqs} />
      

      <Footer />
    </>
  );
}