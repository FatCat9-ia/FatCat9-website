import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { brand } from '../config/brand';
import { client } from '../config/client';
import { pillars, finale } from '../content/pillars';
import { CatMark, Eyebrow, Wordmark } from './ui';
import { ContactBlock } from './Contact';

export function Cover({ onGo, presenting }: { onGo: (id: string) => void; presenting?: boolean }) {
  return (
    <div className="relative flex flex-col gap-12 text-onDark">
      {/* Watermark: the cat mark, large and very soft, below the main title */}
      <CatMark
        className={`pointer-events-none absolute -right-[6%] h-auto text-onDark opacity-[0.07] ${
          presenting ? 'top-[18%] w-[min(560px,48vw)]' : 'top-[30%] w-[min(720px,92vw)] sm:top-[24%] lg:w-[min(720px,56vw)]'
        }`}
      />
      <div className="relative flex flex-col gap-7">
        <Eyebrow dark>{client.preparedFor ? `Prepared for ${client.preparedFor}` : 'Research · Technology · Human expertise'}</Eyebrow>
        <h1
          className={`max-w-[16ch] font-bold leading-[0.98] tracking-[-0.035em] ${presenting ? 'text-[64px] lg:text-[104px]' : 'text-[48px] sm:text-[72px] lg:text-[104px]'}`}
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          Human understanding <span className="text-signal">through data.</span>
        </h1>
        <p className="max-w-[36rem] text-[18px] leading-[1.6] text-onDark2 sm:text-[21px]">
          FatCat9 brings research, technology and human intelligence together, and turns knowledge into action.
        </p>
        <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-meta">{brand.philosophy}</p>
      </div>
      <nav aria-label="Chapters" className="relative">
        <ol className="grid sm:grid-cols-5">
          {pillars.map((p) => (
            <li key={p.id} className="border-t border-lineDark sm:border-l sm:first:border-l-0">
              <button
                type="button"
                onClick={() => onGo(p.id)}
                className="group flex h-full w-full items-center gap-3 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-signal sm:flex-col sm:items-start sm:px-4 sm:first:pl-0"
              >
                <span className="font-mono text-[12px] text-signal tabular-nums">{p.number}</span>
                <span className="text-[16px] font-bold leading-tight transition-colors group-hover:text-signal">{p.navLabel}</span>
                <ArrowDown className="ml-auto h-4 w-4 text-meta transition-transform group-hover:translate-y-0.5 group-hover:text-signal sm:ml-0 sm:mt-auto" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

export function Finale({ onRestart }: { onRestart: () => void }) {
  const words = finale.statement.split(' ');
  return (
    <div className="flex flex-col items-start gap-10 text-onDark">
      <Wordmark size="lg" className="text-onDark" />
      <h2 className="flex flex-wrap gap-x-5 text-[52px] font-bold leading-[1] tracking-[-0.035em] sm:text-[88px] lg:text-[120px]">
        {words.map((w, i) => (
          <motion.span
            key={w}
            initial={{ opacity: 0.2, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.35 }}
            className={i === words.length - 1 ? 'text-signal' : ''}
          >
            {w}
          </motion.span>
        ))}
      </h2>
      <p className="text-[20px] text-onDark2 sm:text-[24px]">{finale.line}</p>
      <button
        type="button"
        onClick={onRestart}
        className="rounded-full border border-lineDark px-5 py-2.5 text-[15px] font-medium hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
      >
        Back to the start
      </button>
      <div className="w-full">
        <ContactBlock />
      </div>
    </div>
  );
}
