"use client";

/**
 * Marketing attribution: captures UTM parameters and ad click IDs from the landing URL,
 * keeps first-touch and last-touch copies, forwards them on links to the dashboard
 * (so signups are attributed) and attaches them to contact-form leads.
 *
 * Cookies are scoped to the parent domain (e.g. .bigbrosai.com) so the dashboard
 * subdomain can read them too: bb_utm (last touch) and bb_utm_first (first touch).
 */
export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'gclid', 'fbclid', 'msclkid', 'ref'] as const;
export type Attribution = Partial<Record<(typeof UTM_KEYS)[number] | 'landing_page' | 'referrer' | 'captured_at', string>>;

const LAST = 'bb_utm';
const FIRST = 'bb_utm_first';
const MAX_AGE = 60 * 60 * 24 * 90; // 90 days

function cookieDomain() {
  const h = window.location.hostname;
  if (h === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(h)) return '';
  const parts = h.split('.');
  return parts.length >= 2 ? `; domain=.${parts.slice(-2).join('.')}` : '';
}

function write(name: string, v: Attribution) {
  try {
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(v))}; path=/; max-age=${MAX_AGE}; samesite=lax${cookieDomain()}${location.protocol === 'https:' ? '; secure' : ''}`;
  } catch {
    /* cookies blocked */
  }
}

function read(name: string): Attribution | null {
  try {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? (JSON.parse(decodeURIComponent(m[1])) as Attribution) : null;
  } catch {
    return null;
  }
}

/** Read UTM/click-id params from the current URL; store them if present. Call once per page load. */
export function captureAttribution() {
  const q = new URLSearchParams(window.location.search);
  const found: Attribution = {};
  for (const k of UTM_KEYS) {
    const v = q.get(k);
    if (v) found[k] = v.slice(0, 200);
  }
  if (!Object.keys(found).length) return;
  const touch: Attribution = {
    ...found,
    landing_page: window.location.pathname,
    referrer: document.referrer ? document.referrer.slice(0, 300) : '',
    captured_at: new Date().toISOString(),
  };
  write(LAST, touch);
  if (!read(FIRST)) write(FIRST, touch);
}

export function getAttribution(): { first: Attribution | null; last: Attribution | null } {
  return { first: read(FIRST), last: read(LAST) };
}

/** Append the last-touch UTM/click-id params to a URL, without overwriting ones it already has. */
export function withAttribution(href: string): string {
  const last = read(LAST);
  if (!last) return href;
  try {
    const u = new URL(href, window.location.href);
    for (const k of UTM_KEYS) if (last[k] && !u.searchParams.has(k)) u.searchParams.set(k, last[k]!);
    return u.toString();
  } catch {
    return href;
  }
}

/** Flatten first/last touch into a small record for forms and emails. */
export function attributionFields(): Record<string, string> {
  const { first, last } = getAttribution();
  const out: Record<string, string> = {};
  const add = (prefix: string, a: Attribution | null) => {
    if (!a) return;
    for (const [k, v] of Object.entries(a)) if (v) out[`${prefix}${k}`] = String(v).slice(0, 300);
  };
  add('', last);
  add('first_', first);
  return out;
}
