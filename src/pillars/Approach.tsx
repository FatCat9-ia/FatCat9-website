import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Cpu, UserRound, Search } from 'lucide-react';
import { capabilities, challenges, techAtScale } from '../content/pillars';
import { IllustrativeTag, Kicker } from '../components/ui';

type CapKey = (typeof capabilities)[number]['key'];

const C = { x: 260, y: 245 };
const nodes: Record<CapKey, { x: number; y: number; Icon: typeof Cpu; labelY: number }> = {
  research: { x: 260, y: 78, Icon: Search, labelY: -62 },
  technology: { x: 405, y: 330, Icon: Cpu, labelY: 70 },
  human: { x: 115, y: 330, Icon: UserRound, labelY: 70 },
};
const keys: CapKey[] = ['research', 'technology', 'human'];

/** Pillar 01 visual: three capabilities feeding one point of intelligence. */
function CapabilitySystem({ active }: { active: CapKey }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="20 0 480 470" className="mx-auto w-full max-w-[480px]" role="img" aria-labelledby="sys-t">
      <title id="sys-t">Research, Technology and Human Expertise connect to each other and feed one point of intelligence at the center.</title>
      {[70, 120, 170].map((r) => (
        <circle key={r} cx={C.x} cy={C.y} r={r} fill="none" stroke="rgb(var(--c-line))" strokeWidth={1} strokeDasharray={r === 170 ? '2 6' : undefined} />
      ))}
      {/* ring between capabilities */}
      <path
        d={`M ${nodes.research.x} ${nodes.research.y} L ${nodes.technology.x} ${nodes.technology.y} L ${nodes.human.x} ${nodes.human.y} Z`}
        fill="rgb(var(--c-signal))"
        fillOpacity={0.04}
        stroke="rgb(var(--c-ink))"
        strokeOpacity={0.18}
        strokeWidth={1}
      />
      {/* spokes */}
      {keys.map((k) => {
        const n = nodes[k];
        const on = k === active;
        const d = `M ${n.x} ${n.y} L ${C.x} ${C.y}`;
        return (
          <g key={k}>
            <motion.path
              d={d}
              fill="none"
              initial={false}
              animate={{ strokeWidth: on ? 2.5 : 1.25, stroke: on ? 'rgb(var(--c-signal))' : 'rgb(var(--c-ink))', strokeOpacity: on ? 1 : 0.35 }}
              transition={{ duration: 0.3 }}
              className="flow-line"
            />
            {!reduce && (
              <circle r={on ? 4.5 : 3} fill="rgb(var(--c-signal))" opacity={on ? 1 : 0.6}>
                <animateMotion dur={on ? '1.6s' : '2.8s'} repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        );
      })}
      {/* center */}
      {!reduce && (
        <motion.circle
          cx={C.x}
          cy={C.y}
          r={56}
          fill="none"
          stroke="rgb(var(--c-signal))"
          strokeWidth={1.5}
          animate={{ r: [56, 78], opacity: [0.6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <circle cx={C.x} cy={C.y} r={56} fill="rgb(var(--c-signal))" />
      <text x={C.x} y={C.y - 4} textAnchor="middle" fill="#ffffff" style={{ fontSize: 15, fontWeight: 700 }}>
        Intelligence
      </text>
      <text x={C.x} y={C.y + 16} textAnchor="middle" fill="#ffffff" opacity={0.85} style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>
        MEANING · ACTION
      </text>
      {/* nodes */}
      {keys.map((k) => {
        const n = nodes[k];
        const cap = capabilities.find((c) => c.key === k)!;
        const on = k === active;
        return (
          <g key={k}>
            <motion.circle cx={n.x} cy={n.y} r={40} initial={false} animate={{ fill: on ? 'rgb(var(--c-ink))' : 'rgb(var(--c-surface))' }} stroke={on ? 'rgb(var(--c-ink))' : 'rgb(var(--c-line))'} strokeWidth={1.5} transition={{ duration: 0.3 }} />
            <n.Icon x={n.x - 13} y={n.y - 13} width={26} height={26} className={on ? 'text-signal' : 'text-ink'} strokeWidth={1.75} aria-hidden="true" />
            <text x={n.x} y={n.y + n.labelY} textAnchor="middle" className="fill-ink" style={{ fontSize: 17, fontWeight: 700 }}>
              {cap.name}
            </text>
            <text x={n.x} y={n.y + n.labelY + 18} textAnchor="middle" className={on ? 'fill-signalInk' : 'fill-muted'} style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
              {cap.verb.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ApproachMain() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<CapKey>('research');
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (reduce || touched) return;
    const t = setInterval(() => setActive((a) => keys[(keys.indexOf(a) + 1) % keys.length]), 3200);
    return () => clearInterval(t);
  }, [reduce, touched]);
  const pick = (k: CapKey) => {
    setTouched(true);
    setActive(k);
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="grid items-center gap-6 md:grid-cols-[1.15fr_1fr]">
        <CapabilitySystem active={active} />
        <ol className="flex flex-col">
          {capabilities.map((c, i) => {
            const on = active === c.key;
            return (
              <li key={c.key} className="border-t border-line last:border-b">
                <button
                  type="button"
                  onMouseEnter={() => pick(c.key)}
                  onFocus={() => pick(c.key)}
                  onClick={() => pick(c.key)}
                  aria-pressed={on}
                  className="flex w-full gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                >
                  <span className={`pt-1 font-mono text-[12px] tabular-nums transition-colors ${on ? 'text-signalInk' : 'text-muted'}`}>0{i + 1}</span>
                  <span className="flex flex-col gap-1">
                    <span className={`text-[20px] font-bold leading-tight transition-colors ${on ? 'text-ink' : 'text-muted'}`}>{c.name}</span>
                    <motion.span
                      initial={false}
                      animate={{ height: on ? 'auto' : 0, opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden text-[15px] leading-[1.5] text-muted"
                    >
                      {c.text}
                    </motion.span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function ApproachViewA() {
  const [reading, setReading] = useState<'machine' | 'human'>('human');
  const ex = techAtScale.example;
  return (
    <div className="flex flex-col gap-10">
      <p className="max-w-[46rem] text-[19px] leading-[1.6] text-muted">{techAtScale.intro}</p>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        {[
          { ...techAtScale.machine, Icon: Cpu },
          { ...techAtScale.human, Icon: UserRound },
        ].map(({ label, items, Icon }, i) => (
          <div key={label} className={`flex flex-col gap-5 p-7 ${i === 1 ? 'bg-ink text-onDark' : 'bg-surface'}`}>
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ${i === 1 ? 'bg-signal text-white' : 'border border-line'}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-[20px] font-bold">{label}</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {items.map((it) => (
                <li key={it} className={`flex gap-3 text-[16px] ${i === 1 ? 'text-onDark2' : 'text-muted'}`}>
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-signal" aria-hidden="true" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-line bg-surface p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Kicker>Why both matter</Kicker>
          <IllustrativeTag>{ex.note}</IllustrativeTag>
        </div>
        <p className="mt-4 text-[24px] font-medium leading-[1.3] sm:text-[30px]">{ex.text}</p>
        <div className="mt-6 inline-flex rounded-full border border-line p-1" role="tablist" aria-label="Choose a reading">
          {(['machine', 'human'] as const).map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={reading === r}
              onClick={() => setReading(r)}
              className={`rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
                reading === r ? 'bg-ink text-onDark' : 'text-muted hover:text-ink'
              }`}
            >
              {r === 'machine' ? 'Literal reading' : 'With an analyst'}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={reading}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className={`mt-4 text-[17px] ${reading === 'human' ? 'text-signalInk' : 'text-muted'}`}
          >
            {reading === 'machine' ? ex.machineRead : ex.humanRead}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

const parts = [
  { key: 'research', name: 'Research', swatch: 'bg-onDark' },
  { key: 'technology', name: 'Technology', swatch: 'bg-signal' },
  { key: 'human', name: 'Human expertise', swatch: 'bg-blush' },
] as const;

export function ApproachViewB() {
  const [i, setI] = useState(0);
  const c = challenges[i];
  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-[46rem] text-[19px] leading-[1.6] text-muted">
        No one-size-fits-all solutions. We adapt research methods, technology and expertise to the questions that matter.
      </p>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
        <div className="flex flex-col" role="tablist" aria-label="Choose a challenge" aria-orientation="vertical">
          <Kicker>Your challenge</Kicker>
          <div className="mt-3 flex flex-col">
            {challenges.map((ch, idx) => (
              <button
                key={ch.label}
                role="tab"
                aria-selected={i === idx}
                onClick={() => setI(idx)}
                className={`group flex items-center gap-4 border-t border-line py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
                  i === idx ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                <span className={`font-mono text-[12px] tabular-nums ${i === idx ? 'text-signalInk' : ''}`}>0{idx + 1}</span>
                <span className="flex-1 text-[19px] font-medium leading-tight">{ch.label}</span>
                <motion.span
                  className="h-2 rounded-full bg-signal"
                  initial={false}
                  animate={{ width: i === idx ? 28 : 0, opacity: i === idx ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-onDark sm:p-8" role="tabpanel" aria-live="polite">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-lineDark" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full border border-lineDark" aria-hidden="true" />
          <div className="relative flex flex-col gap-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Kicker dark>The question</Kicker>
              <IllustrativeTag dark>Typical blend</IllustrativeTag>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={c.question}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="max-w-[20ch] text-[30px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[38px]"
              >
                “{c.question}”
              </motion.p>
            </AnimatePresence>

            <div className="flex flex-col gap-2">
              <div className="flex h-4 w-full gap-1 overflow-hidden rounded-full" aria-hidden="true">
                {parts.map((p) => (
                  <motion.span key={p.key} className={`h-full ${p.swatch}`} initial={false} animate={{ width: `${c.mix[p.key]}%` }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }} />
                ))}
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-meta">Relative weight in a typical project</p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-lineDark bg-lineDark sm:grid-cols-3">
              {parts.map((p, n) => (
                <div key={p.key} className="flex flex-col gap-3 bg-ink2 p-4">
                  <span className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${p.swatch}`} aria-hidden="true" />
                    <span className="text-[14px] font-bold">{p.name}</span>
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={c.parts[p.key]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18, delay: n * 0.05 }}
                      className="text-[14px] leading-[1.5] text-onDark2"
                    >
                      {c.parts[p.key]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
