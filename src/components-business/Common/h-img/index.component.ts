export const value = {
	layout: {
		size: {
			width: 500,
			height: 500
		},
		position: {
			value: 'relative'
		}
	},
	config: {
		img: '/static/mock/test1.png'
	}
}

export const customConfig = [
	{
		prop: 'img',
		label: '图片',
		type: 'func-background',
		options: ['/static/mock/test1.png', '/static/mock/test2.png', '/static/mock/test3.png']
	}
]
