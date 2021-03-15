export const value = {
	layout: {
		size: {
			width: 480,
			height: 85
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			num: 22326,
			changeNum: 12,
			isIncrease: true
		})
	},
	config: {
		icon: '/static/images/experience/info-icon1.svg',
		desc1: '累计粉丝(人)',
		desc2: '今日新增(人)'
	}
}

export const customConfig = [
	{
		prop: 'icon',
		label: '标题',
		type: 'func-background',
		options: ['/static/images/experience/info-icon1.svg']
	},
	{
		prop: 'desc1',
		label: '描述1',
		type: 'func-input'
	},
	{
		prop: 'desc2',
		label: '描述2',
		type: 'func-input'
	}
]
