export const customConfig = [
	{
		prop: 'color1',
		label: '外圈柱形图颜色',
		type: 'func-color',
	},
	{
		prop: 'color2',
		label: '内圈柱形图颜色',
		type: 'func-color',
	},
	{
		prop: 'color3',
		label: '折线图颜色',
		type: 'func-color',
	},
	{
		prop: 'desc1',
		label: '外圈柱形图名称',
		type: 'func-input',
	},
	{
		prop: 'desc2',
		label: '内圈柱形图名称',
		type: 'func-input',
	},
	{
		prop: 'desc3',
		label: '折线图名称',
		type: 'func-input',
	},
	{
		prop: 'unit',
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
		data: JSON.stringify({
			yValue: [120, 200, 150, 80, 70, 110, 130],
			yValue1: [130, 400, 170, 100, 100, 110, 130],
			xValue: ['5月', '6月', '7月', '8月', '9月', '10月', '11月'],
		}),
	},
	config: {
		color1: '#0057A9',
		color2: '#00DDFF',
		color3: '#01FDD2',
		desc1: '已受理',
		desc2: '已办结',
		desc3: '办结率',
		unit: '单',
	},
}
