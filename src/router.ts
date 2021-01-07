import Vue from 'vue'
import VueRouter, {RouterOptions} from 'vue-router'

const routes: Array<any> = []
const context = require.context('./pages', true, /\.(route.js)$/)

context.keys().forEach(name => {
    routes.push(context(name).default)
})

Vue.use(VueRouter)

const router: RouterOptions = new VueRouter({
    routes: [
        ...routes
    ]
})

export default router
