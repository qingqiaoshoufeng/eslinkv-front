import {mutations} from '../../lib'
import {getCompList, getLevel0} from '@/api/bussiness.api'
import Vue from 'vue'

const promises: Array<any> = []

let widgetsArray: Array<any> = []

getLevel0().then(res => {
	res.forEach(child => {
		getCompList({typeId: child.id}).then(res => {
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
					label: child.name,
					widgets: widgetsArray
				})
			})
		})
	})
})


