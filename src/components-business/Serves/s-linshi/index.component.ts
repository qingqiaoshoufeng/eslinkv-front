export const customConfig = [
	{
		prop: 'index',
		label: '场景ID',
		type: 'func-input',
	},
	{
		prop: 'left',
		label: '位移',
		type: 'func-number',
	},
	{
		prop: 'img',
		label: '图片',
		type: 'func-background',
		options: ['/static/icons/数据下钻.png', '/static/icons/工商户点位弹窗.png']
	}
]
export const value = {
	layout: {
		size: {
			width: 1300,
			height: 773
		},
		position: {
			value: 'relative'
		}
	},
	config: {
		img: '/static/icons/数据下钻.png',
		index: '',
		left: 0
	}
}
