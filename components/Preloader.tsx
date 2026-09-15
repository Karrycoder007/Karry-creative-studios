'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLoader } from './LoaderContext';

// Fixed brand colors regardless of light/dark mode — the preloader always
// uses the same dark curtain treatment.
const INK = '#1C1008';
const SAND = '#FDFAF6';
const ACCENT = '#E8877A';

export function Preloader() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const { setLoaded } = useLoader();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const counter = { val: 0 };
    const curve = { amt: 0 };

    const updatePath = () => {
      if (!pathRef.current) return;
      const a = curve.amt;
      pathRef.current.setAttribute(
        'd',
        `M0,0 L100,0 L100,${100 - a} Q50,100 0,${100 - a} Z`
      );
    };
    updatePath();

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setDone(true);
      },
    });

    tl.to(counter, {
      val: 100,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => setCount(Math.round(counter.val)),
    })
      .call(() => setLoaded(true)) // let Hero's entrance animation start now
      .to(
        curve,
        { amt: 38, duration: 0.45, ease: 'power2.inOut', onUpdate: updatePath },
        '+=0.15'
      )
      .to(svgRef.current, { yPercent: -112, duration: 0.85, ease: 'power4.inOut' }, '-=0.15')
      .to(textRef.current, { opacity: 0, duration: 0.3 }, '<');

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[500]" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path ref={pathRef} d="M0,0 L100,0 L100,100 Q50,100 0,100 Z" fill={INK} />
      </svg>

      <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <p className="font-display text-3xl md:text-4xl" style={{ color: SAND }}>
           Studio Solarch<span style={{ color: ACCENT }}>.</span>
        </p>
        <p className="font-mono text-xs tracking-widest" style={{ color: SAND, opacity: 0.55 }}>
          {count}%
        </p>
      </div>
    </div>
  );
}