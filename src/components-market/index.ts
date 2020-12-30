import {mutations} from '../../lib'
import { getCompList,getLevel0 } from '@/api/bussiness.api'
import Vue from 'vue'

const promises: Array<any> = []

let widgetsArray: Array<any> = []

getLevel0().then(res=>{
	console.log(res)
	res.forEch(item=>{
		console.log(item)
	})
})

getCompList({typeId: 2}).then(res => {
	res.forEach(list => {
		list.widgets.forEach(item => {
			promises.push(new Promise(function (resolve, reject) {
				let script = document.createElement('script')
				script.onload = (a) => {
					Vue.component(item.type, window.GoldChart[item.type].component)
					resolve(1)
				}
				script.src = item.jsUrl
				document.head.appendChild(script)
			}))
		})
	})
	widgetsArray = res
	Promise.all(promises).then(() => {
		mutations.setCustomWidgets({
			label: '组件市场',
			widgets: widgetsArray
		})
	})
})
