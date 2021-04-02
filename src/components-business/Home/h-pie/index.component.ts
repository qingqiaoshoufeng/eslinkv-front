export const customConfig = [
	{
		prop: 'unit',
		label: '单位',
		type: 'func-input',
	},
	{
		prop: 'title1',
		label: '标题1',
		type: 'func-input',
	},
	{
		prop: 'title2',
		label: '标题2',
		type: 'func-input',
	},
	{
		prop: 'startAngle',
		label: '起始角度',
		type: 'func-number',
	},
]

export const value = {
	layout: {
		size: {
			width: 820,
			height: 420,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify([
			{
				name: '城区1',
				value: 72,
			},
			{
				name: '城区2',
				value: 32,
			},
			{
				name: '城区3',
				value: 12,
			},
		]),
	},
	config: {
		unit: '万m³',
		title1: '区域',
		title2: '销售气量',
		startAngle: 270,
	},
}
