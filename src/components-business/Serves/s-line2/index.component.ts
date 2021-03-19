const test = [{ x: '1月', y1: 10, y2: 23, y3: 21 }, { x: '2月', y1: 18, y2: 60, y3: 21 }, {
	x: '3月',
	y1: 5,
	y2: 20,
	y3: 21
}, { x: '4月', y1: 23, y2: 36, y3: 21 }, { x: '5月', y1: 14, y2: 23, y3: 21 }, { x: '6月', y1: 40, y2: 58, y3: 21 }, {
	x: '7月',
	y1: 58,
	y2: 44,
	y3: 21
}, { x: '8月', y1: 50, y2: 76, y3: 21 }, { x: '9月', y1: 45, y2: 68, y3: 21 }, { x: '10月', y1: 56, y2: 76, y3: 21 }, {
	x: '11月',
	y1: 53,
	y2: 73,
	y3: 21
}, { x: '12月', y1: 47, y2: 68, y3: 21 }]

export const value = {
	layout: {
		size: {
			width: 992,
			height: 243
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify(
			{
				data: test,
				lastLastTime: 2019,
				lastTime: 2020,
				nowTime: 2021
			})
	},
	config: {
		color1: '#2C99FF',
		color2: '#E5615B',
		color3: '#f8cd47',
		unit: '单'
	}
}

export const customConfig = [
	{
		prop: 'color1',
		label: '折线1颜色',
		type: 'func-color'
	},
	{
		prop: 'color2',
		label: '折线2颜色',
		type: 'func-color'
	},
	{
		prop: 'color3',
		label: '折线3颜色',
		type: 'func-color'
	},
	{
		prop: 'unit',
		label: '单位',
		type: 'func-input'
	}
]
