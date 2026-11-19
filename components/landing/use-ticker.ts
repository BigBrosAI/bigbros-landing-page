"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * A looping step counter that only runs while its element is on screen and
 * the visitor has not asked for reduced motion. With reduced motion it reports
 * `finalStep`, so demos render their completed state without animating.
 */
export function useTicker<T extends Element = HTMLDivElement>(count: number, ms: number, finalStep = count - 1) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin: '-10% 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [inView, reduce, ms]);

  const step = reduce ? finalStep : tick % count;
  return { ref, step, tick: reduce ? finalStep : tick, reduce: !!reduce };
}
