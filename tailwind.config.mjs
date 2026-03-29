/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: 'hsl(222, 20%, 8%)',
        surface: {
          1: 'hsl(222, 18%, 11%)',
          2: 'hsl(222, 16%, 15%)',
        },
        border: 'hsl(222, 14%, 20%)',
        text: {
          primary: 'hsl(210, 40%, 96%)',
          secondary: 'hsl(215, 20%, 65%)',
          muted: 'hsl(215, 15%, 45%)',
        },
        accent: {
          DEFAULT: 'hsl(158, 64%, 52%)',
          dim: 'hsl(158, 64%, 40%)',
          subtle: 'hsl(158, 64%, 10%)',
          border: 'hsl(158, 64%, 25%)',
        },
        metric: {
          DEFAULT: 'hsl(38, 92%, 60%)',
          subtle: 'hsl(38, 92%, 12%)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
