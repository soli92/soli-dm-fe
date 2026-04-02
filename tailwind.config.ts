import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("@soli92/solids/tailwind-preset")],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./node_modules/@soli92/solids/**/*.{ts,tsx,js,jsx}",
  ],
  plugins: [require("tailwindcss-animate")],
};

export default config;
