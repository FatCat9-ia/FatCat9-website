import { brand } from '../config/brand';

const toRgb = (hex: string) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

/** Writes the brand config into CSS variables on :root. */
export function applyBrand() {
  const root = document.documentElement;
  Object.entries(brand.colors).forEach(([key, hex]) => {
    root.style.setProperty(`--c-${key}`, toRgb(hex));
  });
  root.style.setProperty('--font-sans', brand.fonts.sans);
  root.style.setProperty('--font-mono', brand.fonts.mono);
}
