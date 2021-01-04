const config = {
	animation: true,
};
const value = {
	layout: {
		size: {
			width: 1526,
			height: 56
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			list: [
				{
					name: '寻绿经典线'
				},
				{
					name: '寻绿东部一号线'
				},
				{
					name: '寻绿东部二号线'
				},
				{
					name: '寻绿西部一号线'
				},
				{
					name: '寻绿西部二号线'
				},
			]
		})
	}
}

export {config, value}
