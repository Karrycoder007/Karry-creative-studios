"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplitPanelProps {
  id: 'engineering' | 'visuals';
  title: string;
  tagline: string;
  description: string;
  points: string[];
  ctaText: string;
  bgStyle?: React.CSSProperties;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  children?: React.ReactNode;
}

export default function HighLuxurySplitSection() {
  const [hoveredPanel, setHoveredPanel] = useState<'engineering' | 'visuals' | null>(null);

  return (
    <section className="relative w-full h-screen bg-[#F9F9F8] dark:bg-[#0A0A0A] overflow-hidden flex flex-col md:flex-row border-b border-black/5 dark:border-white/5 font-sans transition-colors duration-500">
      
      {/* LEFT SIDE: Bespoke Engineering */}
      <SplitPanel
        id="engineering"
        title="ENGINEERED CODESCAPES"
        tagline="Next.js / TypeScript Architecture"
        description="We craft proprietary, blindingly fast web platforms built explicitly for high-ticket corporate presence and absolute server autonomy."
        points={[
          "Zero-template Next.js compilation",
          "Production optimized for extreme core web vitals",
          "Clean component architecture with zero platform lock-in"
        ]}
        ctaText="Initiate Blueprint"
        isHovered={hoveredPanel === 'engineering'}
        isAnyHovered={hoveredPanel !== null}
        onHover={() => setHoveredPanel('engineering')}
        onLeave={() => setHoveredPanel(null)}
      >
        {/* Fine, expensive-looking grid system that shifts subtly between light and dark */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#EAEAEA_1px,transparent_1px),linear-gradient(to_bottom,#EAEAEA_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 transition-colors duration-500" />
      </SplitPanel>

      {/* RIGHT SIDE: Himalayan/Nature Visual Assets */}
      <SplitPanel
        id="visuals"
        title="ATMOSPHERIC CINEMATICS"
        tagline="Expedition & Eco-Luxury Media"
        description="High-fidelity visual assets engineered on-location across the Himalaya to establish brand prestige and emotional authority."
        points={[
          "Bespoke visual content for elite eco-resorts",
          "Fine-art landscape staging for premium real estate",
          "Color-graded cinematic brand campaigns"
        ]}
        ctaText="View Media Vault"
        // Replace this Unsplash stock placeholder with your actual optimized high-contrast Himalayan photo
        bgStyle={{
          backgroundImage: `url('https://unsplash.com')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        isHovered={hoveredPanel === 'visuals'}
        isAnyHovered={hoveredPanel !== null}
        onHover={() => setHoveredPanel('visuals')}
        onLeave={() => setHoveredPanel(null)}
      >
        {/* Dynamic vignette scrim overlay matching active systemic mode */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#F9F9F8] via-[#F9F9F8]/20 to-transparent dark:from-[#0A0A0A] dark:via-[#0A0A0A]/30 dark:to-[#0A0A0A]/50 mix-blend-multiply transition-all duration-500" 
          style={{ opacity: hoveredPanel === 'engineering' ? 0.85 : 0.4 }} 
        />
      </SplitPanel>

    </section>
  );
}

const SplitPanel: React.FC<SplitPanelProps> = ({
  id,
  title,
  tagline,
  description,
  points,
  ctaText,
  bgStyle,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave,
  children
}) => {
  const widthAnimation = {
    width: isHovered ? '65%' : (isAnyHovered ? '35%' : '50%')
  };

  return (
    <motion.div
      animate={widthAnimation}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={bgStyle}
      className="relative h-1/2 md:h-full flex flex-col justify-between p-8 md:p-16 overflow-hidden select-none border-t md:border-t-0 md:border-r border-black/5 dark:border-white/5 last:border-0 transition-colors duration-500"
    >
      {children}

      {/* Top Hierarchy */}
      <div className="relative z-10 space-y-2">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-black/40 dark:text-white/40 block transition-colors duration-500">
          {tagline}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-black dark:text-white font-mono transition-colors duration-500">
          {title}
        </h2>
      </div>

      {/* Value Proposition Box */}
      <div className="relative z-10 my-auto max-w-xl space-y-6 pt-8 pb-12">
        <p className="text-sm md:text-base text-black/80 dark:text-white/70 leading-relaxed font-light transition-colors duration-500">
          {description}
        </p>

        <AnimatePresence>
          {isHovered && (
            <motion.ul
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-3 pl-1 hidden md:block"
            >
              {points.map((point, index) => (
                <li key={index} className="flex items-center gap-3 text-xs font-mono text-black/50 dark:text-white/50 transition-colors duration-500">
                  <span className="w-1 h-1 bg-black/40 dark:bg-white/40 rounded-full transition-colors duration-500" />
                  {point}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Button CTA Integration */}
      <div className="relative z-10">
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="group relative flex items-center justify-between border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.02] hover:bg-black dark:hover:bg-white text-black dark:text-white hover:text-white dark:hover:text-black px-6 py-4 w-full md:w-64 text-left transition-colors duration-300 rounded-sm overflow-hidden"
        >
          <span className="text-xs uppercase font-mono tracking-widest font-medium">
            {ctaText}
          </span>
          <span className="text-xs transform group-hover:translate-x-1 transition-transform font-mono">
            →
          </span>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
        </motion.button>
      </div>

    </motion.div>
  );
};
