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
      height: {
        "128": "32rem",
        halfmore: "81vh",
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
