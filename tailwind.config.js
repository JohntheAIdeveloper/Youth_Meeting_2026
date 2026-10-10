/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette sampled from the official poster
        midnight: { DEFAULT: '#0B1B33', 900: '#06101F', 800: '#0B1B33', 700: '#12294A', 600: '#1B3A66' },
        gold: { DEFAULT: '#F2A91B', 300: '#FFD66B', 400: '#FBBF3A', 500: '#F2A91B', 600: '#D68A0C', 700: '#A8650A' },
        cream: { DEFAULT: '#F7EEDC', 50: '#FCF8EF', 100: '#F7EEDC', 200: '#EEDFC2' },
        ribbon: '#8E1B1F',
      },
      fontFamily: {
        display: ['"Anek Tamil"', 'system-ui', 'sans-serif'],
        body: ['"Mukta Malar"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 10px 30px -10px rgba(242,169,27,.55)',
        deep: '0 30px 60px -25px rgba(3,8,18,.7)',
      },
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(18px)' }, to: { opacity: '1', transform: 'none' } },
        sheen: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-100% 0' } },
        glow: { '0%,100%': { opacity: '.55' }, '50%': { opacity: '.9' } },
      },
      animation: {
        rise: 'rise .8s cubic-bezier(.2,.7,.2,1) both',
        sheen: 'sheen 3.2s ease-out 1.1s 1 both',
        glow: 'glow 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
