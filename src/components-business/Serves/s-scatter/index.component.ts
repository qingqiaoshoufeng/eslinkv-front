export const customConfig = [
	{
		prop: 'unit',
		label: '单位',
		type: 'func-input',
	}
]
export const value = {
	layout: {
		size: {
			width: 480,
			height: 226
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			xAxis: ['5月', '6月', '7月', '8月', '9月', '10月'],
			data: [
				['5月', '100', 15],
				['5月', '200', 25],
				['5月', '300', 32],
				['5月', '400', 25],
				['6月', '200', 25]
			]
		})
	},
	config: {
		unit: '万m³'
	}
}
