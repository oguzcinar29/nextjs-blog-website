import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "800": { raw: "(max-width:800px)" },
        "500": { raw: "(max-width:500px)" },
        "400": { raw: "(max-width:400px)" },
        "700": { raw: "(max-width:700px)" },
        "600": { raw: "(max-width:600px)" },
        "1000": { raw: "(max-width:1000px)" },
        "1000-min": { raw: "(min-width:1000px)" },
      },
      height: {
        "128": "32rem",
        halfmore: "81vh",
        homepage: "74.5vh",
        login: "78.2vh",
        contact: "70.2vh",
        register: "75.5vh",
        write: "68vh",
        about: "72.2vh",
      },
      margin: {
        "15.5": "62px",
        "17": "71px",
        "31": "124px",
        "41": "161px",
        "42": "165px",
      },
    },
  },

  plugins: [],
};
export default config;
