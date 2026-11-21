export type Job = {
  slug: string;
  title: string;
  team: string;
  type: 'Internship' | 'Full-time';
  location: string;
  datePosted: string;
  summary: string;
  facts: { label: string; value: string }[];
  responsibilities: { title: string; body: string }[];
  mustHave: string[];
  goodToHave: string[];
  perks: string[];
};

const about =
  'BigBrosAI is a WhatsApp marketing and automation platform built for Indian businesses — broadcasts, AI-written templates, no-code chatbots, a shared team inbox and campaign analytics in one place.';

const baseResponsibilities = [
  { title: 'Call leads', body: 'Call the leads BigBrosAI assigns you (20–50 calls a day) and understand how each business talks to its customers today.' },
  { title: 'Pitch and demo', body: 'Explain how WhatsApp broadcasts, AI templates, chatbots and the shared inbox solve their problem. Share your screen for live demos when needed.' },
  { title: 'Follow up', body: 'Follow up on WhatsApp, calls and email until the lead decides. Handle objections on price, WhatsApp approval and setup effort.' },
  { title: 'Convert', body: 'Move leads to a paid plan and hit your monthly conversion target.' },
  { title: 'Onboard', body: 'Walk new customers through signup, WhatsApp Business API setup, their first template and first campaign or chatbot — until they send their first live message.' },
  { title: 'Market', body: 'Share customer stories and common questions with the marketing team. Help with WhatsApp campaigns, social posts and webinars.' },
  { title: 'Report', body: 'Log every call, status and next step in the CRM, and share a short daily update on calls, demos and conversions.' },
];

const mustHaveBase = [
  'Clear, confident spoken English (Hindi or a regional language is a plus)',
  'Comfortable making 20–50 calls a day and hearing “no”',
  'Own laptop or smartphone with a stable internet connection',
  'Basic comfort with WhatsApp, Google Sheets and online tools',
];

const goodToHave = [
  'Experience in tele-sales, inside sales, customer support or a SaaS product',
  'Knowledge of WhatsApp Business or digital marketing',
  'Experience using a CRM',
];

export const jobs: Job[] = [
  {
    slug: 'sales-marketing-onboarding-associate',
    title: 'Sales, Marketing & Onboarding Associate',
    team: 'Sales & Marketing',
    type: 'Full-time',
    location: 'Remote (India)',
    datePosted: '2026-11-01',
    summary: 'Turn BigBrosAI leads into paying, active customers — call, demo, close and onboard. Fixed pay plus uncapped incentives.',
    facts: [
      { label: 'Type', value: 'Full-time, permanent' },
      { label: 'Work mode', value: 'Work from home, flexible timings' },
      { label: 'Experience', value: 'Graduate, any stream, 0–2 years' },
      { label: 'Pay', value: 'Fixed monthly pay + incentive on every conversion, no upper limit' },
    ],
    responsibilities: [
      ...baseResponsibilities.slice(0, 4),
      { title: 'Generate your own leads (optional)', body: 'Bring in new businesses through your network, LinkedIn or local outreach, and earn an extra incentive on each one you convert.' },
      ...baseResponsibilities.slice(4),
      { title: 'Mentor', body: 'Handle more leads and larger accounts, and help train interns.' },
    ],
    mustHave: [...mustHaveBase, 'Graduate in any stream, 0–2 years of experience'],
    goodToHave,
    perks: [
      'Work from home with flexible timings',
      'Leads provided — all your time goes into calling and closing',
      'Fixed monthly pay plus uncapped incentives, and extra incentive on self-generated leads',
      'Training on the product, WhatsApp marketing and B2B sales',
      'A fast path to sales lead roles',
    ],
  },
  {
    slug: 'sales-marketing-onboarding-intern',
    title: 'Sales, Marketing & Onboarding Intern',
    team: 'Sales & Marketing',
    type: 'Internship',
    location: 'Remote (India)',
    datePosted: '2026-11-01',
    summary: 'A 3-month, work-from-home internship selling an AI SaaS product to real businesses, with a pre-placement offer for top performers.',
    facts: [
      { label: 'Type', value: 'Internship, 3 months' },
      { label: 'Work mode', value: 'Work from home, flexible timings' },
      { label: 'Eligibility', value: 'Student or recent graduate, any stream' },
      { label: 'Pay', value: 'Incentive on every converted lead' },
    ],
    responsibilities: baseResponsibilities,
    mustHave: [...mustHaveBase, 'Student or recent graduate, any stream'],
    goodToHave,
    perks: [
      'Work from home with flexible timings',
      'Leads provided — all your time goes into calling and closing',
      'Incentive on every lead you convert',
      'Training on the product, WhatsApp marketing and B2B sales',
      'Internship certificate and letter of recommendation',
      'Pre-placement offer for top performers',
    ],
  },
];

export const jobAbout = about;
export const applyHref = (j: Job) =>
  `mailto:hello@bigbrosai.com?subject=${encodeURIComponent(`Application — ${j.title}`)}&body=${encodeURIComponent(`Hi BigBrosAI team,\n\nI’d like to apply for the ${j.title} role. My resume is attached.\n\nName:\nCity:\nPhone:\n`)}`;

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
