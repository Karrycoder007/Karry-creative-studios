'use client'
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link2, Clock, UserCheck, ArrowRight } from 'lucide-react';
import { useContactModal } from './ContactModalContext';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    Icon: Link2,
    title: 'One consistent vision',
    copy: 'Your site and your photography come from the same eye — no mismatch between what your brand looks like on the page and in the photos.',
  },
  {
    Icon: Clock,
    title: 'No coordination overhead',
    copy: "You're not managing a web agency and a photographer separately, syncing timelines between two teams who've never spoken.",
  },
  {
    Icon: UserCheck,
    title: 'One point of contact',
    copy: 'One person to brief, one invoice, one person accountable for the whole result — start to finish.',
  },
];

export function CombinedOfferBanner() {
  const root = useRef<HTMLDivElement>(null);
  const { openContact } = useContactModal();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      });
      tl.from('.cob-header > *', { opacity: 0, y: 24, duration: 0.7, stagger: 0.1, ease: 'power3.out' })
        .from('.cob-benefit', { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
        .from('.cob-cta', { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out' }, '-=0.3');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative px-6 md:px-10 py-24 md:py-28 border-t overflow-hidden"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
    >
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="cob-header">
          <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">
            The Full Studio Advantage
          </p>
          <h2 className="font-display text-big mb-6">
            Your website <span style={{ color: 'var(--accent)' }}>and</span> your photography —
            <br className="hidden sm:block" /> from one person, not two vendors.
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base opacity-70 leading-relaxed mb-14">
            Most clients hire a web developer and a photographer separately — different
            visions, different timelines, extra coordination. Booking both from Studio Solarch means one brief, one visual language, one person accountable 
            for the whole result.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 md:gap-10 text-left mb-14">
          {benefits.map(({ Icon, title, copy }) => (
            <div key={title} className="cob-benefit">
              <div
                className="flex items-center justify-center w-11 h-11 rounded-full mb-4"
                style={{ border: '1px solid var(--line)', background: 'var(--bg)' }}
              >
                <Icon size={18} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="font-display text-xl mb-2">{title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{copy}</p>
            </div>
          ))}
        </div>

        <button
          onClick={openContact}
          className="cob-cta group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest transition-transform hover:scale-[1.03]"
          style={{ background: 'var(--accent)', color: '#FDFAF6' }}
        >
          Book the Full Studio package
          <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}