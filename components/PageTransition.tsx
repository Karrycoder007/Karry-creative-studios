'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const curtain = {
  initial: { scaleY: 1 },
  animate: { scaleY: 0, transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } },
  exit: {},
};

const content = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.35, ease: [0.65, 0, 0.35, 1] },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] } },
};

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname} initial="initial" animate="animate" exit="exit">
        {/* curtain wipe */}
        <motion.div
          variants={curtain}
          className="fixed inset-0 z-[100] pointer-events-none origin-top"
          style={{ background: 'var(--accent)' }}
        />
        <motion.div variants={content}>{children}</motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
