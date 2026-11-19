"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * A looping timeline clock (ms). Demos derive their whole UI from `t`, which
 * keeps scenes deterministic and in sync. The clock pauses off-screen, and with
 * reduced motion it is frozen at `finalT` so the completed scene renders statically.
 */
export function useClock<T extends Element = HTMLDivElement>(loopMs: number, finalT = loopMs - 1, stepMs = 50) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin: '-5% 0px -5% 0px' });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  const elapsed = useRef(0);

  useEffect(() => {
    if (!inView || reduce) return;
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      elapsed.current += Math.min(now - last, 250);
      last = now;
      setT(elapsed.current);
    }, stepMs);
    return () => clearInterval(id);
  }, [inView, reduce, stepMs]);

  if (reduce) return { ref, t: finalT, loop: 0, reduce: true };
  return { ref, t: t % loopMs, loop: Math.floor(t / loopMs), reduce: false };
}

/** 0→1 progress of `t` between `from` and `to`. */
export function progress(t: number, from: number, to: number) {
  return Math.min(1, Math.max(0, (t - from) / (to - from)));
}
