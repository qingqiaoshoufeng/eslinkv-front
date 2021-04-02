export const value = {
	api: {
		data: JSON.stringify({
			value: 34325,
		}),
	},
	config: {
		unit: '万m³',
		title1: '门站月度',
		title2: '累计接纳量',
	},
	layout: {
		size: {
			width: 171,
			height: 198,
		},
		position: {
			value: 'relative',
		},
	},
}

export const customConfig = [
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
		prop: 'unit',
		label: '单位',
		type: 'func-input',
	},
]
