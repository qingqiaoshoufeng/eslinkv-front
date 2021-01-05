import {getInput} from '../../../../lib'

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
			height: 214
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify([
			{
				x: '05月',
				a: 50,
				b: 40,
				c: 10
			},
			{
				x: '06月',
				a: 23,
				b: 18,
				c: 5
			},
			{
				x: '07月',
				a: 52,
				b: 42,
				c: 10
			},
			{
				x: '08月',
				a: 15,
				b: 11,
				c: 4
			},
			{
				x: '08月',
				a: 38,
				b: 26,
				c: 12
			},
			{
				x: '10月',
				a: 51,
				b: 35,
				c: 16
			},
		])
	},
	config: {
		color1: '#00DDFF',
		color2: '#00FFCF',
		color3: '#E5615B',
		desc1: '申请数量',
		desc2: '审核通过',
		desc3: '审核未通过',
		unit: '单',
	}
}
export const configSource = {
	config: {
		fields: {
			color1: getInput('color1', '颜色1'),
			color2: getInput('color2', '颜色2'),
			color3: getInput('color2', '颜色3'),
			desc1: getInput('desc1', '名称1'),
			desc2: getInput('desc2', '名称2'),
			desc3: getInput('desc3', '名称3'),
			unit: getInput('unit', '单位'),
		}
	},
}
