import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './scss/reset.scss'
import './scss/index.scss'
import dataV from '@jiaminghi/data-view'
import ESVUIPlugin from 'esvcp-pc-ui'
import './business-components'

Vue.use(ESVUIPlugin)
Vue.use(dataV)
Vue.config.productionTip = false
new Vue({
	router,
	render: h => h(App)
}).$mount("#app")
