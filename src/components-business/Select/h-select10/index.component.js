export const config = {animation: true}

export const value = {
	api: {
		data: JSON.stringify([{"label": "开户数", "value": "开户数"},{"label": "安装数", "value": "安装数"},{"label": "点火数", "value": "点火数"}]),
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
