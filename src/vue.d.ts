import VueRouter, { Route } from 'vue-router'

declare module 'vue/types/vue' {
	interface Vue {
		$api: any
		$agent: any
		$route: Route
		$router: VueRouter
		$screen: any
		$ruler: any

		emitComponentUpdate: any
		kanboardEditor: any
		configSource: any
		configValue: any
		parseConfigSource: any
		parseConfigValue: any
	}
}

declare global {
	interface Window {
		flvjs: any
		eslinkV: any
	}
}
