/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
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
					orange500: "#F97316",
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
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
