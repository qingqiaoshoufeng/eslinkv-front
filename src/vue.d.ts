import Vue from 'vue'
import VueRouter, {Route} from 'vue-router'

declare module 'vue/types/vue' {
	interface Vue {
		$api: any
		$agent: any
		$sysApi: any
		$route: Route
		$router: VueRouter

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
		GoldChart: any
		flvjs: any
	}
}

