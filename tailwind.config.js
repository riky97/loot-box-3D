/**
 * Tailwind configuration.
 *
 * This file contains NO literal design values. Every entry below maps a utility
 * name onto a CSS custom property emitted by `src/styles/_tokens.scss`, which is
 * the single source of truth. Restyling the site means editing that file only.
 *
 * Colors use the `hsl(var(--x) / <alpha-value>)` form so opacity modifiers
 * (`bg-primary/20`) keep working.
 *
 * NOTE: the spacing tokens are exposed as `sp-1`…`sp-14` and deliberately do NOT
 * override Tailwind's numeric scale. shadcn/ui primitives are built on that
 * scale — overriding it turns `h-10` into 4.5rem and breaks every button.
 */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        "surface-alt": "hsl(var(--surface-alt) / <alpha-value>)",
        "surface-hover": "hsl(var(--surface-hover) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        "foreground-dim": "hsl(var(--foreground-dim) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",

        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          hover: "hsl(var(--primary-hover) / <alpha-value>)",
          deep: "hsl(var(--primary-deep) / <alpha-value>)",
        },

        // Decorative only — never used for text. See DESIGN.md color rule 2.
        "accent-vivid": "hsl(var(--accent-vivid) / <alpha-value>)",
        gold: "hsl(var(--gold) / <alpha-value>)",
        "green-vivid": "hsl(var(--green-vivid) / <alpha-value>)",
        // Text-safe counterparts.
        "gold-ink": "hsl(var(--gold-ink) / <alpha-value>)",
        green: "hsl(var(--green) / <alpha-value>)",

        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
      },

      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        accent: "var(--font-accent)",
      },

      fontSize: {
        display: ["var(--fs-display)", { lineHeight: "var(--leading-display)" }],
        h1: ["var(--fs-h1)", { lineHeight: "var(--leading-h1)" }],
        h2: ["var(--fs-h2)", { lineHeight: "var(--leading-h2)" }],
        h3: ["var(--fs-h3)", { lineHeight: "var(--leading-h3)" }],
        lead: ["var(--fs-lead)", { lineHeight: "var(--leading-lead)" }],
        body: ["var(--fs-body)", { lineHeight: "var(--leading-body)" }],
        sm: ["var(--fs-sm)", { lineHeight: "var(--leading-body)" }],
        eyebrow: ["var(--fs-eyebrow)", { lineHeight: "var(--leading-tight)" }],
        chip: ["var(--fs-chip)", { lineHeight: "1.1" }],
        meta: ["var(--fs-meta)", { lineHeight: "1.4" }],
        numeral: ["var(--fs-numeral)", { lineHeight: "0.8" }],
      },

      letterSpacing: {
        display: "var(--tracking-display)",
        h1: "var(--tracking-h1)",
        h2: "var(--tracking-h2)",
        h3: "var(--tracking-h3)",
        eyebrow: "var(--tracking-eyebrow)",
        chip: "var(--tracking-chip)",
        meta: "var(--tracking-meta)",
      },

      spacing: {
        "sp-1": "var(--sp-1)",
        "sp-2": "var(--sp-2)",
        "sp-3": "var(--sp-3)",
        "sp-4": "var(--sp-4)",
        "sp-5": "var(--sp-5)",
        "sp-6": "var(--sp-6)",
        "sp-8": "var(--sp-8)",
        "sp-10": "var(--sp-10)",
        "sp-12": "var(--sp-12)",
        "sp-14": "var(--sp-14)",
        gutter: "var(--gutter)",
        header: "var(--header-h)",
        "band-rest": "var(--band-rest)",
      },

      maxWidth: {
        container: "var(--container)",
        "container-narrow": "var(--container-narrow)",
        "measure-body": "var(--measure-body)",
        "measure-lead": "var(--measure-lead)",
        "measure-hero": "var(--measure-hero)",
      },

      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },

      boxShadow: {
        rule: "var(--shadow-rule)",
        pop: "var(--shadow-pop)",
        raised: "var(--shadow-raised)",
        elevated: "var(--shadow-elevated)",
        glow: "var(--shadow-glow)",
        "btn-pop": "var(--btn-pop)",
        "btn-pop-hover": "var(--btn-pop-hover)",
        "btn-pop-active": "var(--btn-pop-active)",
        focus: "var(--ring-focus)",
      },

      transitionTimingFunction: {
        out: "var(--ease-out)",
        bounce: "var(--ease-bounce)",
      },

      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
        hero: "var(--dur-hero)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
