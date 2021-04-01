import { custom } from 'eslinkv-npm'

const components = {}; const snapshots = {}
const widgetsObject = []
const w = {}
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
	const typeOne = name.split('/')[1]
	const typeTwo = name.split('/')[2]
	const componentConfig = { ...conf(name).value, componentEnTitle: typeTwo }
	const componentAvatar = snapshots[typeTwo]
	if (componentConfig) {
		if (w[typeOne]) {
			widgetsObject[widgetsObject.length - 1].children.push({
				componentId: Date.now(),
				componentConfig,
				componentTitle: typeTwo,
				componentEnTitle: typeTwo,
				componentAvatar,
				market: false
			})
		} else {
			w[typeOne] = true
			widgetsObject.push({
				componentTypeName: typeOne,
				componentTypeEnName: typeOne,
				componentTypeId: typeOne,
				market: false,
				children: [{
					componentId: Date.now(),
					componentConfig,
					market: false,
					componentTitle: typeTwo,
					componentEnTitle: typeTwo,
					componentTypeId: typeTwo,
					componentAvatar
				}]
			})
		}
	}
})
const obj = {
	地图: {
		componentTypeName: '地图',
		componentTypeEnName: '地图',
		componentTypeId: '地图',
		market: false,
		children: widgetsObject
	}
}
custom.actions.setCustomComponents(components)
custom.actions.setCustomWidgets(obj)
