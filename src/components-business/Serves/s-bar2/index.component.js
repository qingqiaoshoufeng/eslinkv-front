import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

export const config = {
	animation: true,
	config: {
		color2: true,
		color1: true,
		desc1: true,
		desc2: true,
		title: true,
	}
}
export const configSource = {
	config: {
		fields: {
			color1: getInput('color1', '颜色1'),
			color2: getInput('color2', '颜色2'),
			desc1: getInput('desc1', '名称1'),
			desc2: getInput('desc2', '名称2'),
			title: getInput('title', '单位'),
		},
	},
}
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
		data: JSON.stringify([
			{
				yValue: 120,
				yValue1: 130,
				xValue: '5月'
			},
			{
				yValue: 200,
				yValue1: 400,
				xValue: '6月'
			},
			{
				yValue: 150,
				yValue1: 170,
				xValue: '7月'
			},
			{
				yValue: 80,
				yValue1: 100,
				xValue: '8月'
			},
			{
				yValue: 70,
				yValue1: 100,
				xValue: '9月'
			},
			{
				yValue: 110,
				yValue1: 110,
				xValue: '10月'
			},
			{
				yValue: 130,
				yValue1: 130,
				xValue: '11月'
			},
		]),
	},
	config: {
		color2: '#00DDFF',
		color1: '#0057A9',
		desc1: '产量',
		desc2: '销量',
		title: '户'
	}
};
