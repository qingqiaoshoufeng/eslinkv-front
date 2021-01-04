import {getInput, getSelect} from "@lib"

export const config = {
	animation: true,
	config: {
		title: true, img: true
	}
}

export const configSource = {
	config: {
		fields: {
			title: getInput('title', '标题'),
			img: getSelect('img', '图形', ['/static/icons/h-des1-1.svg', '/static/icons/h-des1-2.svg', '/static/icons/h-des1-3.svg']),
		}
	},
}

export const value = {
	api: {
		data: JSON.stringify({
			value: 73
		}),
	},
	config: {
		title: '巡检点数(点)',
		img: '/static/icons/h-des1-1.svg'
	},
	layout: {
		size: {
			width: 314,
			height: 56
		},
		position: {
			value: 'relative'
		}
	}
}
