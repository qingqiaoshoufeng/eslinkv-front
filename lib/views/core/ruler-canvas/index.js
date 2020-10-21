import rulerCanvas from './ruler-canvas.vue'
// import Vue from 'vue'
rulerCanvas.install = function (Vue) {
  Vue.component(rulerCanvas.name, rulerCanvas)
}

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(rulerCanvas)
}


export default rulerCanvas
