/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E5F3FF',
          200: '#CBE6FF',
          300: '#B1DAFF',
          400: '#97CDFF',
          500: '#7DC1FF',
          600: '#319DFF',
          700: '#0077E4',
          800: '#005098',
          900: '#00284C'
        },
        white: '#ffffff'
      }
    },

    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    }
  },
  plugins: ['prettier-plugin-tailwindcss']
};
