"use client";

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { PostCard } from '@/components/blog/post-card';
import { CategoryIcon } from '@/components/blog/category-icon';
import type { PostMeta } from '@/lib/blog-shared';
import { cn } from '@/lib/utils';

/** Searchable, filterable post grid for the blog home. */
export function BlogExplorer({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState('All');
  const [q, setQ] = useState('');

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return [['All', posts.length] as const, ...Array.from(counts.entries())];
  }, [posts]);

  const term = q.trim().toLowerCase();
  const shown = posts.filter(
    (p) =>
      (active === 'All' || p.category === active) &&
      (!term || [p.title, p.description, p.category, ...p.tags].some((s) => s.toLowerCase().includes(term)))
  );

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {categories.map(([c, n]) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all',
                active === c ? 'border-forest bg-forest text-white shadow-sm' : 'border-border bg-card text-ink-600 hover:border-brand-300 hover:text-foreground'
              )}
            >
              {c !== 'All' && <CategoryIcon category={c} />}
              {c}
              <span className={cn('rounded-full px-1.5 text-[11px] font-bold', active === c ? 'bg-white/15 text-lime-300' : 'bg-muted text-ink-600')}>{n}</span>
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:w-72">
          <span className="sr-only">Search posts</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts"
            className="h-11 w-full rounded-full border border-border bg-card pl-10 pr-10 text-sm outline-none transition-shadow placeholder:text-ink-400 focus:border-brand-300 focus:ring-4 focus:ring-brand-100 dark:focus:ring-brand-900"
          />
          {q && (
            <button type="button" onClick={() => setQ('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-600 hover:bg-muted">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </label>
      </div>

      {shown.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-border p-10 text-center">
          <p className="font-semibold">No posts match that yet.</p>
          <button type="button" onClick={() => { setQ(''); setActive('All'); }} className="mt-3 text-sm font-semibold text-brand-700 underline underline-offset-4">
            Show all posts
          </button>
        </div>
      )}
    </div>
  );
}
