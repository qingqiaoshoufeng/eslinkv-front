export const value = {
	api: {
		data: JSON.stringify({
			value: 375321809,
		}),
	},
	config: {
		timeDesc: '年度',
		desc: '累计接纳量(m³)',
	},
	layout: {
		size: {
			width: 1000,
			height: 90
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
		prop: 'timeDesc',
		label: '时间',
		type: 'func-input',
	}
]
