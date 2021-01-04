import { getInput } from '../../../../lib';

export const configSource = {
	config: {
		fields: {
			desc: getInput('desc', '描述'),
		},
	},
};
export const config = {
	animation: true,
	config: {
		desc: true,
	},
};
export const value = {
	layout: {
		size: {
			width: 228,
			height: 84
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			value: 24,
		}),
	},
	config: {
		desc: '标题',
	},
};
