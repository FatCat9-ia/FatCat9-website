import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Check, BarChart3, Activity, Lightbulb, Database, Radio, Gauge } from 'lucide-react';
import { evidenceVsIntelligence, oneSync, oneSyncOutputs, oneSyncSources, trackingAreas } from '../content/pillars';
import { IllustrativeTag, Kicker } from '../components/ui';

function Connector({ direction }: { direction: 'in' | 'out' }) {
  // Three lines converging (in) or diverging (out) between the rows and the core.
  const xs = [16.67, 50, 83.33];
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="block h-10 w-full sm:h-14" aria-hidden="true">
      {xs.map((x) => (
        <path
          key={x}
          d={direction === 'in' ? `M ${x} 0 C ${x} 22, 50 18, 50 40` : `M 50 0 C 50 22, ${x} 18, ${x} 40`}
          fill="none"
          stroke="rgb(var(--c-signal))"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="flow-line"
        />
      ))}
    </svg>
  );
}

const inputIcons = [Database, Radio, Gauge];
const outputIcons = [BarChart3, Activity, Lightbulb];

export function DataMain() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setStep((s) => (s + 1) % oneSync.steps.length), 1400);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="mx-auto w-full max-w-[880px]">
      <div role="img" aria-label="Research data, digital signals and performance data flow into OneSync, which connects, cleans, harmonizes and analyzes them, producing dashboards, tracking and intelligence.">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {oneSync.inputs.map((t, i) => {
            const Icon = inputIcons[i];
            return (
              <div key={t} className="flex flex-col items-center gap-2 rounded-xl border border-line px-2 py-3 text-center">
                <Icon className="h-5 w-5 text-signalInk" aria-hidden="true" />
                <span className="text-[13px] font-medium leading-tight sm:text-[15px]">{t}</span>
              </div>
            );
          })}
        </div>
        <Connector direction="in" />
        <div className="rounded-xl bg-ink px-4 py-5 text-onDark sm:px-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[26px] font-bold tracking-[-0.02em] sm:text-[30px]">
              One<span className="text-signal">Sync</span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-meta">Data integration & intelligence</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {oneSync.steps.map((s, i) => (
              <motion.div
                key={s}
                initial={false}
                animate={{
                  backgroundColor: i === step ? 'rgb(var(--c-signal))' : 'rgb(var(--c-ink2))',
                  color: i === step ? '#ffffff' : 'rgb(var(--c-onDark2))',
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 rounded-lg border border-lineDark px-3 py-2 text-[14px] font-medium"
              >
                <span className="font-mono text-[11px] opacity-70">{String(i + 1).padStart(2, '0')}</span>
                {s}
              </motion.div>
            ))}
          </div>
        </div>
        <Connector direction="out" />
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {oneSync.outputs.map((t, i) => {
            const Icon = outputIcons[i];
            return (
              <div key={t} className="flex flex-col items-center gap-2 rounded-xl border border-signal/50 bg-blush/40 px-2 py-3 text-center">
                <Icon className="h-5 w-5 text-signalInk" aria-hidden="true" />
                <span className="text-[13px] font-bold leading-tight sm:text-[15px]">{t}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const kindOrder = ['Research', 'Digital', 'Performance'] as const;

export function DataViewA() {
  const [on, setOn] = useState<Set<number>>(() => new Set([0, 1, 4, 5]));
  const toggle = (i: number) =>
    setOn((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  const connected = oneSyncSources.filter((_, i) => on.has(i));
  const kinds = kindOrder.filter((k) => connected.some((s) => s.kind === k));

  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-[46rem] text-[19px] leading-[1.6] text-muted">
        Connect the sources you already have. OneSync cleans and harmonizes them so they can be read together, in one view.
      </p>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-3">
          <Kicker>Sources · tap to connect</Kicker>
          <ul className="flex flex-col gap-2">
            {oneSyncSources.map((s, i) => {
              const isOn = on.has(i);
              return (
                <li key={s.name}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isOn}
                    onClick={() => toggle(i)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
                      isOn ? 'border-ink bg-ink text-onDark' : 'border-line bg-surface hover:border-ink'
                    }`}
                  >
                    <span className="flex flex-col">
                      <span className="text-[15px] font-medium">{s.name}</span>
                      <span className={`font-mono text-[11px] uppercase tracking-[0.1em] ${isOn ? 'text-meta' : 'text-muted'}`}>{s.kind}</span>
                    </span>
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${isOn ? 'border-signal bg-signal text-white' : 'border-line'}`}>
                      {isOn && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <Kicker>One clear view</Kicker>
            <IllustrativeTag>Layout only, no data</IllustrativeTag>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4" aria-live="polite">
            <div className="flex items-center justify-between rounded-lg bg-paper px-3 py-2">
              <span className="text-[14px] font-bold">
                One<span className="text-signalInk">Sync</span> workspace
              </span>
              <span className="font-mono text-[12px] tabular-nums text-muted">
                {connected.length} of {oneSyncSources.length} sources
              </span>
            </div>
            <div className="grid min-h-[220px] gap-3 sm:grid-cols-2">
              <AnimatePresence>
                {kinds.length === 0 && (
                  <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-span-full self-center text-center text-[15px] text-muted">
                    Connect a source to start the view.
                  </motion.p>
                )}
                {kinds.map((k) => (
                  <motion.div
                    key={k}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.22 }}
                    className={`flex flex-col gap-3 rounded-xl border border-line p-3 ${k === 'Research' ? 'sm:col-span-2' : ''}`}
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{k}</span>
                    <svg viewBox="0 0 200 50" className="h-12 w-full" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M0 40 L200 40" stroke="rgb(var(--c-line))" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                      <path d="M0 34 C 40 30, 60 18, 100 22 S 160 12, 200 14" fill="none" stroke="rgb(var(--c-signal))" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="4 4" />
                    </svg>
                    <span className="text-[13px] text-muted">
                      {connected.filter((s) => s.kind === k).map((s) => s.name).join(' · ')}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {oneSyncOutputs.map((o) => (
              <span key={o} className="rounded-full border border-signal/50 px-3 py-1 text-[13px] font-medium">
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DataViewB() {
  const [i, setI] = useState(1);
  const a = trackingAreas[i];
  return (
    <div className="flex flex-col gap-8">
      <div className="grid overflow-hidden rounded-2xl border border-line md:grid-cols-2">
        <div className="flex flex-col gap-2 bg-surface p-6">
          <Kicker>{evidenceVsIntelligence.research.label}</Kicker>
          <p className="text-[22px] font-bold leading-[1.2]">{evidenceVsIntelligence.research.line}</p>
        </div>
        <div className="flex flex-col gap-2 bg-ink p-6 text-onDark">
          <Kicker dark>{evidenceVsIntelligence.data.label}</Kicker>
          <p className="text-[22px] font-bold leading-[1.2]">{evidenceVsIntelligence.data.line}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col" role="tablist" aria-label="Tracking and analytics areas" aria-orientation="vertical">
          {trackingAreas.map((t, idx) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={i === idx}
              onClick={() => setI(idx)}
              className={`flex items-center gap-3 border-t border-line py-3 text-left text-[17px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
                i === idx ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              <span className={`h-2 w-2 shrink-0 rounded-full ${i === idx ? 'bg-signal' : 'bg-line'}`} aria-hidden="true" />
              {t.name}
            </button>
          ))}
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div key={a.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="flex flex-col gap-5">
              <h3 className="text-[24px] font-bold leading-tight">{a.name}</h3>
              <div className="flex flex-wrap gap-2">
                {a.items.map((it) => (
                  <span key={it} className="rounded-full bg-paper px-3 py-1.5 text-[14px]">
                    {it}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-2 border-t border-line pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Over time</span>
                  <IllustrativeTag>Shape only</IllustrativeTag>
                </div>
                <svg viewBox="0 0 300 90" className="h-24 w-full" preserveAspectRatio="none" aria-hidden="true">
                  {[20, 45, 70].map((y) => (
                    <path key={y} d={`M0 ${y} H300`} stroke="rgb(var(--c-line))" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  ))}
                  <path d="M0 62 C 40 58, 70 40, 110 46 S 180 30, 220 34 S 270 22, 300 24" fill="none" stroke="rgb(var(--c-ink))" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  <path d="M0 72 C 50 70, 90 64, 130 60 S 210 58, 300 50" fill="none" stroke="rgb(var(--c-signal))" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
