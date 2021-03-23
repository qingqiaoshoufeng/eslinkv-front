import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Message, Modal } from 'view-design'
import { format } from 'date-fns'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import './api'
import './components-business-api'
import './components-map-api'
import './components-business/index.ts'
import './components-map/index.ts'
import PortalVue from 'portal-vue'
import '@babel/polyfill'
import 'eslinkv-npm'
import eLeft from './components/e-left/index.vue'
import eLayout from './components/e-layout/index.vue'
import eHeader from './components/e-header/index.vue'
import ePage from './components/e-page/index.vue'

Vue.use(PortalVue)
Vue.use(VueVideoPlayer)

Vue.component('e-left', eLeft)
Vue.component('e-layout', eLayout)
Vue.component('e-header', eHeader)
Vue.component('e-page', ePage)

Vue.prototype.$format = format
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.config.productionTip = false

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app')
