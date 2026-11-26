import fs from 'node:fs';
import path from 'node:path';
import { Reveal } from '@/components/site/reveal';

type Logo = { src: string; name: string };

/**
 * Reads client logos from public/clients at build time (the homepage is prerendered).
 * Add SVG/PNG/WebP files there; any colour works (shown grey, colour on hover). The row
 * stays hidden while the folder has no logos.
 * Order by filename (prefix with 01-, 02-…); the filename (minus prefix) is the alt text.
 */
function readLogos(): Logo[] {
  try {
    const dir = path.join(process.cwd(), 'public', 'clients');
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(svg|png|webp|jpe?g)$/i.test(f))
      .sort()
      .map((f) => ({
        src: `/clients/${f}`,
        name: f.replace(/\.[^.]+$/, '').replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' '),
      }));
  } catch {
    return [];
  }
}

/** "Used by … at" row of greyscale client logos under the hero, like a classic logo bar. */
export function ClientLogos({ label = 'Used by growing businesses at' }: { label?: string }) {
  const logos = readLogos();
  if (!logos.length) return null;
  const marquee = logos.length > 6;
  const item = (l: Logo, key: string) => (
    <li key={key} className="flex h-14 shrink-0 items-center justify-center border-border px-8 sm:px-10 [&:not(:first-child)]:border-l">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={l.src}
        alt={l.name}
        loading="lazy"
        className="h-7 w-auto max-w-[9rem] object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-8"
      />
    </li>
  );
  return (
    <Reveal delay={0.2} className="mt-12">
      <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
      {marquee ? (
        <div className="marquee-pause relative mx-auto mt-5 max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <ul className="animate-marquee-left flex w-max">
            {[...logos, ...logos].map((l, i) => item(l, `${l.src}-${i}`))}
          </ul>
        </div>
      ) : (
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-y-4">{logos.map((l) => item(l, l.src))}</ul>
      )}
    </Reveal>
  );
}
