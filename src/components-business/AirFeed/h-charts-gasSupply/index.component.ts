import {data} from './options'

export const value = {
	api: {
		data: JSON.stringify(data),
	},
	config: {
		sceneId: '',
		componentId: '',
	},
	layout: {
		size: {
			width: 480,
			height: 208
		},
		position: {
			value: 'relative'
		}
	}
}

export const customConfig = [
	{
		prop: 'sceneId',
		label: '场景id',
		type: 'func-input',
	},
	{
		prop: 'componentId',
		label: '组件id',
		type: 'func-input',
	},
]
