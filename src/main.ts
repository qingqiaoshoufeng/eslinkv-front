import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Message, Modal, Switch, Select, Option, Icon} from 'view-design'
import './scss/reset.scss'
import './scss/index.scss'
import './openApi'
import './components-business'
import './components-map'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import './api'
import PortalVue from 'portal-vue'
import '@babel/polyfill'
import 'eslink-npm'

Vue.use(PortalVue)
Vue.use(VueVideoPlayer)
Vue.component('iSwitch', Switch);
Vue.component('iSelect', Select);
Vue.component('iOption', Option);
Vue.component('iIcon', Icon);

Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.config.productionTip = false


new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app')
