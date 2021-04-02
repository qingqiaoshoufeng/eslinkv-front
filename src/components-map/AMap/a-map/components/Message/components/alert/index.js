import component from './index.vue'

const MessageAlert = function (options) {
	const Constructor = Vue.extend(component)
	const Instance = new Constructor({
		propsData: options,
	})
	Instance.$mount()
	document.getElementById('app').appendChild(Instance.$el)
	return Instance
}

export default MessageAlert
