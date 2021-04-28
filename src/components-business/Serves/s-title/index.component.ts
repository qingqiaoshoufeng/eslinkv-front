export const customConfig = [
	{
		prop: 'desc',
		label: '描述',
		type: 'func-input',
	},
	{
		prop: 'img',
		label: '图片',
		type: 'func-image',
		options: ['/static/icons/s-title-1.svg', '/static/icons/s-title-2.svg'],
	},
]
export const value = {
	api: {
		data: JSON.stringify({
			value: 391218,
		}),
	},
	config: {
		desc: '累计受理业务(单)',
		img: '/static/icons/s-title-1.svg',
	},
	layout: {
		size: {
			width: 480,
			height: 64,
		},
		position: {
			value: 'relative',
		},
	},
}
