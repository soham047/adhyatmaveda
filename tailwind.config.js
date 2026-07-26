/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0B0E',
        slatecard: '#12151C',
        slatecard2: '#181C26',
        gold: '#D4AF37',
        goldsoft: '#E8C766',
        crimson: '#9B111E',
        crimsonsoft: '#C4404E',
        offwhite: '#E2E8F0',
        mutedtext: '#94A3B8',
        parchment: '#FDFBF7',
        cream: '#F4EFE6',
        cream2: '#EBE3D4',
        amber: '#B8860B',
        amberdark: '#8B6914',
        maroon: '#800000',
        maroonsoft: '#A03333',
        ink: '#1A202C',
        inksoft: '#4A5568',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        deva: ['"Noto Serif Devanagari"', 'serif'],
      },
      boxShadow: {
        glow: '0 0 24px -4px rgba(212,175,55,0.35)',
        card: '0 4px 24px -8px rgba(0,0,0,0.4)',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.4)' }, '50%': { boxShadow: '0 0 24px 4px rgba(212,175,55,0.15)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
        slideUp: 'slideUp 0.4s ease-out',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
