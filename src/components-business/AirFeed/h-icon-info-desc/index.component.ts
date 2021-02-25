export const value = {
	config: {
		icon: '/static/icons/h-icon-info-desc-1.svg',
		desc: '热线服务业务受理分析(次)',
	},
	layout: {
		size: {
			width: 480,
			height: 44
		},
		position: {
			value: 'relative'
		}
	}
}

export const customConfig = [
	{
		prop: 'desc',
		label: '描述',
		type: 'func-input',
	},
	{
		prop: 'icon',
		label: '图片',
		type: 'func-background',
		options: [
			'/static/icons/phone-border.svg',
			'/static/icons/h-icon-info-desc-1.svg',
		]
	}
]
