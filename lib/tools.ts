import type { LucideIcon } from 'lucide-react';
import { Calculator, Code2, Link2, QrCode, Type } from 'lucide-react';

export type Tool = {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  seo: { title: string; description: string };
  intro: string;
  how: string[];
  faqs: { q: string; a: string }[];
};

export const tools: Tool[] = [
  {
    slug: 'whatsapp-link-generator',
    name: 'WhatsApp Link Generator',
    short: 'Create a wa.me click-to-chat link with a pre-filled message.',
    icon: Link2,
    seo: {
      title: 'Free WhatsApp Link Generator (wa.me) with Message',
      description: 'Create a free WhatsApp click-to-chat link with a pre-filled message. Copy the wa.me link or download it as a QR code — no signup needed.',
    },
    intro: 'Turn your WhatsApp number into a link customers can tap to start a chat — with your message already typed.',
    how: ['Pick your country code and enter your WhatsApp number.', 'Type the message you want customers to send.', 'Copy the link, open it to test, or download the QR code.'],
    faqs: [
      { q: 'What is a wa.me link?', a: 'It is WhatsApp’s official click-to-chat link. Anyone who taps it opens a chat with your number, even if they haven’t saved it.' },
      { q: 'Does the number need to be on WhatsApp?', a: 'Yes. The link works for any number registered on WhatsApp, WhatsApp Business or the WhatsApp Business API.' },
      { q: 'Where can I use the link?', a: 'On your website, Instagram bio, Google Business Profile, ads, emails, invoices and printed QR codes.' },
    ],
  },
  {
    slug: 'whatsapp-qr-code-generator',
    name: 'WhatsApp QR Code Generator',
    short: 'Make a scannable QR that opens a chat with your business.',
    icon: QrCode,
    seo: {
      title: 'Free WhatsApp QR Code Generator',
      description: 'Generate a free WhatsApp QR code that opens a chat with your business and a pre-filled message. Pick colours and download PNG or SVG.',
    },
    intro: 'Print it on menus, packaging, receipts or posters — one scan opens a WhatsApp chat with your business.',
    how: ['Enter your WhatsApp number and an optional message.', 'Choose the QR colour and size.', 'Download it as PNG for print or SVG for design tools.'],
    faqs: [
      { q: 'Do these QR codes expire?', a: 'No. The QR code simply contains your wa.me link, so it works for as long as your number is on WhatsApp.' },
      { q: 'Can I track scans?', a: 'Plain QR codes can’t be tracked. BigBrosAI QR campaigns can start a chatbot flow and tag every contact who scans.' },
      { q: 'PNG or SVG?', a: 'PNG works everywhere. SVG stays sharp at any size, which is best for large prints and design tools.' },
    ],
  },
  {
    slug: 'whatsapp-text-formatter',
    name: 'WhatsApp Text Formatter',
    short: 'Bold, italic, strikethrough and monospace with a live preview.',
    icon: Type,
    seo: {
      title: 'WhatsApp Text Formatter — Bold, Italic, Strikethrough',
      description: 'Format WhatsApp messages with bold, italic, strikethrough, monospace, lists and quotes. See a live WhatsApp preview and copy the text.',
    },
    intro: 'Write your message, select text and apply WhatsApp formatting — then copy it straight into WhatsApp or a template.',
    how: ['Type or paste your message.', 'Select text and click Bold, Italic, Strike or Mono.', 'Check the live preview, then copy the formatted text.'],
    faqs: [
      { q: 'How does WhatsApp formatting work?', a: 'Wrap text in symbols: *bold*, _italic_, ~strikethrough~ and ```monospace```. WhatsApp shows the styling and hides the symbols.' },
      { q: 'Does it work in templates?', a: 'Yes. WhatsApp Business API templates support the same bold, italic, strikethrough and monospace formatting.' },
      { q: 'Can I add lists and quotes?', a: 'Yes. Start a line with “- ” or “* ” for a bullet, “1. ” for a numbered list and “> ” for a quote.' },
    ],
  },
  {
    slug: 'whatsapp-pricing-calculator',
    name: 'WhatsApp API Pricing Calculator',
    short: 'Estimate your monthly WhatsApp message cost by country.',
    icon: Calculator,
    seo: {
      title: 'WhatsApp Business API Pricing Calculator (India & Global)',
      description: 'Estimate your monthly WhatsApp Business API cost. Choose a country, enter marketing, utility and authentication messages and add your BigBrosAI plan.',
    },
    intro: 'See what your WhatsApp campaigns will cost before you send them — using Meta’s per-message rates by country.',
    how: ['Choose the country your customers are in.', 'Enter how many marketing, utility and authentication messages you send a month.', 'Add a plan to see your total monthly estimate.'],
    faqs: [
      { q: 'Are customer-service replies charged?', a: 'No. Replies inside the 24-hour customer service window are free, and so are utility templates sent inside that window.' },
      { q: 'Which rates does this use?', a: 'The same per-message rates shown on our pricing page. Final charges follow Meta’s rates at the time of sending.' },
      { q: 'Is there a markup?', a: 'No. BigBrosAI passes Meta’s message charges through without markup; you pay your plan separately.' },
    ],
  },
  {
    slug: 'whatsapp-chat-button',
    name: 'WhatsApp Chat Button for Websites',
    short: 'Copy-paste code for a floating WhatsApp button on your site.',
    icon: Code2,
    seo: {
      title: 'Free WhatsApp Chat Button Generator for Websites',
      description: 'Add a floating WhatsApp chat button to any website. Set your number, message, colour and position, preview it and copy the code.',
    },
    intro: 'Let website visitors message you on WhatsApp in one tap. Works on WordPress, Shopify, Wix, Webflow or plain HTML.',
    how: ['Enter your number and the greeting customers will send.', 'Pick the label, colour and corner.', 'Copy the snippet and paste it before </body> on your site.'],
    faqs: [
      { q: 'Does it slow my website down?', a: 'No. It’s a few lines of HTML and CSS with no external scripts or tracking.' },
      { q: 'Where do I paste it on Shopify or WordPress?', a: 'Shopify: Online Store → Themes → Edit code → theme.liquid, before </body>. WordPress: use a header/footer code plugin or your theme’s footer.' },
      { q: 'Can chats go to my whole team?', a: 'With the BigBrosAI shared inbox, chats from the button reach every agent on one number.' },
    ],
  },
];

export const toolBySlug = Object.fromEntries(tools.map((t) => [t.slug, t])) as Record<string, Tool>;

export const countryCodes = [
  { code: '91', label: 'India (+91)' },
  { code: '971', label: 'UAE (+971)' },
  { code: '966', label: 'Saudi Arabia (+966)' },
  { code: '1', label: 'USA / Canada (+1)' },
  { code: '44', label: 'UK (+44)' },
  { code: '65', label: 'Singapore (+65)' },
  { code: '60', label: 'Malaysia (+60)' },
  { code: '62', label: 'Indonesia (+62)' },
  { code: '977', label: 'Nepal (+977)' },
  { code: '880', label: 'Bangladesh (+880)' },
  { code: '94', label: 'Sri Lanka (+94)' },
  { code: '61', label: 'Australia (+61)' },
];

/** wa.me link from a country code, local number and optional message. */
export function waLink(cc: string, number: string, message: string) {
  const digits = number.replace(/\D/g, '').replace(/^0+/, '');
  const full = digits.startsWith(cc) && digits.length > 10 ? digits : `${cc}${digits}`;
  return `https://wa.me/${full}${message.trim() ? `?text=${encodeURIComponent(message)}` : ''}`;
}
