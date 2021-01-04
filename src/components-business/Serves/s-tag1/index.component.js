import {getInput, getSelect} from '../../../../lib';

export const configSource = {
	config: {
		fields: {
			desc: getInput('desc', '描述'),
			desc2: getInput('desc2', '描述2'),
			logo: getSelect('logo', '图片logo', ['/static/images/serves/s-tag1-logo1.svg', '/static/images/serves/s-tag1-logo2.svg']),
		},
	},
};
export const config = {
	animation: true,
	config: {
		desc: true,
		desc2: true,
		logo: true,
	},
};
export const value = {
	layout: {
		size: {
			width: 224,
			height: 173
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			value: 22326,
			percent: 74.8,
		}),
	},
	config: {
		desc: '热线服务话务量(次)',
		desc2: '接通率',
		logo: '/static/images/serves/s-tag1-logo1.svg'
	},
}
