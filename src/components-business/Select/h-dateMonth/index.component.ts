import {getInput} from '../../../../lib'

export const config = {
	config: {
		links: true
	}, animation: true
}

export const configSource = {
	config: {
		fields: {
			links: getInput('links', '关联组件'),
		}
	}
}
export const value = {
	api: {
		bind: {
			enable: true,
			role: ['provider']
		}
	},
	layout: {
		size: {
			width: 127,
			height: 32
		},
		position: {
			value: 'relative'
		}
	}
}
