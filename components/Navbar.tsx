'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const links = [
  { href: '/', label: 'Home', n: '01' },
  { href: '/work', label: 'Work', n: '02' },
  { href: '/photography', label: 'Photography', n: '03' },
];

const ease = [0.65, 0, 0.35, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close on route change, lock scroll while open
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between backdrop-blur-md transition-colors"
        style={{
          background: 'color-mix(in srgb, var(--bg) 65%, transparent)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <Link href="/" className="font-display text-xl md:text-2xl tracking-tight font-medium relative z-[70]">
          KARRY<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="relative py-1 group">
                <span className={active ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}>
                  {link.label}
                </span>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-1 h-[1.5px]"
                    style={{ background: 'var(--accent)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <ThemeToggle />

          {/* hamburger / close patch — visible on all sizes, but nav links already show on desktop above md */}
<motion.button
  aria-label={open ? 'Close menu' : 'Open menu'}
  aria-expanded={open}
  onClick={() => setOpen((v) => !v)}
  className="relative z-[70] w-10 h-10 flex md:hidden flex-col items-center justify-center gap-[6px] rounded-full"
  animate={{
    backgroundColor: open ? 'var(--accent-warm, #E8877A)' : 'transparent',
  }}
  transition={{ duration: 0.3, ease }}
>
  <motion.span
    className="block w-5 h-[1.5px] rounded-full"
    animate={{
      rotate: open ? 45 : 0,
      y: open ? 4 : 0,
      background: open ? '#FDFAF6' : 'var(--fg)',
    }}
    transition={{ duration: 0.35, ease }}
  />
  <motion.span
    className="block w-5 h-[1.5px] rounded-full"
    animate={{
      rotate: open ? -45 : 0,
      y: open ? -4 : 0,
      background: open ? '#FDFAF6' : 'var(--fg)',
    }}
    transition={{ duration: 0.35, ease }}
  />
</motion.button>
        </div>
      </header>

      {/* full-screen awwwards-style menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col justify-between px-6 md:px-10 pt-28 pb-12"
            style={{ background: 'var(--ink, #14100C)', color: 'var(--sand, #FDFAF6)' }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease }}
          >
            <nav className="flex flex-col gap-2 mt-6">
              {links.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <div key={link.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%' }}
                      transition={{ duration: 0.6, delay: open ? 0.15 + i * 0.08 : 0, ease }}
                      className="flex items-baseline gap-4 border-b py-4 md:py-6"
                      style={{ borderColor: 'rgba(253,250,246,0.14)' }}
                    >
                      <span className="font-mono text-xs opacity-40">{link.n}</span>
                      <Link
                        href={link.href}
                        className="font-display text-5xl md:text-8xl leading-none"
                        style={{ color: active ? 'var(--accent, #E8877A)' : 'inherit' }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 font-mono text-xs uppercase tracking-widest opacity-60"
            >
              <a href="mailto:hello@karrycreative.studio">hello@karrycreative.studio</a>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/karrycoder007" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://www.youtube.com/@unfiltered_karry" target="_blank" rel="noreferrer">YouTube</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}