export const customConfig = [
	{
		prop: 'desc',
		label: '描述',
		type: 'func-input',
	},
	{
		prop: 'desc2',
		label: '描述2',
		type: 'func-input',
	},
	{
		prop: 'logo',
		label: '图片logo',
		type: 'func-background',
		options: [
			'/static/images/serves/s-tag1-logo1.svg',
			'/static/images/serves/s-tag1-logo2.svg',
		],
	},
]
export const value = {
	layout: {
		size: {
			width: 224,
			height: 173,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify({
			value: 22326,
			percent: 74.8,
		}),
	},
	config: {
		desc: '热线服务话务量(次)',
		desc2: '接通率',
		logo: '/static/images/serves/s-tag1-logo1.svg',
	},
}
