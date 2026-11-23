"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureAttribution, withAttribution } from '@/lib/utm';
import { siteConfig } from '@/lib/site';

/**
 * Captures UTM params on every navigation and forwards them on clicks to the dashboard
 * (signup / login / any dashboard link), so signups keep their campaign attribution.
 */
export function UtmTracker() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  useEffect(() => {
    let dashHost = '';
    try {
      dashHost = new URL(siteConfig.links.dashboard).host;
    } catch {
      return;
    }
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      try {
        if (new URL(a.href).host !== dashHost) return;
      } catch {
        return;
      }
      const next = withAttribution(a.href);
      if (next !== a.href) a.href = next;
    };
    // capture phase so the href is updated before the browser follows it (works for middle-click too)
    document.addEventListener('click', onClick, true);
    document.addEventListener('auxclick', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('auxclick', onClick, true);
    };
  }, []);

  return null;
}
