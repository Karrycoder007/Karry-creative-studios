'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-14 h-7" />;

  const isDark = theme === 'dark';

  return (
    <button
      aria-label="Toggle light and dark mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-14 h-7 rounded-full border border-[var(--line)] flex items-center px-1 transition-colors"
      style={{ background: 'var(--surface)' }}
    >
      <span
        className="w-5 h-5 rounded-full transition-transform duration-300"
        style={{
          background: 'var(--accent)',
          transform: isDark ? 'translateX(26px)' : 'translateX(0px)',
        }}
      />
    </button>
  );
}
