/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      background: "#f3f3f3",
      box: {
        question: "#fff",
        reply: "#f4f4f4",
        input: "#e6e6e6",
        navbar: "#f8f8f8",
        related: "#fff8de",
      },
      header: "#000",
      content: "#4b4747",
      subheader: "#b5b5b5",
      icon: {
        gray: "#808080",
        white: "#fff",
      },
      btn: {
        blue: "#46a9fa",
        green: "#3daf52",
        deepGreen: "#1dd041",
        red: "#ff7072",
        yellow: "#fdcb6f",
        inactive: "#d2d2d2",
      },
    },
    extend: {},
    theme: {
      extend: {
        fontFamily: {
          sans: ["Albert Sans", "sans-serif"], // Default font
        },
      },
    },
  },
  plugins: [],
};
