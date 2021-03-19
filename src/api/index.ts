// eg 文件名  map.mock.js  调用  this.$api.map.mock.xxx函数
import Vue from 'vue'
import { configMerge } from '../utils'
const context = require.context('/', false, /\.(api.js)$/)
const apis: any = {}
context.keys().forEach((name) => {
	const key = name.replace(/^\.\//, '').replace(/\.(api.js)$/, '')
	const keyArr = key.split('.')
	let content = null
	if (context(name).default) {
		content = context(name).default
	} else {
		content = context(name)
	}
	const keyArrLen = keyArr.length
	let target = apis
	keyArr.forEach((key, index) => {
		if (!target[key]) {
			target[key] = index < keyArrLen - 1 ? {} : content
		}
		target = target[key]
	})
})

if (Vue.prototype.$api) {
	Vue.prototype.$api = configMerge(apis, Vue.prototype.$api)
} else {
	Vue.prototype.$api = apis
}

