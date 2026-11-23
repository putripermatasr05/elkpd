/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#FAF8FF',
          2: '#FFFFFF',
          soft: '#F4F0FF',
        },
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.88)',
          2: '#F8F6FF',
          3: '#EDE9FE',
          dark: '#1E1B2E',
        },
        primary: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dark: '#6D28D9',
          glow: 'rgba(139, 92, 246, 0.25)',
        },
        accent: {
          DEFAULT: '#06B6D4',
          light: '#22D3EE',
          glow: 'rgba(6, 182, 212, 0.2)',
        },
        royal: {
          DEFAULT: '#A855F7',
          light: '#C084FC',
          glow: 'rgba(168, 85, 247, 0.2)',
        },
        pastel: {
          yellow: '#FEF8D8',
          yellowBtn: '#FACC15',
          purple: '#F3E8FF',
          mint: '#DCFCE7',
          peach: '#FFEDD5',
          rose: '#FCE7F3',
          sky: '#E0F2FE',
        },
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #8B5CF6, #6366F1)',
        'grad-purple': 'linear-gradient(135deg, #A855F7, #6366F1)',
        'grad-pastel': 'linear-gradient(135deg, #FAF5FF, #F3E8FF, #FEF3C7)',
        'grad-aurora': 'linear-gradient(120deg, #F3E8FF 0%, #FCE7F3 50%, #FEF3C7 100%)',
        'grad-surface': 'linear-gradient(135deg, #FFFFFF, #F8F6FF)',
      },
    },
  },
  plugins: [],
}
