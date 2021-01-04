import {getInput} from "@lib";

export const config = {
	animation: true,
	config: {
		color1: true,
		color2: true,
		desc1: true,
		desc2: true,
	},
};
export const value = {
	layout: {
		size: {
			width: 480,
			height: 226
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			value1: 534,
			value2: 178
		})
	},
	config: {
		color1: '#00FFCF',
		color2: '#E5615B',
		desc1: '已受理',
		desc2: '已办结',
	}
}
export const configSource = {
	config: {
		fields: {
			color1: getInput('color1', '扇形1颜色'),
			color2: getInput('color2', '扇形2颜色'),
			desc1: getInput('desc1', '扇形1名称'),
			desc2: getInput('desc2', '扇形2名称'),
		}
	},
}
