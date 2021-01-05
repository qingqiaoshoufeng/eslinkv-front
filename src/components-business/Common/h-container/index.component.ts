import {getInput} from '../../../../lib'

export const config = {
	animation: true,
	config: {
		title: true
	},
};
export const value = {
	layout: {
		size: {
			width: 820,
			height: 862
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({})
	},
	config: {
		title: '供气量'
	}
}
export const configSource = {
	config: {
		fields: {
			title: getInput('title', '标题')
		}
	}
}
