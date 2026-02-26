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
        /* Background layers */
        bg: "#0B0F08",
        "bg-mid": "#111A0D",
        card: "#141F0F",
        "card-light": "#1C2A15",

        /* Borders */
        border: "#2A3D1C",
        "border-glow": "#4A6A2A",

        /* Primary accent — Military Gold */
        gold: {
          DEFAULT: "#D4A017",
          light: "#F0C040",
          dim: "#7A5C0A",
        },

        /* Secondary accents */
        amber: "#E8820C",
        olive: {
          DEFAULT: "#6B8C42",
          light: "#8DB05A",
        },
        khaki: "#C5B358",

        /* Status */
        "green-op": "#3DFF88",
        "red-alert": "#FF4444",
        cream: "#EDE8D0",
        muted: "#7A8A6A",
      },
      fontFamily: {
        sans: ["Rajdhani", "Montserrat", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        mono: ["JetBrains Mono", "Roboto Mono", "monospace"],
      },
      boxShadow: {
        gold: "0 0 20px rgba(212,160,23,0.4)",
        "gold-sm": "0 0 8px rgba(212,160,23,0.25)",
        olive: "0 0 20px rgba(107,140,66,0.4)",
        amber: "0 0 20px rgba(232,130,12,0.4)",
        alert: "0 0 20px rgba(255,68,68,0.4)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(107,140,66,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(107,140,66,0.05) 1px, transparent 1px)",
        "army-hero":
          "url('/army_backdrop.png')",
        "gold-gradient":
          "linear-gradient(135deg, #D4A017, #F0C040, #D4A017)",
        "army-card":
          "linear-gradient(135deg, rgba(20,31,15,0.95), rgba(28,42,21,0.85))",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        glitch: "glitch 5s infinite",
        scroll: "scroll 20s linear infinite",
        blink: "blink 1s step-end infinite",
        "march-sweep": "marchSweep 4s ease-in-out infinite",
        "radar-spin": "radarSpin 6s linear infinite",
        "float-y": "floatY 4s ease-in-out infinite",
        "node-pulse": "nodePulse 2.2s ease-in-out infinite",
        "ping-ring": "pingRing 2s ease-out infinite",
      },
      keyframes: {
        glitch: {
          "0%, 88%, 100%": { transform: "translate(0)", filter: "none", opacity: "1" },
          "90%": { transform: "translate(-2px, 1px)", filter: "hue-rotate(30deg)", opacity: "0.9" },
          "92%": { transform: "translate(2px, -1px)", filter: "hue-rotate(-30deg)", opacity: "0.8" },
          "94%": { transform: "translate(-1px, 0px)", opacity: "0.95" },
        },
        scroll: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marchSweep: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        radarSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        nodePulse: {
          "0%, 100%": { boxShadow: "0 0 6px rgba(212,160,23,0.5)" },
          "50%": { boxShadow: "0 0 22px rgba(212,160,23,0.9), 0 0 45px rgba(212,160,23,0.35)" },
        },
        pingRing: {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
