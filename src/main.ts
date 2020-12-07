import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Message, Modal, Switch } from 'view-design'
import 'view-design/dist/styles/iview.css'
import './scss/reset.scss'
import './scss/index.scss'
import './business-components'
import './components-map'
import { debug } from '../plugins'
import directives from '../lib/directives'
import * as filters from '@/utils/filter'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import './api/index.js'
import PortalVue from 'portal-vue'
import '@babel/polyfill'
// import 'es6-promise/auto'
// import Es6Promise from 'es6-promise'

// require('es6-promise').polyfill()
// Es6Promise.polyfill()

// import './utils/rem';

// import "core-js/stable";
// import "regenerator-runtime/runtime"


Vue.use(PortalVue)
Vue.use(VueVideoPlayer)
Vue.component('iSwitch', Switch);
Vue.prototype.$debug = debug
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.config.productionTip = false

Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key])
})
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app')
