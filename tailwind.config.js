module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateAreas: {
        layout: ["header header", "content content", "payway paycost"],
      },
      gridTemplateColumns: {
        layout: "3fr 1.2fr",
      },
      gridTemplateRows: {
        layout: `100px,
                 100px,
                 10fr
                `,
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
