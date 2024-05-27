/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		extend: {
			colors: {
				primary: '#fe5e26' ,
				secondary: '#f3e5ab' ,
				background: '#020122',
				dark: '#252A34' ,
				light: '#EAEAEA' ,
			},
			backgroundImage: {
				'hero-pattern':
				  "linear-gradient(to right bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress%20cs=tinysrgb&w=1260&h=750&dpr=1')",
			},
		},
		fontFamily: {
			'sans': ['Open Sans', 'ui-sans-serif', 'system-ui']
		}
	},
	plugins: [require("@tailwindcss/typography")],
}
