import {getInput} from '../../../../lib';

export const config = {
	animation: true,
	config: {
		color1: true,
		color2: true,
		desc1: true,
		desc2: true,
		title: true,
	},
};
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
};
export const value = {
	api:{
		data:JSON.stringify({
				yValue: [120, 200, 150, 80, 70, 110, 130],
				yValue1: [30, 60, 100, 70, 40, 10, 60],
				xValue: ['5月', '6月', '7月', '8月', '9月', '10月', '11月'],
			}
		)
	},
	layout: {
		size: {
			width: 480,
			height: 226
		},
		position: {
			value: 'relative'
		}
	},
	config: {
		color1: '#00DDFF',
		color2: 'rgba(1,253,210,1)',
		desc1: '第三方破坏',
		desc2: '同比',
		title: '次',
	},
};
