/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF7F0',
        sand: '#F3EBDD',
        beige: '#E9DDC9',
        nude: '#E7CFC0',
        taupe: '#B89B87',
        cocoa: '#6E5B4E',
        espresso: '#3F332B',
        gold: '#C7A567',
        golddark: '#A8894B',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(110, 91, 78, 0.25)',
        card: '0 8px 30px -10px rgba(110, 91, 78, 0.18)',
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
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease forwards',
        fadeIn: 'fadeIn 0.8s ease forwards',
        marquee: 'marquee 22s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
