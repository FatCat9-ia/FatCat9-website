import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUp, FileText, Lock, Globe2, ShieldCheck, KeyRound, Scale, Link2, Sparkles, ExternalLink } from 'lucide-react';
import { accessModes, agentAbilities, agentSources, governance, knowledgeStatement } from '../content/pillars';
import { exampleQuestions, illustrativeAgent, type AgentAnswer, type EvidenceType, type KnowledgeAgent } from '../lib/agent';
import { IllustrativeTag, Kicker, Statement } from '../components/ui';

const evidenceStyle: Record<EvidenceType, string> = {
  'Quantitative survey': 'bg-signal text-white',
  'Qualitative study': 'border border-signal text-signal',
  'Social listening': 'border border-onDark2 text-onDark2',
  'Report / document': 'border border-dashed border-meta text-onDark2',
  Dataset: 'bg-ink3 text-onDark2',
};

function EvidenceBadge({ type }: { type: EvidenceType }) {
  return <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] ${evidenceStyle[type]}`}>{type}</span>;
}

function useTypewriter(lines: string[], active: boolean) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState(reduce ? lines[0] : '');
  useEffect(() => {
    if (reduce || !active) {
      setText(lines[idx]);
      return;
    }
    let i = 0;
    setText('');
    const full = lines[idx];
    const type = setInterval(() => {
      i += 1;
      setText(full.slice(0, i));
      if (i >= full.length) clearInterval(type);
    }, 28);
    const next = setTimeout(() => setIdx((n) => (n + 1) % lines.length), full.length * 28 + 2600);
    return () => {
      clearInterval(type);
      clearTimeout(next);
    };
  }, [idx, reduce, active, lines]);
  return text;
}

export function KnowledgeMain() {
  const typed = useTypewriter(exampleQuestions, true);
  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-hidden rounded-2xl border border-lineDark bg-ink2">
        <div className="flex items-center justify-between gap-3 border-b border-lineDark px-5 py-3">
          <span className="flex items-center gap-2 text-[14px] font-bold">
            <Sparkles className="h-4 w-4 text-signal" aria-hidden="true" />
            Research Intelligence Agent
          </span>
          <IllustrativeTag dark>Product concept</IllustrativeTag>
        </div>
        <div className="grid md:grid-cols-[200px_1fr]">
          <div className="hidden flex-col gap-1 border-r border-lineDark p-4 md:flex">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-meta">Connected knowledge</p>
            {agentSources.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="flex items-center gap-2 py-1 text-[13px] text-onDark2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                {s}
              </motion.span>
            ))}
          </div>
          <div className="flex min-w-0 flex-col gap-4 p-5">
            <div className="flex flex-wrap gap-1.5 md:hidden">
              {agentSources.map((s) => (
                <span key={s} className="rounded-full border border-lineDark px-2.5 py-0.5 text-[12px] text-onDark2">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex min-h-[64px] items-start gap-3 rounded-2xl border border-lineDark bg-ink px-4 py-3.5">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal">
                <ArrowUp className="h-4 w-4 text-white" aria-hidden="true" />
              </span>
              <p className="text-[17px] leading-[1.4] text-onDark" aria-live="off">
                {typed}
                <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-signal align-baseline" aria-hidden="true" />
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl bg-ink px-4 py-4" aria-hidden="true">
              <div className="h-3 w-11/12 rounded-full bg-ink3" />
              <div className="h-3 w-8/12 rounded-full bg-ink3" />
              <div className="mt-2 flex items-center gap-2">
                <span className="h-5 w-24 rounded-full bg-signal/80" />
                <span className="h-3 flex-1 rounded-full bg-ink3" />
              </div>
              <div className="flex items-center gap-2">
                <span className="h-5 w-24 rounded-full border border-signal" />
                <span className="h-3 w-7/12 rounded-full bg-ink3" />
              </div>
              <div className="mt-1 flex gap-2">
                {['S1', 'S2', 'S3'].map((s) => (
                  <span key={s} className="rounded-md border border-lineDark px-2 py-0.5 font-mono text-[11px] text-meta">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-lineDark bg-lineDark sm:grid-cols-4">
        {agentAbilities.map((a) => (
          <li key={a} className="bg-ink px-4 py-3 text-[15px] font-medium">
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function KnowledgeViewA({ agent = illustrativeAgent }: { agent?: KnowledgeAgent }) {
  const [q, setQ] = useState(exampleQuestions[0]);
  const [answer, setAnswer] = useState<AgentAnswer | null>(null);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  const ask = async (question: string) => {
    setQ(question);
    setAnswer(await agent.ask(question));
  };
  useEffect(() => {
    void ask(exampleQuestions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) {
      setError('Type a question first.');
      return;
    }
    void ask(draft.trim());
    setDraft('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-xl border border-dashed border-meta/70 px-4 py-3 text-[14px] text-onDark2 sm:flex-row sm:items-center">
        <IllustrativeTag dark>Prototype</IllustrativeTag>
        <span>Answers show the structure of a response only. Nothing here is connected to real studies or client data.</span>
      </div>

      <div className="flex flex-col gap-2" role="group" aria-label="Example questions">
        <Kicker dark>Try an example question</Kicker>
        <div className="grid gap-2 md:grid-cols-2">
          {exampleQuestions.map((eq) => (
            <button
              key={eq}
              type="button"
              onClick={() => void ask(eq)}
              aria-pressed={q === eq}
              className={`rounded-xl border px-4 py-3 text-left text-[15px] leading-[1.4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
                q === eq ? 'border-signal bg-ink2 text-onDark' : 'border-lineDark text-onDark2 hover:border-onDark2'
              }`}
            >
              “{eq}”
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="mt-1 flex flex-col gap-1">
          <label htmlFor="agent-q" className="sr-only">
            Ask your own question
          </label>
          <div className="flex gap-2">
            <input
              id="agent-q"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                setError('');
              }}
              placeholder="Ask your own question"
              className="min-w-0 flex-1 rounded-full border border-lineDark bg-ink2 px-4 py-2.5 text-[15px] text-onDark placeholder:text-meta focus:border-signal focus:outline-none"
            />
            <button type="submit" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-signal text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-onDark" aria-label="Ask">
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          {error && <p className="px-4 text-[13px] text-signal">{error}</p>}
        </form>
      </div>

      <AnimatePresence mode="wait">
        {answer && (
          <motion.article
            key={q}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col gap-6 rounded-2xl border border-lineDark bg-ink2 p-5 sm:p-7"
            aria-live="polite"
          >
            <header className="flex flex-col gap-2">
              <Kicker dark>Question</Kicker>
              <p className="text-[20px] font-medium leading-[1.35]">“{q}”</p>
            </header>

            <section className="flex flex-col gap-2">
              <Kicker dark>Concise summary</Kicker>
              <p className="max-w-[48rem] text-[17px] leading-[1.6] text-onDark2">{answer.summary}</p>
            </section>

            {answer.findings.length > 0 && (
              <section className="flex flex-col gap-2">
                <Kicker dark>Supporting findings, by evidence type</Kicker>
                <ul className="flex flex-col">
                  {answer.findings.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.07 }}
                      className="flex flex-col gap-2 border-t border-lineDark py-3 sm:flex-row sm:items-center"
                    >
                      <EvidenceBadge type={f.evidence} />
                      <span className="flex-1 text-[15px] text-onDark">{f.text}</span>
                      <span className="font-mono text-[12px] text-signal">[{f.sourceId}]</span>
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {answer.scope.length > 0 && (
                <section className="flex flex-col gap-2">
                  <Kicker dark>Relevant countries or studies</Kicker>
                  <div className="flex flex-wrap gap-1.5">
                    {answer.scope.map((s) => (
                      <span key={s} className="rounded-full border border-lineDark px-3 py-1 text-[13px] text-onDark2">
                        {s}
                      </span>
                    ))}
                  </div>
                </section>
              )}
              {answer.chart && (
                <section className="flex flex-col gap-2">
                  <Kicker dark>Chart, where it applies</Kicker>
                  <div className="flex h-24 items-end gap-2 rounded-xl border border-lineDark p-3" aria-label={answer.chart.label}>
                    {answer.chart.bars.map((b, i) => (
                      <div key={b.label} className="flex flex-1 flex-col items-center gap-1">
                        <motion.div
                          className="w-full rounded-t-sm border border-dashed border-meta bg-ink3"
                          initial={{ height: 0 }}
                          animate={{ height: `${b.value * 56}px` }}
                          transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
                        />
                        <span className="font-mono text-[10.5px] text-meta">{b.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[12px] text-meta">{answer.chart.label}</p>
                </section>
              )}
            </div>

            {answer.sources.length > 0 && (
              <section className="flex flex-col gap-2">
                <Kicker dark>Citations and links to original research</Kicker>
                <ul className="grid gap-2 md:grid-cols-2">
                  {answer.sources.map((s) => (
                    <li key={s.id} className="flex items-start gap-3 rounded-xl border border-lineDark p-3">
                      <span className="font-mono text-[12px] text-signal">{s.id}</span>
                      <span className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="text-[14px] text-onDark">{s.title}</span>
                        <span className="font-mono text-[11px] text-meta">{s.meta}</span>
                        <span className="flex flex-wrap items-center gap-2">
                          <EvidenceBadge type={s.evidence} />
                          <span className="inline-flex items-center gap-1 text-[12px] text-meta">
                            <ExternalLink className="h-3 w-3" aria-hidden="true" /> Open original (once connected)
                          </span>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {answer.comparabilityNote && (
              <p className="flex items-start gap-2 rounded-xl bg-ink px-4 py-3 text-[14px] leading-[1.5] text-onDark2">
                <Scale className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                {answer.comparabilityNote}
              </p>
            )}
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}

const govIcons = [Lock, KeyRound, ShieldCheck, Link2, Scale];

export function KnowledgeViewB() {
  const [mode, setMode] = useState<'internal' | 'external'>('internal');
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 md:grid-cols-2">
        {accessModes.map((m) => {
          const on = mode === m.key;
          const Icon = m.key === 'internal' ? Lock : Globe2;
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setMode(m.key)}
              aria-pressed={on}
              className={`flex flex-col gap-4 rounded-2xl border p-6 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
                on ? 'border-signal bg-ink2' : 'border-lineDark hover:border-onDark2'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${on ? 'bg-signal text-white' : 'border border-lineDark text-onDark2'}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[21px] font-bold">{m.name}</span>
                  <span className="text-[14px] text-onDark2">{m.audience}</span>
                </span>
              </span>
              <ul className="flex flex-col">
                {m.features.map((f) => (
                  <li key={f} className={`flex items-center gap-3 border-t border-lineDark py-2.5 text-[15px] ${on ? 'text-onDark' : 'text-onDark2'}`}>
                    <FileText className={`h-4 w-4 shrink-0 ${on ? 'text-signal' : 'text-meta'}`} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        <Kicker dark>Built in from the start</Kicker>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-lineDark bg-lineDark sm:grid-cols-2 lg:grid-cols-5">
          {governance.map((g, i) => {
            const Icon = govIcons[i];
            return (
              <li key={g.name} className="flex flex-col gap-2 bg-ink p-5">
                <Icon className="h-5 w-5 text-signal" aria-hidden="true" />
                <span className="text-[16px] font-bold">{g.name}</span>
                <span className="text-[14px] leading-[1.5] text-onDark2">{g.text}</span>
              </li>
            );
          })}
        </ul>
        <p className="text-[14px] text-onDark2">
          The agent keeps quantitative survey evidence, qualitative findings and other research labeled separately, and does not combine studies with incompatible samples or methods.
        </p>
      </div>
      <Statement dark>{knowledgeStatement}</Statement>
    </div>
  );
}
