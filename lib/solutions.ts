import type { LucideIcon } from 'lucide-react';
import { BadgeCheck, BellRing, Bot, Building2, CalendarCheck, CalendarX2, EyeOff, FileText, Files, Filter, Gift, GraduationCap, Hourglass, Inbox, IndianRupee, MapPin, Megaphone, MessageCircleQuestion, PackageSearch, PackageX, Percent, PhoneCall, PhoneMissed, Repeat, ShoppingBag, ShoppingCart, Stethoscope, Timer, Truck, UserCheck, UserX, UtensilsCrossed, Wallet } from 'lucide-react';
import type { BrandSlug } from '@/components/landing/brand-icon';
/*
 * Industry landing pages (/solutions/[slug]). Each one speaks to a single kind of business,
 * shows a sample WhatsApp conversation and links to the products and free templates it uses.
 * Keep claims to what the product does; no invented results or statistics.
 */

export type ChatLine = {
  from: 'customer' | 'bot';
  text: string;
  /** Reply buttons under a bot message; the next customer line taps one of them. */
  options?: string[];
  /** A document attached to a bot message, e.g. a brochure. */
  doc?: string;
};

export type ChatEventIcon = 'chat' | 'tag' | 'bell' | 'calendar' | 'file' | 'pay' | 'user' | 'sparkle';
/** A dashboard event shown beside the chat once line `after` has appeared. */
export type ChatEvent = { after: number; icon: ChatEventIcon; title: string; detail: string };

export type Solution = {
  slug: string;
  name: string;
  /** Short label for nav and cards, e.g. "Clinics". */
  short: string;
  seo: { title: string; description: string };
  /** `accent` is the end of `title` shown in brand colour. */
  hero: { title: string; accent: string; subtitle: string };
  /** Longer explanation shown under the hero. */
  overview: string[];
  /** Industry icon for cards and headers. */
  icon: LucideIcon;
  pains: { icon?: LucideIcon; brand?: BrandSlug; title: string; body: string }[];
  useCases: { icon?: LucideIcon; brand?: BrandSlug; title: string; body: string }[];
  chat: { business: string; avatar: string; lines: ChatLine[]; events: ChatEvent[] };
  /** Product slugs from lib/catalog.ts. */
  products: string[];
  faqs: { q: string; a: string }[];
};

export const solutions: Solution[] = [
  {
    slug: 'clinics',
    name: 'Clinics & hospitals',
    short: 'Clinics',
    icon: Stethoscope,
    seo: {
      title: 'WhatsApp Appointment Booking Bot for Clinics & Doctors',
      description:
        'Let patients book, reschedule and get reminders on WhatsApp. A no-code appointment bot for dental, skin, eye and multi-speciality clinics, free to start.',
    },
    hero: {
      title: 'Your front desk, on WhatsApp, 24/7.',
      accent: 'on WhatsApp, 24/7.',
      subtitle:
        'Patients book appointments, get reminders and ask about timings on WhatsApp, while your staff handle the people in the waiting room.',
    },
    overview: [
      'Patients today would rather send a WhatsApp message than wait on hold. For a busy clinic, that’s an opportunity and a problem: messages pile up while the front desk handles patients in the waiting room, and every slow reply risks a patient booking elsewhere.',
      'With BigBrosAI, a WhatsApp chatbot handles the routine part. It greets the patient, offers available days and time slots as buttons, saves their choice, tags them and emails your front desk. It answers questions about timings, fees and location from your clinic’s own information, and hands the chat to a real person whenever it can’t help.',
      'After the booking, automatic reminders reduce no-shows, and broadcasts bring patients back for follow-ups, cleanings or check-ups. You can build the whole flow by describing your clinic in plain words to the AI flow builder, then test it on your own number before going live.',
    ],
    pains: [
      { icon: PhoneMissed, title: 'Calls you can’t pick up', body: 'Every missed call during a busy OPD is a patient who books somewhere else.' },
      { icon: CalendarX2, title: 'No-shows', body: 'Patients forget. Empty slots cost you the whole consultation fee.' },
      { icon: MessageCircleQuestion, title: 'The same five questions', body: 'Timings, fees, location, parking, reports. Answered again and again by hand.' },
    ],
    useCases: [
      { icon: CalendarCheck, title: 'Appointment booking bot', body: 'Patients pick a day and time slot from a list. The bot tags them and emails your front desk.' },
      { icon: BellRing, title: 'Reminders that cut no-shows', body: 'Send a reminder the day before with a one-tap button to confirm or reschedule.' },
      { icon: Bot, title: 'Answers from your clinic’s info', body: 'The AI chatbot answers timings, fees and directions from your FAQs, and hands over to staff when it can’t.' },
      { icon: Repeat, title: 'Follow-ups and recalls', body: 'Bring patients back for check-ups, cleanings and repeat visits with a broadcast.' },
    ],
    chat: {
      business: 'Smile Dental Clinic',
      avatar: '#0E7490',
      lines: [
        { from: 'customer', text: 'Hi, I want to book an appointment' },
        { from: 'bot', text: 'Hello! 😊 Welcome to *Smile Dental Clinic*. Which day suits you?', options: ['Today', 'Tomorrow', 'Saturday'] },
        { from: 'customer', text: 'Saturday' },
        { from: 'bot', text: 'Open slots on *Saturday*:', options: ['10:00 AM', '11:30 AM', '4:00 PM'] },
        { from: 'customer', text: '11:30 AM' },
        { from: 'bot', text: 'Booked ✅ *Saturday, 11:30 AM*. We’ll send you a reminder on Friday.' },
      ],
      events: [
        { after: 0, icon: 'chat', title: 'New patient chat', detail: 'Flow: Appointment booking' },
        { after: 5, icon: 'tag', title: 'Tagged “appointment”', detail: 'Sat · 11:30 AM slot held' },
        { after: 5, icon: 'bell', title: 'Front desk notified', detail: 'Email sent to reception' },
        { after: 5, icon: 'calendar', title: 'Reminder scheduled', detail: 'Friday · 6:00 PM' },
      ],
    },
    products: ['chatbot-builder', 'automation', 'live-chat', 'whatsapp-broadcast'],
    faqs: [
      { q: 'Do I need a developer to set up the appointment bot?', a: 'No. Start from a template or describe your clinic in plain words and the AI flow builder creates the flow for you. You can edit every step visually.' },
      { q: 'Can patients still talk to a real person?', a: 'Yes. Any time the bot can’t help, the chat moves to your staff in the shared inbox with the full conversation.' },
      { q: 'What does it cost?', a: 'You can start on the free plan. Automated flows need a paid plan with the chatbot flow add-on. See the pricing page for current prices.' },
    ],
  },
  {
    slug: 'coaching-institutes',
    name: 'Coaching institutes & schools',
    short: 'Coaching & education',
    icon: GraduationCap,
    seo: {
      title: 'WhatsApp for Coaching Institutes: Admissions Bot & Fee Reminders',
      description:
        'Answer admission enquiries, share batch timings and fees, send fee reminders and class updates on WhatsApp. Built for coaching centres and schools.',
    },
    hero: {
      title: 'Turn every enquiry into an admission.',
      accent: 'into an admission.',
      subtitle:
        'Answer course and fee questions instantly, follow up with every lead, and keep students and parents updated, all on WhatsApp.',
    },
    overview: [
      'Admissions are won in the first few minutes. When a student or parent asks about a course, they’re usually comparing several institutes at once, and the one that replies quickly with clear answers on batches, timings and fees gets the visit.',
      'BigBrosAI lets your WhatsApp number reply instantly, day or night. An admissions flow asks which course and class the student is interested in, shares batch details and collects their details for a counsellor callback. Every lead is tagged by course, so your team knows exactly who to follow up with.',
      'After admission, the same number keeps students and parents informed: fee reminders with a payment link, class schedule changes, test results and holiday notices, sent only to the batch that needs them instead of a noisy group.',
    ],
    pains: [
      { icon: Hourglass, title: 'Enquiries go cold', body: 'A student asks about fees at 10 PM. By morning they’ve joined another institute.' },
      { icon: Wallet, title: 'Fee follow-ups', body: 'Chasing pending fees by phone takes hours every month.' },
      { icon: Inbox, title: 'Updates get lost', body: 'Class changes, test results and holidays get buried in group chats.' },
    ],
    useCases: [
      { icon: GraduationCap, title: 'Admissions bot', body: 'Ask which course and class, share batch timings and fees, and collect name and phone for your counsellor.' },
      { icon: UserCheck, title: 'Lead follow-up', body: 'Tag interested students and send a follow-up broadcast before the batch starts.' },
      { icon: IndianRupee, title: 'Fee reminders', body: 'Send utility reminders with a payment link before the due date.' },
      { icon: Megaphone, title: 'Class and test updates', body: 'Broadcast schedule changes and results to the right batch, not a noisy group.' },
    ],
    chat: {
      business: 'Bright Future Academy',
      avatar: '#7C3AED',
      lines: [
        { from: 'customer', text: 'What are the fees for the JEE batch?' },
        { from: 'bot', text: 'Hi! 📚 Which class are you in?', options: ['Class 11', 'Class 12', 'Dropper'] },
        { from: 'customer', text: 'Class 11' },
        { from: 'bot', text: 'Our *Class 11 JEE* batch starts 5 Jan, Mon–Sat, 4–7 PM. Shall a counsellor call you with the fee details?', options: ['Yes, call me', 'Send on WhatsApp'] },
        { from: 'customer', text: 'Yes, call me' },
        { from: 'bot', text: 'Done ✅ Our counsellor will call you today.' },
      ],
      events: [
        { after: 0, icon: 'chat', title: 'New admission enquiry', detail: 'Flow: Admissions' },
        { after: 2, icon: 'tag', title: 'Tagged “JEE · Class 11”', detail: 'Added to Jan batch list' },
        { after: 5, icon: 'user', title: 'Assigned to counsellor', detail: 'Callback requested today' },
      ],
    },
    products: ['chatbot-builder', 'whatsapp-broadcast', 'whatsapp-payments', 'click-to-whatsapp-ads'],
    faqs: [
      { q: 'Can I message only one batch at a time?', a: 'Yes. Tag contacts by course or batch and send a broadcast to just that audience.' },
      { q: 'Can parents pay fees on WhatsApp?', a: 'Yes. Send a payment link in the chat. See WhatsApp Payments for supported methods.' },
      { q: 'Can I run ads that open a WhatsApp chat?', a: 'Yes. Click-to-WhatsApp ads on Facebook and Instagram open a chat with your number, where the admissions bot takes over.' },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real estate',
    short: 'Real estate',
    icon: Building2,
    seo: {
      title: 'WhatsApp Lead Qualification Bot for Real Estate Agents & Builders',
      description:
        'Qualify property leads on WhatsApp by budget, location and timeline, share brochures and book site visits automatically. For brokers and builders.',
    },
    hero: {
      title: 'Qualify buyers before you pick up the phone.',
      accent: 'before you pick up the phone.',
      subtitle:
        'Your WhatsApp bot asks budget, location and timeline, shares the right brochure and books the site visit, so your team only calls serious buyers.',
    },
    overview: [
      'Real estate leads are expensive and easy to waste. Portals and ads bring in a flood of enquiries, but many are early-stage browsers, and the genuinely interested buyers expect a reply within minutes, not hours.',
      'A BigBrosAI flow does the first conversation for you. It asks about budget, location, property type and timeline, sends the right brochure or floor plan as a PDF, and offers site visit slots. Qualified leads are tagged and passed to the right agent with the whole conversation, so your team spends its time on buyers who are ready.',
      'Pair it with Click-to-WhatsApp ads and every ad click becomes a conversation instead of a bounce, and broadcast new launches or offers to past enquiries who opted in to hear from you.',
    ],
    pains: [
      { icon: UserX, title: 'Junk leads from ads', body: 'Portals and ads bring hundreds of leads. Most are just browsing.' },
      { icon: Timer, title: 'Slow first reply', body: 'Buyers enquire with five builders. The first to reply usually gets the visit.' },
      { icon: Files, title: 'Brochures by hand', body: 'Sending floor plans and price sheets one by one eats your team’s day.' },
    ],
    useCases: [
      { icon: Filter, title: 'Lead qualification', body: 'Ask budget, preferred location, property type and when they plan to buy. Tag hot leads for sales.' },
      { icon: FileText, title: 'Instant brochures', body: 'Share floor plans, price sheets and location maps the moment someone asks.' },
      { icon: MapPin, title: 'Site visit booking', body: 'Offer visit slots in a list menu and notify the right agent.' },
      { icon: Megaphone, title: 'Launch broadcasts', body: 'Announce new projects and offers to past enquiries who opted in.' },
    ],
    chat: {
      business: 'Skyline Homes',
      avatar: '#B45309',
      lines: [
        { from: 'customer', text: 'Interested in a 2BHK' },
        { from: 'bot', text: 'Great choice! 🏡 What’s your budget?', options: ['Under ₹50L', '₹50L–₹80L', 'Above ₹80L'] },
        { from: 'customer', text: '₹50L–₹80L' },
        { from: 'bot', text: 'Here’s the brochure for our 2BHK homes. Would you like to visit the site this weekend?', doc: 'Skyline-2BHK-Brochure.pdf', options: ['Saturday', 'Sunday'] },
        { from: 'customer', text: 'Sunday' },
        { from: 'bot', text: 'Booked ✅ *Sunday, 11 AM*. Our agent Rohan will share the location.' },
      ],
      events: [
        { after: 0, icon: 'chat', title: 'New lead from ad', detail: 'Click-to-WhatsApp · 2BHK' },
        { after: 2, icon: 'tag', title: 'Qualified: hot lead', detail: 'Budget ₹50L–₹80L' },
        { after: 3, icon: 'file', title: 'Brochure sent', detail: 'Skyline-2BHK-Brochure.pdf' },
        { after: 5, icon: 'calendar', title: 'Site visit booked', detail: 'Sunday · assigned to Rohan' },
      ],
    },
    products: ['chatbot-builder', 'click-to-whatsapp-ads', 'live-chat', 'whatsapp-broadcast'],
    faqs: [
      { q: 'Can the bot send PDFs like brochures?', a: 'Yes. Flows can send documents, images and links, such as brochures, floor plans and maps.' },
      { q: 'Can leads be assigned to different agents?', a: 'Yes. Your team works from a shared inbox, and the flow can notify the right person when a lead is qualified.' },
      { q: 'Will this work with my Facebook lead ads?', a: 'Click-to-WhatsApp ads send buyers straight into a WhatsApp chat, where the qualification flow starts automatically.' },
    ],
  },
  {
    slug: 'restaurants',
    name: 'Restaurants & cafés',
    short: 'Restaurants',
    icon: UtensilsCrossed,
    seo: {
      title: 'WhatsApp for Restaurants: Table Booking, Menu & Orders',
      description:
        'Share your menu, take table reservations and send offers to regulars on WhatsApp. A simple WhatsApp bot for restaurants, cafés and cloud kitchens.',
    },
    hero: {
      title: 'Bookings, menus and offers in one chat.',
      accent: 'in one chat.',
      subtitle:
        'Guests scan a QR or message you on WhatsApp to see the menu, book a table or order, and you bring them back with offers they actually read.',
    },
    overview: [
      'Restaurants live on repeat guests, but most of the marketing tools available, like social posts and aggregator apps, put someone else between you and your regulars. WhatsApp lets you talk to guests directly, in the app they open every day.',
      'With BigBrosAI, a QR code on your tables, menus or bills opens a chat with your restaurant. Guests can see today’s menu, reserve a table by picking the party size and time, or place an order and pay by link. Your team gets notified, and the guest gets an instant confirmation.',
      'Every guest who chats with you and opts in becomes someone you can invite back with weekend specials, festival menus or new dishes, through broadcasts they actually read.',
    ],
    pains: [
      { icon: PhoneCall, title: 'Phones ringing at peak hour', body: 'Staff can’t take reservations and serve tables at the same time.' },
      { icon: Percent, title: 'Paying aggregator commissions', body: 'Regulars who already love you still order through apps that take a cut.' },
      { icon: EyeOff, title: 'Offers nobody sees', body: 'Social posts reach a fraction of your regulars.' },
    ],
    useCases: [
      { icon: CalendarCheck, title: 'Table reservations', body: 'Guests pick date, time and party size. You get notified and the guest gets a confirmation.' },
      { icon: UtensilsCrossed, title: 'Menu on request', body: 'Reply MENU to get today’s menu as an image or PDF.' },
      { icon: IndianRupee, title: 'Direct orders and payments', body: 'Take orders in chat and collect payment with a link.' },
      { icon: Gift, title: 'Offers to regulars', body: 'Broadcast weekend specials and festival offers to guests who opted in.' },
    ],
    chat: {
      business: 'The Spice Route',
      avatar: '#BE123C',
      lines: [
        { from: 'customer', text: 'BOOK' },
        { from: 'bot', text: 'Hi! 🍽️ Welcome to *The Spice Route*. How many guests?', options: ['2', '4', '6+'] },
        { from: 'customer', text: '4' },
        { from: 'bot', text: 'Tonight’s open tables:', options: ['7:30 PM', '9:00 PM'] },
        { from: 'customer', text: '9:00 PM' },
        { from: 'bot', text: 'Table for 4 at *9:00 PM* is confirmed ✅ See you tonight!' },
      ],
      events: [
        { after: 0, icon: 'chat', title: 'Scanned table QR', detail: 'Flow: Reservations' },
        { after: 5, icon: 'calendar', title: 'Table reserved', detail: '4 guests · 9:00 PM' },
        { after: 5, icon: 'bell', title: 'Floor manager notified', detail: 'Reservation sheet updated' },
      ],
    },
    products: ['chatbot-builder', 'whatsapp-payments', 'whatsapp-broadcast', 'whatsapp-forms'],
    faqs: [
      { q: 'How do guests find us on WhatsApp?', a: 'Put a WhatsApp QR code on tables, menus and bills. Our free QR code generator makes one in seconds.' },
      { q: 'Can I send offers to all my customers?', a: 'You can send marketing broadcasts to customers who have opted in to hear from you, in line with WhatsApp’s policies.' },
      { q: 'Do I need a separate number?', a: 'The WhatsApp Business API needs a number that isn’t active on the regular WhatsApp app. Many restaurants use a new number or move their existing one.' },
    ],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce & D2C brands',
    short: 'E-commerce & D2C',
    icon: ShoppingBag,
    seo: {
      title: 'WhatsApp for E-commerce: Abandoned Carts, Order Updates & COD',
      description:
        'Recover abandoned carts, send order and delivery updates, confirm COD orders and run broadcasts on WhatsApp. Built for Indian D2C and online stores.',
    },
    hero: {
      title: 'Sell, update and support where your shoppers already are.',
      accent: 'where your shoppers already are.',
      subtitle:
        'Recover abandoned carts, confirm orders, send delivery updates and answer questions on WhatsApp, with email for receipts built in.',
    },
    overview: [
      'For online stores in India, WhatsApp is often the difference between a sale and an abandoned cart. Shoppers ignore emails, but they read WhatsApp messages, and many prefer to ask a quick question in chat before paying.',
      'BigBrosAI connects to Shopify and WooCommerce so order confirmations, COD confirmations, shipping updates with tracking and abandoned cart reminders go out automatically. COD confirmation alone can save money by catching fake or impulse orders before you ship them.',
      'On top of order messages, you can run broadcasts for launches and sales, answer product questions with a chatbot, collect payments in chat and send receipts by email, all from one dashboard.',
    ],
    pains: [
      { icon: ShoppingCart, title: 'Abandoned carts', body: 'Most shoppers leave before paying, and emails go unread.' },
      { icon: PackageSearch, title: '“Where is my order?”', body: 'Support spends the day answering the same tracking question.' },
      { icon: PackageX, title: 'Fake COD orders', body: 'Unconfirmed cash-on-delivery orders come back as costly returns.' },
    ],
    useCases: [
      { icon: ShoppingCart, title: 'Abandoned cart recovery', body: 'Remind shoppers on WhatsApp with a one-tap link back to checkout.' },
      { icon: Truck, title: 'Order and delivery updates', body: 'Send confirmations, shipping and delivery messages automatically.' },
      { icon: BadgeCheck, title: 'COD confirmation', body: 'Ask shoppers to confirm cash-on-delivery orders with a button before you ship.' },
      { icon: Megaphone, title: 'Broadcasts and drops', body: 'Announce launches and sales to opted-in customers, segmented by what they bought.' },
    ],
    chat: {
      business: 'Indigo Threads',
      avatar: '#1D4ED8',
      lines: [
        { from: 'bot', text: 'Hi Ananya! You left the *Linen kurta* in your cart 🛍️ Complete your order here: indigothreads.in/cart' },
        { from: 'customer', text: 'Is COD available?' },
        { from: 'bot', text: 'Yes! Cash on delivery is available for your pin code. Shall I place the order?', options: ['Yes, place order', 'Not now'] },
        { from: 'customer', text: 'Yes, place order' },
        { from: 'bot', text: 'Order *#1043* placed ✅ We’ll send tracking details once it ships.' },
      ],
      events: [
        { after: 0, icon: 'sparkle', title: 'Cart reminder sent', detail: 'Abandoned 1 hour ago' },
        { after: 3, icon: 'pay', title: 'COD order confirmed', detail: '₹1,299 · Linen kurta' },
        { after: 4, icon: 'file', title: 'Order #1043 created', detail: 'Confirmation email sent' },
      ],
    },
    products: ['automation', 'whatsapp-broadcast', 'whatsapp-payments', 'email-api'],
    faqs: [
      { q: 'Does it work with my store?', a: 'See the integrations page for supported platforms. You can also connect any store through the API and webhooks.' },
      { q: 'Are order updates charged?', a: 'Order and delivery updates are utility messages, charged per message at Meta’s rate, and free inside an open customer service window.' },
      { q: 'Can I send receipts by email too?', a: 'Yes. Every account gets 300 free transactional emails a day.' },
    ],
  },
];

export const solutionBySlug: Record<string, Solution> = Object.fromEntries(solutions.map((s) => [s.slug, s]));
