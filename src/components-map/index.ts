let components: Components = {}
const widgetsArray: ComponentsWidgetsArray = [], widgetsObject: ComponentsWidgetsObject = {}
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

window.GoldChart.mutations.setCustomComponents(components)
window.GoldChart.mutations.setCustomWidgets({
    label: '地图',
    widgets: widgetsArray
})
