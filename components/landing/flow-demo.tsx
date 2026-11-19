/*
 * Animated chatbot flow, drawn as SVG so it stays crisp and costs no JS.
 * Dashed connectors scroll, and a pulse travels each edge via <animateMotion>.
 * Two layouts share the same nodes: wide for tablet/desktop, tall for phones.
 */

type Kind = 'trigger' | 'ai' | 'condition' | 'action';
type Node = { id: string; kind: Kind; label: string; detail: string; short?: string };

const nodes: Node[] = [
  { id: 'trigger', kind: 'trigger', label: 'Message received', detail: 'Keyword: “price”' },
  { id: 'ai', kind: 'ai', label: 'AI reply', detail: 'Answers from your FAQs' },
  { id: 'cond', kind: 'condition', label: 'Returning customer?', detail: 'Checks contact tags' },
  { id: 'catalog', kind: 'action', label: 'Send catalogue', detail: 'Interactive list' },
  { id: 'ask', kind: 'action', label: 'Ask name & email', detail: 'Saves to attributes', short: 'Ask details' },
  { id: 'sheet', kind: 'action', label: 'Add to Google Sheets', detail: 'New lead row', short: 'Google Sheets' },
  { id: 'agent', kind: 'action', label: 'Hand off to Sales', detail: 'Assigns a live agent', short: 'Hand off' },
];

const edges: [string, string, string?][] = [
  ['trigger', 'ai'],
  ['ai', 'cond'],
  ['cond', 'catalog', 'Yes'],
  ['cond', 'ask', 'No'],
  ['ask', 'sheet'],
  ['catalog', 'agent'],
];

type Pos = Record<string, { x: number; y: number; w: number }>;
const H = 58;

const wide: { vb: [number, number]; pos: Pos } = {
  vb: [720, 330],
  pos: {
    trigger: { x: 10, y: 20, w: 190 },
    ai: { x: 265, y: 20, w: 190 },
    cond: { x: 520, y: 20, w: 190 },
    catalog: { x: 520, y: 140, w: 190 },
    ask: { x: 265, y: 140, w: 190 },
    sheet: { x: 10, y: 140, w: 190 },
    agent: { x: 520, y: 260, w: 190 },
  },
};

const tall: { vb: [number, number]; pos: Pos } = {
  vb: [340, 560],
  pos: {
    trigger: { x: 60, y: 10, w: 220 },
    ai: { x: 60, y: 110, w: 220 },
    cond: { x: 60, y: 210, w: 220 },
    catalog: { x: 4, y: 340, w: 160 },
    ask: { x: 176, y: 340, w: 160 },
    agent: { x: 4, y: 470, w: 160 },
    sheet: { x: 176, y: 470, w: 160 },
  },
};

const tone: Record<Kind, { chip: string; ring: string; text: string; tag: string }> = {
  trigger: { chip: '#FEF3C7', ring: '#FCD34D', text: '#92400E', tag: 'WHEN' },
  ai: { chip: '#EDE9FE', ring: '#C4B5FD', text: '#5B21B6', tag: 'AI' },
  condition: { chip: '#E0F2FE', ring: '#7DD3FC', text: '#075985', tag: 'IF' },
  action: { chip: '#DCFCE7', ring: '#86EFAC', text: '#166534', tag: 'DO' },
};

function edgePath(a: Pos[string], b: Pos[string]) {
  const sameRow = Math.abs(a.y - b.y) < 20;
  if (sameRow) {
    const right = b.x > a.x;
    const x1 = right ? a.x + a.w : a.x;
    const x2 = right ? b.x : b.x + b.w;
    const y = a.y + H / 2;
    const mid = (x1 + x2) / 2;
    return `M${x1} ${y} C ${mid} ${y}, ${mid} ${y}, ${x2} ${y}`;
  }
  const x1 = a.x + a.w / 2;
  const y1 = a.y + H;
  const x2 = b.x + b.w / 2;
  const y2 = b.y;
  const my = (y1 + y2) / 2;
  return `M${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
}

function FlowSvg({ layout, className, compact }: { layout: typeof wide; className?: string; compact?: boolean }) {
  const { vb, pos } = layout;
  return (
    <svg viewBox={`0 0 ${vb[0]} ${vb[1]}`} className={className} role="img" aria-label="Example chatbot flow: a keyword trigger, an AI reply, a condition, then actions that send a catalogue, collect details into Google Sheets and hand off to sales.">
      {edges.map(([from, to, label], i) => {
        const d = edgePath(pos[from], pos[to]);
        const id = `${vb[0]}-e${i}`;
        return (
          <g key={id}>
            <path id={id} d={d} fill="none" stroke="#B7C3BC" strokeWidth={1.6} className="animate-dash" />
            <circle r={4} fill="#16a34a" className="travel">
              <animateMotion dur={`${2.2 + (i % 3) * 0.4}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" rotate="auto">
                <mpath href={`#${id}`} />
              </animateMotion>
            </circle>
            {label && (
              <EdgeLabel d={d} text={label} a={pos[from]} b={pos[to]} />
            )}
          </g>
        );
      })}
      {nodes.map((n, i) => {
        const p = pos[n.id];
        const t = tone[n.kind];
        return (
          <g key={n.id} data-reveal="" style={{ ['--reveal-delay' as string]: `${i * 90}ms`, ['--reveal-y' as string]: '10px' }}>
            <rect x={p.x} y={p.y} width={p.w} height={H} rx={14} fill="#fff" stroke="#E5E2DA" />
            <rect x={p.x + 10} y={p.y + 12} width={34} height={34} rx={10} fill={t.chip} stroke={t.ring} />
            <text x={p.x + 27} y={p.y + 33} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={t.text} fontFamily="var(--font-geist-mono)">
              {t.tag}
            </text>
            <text x={p.x + 54} y={p.y + 26} fontSize={12.5} fontWeight={600} fill="#101828">
              {compact && p.w < 200 && n.short ? n.short : n.label}
            </text>
            <text x={p.x + 54} y={p.y + 42} fontSize={10.5} fill="#667085">
              {n.detail}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function EdgeLabel({ text, a, b }: { d: string; text: string; a: Pos[string]; b: Pos[string] }) {
  const x = (a.x + a.w / 2 + b.x + b.w / 2) / 2;
  const y = (a.y + H + b.y) / 2;
  const sameCol = Math.abs(a.x - b.x) < 5;
  const lx = sameCol ? x + 22 : x;
  return (
    <g>
      <rect x={lx - 15} y={y - 10} width={30} height={20} rx={10} fill={text === 'Yes' ? '#DCFCE7' : '#F2F4F7'} />
      <text x={lx} y={y + 4} textAnchor="middle" fontSize={10} fontWeight={600} fill={text === 'Yes' ? '#166534' : '#475467'}>
        {text}
      </text>
    </g>
  );
}

export function FlowDemo() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[#FBFAF7] p-3 shadow-lift sm:p-5">
      <div aria-hidden className="bg-grain absolute inset-0 opacity-70" />
      <div className="relative mb-3 flex items-center justify-between px-1">
        <p className="text-sm font-semibold">Pricing enquiries · Flow</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-800">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-soft-ping absolute inset-0 rounded-full bg-brand-500" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-brand-600" />
          </span>
          Live
        </span>
      </div>
      <FlowSvg layout={wide} className="relative hidden w-full sm:block" />
      <FlowSvg layout={tall} compact className="relative mx-auto block w-full max-w-sm sm:hidden" />
    </div>
  );
}
