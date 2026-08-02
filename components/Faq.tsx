'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import type { FAQ as FAQItem } from '@/lib/faqs';

gsap.registerPlugin(ScrollTrigger);

export function FAQ({ items }: { items: FAQItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const iconRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});

  // 1. Initial Scroll Entrance Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-fade', {
        opacity: 0,
        y: 28,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // 2. Interactive Accordion Toggle Handling
  const handleToggle = (id: string) => {
    const isOpening = openId !== id;
    const currentOpenId = openId;

    // Set state first to track active state
    setOpenId(isOpening ? id : null);

    // Animate previous active accordion closed if one exists
    if (currentOpenId && currentOpenId !== id) {
      const prevContent = contentRefs.current[currentOpenId];
      const prevIcon = iconRefs.current[currentOpenId];
      if (prevContent) gsap.to(prevContent, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
      if (prevIcon) gsap.to(prevIcon, { rotate: 0, duration: 0.35, ease: 'power3.out' });
    }

    // Target the current accordion elements
    const content = contentRefs.current[id];
    const icon = iconRefs.current[id];

    if (isOpening) {
      if (content) {
        // Force rendering check or use scrollHeight for clean variable heights
        gsap.fromTo(content, 
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.inOut' }
        );
      }
      if (icon) gsap.to(icon, { rotate: 45, duration: 0.35, ease: 'power3.out' });
    } else {
      if (content) gsap.to(content, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
      if (icon) gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.out' });
    }
  };

  return (
    <section 
      ref={root} 
      className="px-6 md:px-10 py-24 md:py-32 border-t" 
      style={{ borderColor: 'var(--line)' }}
    >
      {/* Header elements with standard slow scroll stagger */}
      <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
        <div>
          <p className="faq-fade font-mono text-xs uppercase tracking-widest opacity-50 mb-4">FAQ</p>
          <h2 className="faq-fade font-display text-big max-w-xl">
            Questions, <span style={{ color: 'var(--accent)' }}>answered upfront.</span>
          </h2>
        </div>
        <p className="faq-fade max-w-sm text-sm opacity-60 leading-relaxed">
          Anything else — just ask directly before we start.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {items.map((item, i) => {
          const open = openId === item.id;
          return (
            <div key={item.id} className="border-t last:border-b" style={{ borderColor: 'var(--line)' }}>
              <button
                onClick={() => handleToggle(item.id)}
                aria-expanded={open}
                className="w-full flex items-center gap-5 py-6 text-left group"
              >
                <span className="font-mono text-xs opacity-40 shrink-0 pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-xl md:text-2xl flex-1 group-hover:opacity-70 transition-opacity">
                  {item.question}
                </span>
                
                {/* Plus icon wrapper managed via object ref dictionary */}
                <span
                  ref={(el) => { iconRefs.current[item.id] = el; }}
                  className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full"
                  style={{ 
                    border: '1px solid var(--line)', 
                    color: 'var(--accent)',
                    transform: open ? 'rotate(45deg)' : 'rotate(0deg)' 
                  }}
                >
                  <Plus size={14} strokeWidth={2} />
                </span>
              </button>

              {/* Dynamic Accordion panel content */}
              <div
                ref={(el) => { contentRefs.current[item.id] = el; }}
                className="overflow-hidden"
                style={{ 
                  height: open ? 'auto' : 0, 
                  opacity: open ? 1 : 0 
                }}
              >
                <p className="pb-7 pl-[calc(1.5rem+1.25rem)] pr-10 text-sm md:text-base opacity-70 leading-relaxed max-w-xl">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}