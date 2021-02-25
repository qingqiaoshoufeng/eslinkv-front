export const value = {
	api: {
		data: JSON.stringify({
			yValue1: [120, 200, 150, 80, 70, 110, 130],
			yValue2: [130, 400, 170, 100, 100, 110, 130],
			yValue3: [1, 2, 3, 6, 5, 4, 2],
			xValue: ['5月', '6月', '7月', '8月', '9月', '10月', '11月'],
		})
	},
	config: {
		legend1: '供气量',
		legend2: '销气量',
		legend3: '供销差率',
		unit1: '万m³',
		unit2: '%'
	},
	layout: {
		size: {
			width: 480,
			height: 208
		},
		position: {
			value: 'relative'
		}
	}
}

export const customConfig = [
	{
		prop: 'legend1',
		label: '折现1名称',
		type: 'func-input',
	},
	{
		prop: 'legend2',
		label: '折现2名称',
		type: 'func-input',
	},
	{
		prop: 'legend3',
		label: '折现3名称',
		type: 'func-input',
	},
	{
		prop: 'unit1',
		label: '左侧y轴单位',
		type: 'func-input',
	},
	{
		prop: 'unit2',
		label: '右侧y轴单位',
		type: 'func-input',
	},
]

