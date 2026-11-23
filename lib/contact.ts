import { z } from 'zod';

export const contactTopics = [
  { value: 'demo', label: 'Book a demo' },
  { value: 'sales', label: 'Sales & pricing' },
  { value: 'support', label: 'Support for an existing account' },
  { value: 'partnership', label: 'Partnerships' },
  { value: 'other', label: 'Something else' },
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80),
  email: z.string().trim().email('Please enter a valid email').max(120),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  topic: z.enum(['demo', 'sales', 'support', 'partnership', 'other']),
  message: z.string().trim().min(10, 'Tell us a little more (10+ characters)').max(3000),
  /** Campaign attribution (UTMs, click IDs) captured on the site. */
  attribution: z.record(z.string().max(60), z.string().max(300)).optional(),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const topicLabel = (v: string) => contactTopics.find((t) => t.value === v)?.label ?? v;
