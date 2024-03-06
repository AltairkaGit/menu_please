/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'white': '#ffffff',
        'black': '#000000',
        'green': '#9AC95F',
      },
      fontSize: {
        'sm': '1.125rem',
        'st': '1.875rem',
        'lr': '2rem',
        'ex': '3rem'
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
        serif: [],
        display: ['Lobster', 'serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      boxShadow: {
        'st': '0 0 4px rgba(0, 0, 0, .25)',
        'lr': '0 0 8px rgba(0, 0, 0, .25)',
        'ex': '0 0 16px rgba(0, 0, 0, .25)'
      }
    }
  },
  plugins: [],
}