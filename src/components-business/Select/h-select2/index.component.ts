export const value = {
	layout: {
		size: {
			width: 76,
			height: 24,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify([
			{ label: '居民户', value: '居民户' },
			{ label: '公建户', value: '公建用户' },
			{ label: '工业户', value: '工业用户' },
		]),
		bind: {
			enable: true,
			role: ['provider'],
		},
	},
}
