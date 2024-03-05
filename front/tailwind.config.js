/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'white': '#ffffff',
      'black': '#292929',
      'green': '#9AC95F',
    },
    fontSize: {
      'sm': '4.5rem',
      'st': '6.5rem',
      'lr': '8rem',
      'ex': '12rem'
    },
    fontFamily: {
      sans: ['Jost', 'sans-serif'],
      serif: [],
      display: ['Lobster', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
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