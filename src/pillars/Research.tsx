import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Plus } from 'lucide-react';
import { glossary, questionClosing, questionToMethod, researchCategories, researchFamilies } from '../content/pillars';
import { Kicker, Statement } from '../components/ui';

export function ResearchMain() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {researchCategories.map((c, i) => {
        const isOpen = open === i;
        return (
          <li key={c.name} className={`${isOpen ? 'bg-blush/50' : 'bg-surface'} transition-colors`}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-signal"
            >
              <span className="flex flex-col gap-1">
                <span className="text-[18px] font-bold leading-tight">{c.name}</span>
                <span className="text-[15px] leading-[1.45] text-muted">{c.short}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="font-mono text-[11px] text-muted tabular-nums">{c.items.length}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-signal">
                  <Plus className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-1.5 px-5 pb-5">
                    {c.items.map((it) => (
                      <span key={it} className="rounded-full border border-signal/40 bg-surface px-3 py-1 text-[13px]">
                        {it}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

export function ResearchViewA() {
  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-[46rem] text-[19px] leading-[1.6] text-muted">
        Traditional and digital methods under one roof, so each question gets the method it needs rather than the one a vendor happens to offer.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {researchFamilies.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[18px] font-bold leading-tight">{f.name}</h3>
              <span className="font-mono text-[11px] text-muted tabular-nums">{String(f.items.length).padStart(2, '0')}</span>
            </div>
            <ul className="flex flex-col">
              {f.items.map((it) => (
                <li key={it} className="flex items-center justify-between gap-2 border-t border-line py-2 text-[15px]">
                  {glossary[it] ? (
                    <abbr title={glossary[it]} className="cursor-help no-underline">
                      {it} <span className="text-[12px] text-muted">· {glossary[it]}</span>
                    </abbr>
                  ) : (
                    it
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ResearchViewB() {
  const [i, setI] = useState(0);
  const m = questionToMethod[i];
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col" role="tablist" aria-label="Research questions" aria-orientation="vertical">
          <Kicker>Start with the question</Kicker>
          <div className="mt-3 flex flex-col">
            {questionToMethod.map((row, idx) => (
              <button
                key={row.q}
                role="tab"
                aria-selected={i === idx}
                onClick={() => setI(idx)}
                onMouseEnter={() => setI(idx)}
                className={`group flex items-center justify-between gap-4 border-t border-line py-3.5 text-left text-[20px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal sm:text-[22px] ${
                  i === idx ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                <span>“{row.q}”</span>
                <ArrowRight className={`h-5 w-5 shrink-0 transition-all ${i === idx ? 'translate-x-0 text-signal' : '-translate-x-1 opacity-0'}`} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-ink p-7 text-onDark" role="tabpanel" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={m.method}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="flex h-full flex-col gap-5"
            >
              <Kicker dark>The method</Kicker>
              <p className="text-[30px] font-bold leading-[1.1] text-signal sm:text-[36px]">{m.method}</p>
              <p className="text-[17px] leading-[1.55] text-onDark2">{m.gives}</p>
              <div className="flex flex-wrap gap-2">
                {m.tools.map((t) => (
                  <span key={t} className="rounded-full border border-lineDark bg-ink2 px-3 py-1 text-[13px]">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-auto font-mono text-[12px] uppercase tracking-[0.12em] text-meta">
                Evidence type · <span className="text-onDark">{m.evidence}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Statement>{questionClosing}</Statement>
    </div>
  );
}
