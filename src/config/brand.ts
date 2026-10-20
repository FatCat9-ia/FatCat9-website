/**
 * Central brand configuration.
 * Change colors, fonts or the wordmark here; every component reads from these values
 * through CSS variables (see applyBrand in src/lib/brand.ts and tailwind.config.js).
 */
export const brand = {
  name: 'FatCat9',
  wordmark: { left: 'FAT', right: 'CAT9' }, // the cat icon sits between the two halves
  tagline: 'Human Understanding Through Data',
  philosophy: 'Data made simple, insights made powerful.',
  /** Public link to this site. "Copy link" buttons add #section to it. Leave empty to use the page's own address. */
  shareUrl: 'https://www.fatcat9.com',

  /**
   * Contact. The email is stored in two parts and only assembled when someone clicks
   * "Contact", so the address never appears as text on the page or in the HTML.
   */
  contact: {
    emailUser: 'carlos',
    emailDomain: 'fatcat9.com',
    linkedin: 'https://www.linkedin.com/company/fatcat9/',
  },

  colors: {
    paper: '#F6F4F1', // main background
    paper2: '#EDE9E3', // alternate band
    surface: '#FFFFFF', // cards on paper
    ink: '#141418', // text and dark scenes
    ink2: '#1E1E24', // cards on dark
    ink3: '#2A2A31', // raised elements on dark
    line: '#E0DBD4', // hairlines on paper
    lineDark: '#34343C', // hairlines on dark
    muted: '#5C5B63', // supporting text on paper
    meta: '#8A8A93', // metadata on dark
    signal: '#F43098', // accent: fills, lines, large text, text on dark
    signalInk: '#C21874', // accent for small text on paper (AA contrast)
    blush: '#FCE4F0', // accent tint for hovers and selections
    onDark: '#F5F5F7',
    onDark2: '#C4C4CC',
  },

  fonts: {
    sans: "'Google Sans Flex', 'Google Sans', 'Helvetica Neue', Arial, sans-serif",
    mono: "'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace",
  },
} as const;

export type BrandColors = typeof brand.colors;
