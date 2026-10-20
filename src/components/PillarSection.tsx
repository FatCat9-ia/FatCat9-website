import type { CSSProperties, ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Cpu, SlidersHorizontal, Rows3, MessageCircleQuestion, Workflow, LineChart, Sparkles, ShieldCheck, Layers, Route } from 'lucide-react';
import type { ExploreItem, PillarMeta } from '../content/pillars';
import { CopyLink } from './CopyLink';

const exploreIcons: Record<ExploreItem['icon'], typeof Cpu> = {
  cpu: Cpu,
  sliders: SlidersHorizontal,
  rows: Rows3,
  question: MessageCircleQuestion,
  workflow: Workflow,
  chart: LineChart,
  sparkles: Sparkles,
  shield: ShieldCheck,
  layers: Layers,
  route: Route,
};

interface Props {
  meta: PillarMeta;
  onExplore: (view: 0 | 1) => void;
  children: ReactNode;
  presenting?: boolean;
  next?: { label: string; onClick: () => void };
}

function ExploreCards({ meta, onExplore, columns }: { meta: PillarMeta; onExplore: (v: 0 | 1) => void; columns: boolean }) {
  const dark = !!meta.dark;
  return (
    <div className="flex flex-col gap-3" role="group" aria-label={`Explore more about ${meta.navLabel}`}>
      <p className={`font-mono text-[12px] uppercase tracking-[0.14em] ${dark ? 'text-meta' : 'text-muted'}`}>Explore more</p>
      <div className={`grid gap-3 ${columns ? 'md:grid-cols-2' : ''}`}>
        {meta.explore.map((v, i) => {
          const Icon = exploreIcons[v.icon];
          return (
            <button
              key={v.code}
              type="button"
              onClick={() => onExplore(i as 0 | 1)}
              className={`group flex items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
                dark ? 'border-lineDark bg-ink2 hover:border-signal' : 'border-line bg-surface hover:border-signal hover:shadow-[0_10px_30px_rgba(20,20,24,0.08)]'
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  dark ? 'bg-ink3 text-signal group-hover:bg-signal group-hover:text-white' : 'bg-blush text-signalInk group-hover:bg-signal group-hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className={`font-mono text-[11px] ${dark ? 'text-meta' : 'text-muted'}`}>{v.code}</span>
                <span className="text-[16px] font-bold leading-tight">{v.title}</span>
                <span className={`text-[14px] leading-[1.45] ${dark ? 'text-onDark2' : 'text-muted'}`}>{v.teaser}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-signal transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Shared frame for a pillar. "split" puts the header beside the visual; "stacked" gives the visual the full width. */
export function PillarSection({ meta, onExplore, children, presenting, next }: Props) {
  const dark = !!meta.dark;
  const title = (
    <h2 className="text-[36px] font-bold leading-[1.03] tracking-[-0.03em] sm:text-[50px] lg:text-[58px]" style={{ textWrap: 'balance' } as CSSProperties}>
      {meta.title}
    </h2>
  );
  const number = (
    <span className={`font-mono text-[14px] tracking-[0.14em] text-signal ${dark ? '' : ''}`} aria-hidden="true">
      {meta.number} <span className={dark ? 'text-meta' : 'text-muted'}>/ 05</span>
    </span>
  );
  const intro = <p className={`max-w-[34rem] text-[17px] leading-[1.6] sm:text-[19px] ${dark ? 'text-onDark2' : 'text-muted'}`}>{meta.intro}</p>;

  return (
    <div className={`relative flex flex-col gap-12 ${dark ? 'text-onDark' : 'text-ink'}`}>
      {meta.layout === 'split' ? (
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
            {number}
            {title}
            {intro}
            <div className="mt-2">
              <ExploreCards meta={meta} onExplore={onExplore} columns={false} />
            </div>
          </div>
          <div className="min-w-0 lg:col-span-7">{children}</div>
        </div>
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="flex min-w-0 flex-col gap-5 lg:col-span-7">
              {number}
              {title}
            </div>
            <div className="min-w-0 lg:col-span-5">{intro}</div>
          </div>
          <div className="min-w-0">{children}</div>
          <ExploreCards meta={meta} onExplore={onExplore} columns />
        </>
      )}

      {!presenting && (
        <div className={`flex flex-wrap items-center justify-between gap-4 border-t pt-6 ${dark ? 'border-lineDark' : 'border-line'}`}>
          <CopyLink token={meta.id} dark={dark} />
          {next && (
            <button
              type="button"
              onClick={next.onClick}
              className="group flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              <span className="flex flex-col items-end">
                <span className={`font-mono text-[11px] uppercase tracking-[0.14em] ${dark ? 'text-meta' : 'text-muted'}`}>Next</span>
                <span className="text-[20px] font-bold leading-tight transition-colors group-hover:text-signal sm:text-[24px]">{next.label}</span>
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-signal text-white transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
