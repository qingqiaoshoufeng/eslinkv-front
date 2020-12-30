import {getCompList, getLevel0} from '@/api/bussiness.api'
import Vue from 'vue'

const promises: Array<any> = []

let widgetsArray: Array<any> = []

getLevel0().then(res => {
	res.forEach(child => {
		getCompList({componentTypeId: child.componentTypeId}).then(res => {
			res.forEach(list => {
				list.widgets.forEach(item => {
					promises.push(new Promise(function (resolve, reject) {
						let script = document.createElement('script')
						script.onload = (a) => {
							Vue.component(item.componentEnTitle, window.GoldChart.components[item.componentEnTitle].component)
							resolve(1)
						}
						script.src = item.componentJsUrl
						document.head.appendChild(script)
					}))
				})
			})
			widgetsArray = res
			Promise.all(promises).then(() => {
				window.GoldChart.mutations.setCustomWidgets({
					label: child.componentTypeName,
					widgets: widgetsArray
				})
			})
		})
	})
})


