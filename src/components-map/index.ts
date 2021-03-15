import custom from 'eslinkv-npm/src/store/custom.store'

const components = {}; const snapshots = {}
const widgetsObject = {}
const conf = require.context('./', true, /\.(component.js)$/)
const component = require.context('./', true, /index\.(vue)$/)
const snapshot = require.context('./', true, /snapshot\.(jpg|png)$/)
snapshot.keys().forEach(name => {
	const title = name.split('/')[2]
	snapshots[title] = snapshot(name)
})
component.keys().forEach(name => {
	const title = name.split('/')[2]
	components[title] = component(name).default
})
conf.keys().forEach(name => {
	const type = name.split('/')[1]
	const title = name.split('/')[2]
	const obj = { config: { layout: conf(name).value ? conf(name).value.layout : {} } }
	const snapshot = snapshots[title] || 'https://via.placeholder.com/150'
	if (obj) {
		if (widgetsObject[type]) {
			widgetsObject[type].widgets[title] = { ...obj, type: title, label: title, snapshot }
		} else {
			widgetsObject[type] = {
				type,
				label: type,
				widgets: { [title]: { ...obj, type: title, label: title, snapshot } }
			}
		}
	}
})

custom.actions.setCustomComponents(components)
custom.actions.setCustomWidgets({
	label: '地图',
	widgets: widgetsObject
})
