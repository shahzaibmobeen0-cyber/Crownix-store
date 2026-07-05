import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Crownix design tokens — Black / Gold / White / Silver, no cliché warm-cream/terracotta defaults.
        onyx: {
          DEFAULT: "#0A0A0B", // near-black base, slightly blue-black rather than flat #000
          900: "#0A0A0B",
          800: "#121214",
          700: "#1B1B1E",
          600: "#26262A",
        },
        champagne: {
          DEFAULT: "#C6A664", // primary gold — warm, muted, not brassy yellow-gold
          light: "#E4CE94",
          dark: "#8F7A42",
        },
        ivory: {
          DEFAULT: "#F6F4EF",
          dim: "#EDEAE2",
        },
        steel: {
          DEFAULT: "#9CA0A6", // silver
          light: "#C9CCD1",
          dark: "#5B5E63",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(115deg, #8F7A42 0%, #E4CE94 28%, #C6A664 50%, #E4CE94 72%, #8F7A42 100%)",
        "onyx-radial":
          "radial-gradient(circle at 50% 20%, #1B1B1E 0%, #0A0A0B 60%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0,0,0,0.45)",
        gold: "0 0 30px -5px rgba(198,166,100,0.45)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "fade-up": "fade-up 0.8s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
