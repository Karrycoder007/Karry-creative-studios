import { FeaturedWork } from '@/components/FeaturedWork';
import { Footer } from '@/components/Footer';
import { projects } from '@/lib/projects';

export default function WorkPage() {
  return (
    <>
      <section className="px-6 md:px-10 pt-32 pb-10">
        <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-4">Selected Work</p>
        <h1 className="font-display text-big max-w-3xl mb-6">
          Real projects, <span style={{ color: 'var(--accent)' }}>shipped end to end.</span>
        </h1>
        <p className="max-w-xl font-body text-base md:text-lg opacity-70 leading-relaxed">
          A mix of web builds, photography, and film — each one designed, developed,
          and delivered by the same person, start to finish.
        </p>
      </section>

      <FeaturedWork projects={projects} />


      <section className="px-6 md:px-10 py-24 border-t" style={{ borderColor: 'var(--line)' }}>
        <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-6">How it's built</p>
        <div className="max-w-2xl flex flex-col gap-5">
          <p className="font-body text-base md:text-lg opacity-80 leading-relaxed">
            Every site here is engineered in Next.js and TypeScript, styled with Tailwind CSS,
            and animated with GSAP — chosen because they load fast, hold up under real traffic,
            and don't lock you into a page-builder that gets slower and harder to maintain as
            it grows.
          </p>
          <p className="font-body text-base md:text-lg opacity-80 leading-relaxed">
            Photography and film are shot on-location, not sourced from stock libraries. And
            because one person handles design, development, and delivery, there's no handoff
            between departments — the same eye that shoots the images is the same hand that
            builds the site around them.
          </p>
          <p className="font-body text-base md:text-lg opacity-80 leading-relaxed">
            Want to see the code, the process, or a deeper walkthrough of a specific project?
            Ask directly.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}