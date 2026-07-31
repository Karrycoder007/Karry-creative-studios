'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { FAQ as FAQItem } from '@/lib/faqs';

const ease = [0.65, 0, 0.35, 1] as const;

export function FAQ({ items }: { items: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section className="px-6 md:px-10 py-24 md:py-32 border-t" style={{ borderColor: 'var(--line)' }}>
      <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">FAQ</p>
          <h2 className="font-display text-big max-w-xl">
            Questions, <span style={{ color: 'var(--accent)' }}>answered upfront.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm opacity-60 leading-relaxed">
          Anything else — just ask directly before we start.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {items.map((item, i) => {
          const open = openId === item.id;
          return (
            <div key={item.id} className="border-t last:border-b" style={{ borderColor: 'var(--line)' }}>
              <button
                onClick={() => setOpenId(open ? null : item.id)}
                aria-expanded={open}
                className="w-full flex items-center gap-5 py-6 text-left group"
              >
                <span className="font-mono text-xs opacity-40 shrink-0 pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-xl md:text-2xl flex-1 group-hover:opacity-70 transition-opacity">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full"
                  style={{ border: '1px solid var(--line)', color: 'var(--accent)' }}
                >
                  <Plus size={14} strokeWidth={2} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="overflow-hidden"
                  >
                    <p className="pb-7 pl-[calc(1.5rem+1.25rem)] pr-10 text-sm md:text-base opacity-70 leading-relaxed max-w-xl">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}