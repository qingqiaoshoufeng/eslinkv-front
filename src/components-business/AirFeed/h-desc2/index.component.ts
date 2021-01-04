import {getInput} from "@lib"

export const config = {
	animation: true,
	config: {
		unit: true,
		title1: true,
		title2: true,
	}
}

export const configSource = {
	config: {
		fields: {
			title1: getInput('title1', '标题1'),
			title2: getInput('title2', '标题2'),
			unit: getInput('unit', '单位'),
		}
	},
}

export const value = {
	api: {
		data: JSON.stringify({
			value: 34325
		}),
	},
	config: {
		unit: '万m³',
		title1: '门站月度',
		title2: '累计接纳量'
	},
	layout: {
		size: {
			width: 171,
			height: 198
		},
		position: {
			value: 'relative'
		}
	}
}
