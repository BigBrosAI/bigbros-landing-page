"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { BellRing, CalendarCheck, ChevronLeft, FileText, IndianRupee, MessageCircle, Phone, Plus, Reply, Sparkles, Tag, UserCheck } from 'lucide-react';
import { DateChip, IPhone, Meta, StatusBar, Tail, Wallpaper, type Tick } from '@/components/landing/hero-phone';
import { useClock } from '@/components/landing/use-clock';
import { renderWhatsApp } from '@/lib/whatsapp-format';
import type { ChatEventIcon, ChatLine, Solution } from '@/lib/solutions';
import { cn } from '@/lib/utils';

/*
 * Animated industry demo: the sample conversation from lib/solutions.ts plays out on a
 * phone, one message at a time, with dashboard events appearing alongside. Every visual
 * derives from the looping clock `t`, so the scene stays in sync and pauses off-screen.
 */

const ACCENT = '#1DAA61';
const icons: Record<ChatEventIcon, React.ComponentType<{ className?: string }>> = {
  chat: MessageCircle,
  tag: Tag,
  bell: BellRing,
  calendar: CalendarCheck,
  file: FileText,
  pay: IndianRupee,
  user: UserCheck,
  sparkle: Sparkles,
};

type Step = { at: number; typeStart?: number; tapAt?: number; typingFrom?: number };

/** When each line starts typing / gets tapped, and when it lands in the thread. */
function schedule(lines: ChatLine[]) {
  let t = 900;
  const steps: Step[] = lines.map((l, i) => {
    if (l.from === 'customer') {
      const prev = lines[i - 1];
      if (prev?.options?.includes(l.text)) {
        const tapAt = t + 300;
        t = tapAt + 450;
        const step = { at: t, tapAt };
        t += 600;
        return step;
      }
      const typeStart = t;
      t += Math.min(l.text.length * 42, 1500) + 300;
      const step = { at: t, typeStart };
      t += 650;
      return step;
    }
    const typingFrom = t;
    t += 1150;
    const step = { at: t, typingFrom };
    t += 900 + (l.options ? 500 : 0) + (l.doc ? 400 : 0) + Math.min(l.text.length * 6, 600);
    return step;
  });
  return { steps, loop: t + 3600 };
}

export function SolutionChat({ chat }: { chat: Solution['chat'] }) {
  const { steps, loop } = schedule(chat.lines);
  const { ref, t } = useClock(loop, loop - 1);

  const shown = chat.lines.map((l, i) => ({ l, i, s: steps[i] })).filter(({ s }) => t >= s.at);
  const typing = steps.some((s) => s.typingFrom !== undefined && t >= s.typingFrom && t < s.at);
  const composing = chat.lines.findIndex((_, i) => steps[i].typeStart !== undefined && t >= steps[i].typeStart! && t < steps[i].at);
  const typed = composing >= 0 ? chat.lines[composing].text.slice(0, Math.floor((t - steps[composing].typeStart!) / 42)) : '';
  const tapping = chat.lines.findIndex((_, i) => steps[i].tapAt !== undefined && t >= steps[i].tapAt! && t < steps[i].at);
  const tick = (at: number): Tick => (t >= at + 1200 ? 'read' : t >= at + 450 ? 'delivered' : 'sent');

  const seen: Record<number, number> = {};
  const events = chat.events
    .map((e) => {
      const k = (seen[e.after] = (seen[e.after] ?? -1) + 1);
      return { ...e, at: steps[e.after].at + 400 + k * 550 };
    })
    .filter((e) => t >= e.at);

  return (
    <div ref={ref} className="relative flex items-center justify-center gap-6">
      {/* dashboard events, synced to the chat */}
      <div className="hidden w-[13.5rem] shrink-0 xl:block" aria-hidden>
        <p className="mb-2.5 pl-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Meanwhile, in BigBrosAI</p>
        <ul className="min-h-[15rem] space-y-2">
          <AnimatePresence initial={false}>
            {events.map((e) => {
              const Icon = icons[e.icon];
              return (
                <motion.li
                  key={e.title}
                  layout
                  initial={{ opacity: 0, x: 18, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                  className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card/95 px-3 py-2.5 shadow-lift backdrop-blur"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100 dark:bg-brand-900/40 dark:ring-brand-800">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block truncate text-[12.5px] font-semibold text-foreground">{e.title}</span>
                    <span className="block truncate text-[11.5px] text-muted-foreground">{e.detail}</span>
                  </span>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative shrink-0">
        <IPhone>
          <StatusBar />
          {/* chat header */}
          <div className="flex items-center gap-2 border-b border-black/5 bg-[#F7F7F7] px-2 pb-2 pt-1">
            <ChevronLeft className="h-6 w-6 shrink-0" strokeWidth={2.4} style={{ color: ACCENT }} />
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: chat.avatar }}>
              {chat.business.charAt(0)}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[13.5px] font-semibold text-black">{chat.business}</p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={typing ? 'typing' : 'biz'}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                  className={cn('truncate text-[11px]', typing ? 'font-medium' : 'text-black/50')}
                  style={typing ? { color: ACCENT } : undefined}
                >
                  {typing ? 'typing…' : 'Business account'}
                </motion.p>
              </AnimatePresence>
            </div>
            <Phone className="mr-1 h-[18px] w-[18px] shrink-0" style={{ color: ACCENT }} />
          </div>

          {/* thread */}
          <div className="relative h-[26rem] overflow-hidden bg-[#EFE7DD]">
            <Wallpaper />
            <div className="relative flex h-full flex-col justify-end gap-1.5 px-2.5 pb-2 [mask-image:linear-gradient(to_bottom,transparent,#000_12%)]">
              <DateChip>Today</DateChip>
              <AnimatePresence initial={false} mode="popLayout">
                {shown.map(({ l, i, s }) => {
                  const me = l.from === 'customer';
                  return (
                    <motion.div
                      key={`${i}-${l.text}`}
                      layout="position"
                      initial={{ opacity: 0, y: 18, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ type: 'spring', stiffness: 430, damping: 32 }}
                      style={{ transformOrigin: me ? '100% 100%' : '0% 100%' }}
                      className={cn('flex', me ? 'justify-end' : 'justify-start')}
                    >
                      <Bubble line={l} me={me} tick={me ? tick(s.at) : undefined} tappedOption={tapping === i + 1 ? chat.lines[i + 1].text : undefined} />
                    </motion.div>
                  );
                })}
                {typing && (
                  <motion.div
                    key="typing"
                    layout="position"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    className="flex"
                  >
                    <span className="flex items-center gap-1 rounded-[14px] rounded-bl-[4px] bg-white px-3 py-2.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="typing-dot h-[6px] w-[6px] rounded-full bg-black/40" />
                      ))}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* composer */}
          <div className="flex items-center gap-2.5 border-t border-black/5 bg-[#F7F7F7] px-2.5 pb-6 pt-2">
            <Plus className="h-6 w-6 shrink-0" style={{ color: ACCENT }} />
            <div className="flex h-[34px] min-w-0 flex-1 items-center rounded-full border border-black/10 bg-white px-3">
              <span className="min-w-0 flex-1 truncate text-[13.5px] text-black">
                {typed || <span className="text-black/35">Message</span>}
                {typed && <span className="ml-px inline-block h-4 w-[1.5px] translate-y-[3px] animate-pulse" style={{ background: ACCENT }} />}
              </span>
            </div>
            <motion.span
              animate={{ scale: typed ? 1 : 0.85, opacity: typed ? 1 : 0.55 }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
              style={{ background: ACCENT }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
              </svg>
            </motion.span>
          </div>
        </IPhone>
      </motion.div>
    </div>
  );
}

function Bubble({ line, me, tick, tappedOption }: { line: ChatLine; me: boolean; tick?: Tick; tappedOption?: string }) {
  return (
    <div className="max-w-[80%]">
      <div
        className={cn(
          'relative px-2.5 py-1.5 text-[14px] leading-[1.32] text-[#111B21] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]',
          me ? 'rounded-[14px] rounded-br-[4px] bg-[#D9FDD3]' : 'rounded-[14px] rounded-bl-[4px] bg-white',
          line.options && 'rounded-b-[6px]'
        )}
      >
        <Tail me={me} />
        {line.doc && (
          <span className="mb-1.5 flex items-center gap-2 rounded-lg bg-black/[0.04] p-2">
            <span className="flex h-8 w-7 shrink-0 items-center justify-center rounded bg-[#E5484D] text-[8px] font-bold text-white">PDF</span>
            <span className="min-w-0 truncate text-[12.5px] font-medium">{line.doc}</span>
          </span>
        )}
        <span dangerouslySetInnerHTML={{ __html: renderWhatsApp(line.text) }} />
        <Meta time="10:24" tick={tick} />
      </div>
      {line.options && (
        <div className="mt-[3px] space-y-[3px]">
          {line.options.map((o) => {
            const tapped = o === tappedOption;
            return (
              <motion.span
                key={o}
                animate={{ scale: tapped ? 0.96 : 1, backgroundColor: tapped ? '#E7F6EC' : '#FFFFFF' }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center gap-1.5 rounded-[10px] py-[7px] text-[13.5px] font-medium text-[#00A5F4] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]"
              >
                <Reply className="h-3.5 w-3.5" /> {o}
              </motion.span>
            );
          })}
        </div>
      )}
    </div>
  );
}
