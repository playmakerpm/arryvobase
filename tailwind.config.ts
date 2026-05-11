import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep:       "#020D1C",
        sea:        "#083358",
        azure:      "#0569B8",
        "azure-mid":"#0582CA",
        turquoise:  "#00B9D1",
        aqua:       "#5DD3E3",
        foam:       "#C8EEF5",
        surface:    "#EDF4FB",
        citrus:     "#F5A623",
        "citrus-d": "#D4881A",
        "ink-mid":  "#2E4A68",
        "ink-light":"#6B8BA8",
        border:     "#C8DFF0",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body:    ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
