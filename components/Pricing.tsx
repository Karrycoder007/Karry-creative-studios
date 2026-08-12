'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Wallet, CreditCard, Landmark } from 'lucide-react';
import { useContactModal } from './ContactModalContext';
import type { PricingTier } from '@/lib/pricing';

gsap.registerPlugin(ScrollTrigger);

const paymentMethods = [
  { Icon: Wallet, label: 'Wise' },
  { Icon: CreditCard, label: 'PayPal' },
  { Icon: Landmark, label: 'Bank Transfer (SWIFT)' },
];

export function Pricing({ tiers }: { tiers: PricingTier[] }) {
  const { openContact } = useContactModal();
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      });

      tl.from('.pricing-header > *', { opacity: 0, y: 24, duration: 0.7, stagger: 0.1, ease: 'power3.out' })
        .from(
          '.pricing-card',
          { opacity: 0, y: 40, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
          '-=0.4'
        )
        .from('.pricing-payments', { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out' }, '-=0.2');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="px-6 md:px-10 py-24 md:py-32 border-t"
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="pricing-header flex items-end justify-between mb-14 flex-wrap gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">Investment</p>
          <h2 className="font-display text-big max-w-xl">
            Pricing built <span style={{ color: 'var(--accent)' }}>around scope,</span> not guesswork.
          </h2>
        </div>
        <p className="max-w-sm text-sm opacity-60 leading-relaxed">
          Every project is scoped individually — these are starting points.
          Final pricing depends on pages, content, and timeline.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="pricing-card group relative flex flex-col p-8 md:p-9 rounded-md cursor-default"
            style={{
              border: tier.featured ? '1.5px solid var(--accent)' : '1px solid var(--line)',
              background: tier.featured ? 'var(--surface)' : 'transparent',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { y: -8, duration: 0.4, ease: 'power2.out' });
              e.currentTarget.style.transition = 'background 0.4s, border-color 0.4s, box-shadow 0.4s';
              e.currentTarget.style.background = 'var(--surface)';
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.boxShadow =
                '0 24px 60px -20px color-mix(in srgb, var(--accent) 45%, transparent)';
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { y: 0, duration: 0.4, ease: 'power2.out' });
              e.currentTarget.style.background = tier.featured ? 'var(--surface)' : 'transparent';
              e.currentTarget.style.borderColor = tier.featured ? 'var(--accent)' : 'var(--line)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {tier.featured && (
              <span
                className="absolute -top-3 left-8 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest"
                style={{ background: 'var(--accent)', color: '#FDFAF6' }}
              >
                Most chosen
              </span>
            )}
            {tier.custom && (
              <span
                className="absolute -top-3 left-8 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest"
                style={{ background: 'var(--fg)', color: 'var(--bg)' }}
              >
                Bespoke
              </span>
            )}

            <h3 className="font-display text-3xl mb-1">{tier.name}</h3>
            <p className="text-sm opacity-60 mb-8 leading-relaxed">{tier.tagline}</p>

            <div className="mb-8">
              {tier.custom ? (
                <>
                  <p className="font-mono text-[11px] uppercase tracking-widest opacity-50 mb-1">
                    {tier.priceNote}
                  </p>
                  <p className="font-display italic text-4xl md:text-5xl" style={{ color: 'var(--accent)' }}>
                    Let&apos;s talk
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest opacity-50 mb-1">
                      India
                    </p>
                    <p className="font-display text-4xl md:text-5xl" style={{ color: 'var(--accent)' }}>
                      {tier.priceIndia}{' '}
                      <span className="font-mono text-sm opacity-50 align-middle">{tier.priceNote}</span>
                    </p>
                  </div>
                  {tier.priceIntl && (
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest opacity-50 mb-1">
                        International
                      </p>
                      <p className="font-display text-2xl md:text-3xl opacity-80">
                        {tier.priceIntl}{' '}
                        <span className="font-mono text-sm opacity-50 align-middle">{tier.priceNote}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <ul className="flex flex-col gap-3 mb-10 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm opacity-80">
                  <Check size={16} strokeWidth={2} className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={openContact}
              className="font-mono text-xs uppercase tracking-widest py-3 rounded-full transition-transform hover:scale-[1.02]"
              style={
                tier.featured
                  ? { background: 'var(--accent)', color: '#FDFAF6' }
                  : tier.custom
                  ? { background: 'var(--fg)', color: 'var(--bg)' }
                  : { border: '1px solid var(--fg)', color: 'var(--fg)' }
              }
            >
              {tier.custom ? 'Discuss your project' : 'Start a project'}
            </button>
          </div>
        ))}
      </div>

      {/* accepted payment methods — trust signal for international clients */}
      <div
        className="pricing-payments flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 mt-16 pt-10 border-t"
        style={{ borderColor: 'var(--line)' }}
      >
        <p className="font-mono text-xs uppercase tracking-widest opacity-60 shrink-0">
          Accepted Worldwide
        </p>
        <div className="flex flex-wrap gap-3">
          {paymentMethods.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full"
              style={{ border: '1px solid var(--line)', background: 'var(--surface)' }}
            >
              <Icon size={20} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
              <span className="font-mono text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}