import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

export const config = {
	animation: true,
	config: {
		colors: true,
		unit: true
	},
};
export const value = {
	layout: {
		size: {
			width: 325,
			height: 220
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify([
			{
				name: '低压',
				value: 72
			},
			{
				name: '中压',
				value: 32
			},
			{
				name: '高压',
				value: 12
			},
		])
	},
	config: {
		colors: ['#00FFCF', '#2194FF', '#E5615B'],
		unit: '件'
	}
}
export const configSource = {
	config: {
		fields: {
			colors: getInput('color1', '扇形颜色'),
			unit: getInput('unit', '单位')
		}
	},
}
