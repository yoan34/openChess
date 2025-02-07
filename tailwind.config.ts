import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        baloo: ['var(--font-baloo)'],
      },
      colors: {
        primary: "var(--primary)",
        primaryDisabled: "color-mix(in srgb, var(--primary) 30%, transparent)",
        grey: {
          900: "var(--grey-900)",
          700: "var(--grey-700)",
          300: "var(--grey-300)",
          100: "var(--grey-100)",
        },
        blue: "var(--blue)",
        yellow: "var(--yellow)",
        yellowDisabled: "color-mix(in srgb, var(--yellow) 30%, transparent)",
        red: "var(--red)",
      },
    },
  },
  plugins: [],
} satisfies Config;
