export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: {
		enabled: true
	},
	hub: {
		db: 'sqlite'
	},
	modules: [
		'@nuxthub/core',
		'nuxt-auth-utils'
	]
});