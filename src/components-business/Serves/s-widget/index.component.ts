export const config = {
	animation: true,
};
export const value = {
	layout: {
		size: {
			width: 480,
			height: 500
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			list: Array(22).fill({
				name: '安装',
				num: 1231,
				percent: 60
			})
		})
	},
};
