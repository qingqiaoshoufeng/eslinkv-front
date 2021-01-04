import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";
export const config = {
	animation: true,
	config: {
		desc1: true,
		img1: true,
		desc2: true,
		img2: true,
		title: true,
	},
};
export const value = {
	layout: {
		size: {
			width: 480,
			height: 226
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			value1: 534,
			value2: 178,
			rate: 91
		})
	},
	config: {
		desc1: '计划联码量',
		img1: '/static/images/serves/plan.svg',
		desc2: '实际联码量',
		img2: '/static/images/serves/actual.svg',
		title: '联码率'
	}
}
export const configSource = {
	config: {
		fields: {
			desc1: getInput('desc1', '描述1'),
			img1: getInput('img1', '图片1地址'),
			desc2: getInput('desc2', '描述2'),
			img2: getInput('img2', '图片2地址'),
			title: getInput('title', '饼图名称'),
		}
	},
}
