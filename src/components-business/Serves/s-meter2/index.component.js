import {getInput, getSelect} from "@lib"

export const configSource = {
	config: {
		fields: {
			desc1: getInput('desc1', '描述1'),
			img1: getSelect('img1', '图片1地址', ['/static/icons/s-meter-1.svg', '/static/icons/s-meter-2.svg', '/static/icons/s-meter-3.svg', '/static/icons/s-meter-4.svg']),
			desc2: getInput('desc2', '描述2'),
			img2: getSelect('img2', '图片2地址', ['/static/icons/s-meter-1.svg', '/static/icons/s-meter-2.svg', '/static/icons/s-meter-3.svg', '/static/icons/s-meter-4.svg']),
		}
	},
}

export const config = {
	animation: true,
	config: {
		desc1: true,
		desc2: true,
		img1: true,
		img2: true,
	}
}
export const value = {
	layout: {
		size: {
			width: 992,
			height: 188
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify([
			{
				date: '2020.06',
				rate1: 0.8,
				rate2: 0.5,
				num1: 674,
				num2: 236,
				percent: 56
			},
			{
				date: '2020.07',
				rate1: 0.9,
				rate2: 0.3,
				num1: 674,
				num2: 653,
				percent: 80
			},
			{
				date: '2020.08',
				rate1: 0.9,
				rate2: 0.7,
				num1: 674,
				num2: 234,
				percent: 75
			},
			{
				date: '2020.09',
				rate1: 0.2,
				rate2: 0.5,
				num1: 674,
				num2: 236,
				percent: 22
			},
			{
				date: '2020.10',
				rate1: 0.8,
				rate2: 0.5,
				num1: 78,
				num2: 236,
				percent: 33
			},
			{
				date: '2020.11',
				rate1: 0.4,
				rate2: 0.75,
				num1: 543,
				num2: 236,
				percent: 44
			},
		])
	},
	config: {
		desc1: '计划抄表数',
		desc2: '实际抄表数',
		img1: '/static/icons/s-meter-1.svg',
		img2: '/static/icons/s-meter-2.svg',
	}
}
