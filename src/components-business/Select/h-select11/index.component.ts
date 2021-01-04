export const config = {animation: true}

export const value = {
	api: {
		data: JSON.stringify([{"label": "点火数", "value": "点火数"}]),
		bind: {
			enable: true,
			role: ['provider']
		}
	},
	layout: {
		size: {
			width: 76,
			height: 24
		},
		position: {
			value: 'relative'
		}
	}
}
