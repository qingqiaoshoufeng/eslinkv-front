import {getInput, getSelect} from "@lib/views/core/widgets/parts/lib/config-tools";

export const value = {
	api: {
		data: JSON.stringify({
			value1: 96,
			value2: 3,
		}),
	},
	config: {
		background: '/static/images/airfeed/carout01.webm',
		color: JSON.stringify([0, 255, 207]),
		desc1: '抢修{x}分钟',
		desc2: '出车率',
	},
	layout: {
		size: {
			width: 200,
			height: 200
		},
		position: {
			value: 'relative'
		}
	}
}

export const configSource = {
	config: {
		fields: {
			background: getSelect('background', '背景图片', [
				'/static/images/airfeed/carout01.webm',
				'/static/images/airfeed/carout02.webm',
			]),
			color: getInput('color', '颜色'),
			desc1: getInput('desc1', '描述1'),
			desc2: getInput('desc2', '描述2'),
		},
	},
}

export const config = {
	animation: true,
	config: {
		background: true,
		color: true,
		desc1: true,
		desc2: true,
	},
}

