import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Message, Modal, Switch, Select, Option, Icon} from 'view-design'
import {format} from 'date-fns'
// import './scss/reset.scss'
// import './scss/index.scss'
import './openApi'
import './components-business'
import './components-map'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import './api'
import PortalVue from 'portal-vue'
import '@babel/polyfill'
import 'eslinkv-npm'
import eLeft from './components/ELeft/index.vue'
import eLayout from './components/ELayout/index.vue'

Vue.use(PortalVue)
Vue.use(VueVideoPlayer)
Vue.component('iSwitch', Switch)
Vue.component('iSelect', Select)
Vue.component('iOption', Option)
Vue.component('iIcon', Icon)
Vue.component('e-left', eLeft)
Vue.component('e-layout', eLayout)

Vue.prototype.$format = format
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.config.productionTip = false

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app')
