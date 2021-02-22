import Vue from 'vue'
import dvdp from '../../lib'
import custom from '../../lib/store/custom.store'

let components: Components = {}
const widgetsArray: ComponentsWidgetsArray = [], widgetsObject: ComponentsWidgetsObject = {}
const conf = require.context('./', true, /\.(component.ts)$/)
const component = require.context('./', true, /index\.(vue)$/)
component.keys().forEach(name => {
    const title = name.split('/')[2]
    components[title] = component(name).default
})
conf.keys().forEach(name => {
    const type = name.split('/')[1]
    const title = name.split('/')[2]
    const obj = {config: {layout: conf(name).value ? conf(name).value.layout : {}}}
    if (obj) {
        if (widgetsObject[type]) {
            widgetsObject[type].widgets.push({...obj, type: title, label: title})
        } else {
            widgetsObject[type] = {type, label: type, widgets: [{...obj, type: title, label: title}]}
        }
    }
})
for (let key in widgetsObject) {
    widgetsArray.push(widgetsObject[key])
}

custom.actions.setCustomComponents(components)
custom.actions.setCustomWidgets({
    label: '杭燃样式',
    widgets: widgetsArray
})
Vue.component('edit', dvdp.edit)
Vue.component('detail', dvdp.detail)
Vue.component('preview', dvdp.preview)
Vue.component('full', dvdp.full)
Vue.component('local', dvdp.local)
