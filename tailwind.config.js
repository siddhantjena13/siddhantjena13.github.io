/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mist: "#e6edf2",      // scene background
        screen: "#101217",    // inside the visor
        bezel: "#1b1e26",
        bolt: "#58d5f2",      // eye cyan
        chalk: "#eef2f6",
        slate2: "#8b93a3",
      },
      fontFamily: {
        display: ['"Schibsted Grotesk"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
