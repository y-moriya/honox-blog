import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx,mdx}"],
  plugins: [daisyui],
  daisyui: {
    themes: ["nord"]
  }
};
