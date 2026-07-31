'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

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
      {/* track icons — faint, show which mode is on which side */}
      <Sun size={12} strokeWidth={1.75} className="absolute left-[6px] opacity-40" style={{ color: 'var(--fg)' }} />
      <Moon size={11} strokeWidth={1.75} className="absolute right-[6px] opacity-40" style={{ color: 'var(--fg)' }} />

      {/* sliding thumb — icon swaps with the active mode */}
      <span
        className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300"
        style={{
          background: 'var(--accent)',
          transform: isDark ? 'translateX(26px)' : 'translateX(0px)',
        }}
      >
        {isDark ? (
          <Moon size={11} strokeWidth={2} color="#FDFAF6" />
        ) : (
          <Sun size={11} strokeWidth={2} color="#FDFAF6" />
        )}
      </span>
    </button>
  );
}