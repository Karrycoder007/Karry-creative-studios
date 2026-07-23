import { PhotoGrid } from '@/components/PhotoGrid';
import { Footer } from '@/components/Footer';
import { photos } from '@/lib/photos';

export default function PhotographyPage() {
  return (
    <>
      <section className="px-6 md:px-10 pt-32 pb-14">
        <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-4">Behind the Lens</p>
        <h1 className="font-display text-big max-w-3xl">
          Shot on the trail. <span style={{ color: 'var(--accent)' }}>Cut for the screen.</span>
        </h1>
        <p className="max-w-xl mt-6 font-body opacity-70 leading-relaxed">
          Solo expedition and travel photography — Sony a6700, Viltrox 15mm f/1.7.
          From Himalayan pilgrimage routes to everyday street frames.
        </p>
      </section>

      <PhotoGrid photos={photos} />
      <Footer />
    </>
  );
}
