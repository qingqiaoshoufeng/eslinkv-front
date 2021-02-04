import Vue from 'vue'
import VueRouter, {RouterOptions} from 'vue-router'

const routes: Array<any> = []
const context = require.context('./pages', true, /\.(route.js)$/)
const test = require.context('../test/pages', true, /\.(route.js)$/)
const isProduction = process.env.NODE_ENV === 'production'

context.keys().forEach(name => {
	routes.push(context(name).default)
})

if (!isProduction) {
	test.keys().forEach(name => {
		routes.push(context(name).default)
	})
}

Vue.use(VueRouter)

const router: RouterOptions = new VueRouter({
	routes: [
		...routes
	]
})

export default router
