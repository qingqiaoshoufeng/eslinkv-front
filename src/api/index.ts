// eg 文件名  map.mock.js  调用  this.$sysApi.map.mock.xxx函数
import Vue from 'vue'

const context = require.context('/', false, /\.(api.js)$/)
const apis: any = {}
context.keys().forEach((name) => {
	let key = name.replace(/^\.\//, '').replace(/\.(api.js)$/, '')
	let keyArr = key.split('.')
	let content = null
	if (context(name).default) {
		content = context(name).default
	} else {
		content = context(name)
	}
	let keyArrLen = keyArr.length
	let target = apis
	keyArr.forEach((key, index) => {
		if (!target[key]) {
			target[key] = index < keyArrLen - 1 ? {} : content
		}
		target = target[key]
	})
})

Vue.prototype.$sysApi = apis
