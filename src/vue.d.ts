import VueRouter, { Route } from 'vue-router'

declare module 'vue/types/vue' {
	interface Vue {
		$route: Route
		$router: VueRouter

		emitComponentUpdate: any
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
		echarts: any
	}
}
