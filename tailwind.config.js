const { colors: defaultColors } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "10px",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "70px",
      },
      center: true,
    },
    extend: {
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin: 'spin 2s linear infinite',
      },
      colors: {
        ...defaultColors,
        dark: "#23262F",
        gray: "#E8E9EB",
        dodgerBlue: "#2A85FF",
        grayDark: "#6E7179",
        grayDark2: "#B3B4B8",
        redLight: "#F8ECEE",
        red: "#CE5A67",
        grayLight: "#fcfcfd",
        blue: "#2A85FF",
        blueLight: "#E8F7FA",
        green: "#43D58F",
        greenLight: "#EEF8F2",
        sliverWhite: "#fcfcfd",
        stormDust: "#656567",
        chicago: "#59595A",
        orangeColor: "#FEF1D7",
      },
      zIndex: {
        9999: "9999",
        999: "999",
      },
      fontSize: {},
      boxShadow: {
        blueShadow:
          "0px 101px 40px rgba(0, 87, 255, 0.02), 0px 57px 34px rgba(0, 87, 255, 0.08), 0px 25px 25px rgba(0, 87, 255, 0.13), 0px 6px 14px rgba(0, 87, 255, 0.15)",
        redShadow:
          "0px 101px 40px rgba(206, 90, 103, 0.02), 0px 57px 34px rgba(206, 90, 103, 0.08), 0px 25px 25px rgba(206, 90, 103, 0.13), 0px 6px 14px rgba(206, 90, 103, 0.15)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(107.67deg, rgba(24, 19, 38, 0.96) 23.58%, rgba(24, 19, 38, 0.879377) 47.9%, rgba(24, 19, 38, 0.911744) 61.57%, rgba(24, 19, 38, 0.880592) 70.72%, rgba(24, 19, 38, 0.94) 79.14%)",
      },
    },
    fontFamily: {
      inter: ["Urbanist", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
