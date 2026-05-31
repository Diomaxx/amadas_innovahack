/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/screens/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* ───────────────────────────────────────────────────────
         mati — Semantic color aliases
         These give you shortcut classes like:
           bg-forest, text-cream-dark, border-gold, etc.
         They reference the CSS variables in globals.css so
         everything stays in sync.
         ─────────────────────────────────────────────────────── */
      colors: {
        // Forest green shortcuts
        forest: {
          DEFAULT: 'var(--cv-green-700)',
          light:   'var(--cv-green-500)',
          dark:    'var(--cv-green-900)',
          subtle:  'var(--cv-green-100)',
        },
        // Cream / Beige shortcuts
        cream: {
          DEFAULT: 'var(--cv-cream-100)',
          light:   'var(--cv-cream-50)',
          dark:    'var(--cv-cream-300)',
          muted:   'var(--cv-cream-400)',
        },
        // Gold accent shortcuts
        gold: {
          DEFAULT: 'var(--cv-gold-500)',
          light:   'var(--cv-gold-300)',
          dark:    'var(--cv-gold-600)',
        },
      },
    },
  },
  plugins: [],
};
