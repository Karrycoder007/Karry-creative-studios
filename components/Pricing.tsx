'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useContactModal } from './ContactModalContext';
import type { PricingTier } from '@/lib/pricing';

const ease = [0.65, 0, 0.35, 1] as const;

export function Pricing({ tiers }: { tiers: PricingTier[] }) {
  const { openContact } = useContactModal();

  return (
    <section className="px-6 md:px-10 py-24 md:py-32 border-t" style={{ borderColor: 'var(--line)' }}>
      <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
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
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease }}
            className="relative flex flex-col p-8 md:p-9 rounded-md"
            style={{
              border: tier.featured ? '1.5px solid var(--accent)' : '1px solid var(--line)',
              background: tier.featured ? 'var(--surface)' : 'transparent',
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

            <h3 className="font-display text-3xl mb-1">{tier.name}</h3>
            <p className="text-sm opacity-60 mb-8 leading-relaxed">{tier.tagline}</p>

            <div className="mb-8">
              <p className="font-mono text-[11px] uppercase tracking-widest opacity-50 mb-1">
                {tier.priceNote}
              </p>
              <p className="font-display text-4xl md:text-5xl" style={{ color: 'var(--accent)' }}>
                {tier.price}
              </p>
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
                  : { border: '1px solid var(--fg)', color: 'var(--fg)' }
              }
            >
              Start a project
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}