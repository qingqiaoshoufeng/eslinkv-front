import {getSelect, getInput} from "../../../../lib";

export const configSource = {
	config: {
		fields: {
			img: getSelect('img', '图片', ['/static/icons/数据下钻.png', '/static/icons/工商户点位弹窗.png']),
			index: getInput('index', '场景ID'),
			left: getInput('left', '位移'),
		}
	}
}
export const config = {
	animation: true,
	config: {
		img: true,
		index: true,
		left: true,
	}
}
export const value = {
	layout: {
		size: {
			width: 1300,
			height: 773
		},
		position: {
			value: 'relative'
		}
	},
	config: {
		img: '/static/icons/数据下钻.png',
		index: '',
		left: 0
	}
}
