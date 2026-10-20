import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, LayoutGrid, X } from 'lucide-react';
import { registry } from '../pillars';
import { stops, pillarStop, navIndexOf } from '../lib/stops';
import { SectionNav } from './ChapterMenu';
import { interludes } from '../content/pillars';
import { Wordmark } from './ui';

/** Scales a slide down (to 60% at most) so it fits the screen without scrolling; scrolls beyond that. */
function FitStage({ children, k }: { children: ReactNode; k: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const measure = () => {
      if (!outer.current || !inner.current) return;
      const need = inner.current.offsetHeight;
      const avail = outer.current.clientHeight;
      const s = window.innerWidth < 768 ? 1 : Math.max(0.6, Math.min(1, avail / need));
      setScale(s);
      setHeight(need * s);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outer.current) ro.observe(outer.current);
    if (inner.current) ro.observe(inner.current);
    return () => ro.disconnect();
  }, [k]);

  return (
    <div ref={outer} className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
      <div className="flex min-h-full items-center">
        <div className="w-full" style={{ height }}>
          <div ref={inner} style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  stop: number;
  sub: 0 | 1 | 2;
  setPos: (stop: number, sub?: 0 | 1 | 2) => void;
  onExit: () => void;
  renderStop: (i: number) => ReactNode;
}

const sidePad = { paddingLeft: 'max(24px, env(safe-area-inset-left, 0px))', paddingRight: 'max(24px, env(safe-area-inset-right, 0px))' };

export function Presentation({ stop, sub, setPos, onExit, renderStop }: Props) {
  const [grid, setGrid] = useState(false);
  const s = stops[stop];
  const isPillar = s.kind === 'pillar';
  const pillar = isPillar ? registry[s.pillar] : null;
  const dark = s.dark;

  const next = () => (stop < stops.length - 1 ? setPos(stop + 1) : undefined);
  const prev = () => (stop > 0 ? setPos(stop - 1) : undefined);
  const down = () => (isPillar && sub < 2 ? setPos(stop, (sub + 1) as 1 | 2) : next());
  const up = () => (isPillar && sub > 0 ? setPos(stop, (sub - 1) as 0 | 1) : prev());

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (grid) {
        if (e.key === 'Escape' || e.key.toLowerCase() === 'o') setGrid(false);
        return;
      }
      const k = e.key;
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') {
        e.preventDefault();
        next();
      } else if (k === 'ArrowLeft' || k === 'PageUp') {
        e.preventDefault();
        prev();
      } else if (k === 'ArrowDown') {
        e.preventDefault();
        down();
      } else if (k === 'ArrowUp') {
        e.preventDefault();
        up();
      } else if (k === 'Home') setPos(0);
      else if (k === 'End') setPos(stops.length - 1);
      else if (k.toLowerCase() === 'o') setGrid(true);
      else if (k === 'Escape') onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  let content: ReactNode;
  if (pillar && sub > 0) {
    const View = pillar.Views[sub - 1];
    const item = pillar.meta.explore[sub - 1];
    content = (
      <div className={`flex flex-col gap-8 ${dark ? 'text-onDark' : 'text-ink'}`}>
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[13px] tracking-[0.14em] text-signal">
            {pillar.meta.number} · {item.code}
          </span>
          <h2 className="max-w-[24ch] text-[40px] font-bold leading-[1.04] tracking-[-0.025em] lg:text-[52px]" style={{ textWrap: 'balance' } as CSSProperties}>
            {item.title}
          </h2>
        </div>
        <View />
      </div>
    );
  } else {
    content = renderStop(stop);
  }

  const muted = dark ? 'text-meta' : 'text-muted';
  const border = dark ? 'border-lineDark' : 'border-line';

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col transition-colors duration-300 ${s.band} ${dark ? 'text-onDark' : 'text-ink'}`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Top bar */}
      <div className="flex h-16 shrink-0 items-center justify-between gap-3" style={sidePad}>
        <span className="hidden shrink-0 xl:block">
          <Wordmark size="sm" className={dark ? 'text-onDark' : 'text-ink'} />
        </span>
        <SectionNav dark={dark} current={navIndexOf(stop)} onHome={() => setPos(0)} onPillar={(p) => setPos(pillarStop(p))} />
        <span className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setGrid(true)}
            className={`flex h-9 items-center gap-2 rounded-full border px-3 text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${border}`}
          >
            <LayoutGrid className="h-4 w-4 text-signal" aria-hidden="true" />
            <span className="hidden sm:inline">All slides</span>
            <kbd className={`hidden font-mono text-[11px] sm:inline ${muted}`}>O</kbd>
          </button>
          <button
            type="button"
            onClick={onExit}
            className={`flex h-9 items-center gap-2 rounded-full border px-3 text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${border}`}
          >
            <X className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Exit</span>
            <kbd className={`hidden font-mono text-[11px] sm:inline ${muted}`}>Esc</kbd>
          </button>
        </span>
      </div>

      {/* Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${stop}-${sub}`}
          className="flex min-h-0 flex-1 flex-col"
          initial={{ opacity: 0, x: sub === 0 ? 24 : 0, y: sub === 0 ? 0 : 24 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <FitStage k={`${stop}-${sub}`}>
            <div className="mx-auto w-full max-w-page py-6" style={sidePad}>
              {content}
            </div>
          </FitStage>
        </motion.div>
      </AnimatePresence>

      {/* Bottom bar */}
      <div className={`flex h-16 shrink-0 items-center justify-between gap-3 border-t ${border}`} style={sidePad}>
        <button type="button" onClick={prev} disabled={stop === 0} aria-label="Previous slide" className={`flex h-10 w-10 items-center justify-center rounded-full border disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${border}`}>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex min-w-0 items-center gap-4">
          <ol className="hidden items-center gap-1.5 sm:flex" aria-label="Slides">
            {stops.map((st, i) => (
              <li key={st.id}>
                <button type="button" onClick={() => setPos(i)} aria-label={st.label} aria-current={stop === i ? 'step' : undefined} title={st.label} className="flex h-6 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal">
                  <motion.span
                    className="block h-1.5 rounded-full"
                    animate={{ width: stop === i ? 24 : st.kind === 'say' ? 4 : 8, backgroundColor: stop === i ? 'rgb(var(--c-signal))' : dark ? 'rgb(var(--c-lineDark))' : 'rgb(var(--c-ink) / 0.18)' }}
                    transition={{ duration: 0.25 }}
                  />
                </button>
              </li>
            ))}
          </ol>
          {pillar && (
            <div className={`flex items-center gap-1 rounded-full border p-1 ${border}`} role="group" aria-label="Depth">
              <button type="button" onClick={up} disabled={sub === 0} aria-label="Up one level" className="flex h-7 w-7 items-center justify-center rounded-full disabled:opacity-30">
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              </button>
              {(['Main', pillar.meta.explore[0].code, pillar.meta.explore[1].code] as const).map((lbl, i) => (
                <button
                  key={lbl}
                  type="button"
                  onClick={() => setPos(stop, i as 0 | 1 | 2)}
                  aria-current={sub === i ? 'step' : undefined}
                  className={`rounded-full px-2.5 py-1 font-mono text-[12px] transition-colors ${sub === i ? 'bg-signal text-white' : `${muted} hover:text-signal`}`}
                >
                  {lbl}
                </button>
              ))}
              <button type="button" onClick={down} disabled={sub === 2} aria-label="Down one level" className="flex h-7 w-7 items-center justify-center rounded-full disabled:opacity-30">
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <button type="button" onClick={next} disabled={stop === stops.length - 1} aria-label="Next slide" className="flex h-10 w-10 items-center justify-center rounded-full bg-signal text-white disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-signal">
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* All slides grid */}
      <AnimatePresence>
        {grid && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col bg-ink text-onDark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-label="All slides"
          >
            <div className="flex h-14 shrink-0 items-center justify-between" style={sidePad}>
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-meta">All slides · → next chapter · ↓ deeper view</span>
              <button type="button" onClick={() => setGrid(false)} className="flex h-9 items-center gap-2 rounded-full border border-lineDark px-3 text-[13px] font-medium" autoFocus>
                <X className="h-4 w-4" aria-hidden="true" /> Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pb-10" style={sidePad}>
              <div className="mx-auto flex max-w-page flex-col gap-3">
                <GridTile label="Overview" sub="Human understanding through data" active={stop === 0} onClick={() => { setPos(0); setGrid(false); }} />
                {registry.map((r, p) => {
                  const ps = pillarStop(p);
                  const sayIndex = stops.findIndex((x) => x.kind === 'say' && x.pillar === p);
                  return (
                    <div key={r.meta.id} className="grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
                      <GridTile label={`${r.meta.number} ${r.meta.navLabel}`} sub={r.meta.title} active={stop === ps && sub === 0} strong onClick={() => { setPos(ps, 0); setGrid(false); }} />
                      {r.meta.explore.map((v, vi) => (
                        <GridTile key={v.code} label={v.code} sub={v.title} active={stop === ps && sub === vi + 1} onClick={() => { setPos(ps, (vi + 1) as 1 | 2); setGrid(false); }} />
                      ))}
                      {sayIndex >= 0 ? (
                        <GridTile label="Key idea" sub={interludes[r.meta.id].text} active={stop === sayIndex} onClick={() => { setPos(sayIndex); setGrid(false); }} />
                      ) : (
                        <span className="hidden sm:block" />
                      )}
                    </div>
                  );
                })}
                <GridTile label="Close" sub="Understand. Connect. Activate." active={stop === stops.length - 1} onClick={() => { setPos(stops.length - 1); setGrid(false); }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GridTile({ label, sub, active, strong, onClick }: { label: string; sub: string; active: boolean; strong?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[84px] flex-col justify-between gap-2 rounded-xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
        active ? 'border-signal bg-ink2' : 'border-lineDark hover:border-onDark2'
      }`}
    >
      <span className={`font-mono text-[12px] ${strong || active ? 'text-signal' : 'text-meta'}`}>{label}</span>
      <span className={`line-clamp-2 text-[14px] leading-snug ${strong ? 'font-bold text-onDark' : 'text-onDark2'}`}>{sub}</span>
    </button>
  );
}
