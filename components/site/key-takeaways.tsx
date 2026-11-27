import { Sparkles } from 'lucide-react';

/** "Key takeaways" summary box at the top of long-form content; short answers people and AI search can quote. */
export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <aside aria-label="Key takeaways" className="not-prose mb-10 rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-lime-200/30 p-6 dark:border-brand-900 dark:from-brand-900/30 dark:to-transparent sm:p-7">
      <p className="flex items-center gap-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.18em] text-brand-800 dark:text-brand-200">
        <Sparkles className="h-4 w-4" /> Key takeaways
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((t, i) => (
          <li key={t} className="flex gap-3 text-[16px] leading-relaxed text-foreground">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-[12px] font-bold text-lime-300">{i + 1}</span>
            {t}
          </li>
        ))}
      </ul>
    </aside>
  );
}
