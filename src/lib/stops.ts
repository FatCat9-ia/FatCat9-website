import { interludes, pillars } from '../content/pillars';

/**
 * The story as an ordered list of stops: cover, each pillar followed by its pause,
 * and the close. Used by both the scrolling overview and presentation mode.
 * Each id doubles as a shareable #anchor.
 */
export type Stop =
  | { kind: 'cover'; id: string; label: string; dark: true; band: string }
  | { kind: 'pillar'; id: string; label: string; dark: boolean; band: string; pillar: number }
  | { kind: 'say'; id: string; label: string; dark: false; band: string; pillar: number }
  | { kind: 'close'; id: string; label: string; dark: true; band: string };

const pillarBands = ['bg-paper', 'bg-paper2', 'bg-paper', 'bg-ink', 'bg-paper2'];

export const stops: Stop[] = [
  { kind: 'cover', id: 'top', label: 'Overview', dark: true, band: 'bg-ink' },
  ...pillars.flatMap((p, i) => {
    const list: Stop[] = [{ kind: 'pillar', id: p.id, label: `${p.number} ${p.navLabel}`, dark: !!p.dark, band: pillarBands[i], pillar: i }];
    if (interludes[p.id]) list.push({ kind: 'say', id: `say-${p.id}`, label: `${p.number} · Key idea`, dark: false, band: 'bg-blush', pillar: i });
    return list;
  }),
  { kind: 'close', id: 'close', label: 'Understand. Connect. Activate.', dark: true, band: 'bg-ink' },
];

/** Index of the stop where a pillar starts. */
export const pillarStop = (p: number) => stops.findIndex((s) => s.kind === 'pillar' && s.pillar === p);

/** Which nav item a stop belongs to: -1 cover, 0–4 pillars (pauses count with their pillar), 5 close. */
export const navIndexOf = (i: number) => {
  const s = stops[i];
  if (s.kind === 'cover') return -1;
  if (s.kind === 'close') return pillars.length;
  return s.pillar;
};
