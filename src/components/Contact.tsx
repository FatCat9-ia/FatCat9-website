import { Linkedin, Mail } from 'lucide-react';
import { brand } from '../config/brand';

/** Opens the visitor's email app. The address is assembled on click and never rendered as text. */
export function openEmail() {
  const { emailUser, emailDomain } = brand.contact;
  window.location.href = `mailto:${emailUser}@${emailDomain}?subject=${encodeURIComponent('Hello FatCat9')}`;
}

export function ContactButton({ dark, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={openEmail}
      className={`flex h-9 shrink-0 items-center gap-2 rounded-full border px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
        dark ? 'border-lineDark text-onDark hover:border-signal' : 'border-line bg-surface text-ink hover:border-ink'
      }`}
    >
      <Mail className="h-4 w-4" aria-hidden="true" />
      <span className={compact ? 'hidden xl:inline' : ''}>Contact</span>
    </button>
  );
}

export function LinkedInLink({ dark, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <a
      href={brand.contact.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="FatCat9 on LinkedIn"
      className={`flex h-9 shrink-0 items-center gap-2 rounded-full border px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
        dark ? 'border-lineDark text-onDark hover:border-signal' : 'border-line bg-surface text-ink hover:border-ink'
      }`}
    >
      <Linkedin className="h-4 w-4" aria-hidden="true" />
      <span className={compact ? 'hidden' : ''}>LinkedIn</span>
    </a>
  );
}

/** Large contact block for the closing section. */
export function ContactBlock() {
  return (
    <div className="flex flex-col gap-5 border-t border-lineDark pt-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-meta">Contact</p>
        <p className="max-w-[28rem] text-[20px] leading-[1.4] text-onDark sm:text-[24px]">Let's talk about the questions that matter to you.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={openEmail}
          className="flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-[15px] font-medium text-white transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:ring-signal"
        >
          <Mail className="h-5 w-5" aria-hidden="true" /> Contact
        </button>
        <a
          href={brand.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center gap-2 rounded-full border border-lineDark px-6 text-[15px] font-medium text-onDark transition-colors hover:border-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        >
          <Linkedin className="h-5 w-5" aria-hidden="true" /> LinkedIn
        </a>
      </div>
    </div>
  );
}
