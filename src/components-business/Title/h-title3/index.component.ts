const customConfig = [
	{
		prop: 'color',
		label: '颜色',
		type: 'func-color',
	},
	{
		prop: 'suffix',
		label: '后缀',
		type: 'func-input',
	},
	{
		prop: 'subTitle',
		label: '副标题',
		type: 'func-input',
	},
	{
		prop: 'background',
		label: '背景图片',
		type: 'func-image',
		options: [
			'/static/icons/h-title3-1.svg',
			'/static/icons/h-title3-2.svg',
			'/static/icons/h-title3-3.svg',
			'/static/icons/h-title3-4.svg',
		],
	},
]

const value = {
	layout: {
		size: {
			width: 220,
			height: 58,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify({
			title: 1000,
		}),
	},
	config: {
		background: '/static/icons/h-title3-1.svg',
		suffix: '台',
		color: 'rgba(0,221,255,1)',
		subTitle: '分户供暖用户',
	},
}

export { customConfig, value }
