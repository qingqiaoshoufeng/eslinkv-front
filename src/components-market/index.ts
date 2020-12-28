import {mutations} from '../../lib'

let components: any = {
	'm-test': {
		'name': 'm-test'
	}
}

const widgetsArray: Array<any> = [{
	label: '分类1',
	type: '分类1',
	widgets: [
		{
			label: 'm-test',
			type: 'm-test',
			config: {
				layout: {
					size: {
						width: 480,
						height: 226
					},
					position: {
						value: 'relative'
					}
				}
			}
		}
	]
}]
mutations.setCustomComponents(components)
mutations.setCustomWidgets({
	label: '组件市场',
	widgets: widgetsArray
})
