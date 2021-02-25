export const customConfig = [
	{
		prop: 'desc1',
		label: '扇形1名称',
		type: 'func-input',
	},
	{
		prop: 'color1',
		label: '扇形1颜色',
		type: 'func-color',
	},
	{
		prop: 'desc2',
		label: '扇形2名称',
		type: 'func-input',
	},
	{
		prop: 'color2',
		label: '扇形2颜色',
		type: 'func-color',
	}
]
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
			value1: 534,
			value2: 178
		})
	},
	config: {
		color1: '#00FFCF',
		color2: '#E5615B',
		desc1: '已受理',
		desc2: '已办结',
	}
}
