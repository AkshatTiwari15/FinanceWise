/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'navy': {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6fe',
          300: '#a5b8fc',
          400: '#8b93f8',
          500: '#7c6ef2',
          600: '#6d4ce6',
          700: '#5e3dcb',
          800: '#4d32a4',
          900: '#1e3a8a',
        },
      },
      lineClamp: {
        2: '2',
        3: '3',
      }
    },
  },
  plugins: [],
};