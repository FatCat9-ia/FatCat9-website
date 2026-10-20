import { useState } from 'react';
import { Check, Link2 } from 'lucide-react';
import { brand } from '../config/brand';

export function linkFor(token: string) {
  const base = brand.shareUrl || location.href.split('#')[0];
  return `${base}#${token}`;
}

/** Copies a direct link to a section. Falls back to showing the link for manual copy. */
export function CopyLink({ token, dark }: { token: string; dark?: boolean }) {
  const [state, setState] = useState<'idle' | 'copied' | 'manual'>('idle');
  const url = linkFor(token);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    } catch {
      setState('manual');
    }
  };

  if (state === 'manual') {
    return (
      <input
        readOnly
        value={url}
        aria-label="Link to this section"
        onFocus={(e) => e.currentTarget.select()}
        autoFocus
        className={`h-9 w-[min(360px,100%)] rounded-full border px-3 font-mono text-[12px] ${dark ? 'border-lineDark bg-ink2 text-onDark' : 'border-line bg-surface text-ink'}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`flex h-9 items-center gap-2 rounded-full border px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
        dark ? 'border-lineDark text-onDark2 hover:text-onDark' : 'border-line text-muted hover:border-ink hover:text-ink'
      }`}
    >
      {state === 'copied' ? <Check className="h-4 w-4 text-signal" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
      {state === 'copied' ? 'Link copied' : 'Copy link'}
    </button>
  );
}
