const testData = [
	{
		x: '13:00',
		y: 8,
	},
	{
		x: '14:00',
		y: 12,
	},
	{
		x: '15:00',
		y: 22,
	},
	{
		x: '16:00',
		y: 32,
	},
	{
		x: '17:00',
		y: 25,
	},
	{
		x: '18:00',
		y: 29,
	},
	{
		x: '19:00',
		y: 32,
	},
	{
		x: '20:00',
		y: 15,
	},
]

export const value: ComponentValue = {
	layout: {
		size: {
			width: 1536,
			height: 880,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify({
			data1: testData,
			data2: testData,
			data3: testData,
			data4: testData,
			data5: testData,
			name: '近24小时',
		}),
	},
}
