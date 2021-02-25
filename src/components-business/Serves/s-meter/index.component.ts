export const customConfig = [
	{
		prop: 'desc1',
		label: '描述1',
		type: 'func-input',
	},
	{
		prop: 'img1',
		label: '图片1',
		type: 'func-background',
		options: ['/static/icons/s-meter-1.svg', '/static/icons/s-meter-2.svg', '/static/icons/s-meter-3.svg', '/static/icons/s-meter-4.svg']
	},
	{
		prop: 'desc2',
		label: '描述2',
		type: 'func-input',
	},
	{
		prop: 'img2',
		label: '图片2',
		type: 'func-background',
		options: ['/static/icons/s-meter-1.svg', '/static/icons/s-meter-2.svg', '/static/icons/s-meter-3.svg', '/static/icons/s-meter-4.svg']
	},
	{
		prop: 'desc',
		label: '描述',
		type: 'func-input',
	}
]
export const value = {
	api: {
		data: JSON.stringify([
			{
				name: '安装工单',
				rate1: 0.8,
				rate2: 0.5,
				num1: 674,
				num2: 236,
				percent: 36,
				finishRate: 56
			},
			{
				name: '维修工单',
				rate1: 0.9,
				rate2: 0.3,
				num1: 674,
				num2: 653,
				percent: 44,
				finishRate: 32
			},
			{
				name: '通气点火',
				rate1: 0.9,
				rate2: 0.7,
				num1: 674,
				num2: 234,
				percent: 19,
				finishRate: 66
			},
			{
				name: '拆迁改工单',
				rate1: 0.2,
				rate2: 0.5,
				num1: 674,
				num2: 236,
				percent: 1,
				finishRate: 84
			}
		])
	},
	config: {
		desc: '抄表率',
		desc1: '计划抄表数',
		desc2: '实际抄表数',
		img1: '/static/icons/s-meter-1.svg',
		img2: '/static/icons/s-meter-2.svg',
	},
	layout: {
		size: {
			width: 992,
			height: 188
		},
		position: {
			value: 'relative'
		}
	}
}
