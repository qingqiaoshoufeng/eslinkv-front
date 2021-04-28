export const value = {
	api: {
		data: JSON.stringify({
			value: 73,
		}),
	},
	config: {
		title: '巡检点数(点)',
		img: '/static/icons/h-des1-1.svg',
	},
	layout: {
		size: {
			width: 314,
			height: 56,
		},
		position: {
			value: 'relative',
		},
	},
}

export const customConfig = [
	{
		prop: 'img',
		label: '图形',
		type: 'func-image',
		options: [
			'/static/icons/h-des1-1.svg',
			'/static/icons/h-des1-2.svg',
			'/static/icons/h-des1-3.svg',
		],
	},
	{
		prop: 'title',
		label: '标题',
		type: 'func-input',
	},
]
