/**
 * Tailwind theme.
 *
 * IMPORTANT: this file contains NO literal design values. Every color, font,
 * size, spacing, radius and shadow below resolves to a CSS custom property
 * emitted by the single source of truth: `src/styles/_tokens.scss`.
 * To restyle the site, edit that SCSS file only.
 */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: 'var(--gutter)',
      screens: {
        '2xl': 'var(--container)',
      },
    },
    extend: {
      colors: {
        // shadcn/ui semantic set
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        // Brand extras
        'brand-hot': 'hsl(var(--brand-hot) / <alpha-value>)',
        'brand-hot-deep': 'hsl(var(--brand-hot-deep) / <alpha-value>)',
        'brand-cyan': 'hsl(var(--brand-cyan) / <alpha-value>)',
        'brand-cyan-deep': 'hsl(var(--brand-cyan-deep) / <alpha-value>)',
        'brand-violet': 'hsl(var(--brand-violet) / <alpha-value>)',
        'surface-2': 'hsl(var(--surface-2) / <alpha-value>)',
        plate: 'hsl(var(--plate) / <alpha-value>)',
        'plate-deep': 'hsl(var(--plate-deep) / <alpha-value>)',
        'layer-line': 'hsl(var(--layer-line) / <alpha-value>)',
        'grid-line': 'hsl(var(--grid-line) / <alpha-value>)',
        'foreground-dim': 'hsl(var(--foreground-dim) / <alpha-value>)',
        'rarity-common': 'hsl(var(--rarity-common) / <alpha-value>)',
        'rarity-rare': 'hsl(var(--rarity-rare) / <alpha-value>)',
        'rarity-epic': 'hsl(var(--rarity-epic) / <alpha-value>)',
        'rarity-legendary': 'hsl(var(--rarity-legendary) / <alpha-value>)',
      },
      backgroundImage: {
        'grad-extrude': 'var(--grad-extrude)',
        'grad-travel': 'var(--grad-travel)',
        'grad-plate': 'var(--grad-plate)',
        'grad-border': 'var(--grad-border)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        display: ['var(--fs-display)', { lineHeight: 'var(--leading-display)' }],
        h1: ['var(--fs-h1)', { lineHeight: 'var(--leading-h1)' }],
        h2: ['var(--fs-h2)', { lineHeight: 'var(--leading-h2)' }],
        h3: ['var(--fs-h3)', { lineHeight: 'var(--leading-h3)' }],
        lead: ['var(--fs-lead)', { lineHeight: 'var(--leading-lead)' }],
        body: ['var(--fs-body)', { lineHeight: 'var(--leading-body)' }],
        sm: ['var(--fs-sm)', { lineHeight: 'var(--leading-lead)' }],
        eyebrow: ['var(--fs-eyebrow)', { lineHeight: 'var(--leading-tight)' }],
        chip: ['var(--fs-chip)', { lineHeight: 'var(--leading-tight)' }],
        meta: ['var(--fs-meta)', { lineHeight: 'var(--leading-tight)' }],
      },
      letterSpacing: {
        display: 'var(--tracking-display)',
        h1: 'var(--tracking-h1)',
        h2: 'var(--tracking-h2)',
        h3: 'var(--tracking-h3)',
        eyebrow: 'var(--tracking-eyebrow)',
        chip: 'var(--tracking-chip)',
        meta: 'var(--tracking-meta)',
      },
      // The project spacing scale. Exposed under `sp-*` names (e.g. `py-sp-10`,
      // `gap-sp-5`) rather than overriding Tailwind's numeric scale, so the
      // shadcn/ui primitives keep their intended proportions.
      spacing: {
        'sp-1': 'var(--sp-1)',
        'sp-2': 'var(--sp-2)',
        'sp-3': 'var(--sp-3)',
        'sp-4': 'var(--sp-4)',
        'sp-5': 'var(--sp-5)',
        'sp-6': 'var(--sp-6)',
        'sp-8': 'var(--sp-8)',
        'sp-10': 'var(--sp-10)',
        'sp-12': 'var(--sp-12)',
        'sp-14': 'var(--sp-14)',
        gutter: 'var(--gutter)',
        header: 'var(--header-h)',
      },
      maxWidth: {
        shell: 'var(--container)',
        'shell-narrow': 'var(--container-narrow)',
        measure: 'var(--measure-body)',
        'measure-lead': 'var(--measure-lead)',
        'measure-hero': 'var(--measure-hero)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'var(--radius-sm)',
        xl: 'var(--radius-lg)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        header: 'var(--shadow-header)',
        'glow-hot': 'var(--glow-hot)',
        'glow-hot-soft': 'var(--glow-hot-soft)',
        'glow-cyan': 'var(--glow-cyan)',
        'glow-cyan-soft': 'var(--glow-cyan-soft)',
        focus: 'var(--ring-focus)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
      },
      transitionDuration: {
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)',
        hero: 'var(--dur-hero)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'print-rise': {
          from: { transform: 'scaleY(0)' },
          to: { transform: 'scaleY(1)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-up': 'fade-up var(--dur-slow) var(--ease-out) both',
        'print-rise': 'print-rise var(--dur-hero) var(--ease-out) both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
