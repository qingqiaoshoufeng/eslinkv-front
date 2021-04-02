export const value = {
	api: {
		data: JSON.stringify({
			icon: '/static/icons/phone-border.svg',
			minutes: 680230,
		}),
	},
	config: {
		icon: '/static/icons/phone-border.svg',
		text: '累计通话时长:',
	},
	layout: {
		size: {
			width: 480,
			height: 48,
		},
		position: {
			value: 'relative',
		},
	},
}

export const customConfig = [
	{
		prop: 'text',
		label: '描述',
		type: 'func-input',
	},
	{
		prop: 'icon',
		label: '图片',
		type: 'func-background',
		options: [
			'/static/icons/h-call-count-statistics-1.svg',
			'/static/icons/phone-border.svg',
		],
	},
]
