export const customConfig = [
	{
		prop: 'color1',
		label: '颜色1',
		type: 'func-color',
	},
	{
		prop: 'color2',
		label: '颜色2',
		type: 'func-color',
	},
	{
		prop: 'desc1',
		label: '名称1',
		type: 'func-input',
	},
	{
		prop: 'desc2',
		label: '名称2',
		type: 'func-input',
	},
	{
		prop: 'title',
		label: '单位',
		type: 'func-input',
	},
]

export const value = {
	layout: {
		size: {
			width: 480,
			height: 226,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify([
			{
				yValue: 120,
				yValue1: 130,
				xValue: '5月',
			},
			{
				yValue: 200,
				yValue1: 400,
				xValue: '6月',
			},
			{
				yValue: 150,
				yValue1: 170,
				xValue: '7月',
			},
			{
				yValue: 80,
				yValue1: 100,
				xValue: '8月',
			},
			{
				yValue: 70,
				yValue1: 100,
				xValue: '9月',
			},
			{
				yValue: 110,
				yValue1: 110,
				xValue: '10月',
			},
			{
				yValue: 130,
				yValue1: 130,
				xValue: '11月',
			},
		]),
	},
	config: {
		color2: '#00DDFF',
		color1: '#0057A9',
		desc1: '产量',
		desc2: '销量',
		title: '户',
	},
}
