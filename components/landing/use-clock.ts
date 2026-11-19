"use client";

import { useEffect, useRef, useState, type RefObject } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * True while the element overlaps the viewport. IntersectionObserver plus a
 * throttled scroll/resize position check, so it still works where the observer
 * is slow or never fires its first callback.
 */
function useOnScreen(ref: RefObject<Element | null>) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setOn(r.bottom > 0 && r.top < window.innerHeight && r.width > 0);
    };
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting));
    io.observe(el);
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      setTimeout(() => {
        queued = false;
        measure();
      }, 120);
    };
    const first = setTimeout(measure, 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      clearTimeout(first);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);
  return on;
}

/**
 * A looping timeline clock (ms). Demos derive their whole UI from `t`, which
 * keeps scenes deterministic and in sync. The clock pauses off-screen, and with
 * reduced motion it is frozen at `finalT` so the completed scene renders statically.
 */
export function useClock<T extends Element = HTMLDivElement>(loopMs: number, finalT = loopMs - 1, stepMs = 50) {
  const ref = useRef<T>(null);
  const inView = useOnScreen(ref);
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
