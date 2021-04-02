export const value = {
	api: {
		data: JSON.stringify({
			value1: 298,
			value2: 298,
			ratio: '95.3%',
		}),
	},
	config: {
		desc: '客户事故数(件)',
		desc2: '客户事故数(件)',
		videoUrl: '/static/images/airfeed/car.webm',
	},
	layout: {
		size: {
			width: 497,
			height: 200,
		},
		position: {
			value: 'relative',
		},
	},
}

export const customConfig = [
	{
		prop: 'videoUrl',
		label: '图片地址',
		type: 'func-webm',
		options: [
			'/static/images/airfeed/car.webm',
			'/static/images/airfeed/people.webm',
		],
	},
	{
		prop: 'desc',
		label: '左描述',
		type: 'func-input',
	},
	{
		prop: 'desc2',
		label: '右描述',
		type: 'func-input',
	},
]
