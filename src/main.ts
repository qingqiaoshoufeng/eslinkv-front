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
import 'eslinkv-sdk/lib/eslinkv-sdk.css'
import eLayout from './components/e-layout/index.vue'
import eCard from './components/e-card/index.vue'
import eHeader from './components/e-header/index.vue'
import ePage from './components/e-page/index.vue'

Vue.use(PortalVue)
Vue.use(VueVideoPlayer)

Vue.component('e-layout', eLayout)
Vue.component('e-card', eCard)
Vue.component('e-header', eHeader)
Vue.component('e-page', ePage)

const errorHandler = (err, vm) => {
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)
	if (vm.configValue) {
		console.log(
			`%c${vm.configValue.widget.name} ${vm.configValue.widget.componentVersion} 有错误信息！！！`,
			`background:rgb(${r}, ${g}, ${b});color:#fff;padding:4px;`,
		)
		console.log(
			`%c${err}`,
			`background:rgb(${r}, ${g}, ${b});color:#fff;padding:4px;`,
		)
	}
}

Vue.config.errorHandler = errorHandler
Vue.prototype.$format = format
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
