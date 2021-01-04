import {getSelect} from "@lib/views/core/widgets/parts/lib/config-tools";

export const configSource = {
	config: {
		fields: {
			img: getSelect('img', '图片', ['/static/mock/test1.png', '/static/mock/test2.png', '/static/mock/test3.png']),
		}
	}
}

export const config = {
	animation: true,
	config: {
		img: true
	}
}

export const value = {
	layout: {
		size: {
			width: 500,
			height: 500
		},
		position: {
			value: 'relative'
		}
	},
	config: {
		img: '/static/mock/test1.png'
	}
}
