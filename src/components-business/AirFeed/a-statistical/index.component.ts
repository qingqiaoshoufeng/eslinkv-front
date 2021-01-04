import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

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
export const configSource = {
	config: {
		fields: {
			desc: getInput('desc', '描述'),
			timeDesc: getInput('timeDesc', '时间'),
		},
	},
}
export const config = {
	animation: true,
	config: {
		desc: true,
		timeDesc: true,
	},
}
