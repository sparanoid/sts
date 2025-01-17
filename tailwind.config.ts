import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config = {
  // darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    // Override default values
    // https://tailwindcss.com/docs/theme#overriding-the-default-theme
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, ui-sans-serif, system-ui, "Helvetica Neue", Arial, sans-serif',
      serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },

    extend: {
      // https://tailwindcss.com/docs/customizing-colors
      colors: {
        // foreground color, usually text color
        fg: 'oklch(clamp(0%, calc(var(--fg-l) + var(--lch-l-offset)), 100%) var(--primary-c) var(--primary-h) / <alpha-value>)',
        // background color
        bg: 'oklch(clamp(0%, calc(var(--bg-l) + var(--lch-l-offset)), 100%) var(--primary-c) var(--primary-h) / <alpha-value>)',
        // accent color, usually link color
        ac: 'oklch(clamp(0%, calc(var(--ac-l) + var(--lch-l-offset)), 100%) var(--secondary-c) var(--secondary-h) / <alpha-value>)',
        // highlight color, an alternative accent color
        hl: 'oklch(clamp(0%, calc(var(--hl-l) + var(--lch-l-offset)), 100%) var(--primary-c) var(--primary-h) / <alpha-value>)',

        // https://oklch.com/#65,0.02,262,100
        black: 'oklch(calc(0% + var(--lch-l-offset)) 0 0 / <alpha-value>)',
        white: 'oklch(calc(100% + var(--lch-l-offset)) 0 0 / <alpha-value>)',

        // https://oklch.com/#65,0.02,262,100
        gray: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) 0.02 var(--hue-gray) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) 0.02 var(--hue-gray) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) 0.02 var(--hue-gray) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) 0.02 var(--hue-gray) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) 0.02 var(--hue-gray) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) 0.02 var(--hue-gray) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) 0.02 var(--hue-gray) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) 0.02 var(--hue-gray) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) 0.02 var(--hue-gray) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) 0.02 var(--hue-gray) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) 0.02 var(--hue-gray) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,16,100
        red: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-red) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-red) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-red) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-red) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-red) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-red) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-red) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-red) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-red) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-red) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-red) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,44,100
        orange: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-orange) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-orange) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-orange) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-orange) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-orange) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-orange) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-orange) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-orange) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-orange) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-orange) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-orange) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,75,100
        amber: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-amber) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-amber) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-amber) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-amber) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-amber) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-amber) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-amber) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-amber) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-amber) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-amber) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-amber) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,102,100
        yellow: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-yellow) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-yellow) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-yellow) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-yellow) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-yellow) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-yellow) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-yellow) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-yellow) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-yellow) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-yellow) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-yellow) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,128,100
        lime: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-lime) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-lime) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-lime) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-lime) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-lime) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-lime) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-lime) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-lime) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-lime) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-lime) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-lime) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,155,100
        green: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-green) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-green) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-green) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-green) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-green) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-green) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-green) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-green) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-green) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-green) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-green) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,170,100
        emerald: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-emerald) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-emerald) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-emerald) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-emerald) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-emerald) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-emerald) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-emerald) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-emerald) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-emerald) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-emerald) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-emerald) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,181,100
        teal: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-teal) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-teal) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-teal) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-teal) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-teal) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-teal) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-teal) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-teal) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-teal) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-teal) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-teal) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,195,100
        cyan: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-cyan) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-cyan) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-cyan) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-cyan) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-cyan) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-cyan) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-cyan) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-cyan) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-cyan) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-cyan) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-cyan) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,230,100
        sky: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-sky) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-sky) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-sky) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-sky) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-sky) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-sky) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-sky) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-sky) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-sky) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-sky) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-sky) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,262,100
        blue: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-blue) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-blue) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-blue) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-blue) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-blue) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-blue) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-blue) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-blue) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-blue) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-blue) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-blue) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,275,100
        indigo: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-indigo) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-indigo) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-indigo) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-indigo) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-indigo) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-indigo) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-indigo) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-indigo) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-indigo) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-indigo) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-indigo) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,288,100
        violet: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-violet) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-violet) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-violet) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-violet) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-violet) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-violet) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-violet) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-violet) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-violet) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-violet) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-violet) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,300,100
        purple: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-purple) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-purple) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-purple) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-purple) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-purple) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-purple) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-purple) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-purple) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-purple) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-purple) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-purple) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,328,100
        fuchsia: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-fuchsia) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-fuchsia) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-fuchsia) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-fuchsia) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-fuchsia) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-fuchsia) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-fuchsia) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-fuchsia) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-fuchsia) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-fuchsia) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-fuchsia) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,350,100
        pink: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-pink) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-pink) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-pink) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-pink) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-pink) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-pink) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-pink) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-pink) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-pink) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-pink) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-pink) / <alpha-value>)',
        },
        // https://oklch.com/#65,0.28,10,100
        rose: {
          50: 'oklch(clamp(var(--lch-l-clamp-min), calc(99% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-rose) / <alpha-value>)',
          100: 'oklch(clamp(var(--lch-l-clamp-min), calc(97% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-rose) / <alpha-value>)',
          200: 'oklch(clamp(var(--lch-l-clamp-min), calc(95% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-rose) / <alpha-value>)',
          300: 'oklch(clamp(var(--lch-l-clamp-min), calc(90% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-rose) / <alpha-value>)',
          400: 'oklch(clamp(var(--lch-l-clamp-min), calc(85% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-rose) / <alpha-value>)',
          500: 'oklch(clamp(var(--lch-l-clamp-min), calc(75% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-rose) / <alpha-value>)',
          600: 'oklch(clamp(var(--lch-l-clamp-min), calc(65% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-rose) / <alpha-value>)',
          700: 'oklch(clamp(var(--lch-l-clamp-min), calc(55% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-rose) / <alpha-value>)',
          800: 'oklch(clamp(var(--lch-l-clamp-min), calc(45% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-rose) / <alpha-value>)',
          900: 'oklch(clamp(var(--lch-l-clamp-min), calc(25% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-rose) / <alpha-value>)',
          950: 'oklch(clamp(var(--lch-l-clamp-min), calc(15% + var(--lch-l-offset)), var(--lch-l-clamp-max)) var(--lch-c) var(--hue-rose) / <alpha-value>)',
        },
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme('colors.fg / 30%'),
      }),
      boxShadow: ({ theme }) => ({
        'border': `0 0 0 1px ${theme('colors.fg / 30%')}`,
        'border-t': `0 -1px 0 0 ${theme('colors.fg / 30%')}`,
        'border-b': `0 1px 0 0 ${theme('colors.fg / 30%')}`,
        'sm': '0 1px 1px 0 rgba(0, 0, 0, 0.3)',
        'glow': '0 10px 50px 0 rgba(0, 0, 0, 0.3)',
        'inset-shadow': `inset 0 1px 1px ${theme('colors.black / 10%')}`,
      }),
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      // Radix
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
} satisfies Config

export default config
