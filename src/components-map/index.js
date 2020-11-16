
//1、
// Example 内 待迁移

// 2、
// 参考下其他组件
// 外面会有一级套着的必须有的公共div和样式
// 判断当前store.scene.status是否在inPreview
// 如果是inEdit 返回一张缩略图

// 3、
// 参考business-components
// 自动加载map组件，添加在store的custom中
// 否则会因为组件未注册，不展示改组件

// 4、
// business-components ----》components-business


import {mutations} from '../../lib'

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
mutations.setCustomComponents(components)
mutations.setCustomWidgets({
	label: '地图',
	widgets: widgetsArray
})