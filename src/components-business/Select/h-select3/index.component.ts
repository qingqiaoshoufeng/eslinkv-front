export const value = {
	api: {
		data: JSON.stringify([
			{ label: '月用气对比', value: 'month' },
			{ label: '年用气对比', value: 'year' },
		]),
		bind: {
			enable: true,
			role: ['provider'],
		},
	},
	layout: {
		size: {
			width: 110,
			height: 24,
		},
		position: {
			value: 'relative',
		},
	},
}
