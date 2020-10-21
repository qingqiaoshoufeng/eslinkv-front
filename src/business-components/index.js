import dvdp from '../../lib'
import diyTest from './Example/diy-test'
import hTable from './HangRan/h-table'

const components = {
	diyTest,
	hTable,
}
const widgetsArray = [], widgetsObject = {}
const component = require.context('./', true, /\.(component.js)$/)
component.keys().forEach(async name => {
	const type = name.split('/')[1]
	const title = name.split('/')[2]
	const obj = component(name).default
	if (widgetsObject[type]) {
		widgetsObject[type].widgets.push({...obj, type: title})
	} else {
		widgetsObject[type] = {type, label: type, widgets: [{...obj, type: title}]}
	}
})
for (let key in widgetsObject) {
	widgetsArray.push(widgetsObject[key])
}

const obj = {
	widgets: widgetsArray,
	components
}
const dvdpExample = new dvdp(obj)
Vue.component('edit', dvdpExample.edit())
Vue.component('preview', dvdpExample.preview())
