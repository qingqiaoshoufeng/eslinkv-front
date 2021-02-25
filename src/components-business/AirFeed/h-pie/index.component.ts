export const value = {
	layout: {
		size: {
			width: 325,
			height: 220
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify([
			{
				name: '低压',
				value: 72
			},
			{
				name: '中压',
				value: 32
			},
			{
				name: '高压',
				value: 12
			},
		])
	},
	config: {
		colors: ['#00FFCF', '#2194FF', '#E5615B'],
		unit: '件'
	}
}

export const customConfig = [
	{
		prop: 'colors',
		label: '扇形颜色',
		type: 'func-input',
	},
	{
		prop: 'unit',
		label: '单位',
		type: 'func-input',
	},
]
