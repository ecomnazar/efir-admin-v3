/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7167E8",
        secondary: "#303347",
        background: "#242739",
        textColor: "#D0D3EA",
        red: "#EA5455",
        green: "#61C478",
      },
    },
    boxShadow: {
      inputShadow: "0px 0px 2px 1px rgba(113, 103, 232, 0.7)",
      boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
    },
    aspectRatio: {
      "9/16": "9 / 16",
    },
  },
  plugins: [],
};
