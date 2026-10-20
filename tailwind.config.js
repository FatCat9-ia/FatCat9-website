/** Colors resolve to CSS variables set from src/config/brand.ts, so a client re-skin is one file. */
const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: v('paper'), paper2: v('paper2'), surface: v('surface'),
        ink: v('ink'), ink2: v('ink2'), ink3: v('ink3'),
        line: v('line'), lineDark: v('lineDark'),
        muted: v('muted'), meta: v('meta'),
        signal: v('signal'), signalInk: v('signalInk'), blush: v('blush'),
        onDark: v('onDark'), onDark2: v('onDark2'),
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      maxWidth: { page: '1240px' },
    },
  },
  plugins: [],
};
