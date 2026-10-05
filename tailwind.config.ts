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
        brand: {
          // Exact Approved Stitch Color Tokens
          darkGreen: "#1F6B45",
          green: {
            DEFAULT: "#2E7D32",
            50: "#f0faf4",
            100: "#e2f6eb",
            200: "#c3edd5",
            300: "#94dcaf",
            400: "#52be8a",
            500: "#2d9c66",
            600: "#228253",
            700: "#1a6542",
            800: "#144f34",
            900: "#0e3b27",
            950: "#062216",
          },
          freshGreen: "#5E9F62",
          softGreen: "#DCEEDC",
          lightGreen: "#EAF5EC",
          gray: {
            DEFAULT: "#5F6368",
            50: "#f9fafb",
            100: "#f3f4f6",
            200: "#e5e7eb",
            300: "#d1d5db",
            400: "#9ca3af",
            500: "#6b7280",
            600: "#4b5563",
            700: "#374151",
            800: "#1f2937",
            900: "#111827",
          },
          darkGray: "#242826",
          yellow: {
            DEFAULT: "#F4C542",
            50: "#fffbeb",
            100: "#fef3c7",
            200: "#fde68a",
            300: "#fcd34d",
            400: "#fbbf24",
            500: "#f59e0b",
            600: "#d97706",
          },
          softYellow: "#FFF0B8",
          pink: {
            DEFAULT: "#E889A5",
            50: "#fff1f2",
            100: "#ffe4e6",
            200: "#fecdd3",
            300: "#fda4af",
            400: "#fb7185",
            500: "#f43f5e",
            600: "#e11d48",
          },
          softPink: "#F8DCE5",
          cream: {
            DEFAULT: "#FFF8EA",
            50: "#fdfcf9",
            100: "#faf7f0",
            200: "#f4ede0",
            300: "#ece1cd",
            400: "#e0ceb3",
            500: "#d3ba98",
            dark: "#F4EEDC",
            card: "#FFFFFF",
          },
          cardCream: "#FCFBF7",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "var(--font-plus-jakarta)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -5px rgba(31, 107, 69, 0.08)",
        card: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
        elevated: "0 20px 40px -10px rgba(31, 107, 69, 0.15)",
        hover: "0 20px 40px -10px rgba(31, 107, 69, 0.15)",
        glow: "0 0 25px rgba(94, 159, 98, 0.35)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
        pulseSlow: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.3)", opacity: "0.4" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "ping-slow": "pulseSlow 2.5s infinite ease-in-out",
        "pulse-slow": "pulseSlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
