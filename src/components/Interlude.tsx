import type { CSSProperties } from 'react';

/** A full-width pause between chapters: one key statement, very large. */
export function Interlude({ text, highlight, presenting }: { text: string; highlight: string; presenting?: boolean }) {
  const i = text.lastIndexOf(highlight);
  const head = i >= 0 ? text.slice(0, i) : text;
  const tail = i >= 0 ? text.slice(i) : '';
  return (
    <figure className="flex flex-col gap-8 text-ink">
      <span className="font-mono text-[48px] leading-none text-signalInk" aria-hidden="true">
        “
      </span>
      <blockquote
        className={`max-w-[22ch] font-bold leading-[1.04] tracking-[-0.03em] ${presenting ? 'text-[56px] lg:text-[80px]' : 'text-[36px] sm:text-[56px] lg:text-[72px]'}`}
        style={{ textWrap: 'balance' } as CSSProperties}
      >
        {head}
        <span className="text-signalInk">{tail}</span>
      </blockquote>
    </figure>
  );
}
