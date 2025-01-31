/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },

    screens: {
      xs: "450px",
      // => @media (min-width: 450px) { ... }

      sm: "575px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }

      "2xl": "1400px",
      // => @media (min-width: 1400px) { ... }

      "3xl": "1787px",
      // => @media (min-width: 1787px) { ... }

      "4xl": "1987px",
      // => @media (min-width: 1987px) { ... }
    },
    extend: {
      colors: {
        background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				accent: 'var(--accent)',
				orange: {
					orange50: "#FFF7ED",
					orange100: "#FFEDD5",
					orange200: "#FED7AA",
					orange300: "#FDBA74",
					orange500: "#9f1127",
					orange600: "#EA580C"
				},
				current: "currentColor",
				transparent: "transparent",
				white: "#FFFFFF",
				black: "#121723",
				thinDark: "#171717",
				dark: "#1D2430",
				low_primary: "#D1FAE5",
				dim_primary: "#BBF7D0",
				light_primary: "#4ADE80",
				thin_primary: "#f0fdf4",
				medium_primary: "#22C55E",
				primary: "#15803d",
				yellow: "#FBB040",
				red: "#ff3131",
				blue: {
					Sky: "#87CEEB",
					Light: "#2563EB",
					Powder: "#B0E0E6",
					Alice: "#F0F8FF",
					dark: "#0073CF"
				},
				gray: {
					dark: "#1E232E",
					medium: "#4B5563",
					mediumLight: "#9CA3AF",
					thin: "#d1d5db",
					extrathin: "#f3f4f69e",
					light: "#F0F2F9",
					low: "#f3f4f6",
				}
      },

      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
        two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
        "sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
        "feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
        submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
        "submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
        btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
        "btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
        "btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
      },
      dropShadow: {
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
      },
    },
  },

  
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
