import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import HighLuxurySplitSection from '@/components/New';
import { Testimonials } from '@/components/Testimonials';
import { testimonials } from '@/lib/testimonial';
import { Pricing } from '@/components/Pricing';
import { pricingTiers } from '@/lib/pricing';
import { FAQ } from '@/components/Faq';
import { faqs } from '@/lib/faqs';


const process = [
  { n: '01', title: 'Discover', copy: 'A direct call to understand the goal, not a form that disappears into a pipeline.' },
  { n: '02', title: 'Design', copy: 'A visual direction specific to your brand — never a recycled template.' },
  { n: '03', title: 'Build', copy: 'Next.js, TypeScript, and motion built for speed — engineered, not assembled.' },
  { n: '04', title: 'Deliver', copy: 'You own the codebase, the domain, and the deployment. No lock-in.' },
];

const services = [
  { title: 'Web Development', copy: 'Next.js / TypeScript / Tailwind sites that load fast and convert — built and owned by one engineer end to end.' },
  { title: 'Photography', copy: 'Travel, landscape, and expedition photography shot on-location across the Himalaya and beyond.' },
  { title: 'Filmmaking', copy: 'Cinematic travel and brand video — shot, edited, and graded for YouTube and campaign use.' },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Trust / process */}
      <section className="px-6 md:px-10 py-24 border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-display text-big">How it works</h2>
          <span className="font-mono text-xs uppercase tracking-widest opacity-50 hidden md:block">
            Direct, transparent, yours
          </span>
        </div>
        <div className="grid md:grid-cols-4 gap-10">
          {process.map((step) => (
            <div key={step.n} className="border-t pt-5" style={{ borderColor: 'var(--line)' }}>
              <span className="font-mono text-xs opacity-50">{step.n}</span>
              <h3 className="font-display text-2xl mt-2 mb-2">{step.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{step.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="px-6 md:px-10 py-24 border-t" style={{ borderColor: 'var(--line)' }}>
        <h2 className="font-display text-big mb-12">What I do</h2>
        <div className="grid md:grid-cols-3 gap-px" style={{ background: 'var(--line)' }}>
          {services.map((s) => (
            <div key={s.title} className="p-8 md:p-10" style={{ background: 'var(--bg)' }}>
              <h3 className="font-display text-3xl mb-3" style={{ color: 'var(--accent)' }}>{s.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>
      <HighLuxurySplitSection/>
      <Pricing tiers={pricingTiers}/>
      <Testimonials items={testimonials} />

      {/* Cross-links */}
      <section className="grid md:grid-cols-2 border-t" style={{ borderColor: 'var(--line)' }}>
        <Link
          href="/work"
          className="group px-6 md:px-10 py-20 md:py-28 border-b md:border-b-0 md:border-r flex flex-col justify-between"
          style={{ borderColor: 'var(--line)' }}
        >
          <span className="font-mono text-xs uppercase tracking-widest opacity-50">Selected Work</span>
          <span className="font-display text-4xl md:text-6xl mt-6 group-hover:translate-x-2 transition-transform">
            See the projects →
          </span>
        </Link>
        <Link
          href="/photography"
          className="group px-6 md:px-10 py-20 md:py-28 flex flex-col justify-between"
        >
          <span className="font-mono text-xs uppercase tracking-widest opacity-50">Behind the Lens</span>
          <span className="font-display text-4xl md:text-6xl mt-6 group-hover:translate-x-2 transition-transform">
            View photography →
          </span>
        </Link>
      </section>
      <FAQ items={faqs} />
      

      <Footer />
    </>
  );
}
