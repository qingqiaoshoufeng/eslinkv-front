import Vue from 'vue'
import dvdp, {mutations} from '../../lib'

let components = {}
const widgetsArray = [], widgetsObject = {}
const conf = require.context('./', true, /\.(component.js)$/)
const component = require.context('./', true, /index\.(vue)$/)
component.keys().forEach(name => {
	const title = name.split('/')[2]
	components[title] = component(name).default
})
conf.keys().forEach(name => {
	const type = name.split('/')[1]
	const title = name.split('/')[2]
	const obj = conf(name).default
	if (widgetsObject[type]) {
		widgetsObject[type].widgets.push({...obj, type: title})
	} else {
		widgetsObject[type] = {type, label: type, widgets: [{...obj, type: title}]}
	}
})
for (let key in widgetsObject) {
	widgetsArray.push(widgetsObject[key])
}
mutations.setCustomComponents(components)
mutations.setCustomWidgets(widgetsArray)
Vue.component('new', dvdp.new)
Vue.component('edit', dvdp.edit)
Vue.component('preview', dvdp.preview)
