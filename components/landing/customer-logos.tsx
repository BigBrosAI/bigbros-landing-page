import Image from 'next/image';

/** Customer logos, as shown on the existing bigbrosai.com. */
const customers = [
  { name: 'Anytime Fitness', src: '/clients/anytime-fitness.png', w: 300, h: 168 },
  { name: 'Capsule Cabs', src: '/clients/capsulecabs.png', w: 570, h: 90 },
  { name: 'Stockzy', src: '/clients/stockzy.webp', w: 308, h: 88 },
  { name: 'StockTutor', src: '/clients/stocktutor.webp', w: 256, h: 60 },
  { name: 'EasyLauncher', src: '/clients/easylauncher.png', w: 390, h: 84 },
  { name: 'Simpkins School', src: '/clients/simpkins-school.png', w: 273, h: 129 },
];

export function CustomerLogos() {
  const row = [...customers, ...customers];
  return (
    <section aria-label="Customers" className="marquee-pause border-y border-border bg-card/60 py-8">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Trusted by growing businesses</p>
      <div className="mt-6 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="animate-marquee-left flex shrink-0 items-center" style={{ animationDuration: '40s' }}>
            {row.map((c, i) => (
              <li key={`${c.name}-${i}`} className="mx-4 flex h-16 w-44 shrink-0 items-center justify-center rounded-2xl border border-border bg-white px-5 shadow-sm">
                <Image src={c.src} alt={c.name} width={c.w} height={c.h} className="max-h-10 w-auto object-contain" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
