import {mutations} from '../../lib'
import Vue from 'vue'

const array: Array<any> = [
	{
		img: '',
		jsUrl: 'https://cdn.shenzhepei.com/test/app.818b53c3.js',
		type: 'm-test'
	}
]

const promises: Array<any> = []

array.forEach(item => {
	promises.push(new Promise(function (resolve, reject) {
		let script = document.createElement('script')
		script.onload = (a) => {
			Vue.component(item.type, window.GoldChart[item.type].component)
		}
		script.src = item.jsUrl
		document.head.appendChild(script)
	}))
})
Promise.all(promises).then(() => {
})

const widgetsArray: Array<any> = [{
	label: '分类1',
	type: '分类1',
	widgets: [
		{
			label: 'm-test',
			type: 'm-test',
			config: {
				layout: {
					size: {
						width: 480,
						height: 226
					},
					position: {
						value: 'relative'
					}
				}
			}
		}
	]
}]

mutations.setCustomWidgets({
	label: '组件市场',
	widgets: widgetsArray
})
