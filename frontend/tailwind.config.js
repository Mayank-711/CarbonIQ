/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        minHeight: {
          screen: "calc(100vh - 96px - 56px)",
        },
        fontFamily: {
          lato: ["Lato", "sans-serif"],
          roboto: ["Roboto", "sans-serif"],
        },
        width: {
          clamp: "min(95vw, 896px)",
        },
      },
    },
    plugins: [require("@tailwindcss/typography")],
  };