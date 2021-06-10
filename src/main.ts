import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Message, Modal } from 'view-design'
import { format } from 'date-fns'
import VueVideoPlayer from 'vue-video-player'
import '@eslinkv/core/lib/core.css'
import '@eslinkv/vue2/lib/v2.css'
import 'video.js/dist/video-js.css'
import './components-business/index.ts'
import './components-map/index.ts'
import PortalVue from 'portal-vue'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './scss/index.scss'

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
			`%c${err.stack}`,
			`background:rgb(${r}, ${g}, ${b});color:#fff;padding:4px;`,
		)
	} else {
		console.log(err.stack)
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
