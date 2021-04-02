export const customConfig = [
	{
		prop: 'desc',
		label: '描述',
		type: 'func-input',
	},
]
export const value = {
	layout: {
		size: {
			width: 228,
			height: 84,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify({
			value: 24,
		}),
	},
	config: {
		desc: '标题',
	},
}
