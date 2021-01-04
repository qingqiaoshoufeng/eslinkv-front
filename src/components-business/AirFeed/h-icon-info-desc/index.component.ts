import { getInput, getSelect } from '../../../../lib';

export const config = {
	animation: true,
	config: {
		icon: true,
		desc: true,
	},
};
export const configSource = {
	config: {
		fields: {
			icon: getSelect('icon', 'icon', [
				'/static/icons/phone-border.svg',
				'/static/icons/h-icon-info-desc-1.svg',
			]),
			desc: getInput('desc', '描述'),
		},
	},
};
export const value = {
	config: {
		icon: '/static/icons/h-icon-info-desc-1.svg',
		desc: '热线服务业务受理分析(次)',
	},
	layout: {
		size: {
			width: 480,
			height: 44
		},
		position: {
			value: 'relative'
		}
	}
};
