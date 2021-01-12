import {getSelect, getArrayGroup, getInput} from "../../../../lib";

export const configSource = {
	config: {
		fields: {
			background: getArrayGroup('background', '背景图片', [
				getInput('title', '标题'),
				getSelect('background', '背景图片', ['/static/icons/s-progress1-1.svg', '/static/icons/s-progress1-2.svg', '/static/icons/s-progress1-3.svg'])
			]),
		}
	}
}
export const config = {
	animation: true,
	config: {
		background: true,
	}
}
export const value = {
	layout: {
		size: {
			width: 456,
			height: 226
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify([
			{
				value: 324
			},
			{
				value: 418
			},
			{
				value: 219
			}
		])
	},
	config: {
		background: [{
			background: '/static/icons/s-progress1-1.svg',
			title: '开户(户)'
		}, {
			background: '/static/icons/s-progress1-2.svg',
			title: '安装(户)'
		}, {background: '/static/icons/s-progress1-3.svg', title: '点火(户)'}],
	}
}