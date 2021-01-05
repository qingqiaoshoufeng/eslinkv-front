import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Message, Modal, Switch, Select, Option, Icon } from 'view-design'
import 'view-design/dist/styles/iview.css'
import './scss/reset.scss'
import './scss/index.scss'
import './openApi'
import './components-business'
import './components-map'
import './components-market'
import directives from '../lib/directives'
import * as filters from '@/utils/filter'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import './api'
import PortalVue from 'portal-vue'
import '@babel/polyfill'
import format from 'date-fns/format'

Vue.use(PortalVue)
Vue.use(VueVideoPlayer)
Vue.component('iSwitch', Switch);
Vue.component('iSelect', Select);
Vue.component('iOption', Option);
Vue.component('iIcon', Icon);

Vue.prototype.$format = format
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
