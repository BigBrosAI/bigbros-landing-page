"use client";

import { useEffect, useState } from 'react';

/** Thin bar at the top of the page showing how far through the article the reader is. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setP(Math.min(1, Math.max(0, -r.top / Math.max(total, 1))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targetId]);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div className="h-full origin-left bg-gradient-to-r from-brand-600 to-lime-300" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
