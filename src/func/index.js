import dvdp from 'dvdp'
import test from './test'
import table from './table'

const widgetsArray = [], widgetsObject = {}
const component = require.context('./', true, /\.(component.js)$/)
component.keys().forEach(name => {
	const obj = component(name).default
	if (widgetsObject[obj.type]) {
		widgetsObject[obj.type].widgets.push(...obj.widgets)
	} else {
		widgetsObject[obj.type] = obj
	}
})
for (let key in widgetsObject) {
	widgetsArray.push(widgetsObject[key])
}
const obj = {
	widgets: widgetsArray,
	components: {
		'diy-test': test,
		'diy-table': table,
	}
}
const dvdpExample = new dvdp(obj)
Vue.component('edit', dvdpExample.edit())
Vue.component('preview', dvdpExample.preview())
