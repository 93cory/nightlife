import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#f5f5f5",
        gold: {
          DEFAULT: "#d4a843",
          light: "#e8c76a",
          dark: "#b8912e",
        },
        bordeaux: {
          DEFAULT: "#7f1d1d",
          light: "#991b1b",
        },
        surface: {
          DEFAULT: "#141414",
          light: "#1e1e1e",
          lighter: "#2a2a2a",
        },
        border: "rgba(255, 255, 255, 0.08)",
        "border-light": "rgba(255, 255, 255, 0.15)",
        "text-muted": "#a3a3a3",
        "text-dim": "#737373",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        info: "#3b82f6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
