import {getInput, getSelect} from '../../../../lib';

export const configSource = {
	config: {
		fields: {
			desc: getInput('desc', '描述'),
			img: getSelect('img', '图片', ['/static/icons/s-title-1.svg', '/static/icons/s-title-2.svg']),
		},
	},
};
export const config = {
	animation: true,
	config: {
		desc: true,
		img: true,
	},
};
export const value = {
	api: {
		data: JSON.stringify({
			value: 391218,
		})
	},
	config: {
		desc: '累计受理业务(单)',
		img: '/static/icons/s-title-1.svg',
	},
	layout: {
		size: {
			width: 480,
			height: 64
		},
		position: {
			value: 'relative'
		}
	}
}
