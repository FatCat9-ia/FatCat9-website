import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useScroll } from 'motion/react';
import { MonitorPlay } from 'lucide-react';
import { registry } from './pillars';
import { client } from './config/client';
import { brand } from './config/brand';
import { interludes, pillars } from './content/pillars';
import { stops, pillarStop, navIndexOf } from './lib/stops';
import { Cover, Finale } from './components/Cover';
import { ExploreSheet } from './components/ExploreSheet';
import { PillarSection } from './components/PillarSection';
import { Interlude } from './components/Interlude';
import { Presentation } from './components/Presentation';
import { Wordmark } from './components/ui';
import { SectionNav } from './components/ChapterMenu';
import { ContactButton, LinkedInLink, openEmail } from './components/Contact';

type Explore = { pillar: number; view: 0 | 1 } | null;

const gutter = { paddingLeft: 'max(16px, env(safe-area-inset-left, 0px))', paddingRight: 'max(16px, env(safe-area-inset-right, 0px))' };

function setHash(token: string) {
  try {
    history.replaceState(null, '', `#${token}`);
  } catch {
    /* the viewer may not allow it; navigation still works in-page */
  }
}

export default function App() {
  const [presenting, setPresenting] = useState(false);
  const [pos, setPosState] = useState<{ stop: number; sub: 0 | 1 | 2 }>({ stop: 0, sub: 0 });
  const [active, setActive] = useState(0); // stop in view (overview)
  const [explore, setExplore] = useState<Explore>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const { scrollYProgress } = useScroll();

  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const goStop = useCallback((i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'start' });
  }, []);

  const setPos = (stop: number, sub: 0 | 1 | 2 = 0) => {
    setPosState({ stop, sub });
    const s = stops[stop];
    setHash(s.kind === 'pillar' && sub > 0 ? `${s.id}-${sub === 1 ? 'a' : 'b'}` : s.id);
  };

  const goId = (id: string) => {
    const i = stops.findIndex((s) => s.id === id);
    if (i < 0) return;
    if (presenting) setPos(i);
    else goStop(i);
  };
  const goPillar = (p: number) => (presenting ? setPos(pillarStop(p)) : goStop(pillarStop(p)));
  const goHome = () => (presenting ? setPos(0) : goStop(0));

  const openExplore = (pillar: number, view: 0 | 1) => {
    if (presenting) {
      setPos(pillarStop(pillar), (view + 1) as 1 | 2);
      return;
    }
    setExplore({ pillar, view });
    setHash(`${registry[pillar].meta.id}-${view === 0 ? 'a' : 'b'}`);
  };
  const closeExplore = () => {
    setExplore(null);
    setHash(stops[active].id);
  };

  /* Deep links: #research, #research-a, #say-research, #present */
  useEffect(() => {
    const token = decodeURIComponent(location.hash.replace('#', ''));
    if (!token) return;
    if (token === 'present') {
      setPresenting(true);
      return;
    }
    const m = token.match(/^(.*)-(a|b)$/);
    if (m) {
      const p = registry.findIndex((r) => r.meta.id === m[1]);
      if (p >= 0) {
        setExplore({ pillar: p, view: m[2] === 'a' ? 0 : 1 });
        requestAnimationFrame(() => sectionRefs.current[pillarStop(p)]?.scrollIntoView({ block: 'start' }));
        return;
      }
    }
    const i = stops.findIndex((s) => s.id === token);
    if (i >= 0) requestAnimationFrame(() => sectionRefs.current[i]?.scrollIntoView({ block: 'start' }));
  }, []);

  /* Track the section in view */
  useEffect(() => {
    if (presenting) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = sectionRefs.current.indexOf(e.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [presenting]);

  useEffect(() => {
    if (!explore && !presenting) setHash(stops[active].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = explore || presenting ? 'hidden' : '';
  }, [explore, presenting]);

  const startPresenting = () => {
    setExplore(null);
    setPos(active, 0);
    setPresenting(true);
  };
  const stopPresenting = () => {
    const s = pos.stop;
    setPresenting(false);
    requestAnimationFrame(() => sectionRefs.current[s]?.scrollIntoView({ block: 'start' }));
  };

  /* Overview keyboard: ← → move between chapters, P presents, Esc closes Explore More */
  useEffect(() => {
    if (presenting) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (explore) {
        if (e.key === 'Escape') closeExplore();
        return;
      }
      if (e.key === 'ArrowRight') goStop(Math.min(stops.length - 1, active + 1));
      else if (e.key === 'ArrowLeft') goStop(Math.max(0, active - 1));
      else if (e.key.toLowerCase() === 'p') startPresenting();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const renderStop = (i: number) => {
    const s = stops[i];
    if (s.kind === 'cover') return <Cover onGo={goId} presenting={presenting} />;
    if (s.kind === 'close') return <Finale onRestart={goHome} />;
    if (s.kind === 'say') return <Interlude {...interludes[registry[s.pillar].meta.id]} presenting={presenting} />;
    const { meta, Main } = registry[s.pillar];
    const nextP = s.pillar + 1;
    const next =
      nextP < pillars.length
        ? { label: `${pillars[nextP].number} ${pillars[nextP].navLabel}`, onClick: () => goPillar(nextP) }
        : { label: 'Understand. Connect. Activate.', onClick: () => goStop(stops.length - 1) };
    return (
      <PillarSection meta={meta} presenting={presenting} next={next} onExplore={(v) => openExplore(s.pillar, v)}>
        <Main />
      </PillarSection>
    );
  };

  const nav = navIndexOf(active);
  const currentDark = stops[active].dark;

  if (presenting) {
    return (
      <MotionConfig reducedMotion="user">
        <Presentation stop={pos.stop} sub={pos.sub} setPos={setPos} onExit={stopPresenting} renderStop={renderStop} />
      </MotionConfig>
    );
  }


  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#approach"
        onClick={(e) => {
          e.preventDefault();
          goPillar(0);
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[60] focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to the first chapter
      </a>

      {/* One navigation: top bar on desktop, bottom bar on phones */}
      <header
        className={`fixed inset-x-0 top-0 z-30 border-b transition-colors duration-300 ${currentDark ? 'border-lineDark bg-ink text-onDark' : 'border-line bg-paper text-ink'}`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mx-auto flex h-16 max-w-page items-center gap-3" style={gutter}>
          <button type="button" onClick={goHome} className="shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal" aria-label={`${brand.name}, back to the start`}>
            <Wordmark size="sm" />
          </button>
          <div className="flex min-w-0 flex-1 justify-center">
            <SectionNav dark={currentDark} current={nav} onHome={goHome} onPillar={goPillar} />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <ContactButton dark={currentDark} compact />
            <LinkedInLink dark={currentDark} compact />
          </div>
          <button
            type="button"
            onClick={startPresenting}
            className="flex h-9 shrink-0 items-center gap-2 rounded-full bg-signal px-3 text-[13px] font-medium text-white transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-signal sm:px-4"
          >
            <MonitorPlay className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Present</span>
          </button>
        </div>
        <motion.div className="absolute bottom-[-1px] left-0 right-0 h-[2px] origin-left bg-signal" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      </header>

      <main>
        {stops.map((s, i) => (
          <section key={s.id} id={s.id} ref={(el) => (sectionRefs.current[i] = el)} aria-label={s.label} className={`${s.band} scroll-mt-16 ${s.kind === 'cover' ? 'relative overflow-hidden' : ''}`}>
            <div
              className={`mx-auto max-w-page ${s.kind === 'cover' ? 'pb-16 pt-32 sm:pb-24 sm:pt-40' : s.kind === 'say' ? 'py-20 sm:py-28' : 'py-20 sm:py-28'}`}
              style={gutter}
            >
              {renderStop(i)}
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-lineDark bg-ink text-onDark2">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-3 py-6 font-mono text-[12px] uppercase tracking-[0.12em]" style={{ ...gutter, paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
          <span>{client.footerLabel}</span>
          <span className="flex flex-wrap items-center gap-5">
            <button type="button" onClick={openEmail} className="uppercase tracking-[0.12em] hover:text-signal">Contact</button>
            <a href={brand.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-signal">LinkedIn</a>
            <span className="text-meta">{brand.philosophy}</span>
          </span>
        </div>
      </footer>

      <AnimatePresence>{explore && <ExploreSheet key="sheet" pillar={explore.pillar} view={explore.view} onChange={openExplore} onClose={closeExplore} onHome={() => { setExplore(null); goHome(); }} onPillar={(p) => { setExplore(null); goPillar(p); }} />}</AnimatePresence>
    </MotionConfig>
  );
}
