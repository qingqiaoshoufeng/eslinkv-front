import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

export const config = {
	animation: true,
	config: {
		color1: true,
		color2: true,
		color3: true,
		desc1: true,
		desc2: true,
		desc3: true,
		unit: true,
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
			yValue: [120, 200, 150, 80, 70, 110, 130],
			yValue1: [130, 400, 170, 100, 100, 110, 130],
			xValue: ['5月', '6月', '7月', '8月', '9月', '10月', '11月'],
		})
	},
	config: {
		color1: '#0057A9',
		color2: '#00DDFF',
		color3: '#01FDD2',
		desc1: '已受理',
		desc2: '已办结',
		desc3: '办结率',
		unit: '单',
	}
}
export const configSource = {
	config: {
		fields: {
			color1: getInput('color1', '外圈柱形图颜色'),
			color2: getInput('color2', '内圈柱形图颜色'),
			color3: getInput('color3', '折线图颜色'),
			desc1: getInput('desc1', '外圈柱形图名称'),
			desc2: getInput('desc2', '内圈柱形图名称'),
			desc3: getInput('desc3', '折线图名称'),
			unit: getInput('unit', '单位'),
		},
	},
}
