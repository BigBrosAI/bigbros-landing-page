"use client";

import { useEffect } from 'react';

/**
 * Marks every [data-reveal] element with `.is-in` the first time it scrolls into view.
 * Uses IntersectionObserver plus a cheap position check on mount and on scroll, so
 * content never stays hidden in environments where the observer is slow to fire.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    (window as Window & { __bbReveal?: boolean }).__bbReveal = true;
    // If the safety timeout already un-hid content, don't hide it again.
    if (!root.classList.contains('js-motion')) return;

    const pending = new Set<Element>();
    const reveal = (el: Element) => {
      el.classList.add('is-in');
      pending.delete(el);
      io.unobserve(el);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && reveal(e.target)),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    const check = () => {
      const limit = window.innerHeight * 0.94;
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) reveal(el);
      });
    };
    const track = (el: Element) => {
      if (pending.has(el) || el.classList.contains('is-in')) return;
      pending.add(el);
      io.observe(el);
    };
    const watch = (scope: ParentNode) => scope.querySelectorAll('[data-reveal]:not(.is-in)').forEach(track);

    watch(document);
    check();

    let scrollQueued = false;
    const onScroll = () => {
      if (scrollQueued) return;
      scrollQueued = true;
      setTimeout(() => {
        scrollQueued = false;
        check();
      }, 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Pick up reveal targets added later (client navigation). Demos mutate the DOM
    // constantly, so only look at added element subtrees, batched.
    let added: Element[] = [];
    let timer = 0;
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n.nodeType === 1 && added.push(n as Element));
      if (added.length && !timer) {
        timer = window.setTimeout(() => {
          timer = 0;
          const batch = added;
          added = [];
          for (const el of batch) {
            if (!el.isConnected) continue;
            if (el.matches('[data-reveal]:not(.is-in)')) track(el);
            if (el.firstElementChild) watch(el);
          }
          check();
        }, 50);
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return null;
}
