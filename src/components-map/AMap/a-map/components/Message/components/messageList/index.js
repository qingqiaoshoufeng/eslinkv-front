import component from './index.vue'

const MessageAlert = function (options) {
	const Constructor = Vue.extend(component)
	const Instance = new Constructor(options)
    Instance.$mount()
	document.getElementById('app').appendChild(Instance.$el)
}

export default MessageAlert
