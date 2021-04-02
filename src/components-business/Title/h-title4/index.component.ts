export const customConfig = [
	{
		prop: 'title',
		label: '标题',
		type: 'func-input',
	},
]

export const value = {
	layout: {
		size: {
			width: 154,
			height: 76,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify({
			value: 99999,
		}),
	},
	config: {
		title: '标题',
	},
}
