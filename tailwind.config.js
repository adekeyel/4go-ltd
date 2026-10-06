/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C1220',        // primary text, deep blue-black
        paper: '#FFFFFF',
        mist: '#F3F5F8',       // quiet neutral surface
        line: '#DCE1E9',       // borders
        slate: '#586174',      // secondary text
        signal: '#1B4DFF',     // single brand accent
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '76rem' },
    },
  },
  plugins: [],
}
