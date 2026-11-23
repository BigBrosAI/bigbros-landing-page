"use client";

import { useSyncExternalStore } from 'react';

/**
 * Display currency for prices: INR for visitors in India, USD for everyone else.
 * Order: ?currency=usd|inr in the URL > the visitor's own choice (saved) > timezone.
 * The server always renders INR, then the client switches after hydration.
 */
export type Currency = 'INR' | 'USD';
const KEY = 'bb-currency';
const listeners = new Set<() => void>();
let current: Currency | null = null;

function detect(): Currency {
  try {
    const q = new URLSearchParams(window.location.search).get('currency')?.toUpperCase();
    if (q === 'USD' || q === 'INR') {
      localStorage.setItem(KEY, q);
      return q;
    }
  } catch {
    /* ignore */
  }
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'USD' || saved === 'INR') return saved;
  } catch {
    /* storage blocked */
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta' ? 'INR' : 'USD';
  } catch {
    return 'INR';
  }
}

function get(): Currency {
  if (current === null) current = detect();
  return current;
}

export function setCurrency(c: Currency) {
  current = c;
  try {
    localStorage.setItem(KEY, c);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function useCurrency(): Currency {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    get,
    () => 'INR',
  );
}

/** Format a price: ₹1,299 / $18 / $32.99 / ₹0.125. */
export function money(n: number, c: Currency, decimals?: number) {
  const d = decimals ?? (Number.isInteger(n) ? 0 : 2);
  const s = n.toLocaleString(c === 'INR' ? 'en-IN' : 'en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  return (c === 'INR' ? '₹' : '$') + s;
}
