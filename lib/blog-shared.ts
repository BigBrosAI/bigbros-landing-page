/** Blog types and helpers that are safe to use in client components (no fs). */

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  authorId: string;
  authorRole: string;
  authorBio: string;
  authorColor: string;
  category: string;
  tags: string[];
  cover: string;
  coverAlt: string;
  featured: boolean;
  readMins: number;
};

export function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
