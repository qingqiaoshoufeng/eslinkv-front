import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Message, Modal} from 'view-design'
import 'view-design/dist/styles/iview.css'
import './scss/reset.scss'
import './scss/index.scss'
import './business-components'
import {debug} from '../plugins'
import directives from '../lib/directives'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

Vue.use(VueVideoPlayer)
Vue.prototype.$debug = debug
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.config.productionTip = false

Object.keys(directives).forEach((key) => {
	Vue.directive(key, directives[key])
})
new Vue({
	router,
	render: h => h(App)
}).$mount("#app")
