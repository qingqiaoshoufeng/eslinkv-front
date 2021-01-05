import {getInput} from '../../../../lib'

export const config = {
	animation: true,
	config: {
		title: true,
		numColor: true
	},
};
export const value = {
	layout: {
		size: {
			width: 175,
			height: 64
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			num: 0
		})
	},
	config: {
		title: '通讯异常',
		numColor: '#fff'
	}
}
export const configSource = {
	config: {
		fields: {
			title: getInput('title', '标题'),
			numColor: getInput('numColor', '数字颜色')
		}
	}
}
