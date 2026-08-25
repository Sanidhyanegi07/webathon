/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        n: {
          bg: '#F5F0E8',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: '#1A1A1A',
          yellow: '#FFCC00',
          'yellow-dim': '#E6B800',
          red: '#E63B2E',
          white: '#1A1A1A',
          cream: '#F5F0E8',
          muted: '#6B6B6B',
          'muted-lt': '#4A4A4A',
          blue: '#0055FF',
        }
      },
      fontFamily: {
        headline: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'ticker': 'ticker 30s linear infinite',
        'shimmer': 'shimmer 1.8s infinite',
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px #1A1A1A',
        'brutal-red': '4px 4px 0px 0px #E63B2E',
        'brutal-white': '4px 4px 0px 0px #F5F0E8',
        'brutal-lg': '6px 6px 0px 0px #1A1A1A',
      }
    },
  },
  plugins: [],
}
