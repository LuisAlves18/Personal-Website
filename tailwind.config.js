/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./content/**/*.{md,njk,html}", "./_includes/**/*.njk"],
  theme: {
    extend: {
      colors: {
        bg: "#FAF8F5",
        surface: "#FFFFFF",
        line: "#E4E1D8",
        ink: "#2A2926",
        "ink-soft": "#6B6A62",
        bordeaux: "#5C1018",
        gold: "#C9A84C",
      },
      fontFamily: {
        heading: ["Oswald", "sans-serif"],
        body: ["'Work Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
