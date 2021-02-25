export const value = {
	api: {
		data: JSON.stringify({
			value1: 96,
			value2: 3,
		}),
	},
	config: {
		background: '/static/images/airfeed/carout01.webm',
		color: JSON.stringify([0, 255, 207]),
		desc1: '抢修{x}分钟',
		desc2: '出车率',
	},
	layout: {
		size: {
			width: 200,
			height: 200
		},
		position: {
			value: 'relative'
		}
	}
}

export const customConfig = [
	{
		prop: 'background',
		label: '背景图片',
		type: 'func-webm',
		options: [
			'/static/images/airfeed/carout01.webm',
			'/static/images/airfeed/carout02.webm',
		]
	},
	{
		prop: 'color',
		label: '颜色',
		type: 'func-input',
	},
	{
		prop: 'desc1',
		label: '描述1',
		type: 'func-input',
	},
	{
		prop: 'desc2',
		label: '描述2',
		type: 'func-input',
	},
]
