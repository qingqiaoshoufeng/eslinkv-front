export const value = {
	layout: {
		size: {
			width: 480,
			height: 64,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify({
			count: 123458,
		}),
	},
	config: {
		icon: '/static/icons/h-inline-logo1.svg',
		text: '',
	},
}

export const customConfig = [
	{
		prop: 'text',
		label: '描述',
		type: 'func-input',
	},
	{
		prop: 'icon',
		label: '图片',
		type: 'func-background',
		options: ['/static/icons/h-inline-logo1.svg'],
	},
]
