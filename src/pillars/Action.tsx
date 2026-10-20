import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Map, Users, Presentation, LineChart, Layers } from 'lucide-react';
import { finale, journey, moreCapabilities, solutions } from '../content/pillars';
import { client } from '../config/client';
import { Kicker, Statement } from '../components/ui';

const icons = [BookOpen, Map, Users, Presentation, LineChart, Layers];

export function ActionMain() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {solutions.map((s, i) => {
        const Icon = icons[i];
        return (
          <motion.li key={s.name} whileHover="hover" initial="rest" animate="rest" className="group flex flex-col gap-3 bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="text-[17px] font-bold leading-tight">{s.name}</h3>
            </div>
            <p className="text-[14px] leading-[1.5] text-muted">{s.text}</p>
            <p className="mt-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-signalInk">
              <motion.span variants={{ rest: { x: 0 }, hover: { x: 4 } }} transition={{ duration: 0.15 }}>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </motion.span>
              {s.becomes}
            </p>
          </motion.li>
        );
      })}
    </ul>
  );
}

export function ActionViewA() {
  return (
    <div className="flex flex-col gap-10">
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="px-5 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-muted">Research turns into</th>
              <th className="px-5 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-muted">What teams get</th>
              <th className="px-5 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-muted">Result</th>
            </tr>
          </thead>
          <tbody>
            {solutions.map((s) => (
              <tr key={s.name} className="border-b border-line last:border-0">
                <td className="px-5 py-3.5 text-[16px] font-bold">{s.name}</td>
                <td className="px-5 py-3.5 text-[14px] text-muted">{s.text}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-[14px] font-medium text-signalInk">{s.becomes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4">
        <Kicker>Also part of the work</Kicker>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {moreCapabilities.map((c) => (
            <li key={c.name} className="flex flex-col gap-2 border-t-2 border-ink pt-4">
              <span className="text-[17px] font-bold">{c.name}</span>
              <span className="text-[15px] leading-[1.5] text-muted">{c.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ActionViewB() {
  const [step, setStep] = useState(0);
  const ex = client.processExample;
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <ol className="relative grid grid-cols-5 gap-1" aria-label="From research to action">
          <span className="absolute left-[10%] right-[10%] top-[15px] h-px bg-line" aria-hidden="true" />
          <motion.span
            className="absolute left-[10%] top-[15px] h-px bg-signal"
            initial={false}
            animate={{ width: `${(step / (journey.length - 1)) * 80}%` }}
            transition={{ duration: 0.35 }}
            aria-hidden="true"
          />
          {journey.map((j, i) => (
            <li key={j.step} className="relative flex flex-col items-center">
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={step === i ? 'step' : undefined}
                className="flex flex-col items-center gap-2 focus-visible:outline-none"
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[12px] tabular-nums transition-colors ${
                    i <= step ? 'border-signal bg-signal text-white' : 'border-line bg-paper text-muted'
                  } ${step === i ? 'ring-4 ring-blush' : ''}`}
                >
                  {i + 1}
                </span>
                <span className={`text-center text-[12px] font-medium leading-tight sm:text-[15px] ${step === i ? 'text-ink' : 'text-muted'}`}>{j.step}</span>
              </button>
            </li>
          ))}
        </ol>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-[26px] font-bold">{journey[step].step}</span>
            <span className="text-[17px] text-muted">{journey[step].text}</span>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="rounded-full border border-line px-4 py-2 text-[14px] font-medium hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            Previous step
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(journey.length - 1, s + 1))}
            className="rounded-full bg-ink px-4 py-2 text-[14px] font-medium text-onDark hover:bg-ink2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            Next step
          </button>
        </div>
      </div>

      {ex && (
        <div className="grid gap-6 rounded-2xl bg-ink p-7 text-onDark md:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-2">
            <Kicker dark>{ex.title}</Kicker>
            <p className="text-[15px] text-meta">{ex.note}</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[19px] leading-[1.5]">{ex.description}</p>
            <div className="flex flex-wrap items-center gap-2 text-[13px]">
              {ex.chain.map((t, i, arr) => (
                <span key={t} className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 ${i === arr.length - 1 || i === arr.length - 2 ? 'bg-signal text-white' : 'border border-lineDark'}`}>{t}</span>
                  {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-meta" aria-hidden="true" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      <Statement>
        {finale.statement} <span className="text-muted">{finale.line}</span>
      </Statement>
    </div>
  );
}
