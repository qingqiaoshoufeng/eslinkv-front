// import Vue from 'vue'
import App from './App'
import router from './router'
import './scss/reset.scss'
import './scss/index.scss'
import ESVUIPlugin from 'esvcp-pc-ui'
import './func'

Vue.use(ESVUIPlugin)

Vue.config.productionTip = false
new Vue({
	router,
	render: h => h(App)
}).$mount("#app")
