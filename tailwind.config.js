import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}"],
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "nord"]
  }
};
