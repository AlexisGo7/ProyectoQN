// tailwind.config.ts
import type { Config } from "tailwindcss";

export const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0b0b0b",
        golden: "#facc15",
        white: "#ffffff",
        grayLight: "#e5e7eb",
        starlight: "#fef9c3",
        midnight: "#0f172a",
      },
      boxShadow: {
        golden: "0 4px 15px rgba(250, 204, 21, 0.4)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
