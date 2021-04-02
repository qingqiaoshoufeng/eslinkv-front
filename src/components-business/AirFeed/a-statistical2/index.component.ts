export const value = {
	api: {
		data: JSON.stringify({
			todayData: 964383,
			yearData: 375321809,
		}),
	},
	config: {
		timeDesc: '年度',
		rightDesc: '今日供气量(m³)',
		desc: '累计接纳量(m³)',
		sceneId: '',
		componentId: '',
	},
	layout: {
		size: {
			width: 1000,
			height: 90,
		},
		position: {
			value: 'relative',
		},
	},
}

export const customConfig = [
	{
		prop: 'desc',
		label: '描述',
		type: 'func-input',
	},
	{
		prop: 'timeDesc',
		label: '时间',
		type: 'func-input',
	},
	{
		prop: 'rightDesc',
		label: '今日描述',
		type: 'func-input',
	},
	{
		prop: 'sceneId',
		label: '场景id',
		type: 'func-input',
	},
	{
		prop: 'componentId',
		label: '组件id',
		type: 'func-input',
	},
]
