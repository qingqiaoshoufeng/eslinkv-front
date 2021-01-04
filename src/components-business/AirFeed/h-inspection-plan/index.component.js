import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

export const config = {
	animation: true,
	config: {
		desc: true,
		numFontSize: true,
		descFontSize: true,
		numColor: true,
		descColor: true
	},
};
export const value = {
	layout: {
		size: {
			width: 140,
			height: 64
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			value: 320
		})
	},
	config: {
		desc: '计划巡检(件)',
		numFontSize: 40,
		descFontSize: 20,
		numColor: '#fff',
		descColor: '#00FFCF'
	}
}
export const configSource = {
	config: {
		fields: {
			desc: getInput('desc', '描述'),
			numFontSize: getInput('numFontSize', '数字字体大小'),
			descFontSize: getInput('descFontSize', '描述字体大小'),
			numColor: getInput('numColor', '数字颜色'),
			descColor: getInput('descColor', '描述颜色'),
		}
	},
}
