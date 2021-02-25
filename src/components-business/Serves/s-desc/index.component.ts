export const customConfig = [
	{
		prop: 'numColor',
		label: '数字颜色',
		type: 'func-color',
	},
	{
		prop: 'title',
		label: '标题',
		type: 'func-input',
	}
]
export const value = {
	layout: {
		size: {
			width: 175,
			height: 64
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			num: 0
		})
	},
	config: {
		title: '通讯异常',
		numColor: '#fff'
	}
}

