import {getInput} from '../../../../lib'
import {data} from "./options";

export const configSource = {
	config: {
		fields: {
			sceneId: getInput('sceneId', '场景id'),
			componentId: getInput('componentId', '组件id'),
		},
	},
}

export const config = {
	animation: true,
	config: {
		sceneId: true,
		componentId: true,
	},
}
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
