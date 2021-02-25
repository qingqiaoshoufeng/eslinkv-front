export const customConfig = [
	{
		prop: 'desc1',
		label: '描述1',
		type: 'func-input',
	},
	{
		prop: 'img1',
		label: '图片1地址',
		type: 'func-input',
	},
	{
		prop: 'desc2',
		label: '描述2',
		type: 'func-input',
	},
	{
		prop: 'img2',
		label: '图片2地址',
		type: 'func-input',
	},
	{
		prop: '饼图名称',
		label: 'title',
		type: 'func-input',
	}
]
export const value = {
	layout: {
		size: {
			width: 480,
			height: 226
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			value1: 534,
			value2: 178,
			rate: 91
		})
	},
	config: {
		desc1: '计划联码量',
		img1: '/static/images/serves/plan.svg',
		desc2: '实际联码量',
		img2: '/static/images/serves/actual.svg',
		title: '联码率'
	}
}
