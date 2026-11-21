import { contactSchema, topicLabel } from '@/lib/contact';
import { siteConfig } from '@/lib/site';

/*
 * Contact / demo requests. Delivered through the BigBrosAI Email API
 * (POST {BBAI_API_URL}/email/send with the `bigbrosai-api-key` header).
 *
 * Env:
 *   BBAI_EMAIL_API_KEY   — project API key (required to send)
 *   CONTACT_FROM_EMAIL   — sender on a verified domain, e.g. noreply@bigbrosai.com (required)
 *   CONTACT_TO_EMAIL     — inbox for enquiries (default: support@bigbrosai.com)
 *   BBAI_API_URL         — default https://api.bigbrosai.com/api/v1
 *
 * When not configured it answers 503 and the form falls back to a prefilled email.
 */

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
  // Bots fill the hidden field; pretend success so they move on.
  if (body && typeof body === 'object' && (body as { website?: unknown }).website) return Response.json({ ok: true });
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
  }
  const d = parsed.data;

  const apiKey = process.env.BBAI_EMAIL_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ ok: false, fallback: true, error: 'Contact delivery is not configured' }, { status: 503 });
  }
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const base = (process.env.BBAI_API_URL || 'https://api.bigbrosai.com/api/v1').replace(/\/$/, '');

  const rows: [string, string][] = [
    ['Topic', topicLabel(d.topic)],
    ['Name', d.name],
    ['Email', d.email],
    ['Phone / WhatsApp', d.phone || '—'],
    ['Company', d.company || '—'],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${d.message}\n\n— Sent from ${siteConfig.url}/contact`;
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#667085">${k}</td><td><b>${escape(v)}</b></td></tr>`)
    .join('')}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escape(d.message)}</p><p style="font-family:Arial,sans-serif;font-size:12px;color:#98A2B3">Sent from ${siteConfig.url}/contact · reply to ${escape(d.email)} to answer ${escape(d.name)}.</p>`;

  try {
    const res = await fetch(`${base}/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'bigbrosai-api-key': apiKey },
      body: JSON.stringify({
        from: { email: from, name: 'BigBrosAI Website' },
        to: [to],
        subject: `[${topicLabel(d.topic)}] ${d.name}${d.company ? ` · ${d.company}` : ''}`,
        body_text: text,
        body_html: html,
        openTracking: false,
        clickTracking: false,
        idempotencyKey: `contact-${d.email}-${d.message.length}-${d.message.slice(0, 24)}`.replace(/[^\w.-]/g, '_').slice(0, 120),
      }),
    });
    if (!res.ok) {
      console.error('contact send failed', res.status, await res.text().catch(() => ''));
      return Response.json({ ok: false, fallback: true, error: 'We could not send your message' }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error('contact send error', err);
    return Response.json({ ok: false, fallback: true, error: 'We could not send your message' }, { status: 502 });
  }
}
