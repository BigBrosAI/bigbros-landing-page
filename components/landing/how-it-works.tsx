"use client";

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Link2, PenLine, Rocket } from 'lucide-react';
import { Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';

const steps = [
  {
    icon: Link2,
    title: 'Connect your number',
    body: 'Sign up, link your Meta business account and register a WhatsApp number on the official Business API — guided, from your browser.',
  },
  {
    icon: PenLine,
    title: 'Set up templates & flows',
    body: 'Write message templates and submit them for approval, invite your team, and build chatbot flows for the questions you get every day.',
  },
  {
    icon: Rocket,
    title: 'Launch and reply',
    body: 'Send your first broadcast, connect your store, and answer every chat from the shared inbox — with AI covering the routine ones.',
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="how-it-works" className="scroll-mt-16 border-t border-border py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Kicker>How it works</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
              Live on WhatsApp in an afternoon.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-600">
              No code needed to get started. Developers can plug in the API and webhooks whenever they’re ready.
            </p>
          </Reveal>
        </div>

        <ol ref={ref} className="relative space-y-6 pl-14 sm:pl-16">
          <span aria-hidden className="absolute bottom-6 left-[1.2rem] top-6 w-px bg-border sm:left-[1.45rem]" />
          <motion.span
            aria-hidden
            className="absolute bottom-6 left-[1.2rem] top-6 w-px origin-top bg-brand-600 sm:left-[1.45rem]"
            style={reduce ? { scaleY: 1 } : { scaleY }}
          />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="relative">
              <span className="absolute -left-14 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-brand-200 bg-background text-brand-700 sm:-left-16 sm:h-12 sm:w-12">
                <s.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div className="rounded-3xl border border-border bg-card p-6 transition-shadow duration-500 hover:shadow-lift sm:p-7">
                <p className="font-mono text-xs text-muted-foreground">Step {String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
