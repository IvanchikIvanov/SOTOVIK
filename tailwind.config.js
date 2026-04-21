/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: `var(--z-radius)`,
        md: `calc(var(--z-radius) - 2px)`,
        sm: "calc(var(--z-radius) - 3px)",
      },
    },
  },
  plugins: [],
};
