import { useEffect, useRef, type CSSProperties } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, X } from 'lucide-react';
import { registry } from '../pillars';
import { SectionNav } from './ChapterMenu';
import { CopyLink } from './CopyLink';

interface Props {
  pillar: number;
  view: 0 | 1;
  onChange: (pillar: number, view: 0 | 1) => void;
  onClose: () => void;
  onHome: () => void;
  onPillar: (pillarIndex: number) => void;
}

const gutter = { paddingLeft: 'max(16px, env(safe-area-inset-left, 0px))', paddingRight: 'max(16px, env(safe-area-inset-right, 0px))' };

/** Level 2: two deeper views per pillar, opened over the main story without leaving it. */
export function ExploreSheet({ pillar, view, onChange, onClose, onHome, onPillar }: Props) {
  const { meta, Views } = registry[pillar];
  const View = Views[view];
  const dark = !!meta.dark;
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [pillar, view]);

  const next = pillar < registry.length - 1 ? pillar + 1 : null;
  const nextLink = view === 0 ? { p: pillar, v: 1 as const } : next !== null ? { p: next, v: 0 as const } : null;
  const token = `${meta.id}-${view === 0 ? 'a' : 'b'}`;

  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <button type="button" aria-label="Back to the story" className="absolute inset-0 bg-ink/55" onClick={onClose} tabIndex={-1} />
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-label={`${meta.number} ${meta.navLabel}: explore more`}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
        className={`relative flex h-[calc(100%-max(24px,env(safe-area-inset-top,0px)))] flex-col overflow-hidden rounded-t-[24px] ${dark ? 'bg-ink text-onDark' : 'bg-paper text-ink'}`}
      >
        <header className={`border-b ${dark ? 'border-lineDark' : 'border-line'}`}>
          <div className="mx-auto flex max-w-page flex-wrap items-center gap-2 py-3" style={gutter}>
            <SectionNav dark={dark} current={pillar} onHome={onHome} onPillar={onPillar} />
            <span className={`hidden h-5 w-px sm:block ${dark ? 'bg-lineDark' : 'bg-line'}`} aria-hidden="true" />
            <div className={`flex rounded-full border p-1 ${dark ? 'border-lineDark' : 'border-line'}`} role="tablist" aria-label="Views">
              {meta.explore.map((v, i) => (
                <button
                  key={v.code}
                  role="tab"
                  aria-selected={view === i}
                  onClick={() => onChange(pillar, i as 0 | 1)}
                  className={`rounded-full px-3 py-1 font-mono text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
                    view === i ? (dark ? 'bg-signal text-white' : 'bg-ink text-onDark') : dark ? 'text-onDark2 hover:text-onDark' : 'text-muted hover:text-ink'
                  }`}
                >
                  {v.code}
                </button>
              ))}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className={`ml-auto flex h-9 items-center gap-2 rounded-full px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${dark ? 'bg-onDark text-ink' : 'bg-ink text-onDark'}`}
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Back to the story</span>
            </button>
          </div>
        </header>

        <div ref={bodyRef} className="flex-1 overflow-y-auto overscroll-contain">
          <div className="mx-auto flex max-w-page flex-col gap-8 pt-10" style={{ ...gutter, paddingBottom: 'calc(64px + env(safe-area-inset-bottom, 0px))' }}>
            <motion.div key={`${pillar}-${view}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[13px] tracking-[0.14em] text-signal">{meta.explore[view].code}</span>
                <h2 className="max-w-[22ch] text-[34px] font-bold leading-[1.05] tracking-[-0.025em] sm:text-[48px]" style={{ textWrap: 'balance' } as CSSProperties}>
                  {meta.explore[view].title}
                </h2>
              </div>
              <View />
            </motion.div>

            <div className={`mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-6 ${dark ? 'border-lineDark' : 'border-line'}`}>
              <CopyLink token={token} dark={dark} />
              {nextLink && (
                <button type="button" onClick={() => onChange(nextLink.p, nextLink.v)} className="group flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal">
                  <span className="flex flex-col items-end">
                    <span className={`font-mono text-[11px] uppercase tracking-[0.14em] ${dark ? 'text-meta' : 'text-muted'}`}>Up next · {registry[nextLink.p].meta.explore[nextLink.v].code}</span>
                    <span className="text-right text-[20px] font-bold leading-tight group-hover:text-signal">{registry[nextLink.p].meta.explore[nextLink.v].title}</span>
                  </span>
                  <ChevronRight className="h-6 w-6 shrink-0 text-signal transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
