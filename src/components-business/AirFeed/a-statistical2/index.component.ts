import {getInput} from '../../../../lib'

export const config = {
	animation: true,
	config: {
		desc: true,
		timeDesc: true,
		rightDesc: true,
		sceneId: true,
		componentId: true,
	},
}
export const configSource = {
	config: {
		fields: {
			desc: getInput('desc', '描述'),
			timeDesc: getInput('timeDesc', '时间'),
			rightDesc: getInput('rightDesc', '今日描述'),
			sceneId: getInput('sceneId', '场景id'),
			componentId: getInput('componentId', '组件id'),
		},
	},
}
export const value = {
	api: {
		data: JSON.stringify({
			todayData: 964383,
			yearData: 375321809,
		}),
	},
	config: {
		timeDesc: '年度',
		rightDesc: '今日供气量(m³)',
		desc: '累计接纳量(m³)',
		sceneId: '',
		componentId: '',
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
