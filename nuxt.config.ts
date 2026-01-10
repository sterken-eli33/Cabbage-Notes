export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: {
		enabled: true
	},
	hub: {
		db: 'sqlite'
	},
	css: [
		'~/assets/css/main.css'
	],
	modules: [
		'@nuxt/ui',
		'@nuxthub/core',
		'nuxt-auth-utils'
	]
});