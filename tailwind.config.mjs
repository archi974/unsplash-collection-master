/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/img/hero-image.png')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        block: "var(--block)",
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam-pro)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
