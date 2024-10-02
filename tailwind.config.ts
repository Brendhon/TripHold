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
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      '2lg': '1100px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
    colors: {
      grey: {
        "thin": "#E5E8E8",
        "extra-light": "#D5DBDB",
        "light": "#AAB7B8",
        "regular": "#5B5B5B",
        "extra-regular": "#373737",
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
      table: {
        "bg": "#374859",
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {},
        dark: {
          layout: {
            dividerWeight: "1px", // h-divider the default height applied to the divider component
            disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
            fontSize: {
              tiny: "0.75rem", // text-tiny
              small: "0.875rem", // text-small
              medium: "1rem", // text-medium
              large: "1.125rem", // text-large
            },
            lineHeight: {
              tiny: "1rem", // text-tiny
              small: "1.25rem", // text-small
              medium: "1.5rem", // text-medium
              large: "1.75rem", // text-large
            },
            radius: {
              small: "4px", // rounded-small
              medium: "6px", // rounded-medium
              large: "8px", // rounded-large
            },
            borderWidth: {
              small: "1px", // border-small
              medium: "2px", // border-medium (default)
              large: "3px", // border-large
            },
          },
          colors: {
            background: "#2C3E50",
            content1: {
              DEFAULT: "#2C3E50",
              foreground: "#E5E8E8",
            },
            content2: {
              DEFAULT: "#34495E",
              foreground: "#E5E8E8",
            },
            content3: {
              DEFAULT: "#566573",
              foreground: "#E5E8E8",
            },
            content4: {
              DEFAULT: "#34495E",
              foreground: "#E5E8E8",
            },
            primary: {
              DEFAULT: "#8E44AD",
              foreground: "#E5E8E8"
            },
            warning: {
              DEFAULT: "#D35400",
              foreground: "#E5E8E8",
            },
            danger: {
              DEFAULT: "#D35400",
              foreground: "#E5E8E8",
            },
            success: {
              DEFAULT: "#4A6E59",
              foreground: "#E5E8E8",
            },
            default: {
              100: "#566573",
              200: "#AAB7B8",
              300: "#D5DBDB",
              400: "#E5E8E8",
              500: "#F2F3F4",
              600: "#F8F9FA",
              700: "#FFFFFF",
              DEFAULT: "#566573",
              foreground: "#E5E8E8",
            },
            focus: {
              DEFAULT: "#8E44AD",
            },
            foreground: {
              500: "#AAB7B8",
            },
          },
        },
      },
    }),
  ],
};
export default config;
