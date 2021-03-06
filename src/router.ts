import Vue from 'vue'
import VueRouter from 'vue-router'
import common from './store/common.store.js'

const routes: Array<any> = []
const context = require.context('./pages', true, /\.(route.js)$/)
const test = require.context('../test/pages', true, /\.(route.js)$/)
const isProduction = process.env.NODE_ENV === 'production'
const buildMode = process.env.VUE_APP_BUILD_MODE

context.keys().forEach(name => {
	if (buildMode === 'FULL_PLATFORM') {
		routes.push(context(name).default)
	} else {
		if (context(name).default.mode) {
			if (context(name).default.mode.indexOf(buildMode) !== -1) {
				routes.push(context(name).default)
			} else {
				const item = context(name).default
				item.component = () => import('./pages/Error/401.vue')
				routes.push(item)
			}
		}
	}
})

if (!isProduction) {
	test.keys().forEach(name => {
		routes.push(test(name).default)
	})
}

Vue.use(VueRouter)

const router: any = new VueRouter({
	mode: 'history',
	base: process.env.VUE_APP_ER ? '/eslinkV/' : '/',
	routes: [
		...routes,
		{
			path: '/401',
			name: '401',
			meta: {
				requireAuth: false,
			},
			component: () => import('./pages/Error/401.vue'),
		},
		{
			path: '/404',
			name: '404',
			meta: {
				requireAuth: false,
			},
			component: () => import('./pages/Error/404.vue'),
		},
	],
})
router.beforeEach((to, _from, next) => {
	if (to.meta.requireAuth) {
		if (common.state.user || localStorage.getItem('eslinkv-login')) {
			next()
		} else {
			next('/login')
		}
	} else {
		next()
	}
})
export default router
