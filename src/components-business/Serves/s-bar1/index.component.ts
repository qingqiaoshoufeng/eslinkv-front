import {getInput, getBooleanInput} from '../../../../lib'

export const configSource = {
	config: {
		fields: {
			color1: getInput('color1', '1颜色'),
			desc1: getInput('desc1', '1描述'),
			color2: getInput('color2', '2颜色'),
			desc2: getInput('desc2', '2描述'),
			color3: getInput('color3', '3颜色'),
			desc3: getInput('desc3', '3描述'),
			title: getInput('title', '标题'),
			lineSmooth: getBooleanInput('lineSmooth', '曲线是否平滑')
		}
	},
}
export const config = {
	animation: true,
	config: {
		color1: true,
		desc1: true,
		color2: true,
		desc2: true,
		color3: true,
		desc3: true,
		title: true,
		lineSmooth: true,
	}
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
	config: {
		color1: '#00DDFF',
		color2: '#0057A9',
		color3: '#01FDD2',
		desc1: '绑定户数',
		desc2: '抄表户数',
		desc3: '自助抄表率',
		title: '户',
		lineSmooth: true,
		hasSymbal: true,
	},
	api: {
		data: JSON.stringify([
			{
				yValue1: 120,
				yValue2: 130,
				yValue3: 30,
				xValue: '5月'
			},
			{
				yValue1: 200,
				yValue2: 400,
				yValue3: 10,
				xValue: '6月'
			},
			{
				yValue1: 150,
				yValue2: 170,
				yValue3: 20,
				xValue: '7月'
			},
			{
				yValue1: 80,
				yValue2: 100,
				yValue3: 30,
				xValue: '8月'
			},
			{
				yValue1: 70,
				yValue2: 100,
				yValue3: 30,
				xValue: '9月'
			},
			{
				yValue1: 110,
				yValue2: 110,
				yValue3: 50,
				xValue: '10月'
			},
			{
				yValue1: 130,
				yValue2: 130,
				yValue3: 30,
				xValue: '11月'
			},
		]),
	},
};
