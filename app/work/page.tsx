import { ProjectStrip } from '@/components/ProjectStrip';
import { Footer } from '@/components/Footer';
import { projects } from '@/lib/projects';

export default function WorkPage() {
  return (
    <>
      <section className="px-6 md:px-10 pt-32 pb-10">
        <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-4">Selected Work — 06</p>
        <h1 className="font-display text-big max-w-3xl">
          Six builds. <span style={{ color: 'var(--accent)' }}>One standard.</span>
        </h1>
      </section>

      <ProjectStrip projects={projects} />

      <section className="px-6 md:px-10 py-24 border-t" style={{ borderColor: 'var(--line)' }}>
        <p className="max-w-2xl font-body text-lg opacity-80 leading-relaxed">
          Every project is designed, built, and shipped by one person — no handoffs,
          no diluted ownership. If you want to see the code, process, or a specific
          case study in more depth, ask directly.
        </p>
      </section>

      <Footer />
    </>
  );
}
