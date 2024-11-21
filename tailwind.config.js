/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ef4444',
        'primary-light': '#0c4a6e',
        'dark': '#18181b',
        'darkish': '#27272a',
        'light': '#e5e7eb',
        'medium': '#6b7280',
        'dark-gray': '#1f2937',
      },
      animation: {
        'spin-slow': 'spin 3s infinite',
      },
    },
  },
  plugins: [],
}