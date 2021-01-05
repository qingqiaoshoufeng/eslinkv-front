import {getInput, getSelect} from '../../../../lib'

export const config = {
	animation: true,
	config: {
		desc: true,
		desc2: true,
		videoUrl: true,
	},
}

export const configSource = {
	config: {
		fields: {
			desc: getInput('desc', '描述'),
			desc2: getInput('desc2', '描述'),
			videoUrl: getSelect('videoUrl', '图片地址', [
				'/static/images/airfeed/car.webm',
				'/static/images/airfeed/people.webm',
			]),
		},
	},
}

export const value = {
	api: {
		data: JSON.stringify({
			value1: 298,
			value2: 298,
			ratio: 95.3,
		}),
	},
	config: {
		desc: '客户事故数(件)',
		desc2: '客户事故数(件)',
		videoUrl: '/static/images/airfeed/car.webm',
	},
	layout: {
		size: {
			width: 497,
			height: 200
		},
		position: {
			value: 'relative'
		}
	}
}
