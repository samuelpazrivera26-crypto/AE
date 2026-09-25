import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#050505",
          surface: "#0A0A0F",
          elevated: "#111115",
          card: "#18181e",
          border: "#2c2c36",
          "border-hover": "#484856",
        },
        silver: {
          bright: "#ffffff",
          metallic: "#d4d4dc",
          brushed: "#a2a2b0",
          muted: "#6e6e7c",
        },
        spatial: {
          DEFAULT: "#f7f7f9",
        },
        prism: {
          purple: "#8499fa",
          turquoise: "#45bedf",
          cyan: "#5eead4",
        },
      },
      fontFamily: {
        heading: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      letterSpacing: {
        ultra: "0.25em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
