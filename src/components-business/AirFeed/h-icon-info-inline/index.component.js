import { getInput, getSelect } from '../../../../lib';

export const config = {
	animation: true,
	config: {
		text: true,
		icon: true,
	},
};
export const configSource = {
	config: {
		fields: {
			text: getInput('text', '描述'),
			icon: getSelect('icon', 'icon', [
				'/static/icons/h-inline-logo1.svg',
			]),
		},
	},
};
export const value = {
	layout: {
		size: {
			width: 480,
			height: 64
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			count: 123458,
		}),
	},
	config: {
		icon: '/static/icons/h-inline-logo1.svg',
		text: '',
	},
};
