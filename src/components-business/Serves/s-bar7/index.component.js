export const config = {
	animation: true
}
export const value = {
	layout: {
		size: {
			width: 480,
			height: 214
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			list: [
				{
					name: '2020.06',
					plan: 100,
					actual: 66,
					percent: 66,
					rate1: 5,
					rate2: -6,
				},
				{
					name: '2020.07',
					plan: 110,
					actual: 88,
					percent: 88,
					rate1: 5,
					rate2: 6,
				},
				{
					name: '2020.08',
					plan: 156,
					actual: 69,
					percent: 69,
					rate1: 5,
					rate2: 6,
				},
				{
					name: '2020.09',
					plan: 123,
					actual: 55,
					percent: 55,
					rate1: 5,
					rate2: 6,
				},
				{
					name: '2020.10',
					plan: 88,
					actual: 36,
					percent: 36,
					rate1: 5,
					rate2: 6,
				},
				{
					name: '2020.11',
					plan: 99,
					actual: 28,
					percent: 28,
					rate1: 5,
					rate2: 6,
				},
			]
		})
	}
}
