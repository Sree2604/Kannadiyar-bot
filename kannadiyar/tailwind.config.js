/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        content: ["Poppins"],
      },
      height: {
        128: "40rem",
        130: "32rem",
      },
      width: {
        150: "24rem",
      },
      margin: {
        "700px": "700px",
        "630px": "630px",
      },
      colors: {
        primecolor: "#704214",
        letter: "#fff",
        mtext: "#dc2626",
      },
    },
  },
  plugins: [require("tw-elements/plugin.cjs")],
  
};
