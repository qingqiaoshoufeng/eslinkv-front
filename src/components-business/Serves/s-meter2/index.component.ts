export const customConfig = [
	{
		prop: 'desc1',
		label: '描述1',
		type: 'func-input'
	},
	{
		prop: 'img1',
		label: '图片1地址',
		type: 'func-background',
		options: ['/static/icons/s-meter-1.svg', '/static/icons/s-meter-2.svg', '/static/icons/s-meter-3.svg', '/static/icons/s-meter-4.svg']
	},
	{
		prop: 'desc2',
		label: '描述2',
		type: 'func-input'
	},
	{
		prop: 'img2',
		label: '图片2地址',
		type: 'func-background',
		options: ['/static/icons/s-meter-1.svg', '/static/icons/s-meter-2.svg', '/static/icons/s-meter-3.svg', '/static/icons/s-meter-4.svg']
	}
]
export const value = {
	layout: {
		size: {
			width: 992,
			height: 188
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify([
			{
				date: '2020.06',
				rate1: 0.8,
				rate2: 0.5,
				num1: 674,
				num2: 236,
				percent: 56
			},
			{
				date: '2020.07',
				rate1: 0.9,
				rate2: 0.3,
				num1: 674,
				num2: 653,
				percent: 80
			},
			{
				date: '2020.08',
				rate1: 0.9,
				rate2: 0.7,
				num1: 674,
				num2: 234,
				percent: 75
			},
			{
				date: '2020.09',
				rate1: 0.2,
				rate2: 0.5,
				num1: 674,
				num2: 236,
				percent: 22
			},
			{
				date: '2020.10',
				rate1: 0.8,
				rate2: 0.5,
				num1: 78,
				num2: 236,
				percent: 33
			},
			{
				date: '2020.11',
				rate1: 0.4,
				rate2: 0.75,
				num1: 543,
				num2: 236,
				percent: 44
			}
		])
	},
	config: {
		desc1: '计划抄表数',
		desc2: '实际抄表数',
		img1: '/static/icons/s-meter-1.svg',
		img2: '/static/icons/s-meter-2.svg'
	}
}
