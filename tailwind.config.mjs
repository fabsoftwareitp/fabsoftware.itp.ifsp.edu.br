/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				// Mudei para 'Plus Jakarta Sans', uma fonte mais moderna e geométrica para Tech
				sans: ['"Plus Jakarta Sans"', 'sans-serif'],
			},
			colors: {
				fab: {
					bg: '#020415',
					orange: '#ff5e1e',
					orangeDark: '#ff3d00', // Para gradiente
					text: '#f8fafc'
				}
			},
			backgroundImage: {
				'hero-pattern': "linear-gradient(to bottom, rgba(2, 4, 21, 0.6), rgba(2, 4, 21, 1)), url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop')",
			}
		}
	},
	plugins: [require("@tailwindcss/typography")],
}
