// import Vue from 'vue'
// import VueRouter from 'vue-router'

const routes = []
const context = require.context('./pages', true, /\.(route.js)$/)

context.keys().forEach(name => {
	routes.push(context(name).default)
})

// Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		...routes,
	]
})

export default router
