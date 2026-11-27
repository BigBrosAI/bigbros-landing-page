/*
 * Blog authors. Posts set `author: <id>` in their front matter.
 *
 * These are pen names used for the BigBrosAI blog. To credit a real team member instead,
 * change the name, role and bio here; every post by that id updates automatically.
 * Keep bios to what the person actually does, and don't add photos of people who aren't
 * on the team.
 */

export type Author = { id: string; name: string; role: string; bio: string; color: string };

export const authors: Author[] = [
  {
    id: 'riya-kapoor',
    name: 'Riya Kapoor',
    role: 'Growth Marketing Lead',
    bio: 'Riya writes about WhatsApp marketing, campaigns and growing small businesses on a tight budget.',
    color: '#15803D',
  },
  {
    id: 'kunal-verma',
    name: 'Kunal Verma',
    role: 'Product Manager',
    bio: 'Kunal works on Flows and AI features at BigBrosAI and writes about product updates and automation.',
    color: '#7C3AED',
  },
  {
    id: 'ananya-rao',
    name: 'Ananya Rao',
    role: 'Customer Success Manager',
    bio: 'Ananya helps clinics, coaching centres and stores set up WhatsApp, and shares what works for them.',
    color: '#BE123C',
  },
  {
    id: 'kabir-sethi',
    name: 'Kabir Sethi',
    role: 'WhatsApp Automation Specialist',
    bio: 'Kabir builds chatbot flows for BigBrosAI customers and writes practical guides on automation and AI.',
    color: '#0E7490',
  },
];

const byId: Record<string, Author> = Object.fromEntries(authors.map((a) => [a.id, a]));

/** Looks up an author by id; unknown values are treated as a plain name. */
export function getAuthor(idOrName: string): Author {
  return byId[idOrName] ?? { id: idOrName, name: idOrName, role: 'BigBrosAI', bio: '', color: '#0B2E23' };
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
