import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      grey: {
        "thin": "#E5E8E8",
        "extra-light": "#D5DBDB",
        "light": "#AAB7B8",
        "regular": "#5B5B5B",
        "medium": "#303030",
        "semi-bold": "#1B1B1B",
        "bold": "#060f18ed"
      },
      purple: {
        "light": "#D7BDE2",
        "semi-bold": "#8E44AD",
        "bold": "#5800AF"
      },
      orange: {
        "regular": "#D35400",
      },
      green: {
        "regular": "#4A6E59",
        "medium": "#1E8449",
        "semi-bold": "#145A32",
      },
      blue: {
        "light": "#566573",
        "regular": "#2C3E50",
        "medium": "#2E4053",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {},
        dark: {
          colors: {
            background: "#2C3E50",
            content1: "#2C3E50",
            primary: {
              DEFAULT: "#8E44AD",
              foreground: "#000000",
            },
            warning: {
              DEFAULT: "#D35400",
              foreground: "#000000",
            },
            focus: "#D7BDE2",
          },
        },
      },
    }),
  ],
};
export default config;
