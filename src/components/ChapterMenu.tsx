import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Home, LayoutGrid } from 'lucide-react';
import { pillars } from '../content/pillars';

interface MenuProps {
  dark?: boolean;
  current?: number; // pillar index (0-4) when inside a pillar
  onSelect: (pillarIndex: number) => void;
  align?: 'left' | 'right';
  direction?: 'down' | 'up';
  label?: ReactNode;
  hideIcon?: boolean;
}

/** Dropdown that jumps to any of the five pillars. Used in every view. */
export function ChapterMenu({ dark, current, onSelect, align = 'right', direction = 'down', label, hideIcon }: MenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex h-9 items-center gap-2 rounded-full border px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
          dark ? 'border-lineDark text-onDark hover:border-onDark2' : 'border-line bg-surface text-ink hover:border-ink'
        }`}
      >
        {!hideIcon && <LayoutGrid className="h-4 w-4 text-signal" aria-hidden="true" />}
        {label ?? <span className="hidden sm:inline">Chapters</span>}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: direction === 'down' ? -6 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction === 'down' ? -6 : 6 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-[70] w-[min(300px,calc(100vw-32px))] overflow-hidden rounded-2xl border p-1.5 shadow-[0_16px_40px_rgba(20,20,24,0.22)] ${
              align === 'right' ? 'right-0' : 'left-0'
            } ${direction === 'down' ? 'top-11' : 'bottom-11'} ${dark ? 'border-lineDark bg-ink2 text-onDark' : 'border-line bg-surface text-ink'}`}
          >
            {pillars.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onSelect(i);
                  }}
                  aria-current={current === i ? 'true' : undefined}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-signal ${
                    current === i ? (dark ? 'bg-ink3' : 'bg-blush/60') : dark ? 'hover:bg-ink3' : 'hover:bg-paper'
                  }`}
                >
                  <span className="w-6 font-mono text-[12px] text-signal tabular-nums">{p.number}</span>
                  {p.navLabel}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** "Back to start" button, shown in every view. */
export function HomeButton({ dark, onClick, compact = false }: { dark?: boolean; onClick: () => void; compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to the start"
      className={`flex h-9 items-center gap-2 rounded-full border px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
        dark ? 'border-lineDark text-onDark hover:border-onDark2' : 'border-line bg-surface text-ink hover:border-ink'
      }`}
    >
      <Home className="h-4 w-4" aria-hidden="true" />
      {!compact && <span className="hidden sm:inline">Back to start</span>}
    </button>
  );
}

const shortLabels = ['Approach', 'Research', 'Data', 'Knowledge', 'Action'];

/**
 * Persistent section navigation used in every view (story, Explore More, Present):
 * Overview (home) plus the five pillars. Collapses to a dropdown on narrow screens.
 */
export function SectionNav({
  dark,
  current,
  onHome,
  onPillar,
}: {
  dark?: boolean;
  current: number; // -1 overview, 0-4 pillars, 5 close
  onHome: () => void;
  onPillar: (pillarIndex: number) => void;
}) {
  const idle = dark ? 'text-onDark2 hover:text-onDark hover:bg-ink2' : 'text-muted hover:text-ink hover:bg-surface';
  const on = dark ? 'bg-ink3 text-onDark' : 'bg-surface text-ink shadow-[0_0_0_1px_rgb(var(--c-line))]';
  return (
    <nav aria-label="Sections" className="flex min-w-0 items-center gap-1">
      <button
        type="button"
        onClick={onHome}
        aria-current={current === -1 ? 'true' : undefined}
        title="Overview"
        className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${current === -1 ? on : idle}`}
      >
        <Home className="h-4 w-4" aria-hidden="true" />
        <span className="hidden xl:inline">Overview</span>
      </button>
      <span className={`mx-1 hidden h-5 w-px md:block ${dark ? 'bg-lineDark' : 'bg-line'}`} aria-hidden="true" />
      <ul className="hidden items-center gap-0.5 md:flex">
        {pillars.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onPillar(i)}
              aria-current={current === i ? 'true' : undefined}
              title={p.navLabel}
              className={`flex h-9 items-baseline gap-1.5 rounded-full px-2.5 pt-[9px] text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${current === i ? on : idle}`}
            >
              <span className={`font-mono text-[11px] ${current === i ? 'text-signal' : ''}`}>{p.number}</span>
              <span className="hidden lg:inline">{shortLabels[i]}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="md:hidden">
        <ChapterMenu dark={dark} current={current >= 0 && current < pillars.length ? current : undefined} onSelect={onPillar} align="left" />
      </div>
    </nav>
  );
}
