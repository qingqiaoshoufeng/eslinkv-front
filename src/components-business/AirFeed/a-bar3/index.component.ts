import {getInput} from '../../../../lib'

export const value = {
	api: {
		data: JSON.stringify({
			yValue: [120, 200, 150, 80, 70, 110, 130],
			yValue1: [130, 400, 170, 100, 100, 110, 130],
			xValue: ['5月', '6月', '7月', '8月', '9月', '10月', '11月'],
		}),
	},
	config: {
		color1: '#00DDFF',
		color2: 'rgba(1,253,210,1)',
		desc1: '加气量',
		desc2: '加气车次',
		title: 'm³',
	},
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

export const configSource = {
	config: {
		fields: {
			color1: getInput('color1', '条形图颜色'),
			color2: getInput('color2', '折线图颜色'),
			desc1: getInput('desc1', '条形图名称'),
			desc2: getInput('desc2', '折线图名称'),
			title: getInput('title', '条形图单位'),
		},
	},
}

export const config = {
	animation: true,
	config: {
		color1: true,
		color2: true,
		desc1: true,
		desc2: true,
		title: true,
	},
}

