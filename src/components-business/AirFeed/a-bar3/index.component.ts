export const value = {
	api: {
		data: JSON.stringify({
			yValue: [120, 200, 150, 80, 70, 110, 130],
			yValue1: [130, 400, 170, 100, 100, 110, 130],
			xValue: ['5月', '6月', '7月', '8月', '9月', '10月', '11月']
		})
	},
	config: {
		color1: '#00DDFF',
		color2: 'rgba(1,253,210,1)',
		desc1: '加气量',
		desc2: '加气车次',
		title: 'm³'
	},
	layout: {
		size: {
			width: 480,
			height: 226
		},
		position: {
			value: 'relative'
		}
	}
}

export const customConfig = [
	{
		prop: 'color1',
		label: '条形图颜色',
		type: 'func-color'
	},
	{
		prop: 'color2',
		label: '折线图颜色',
		type: 'func-color'
	},
	{
		prop: 'desc1',
		label: '条形图名称',
		type: 'func-input'
	},
	{
		prop: 'desc2',
		label: '折线图名称',
		type: 'func-input'
	},
	{
		prop: 'title',
		label: '条形图单位',
		type: 'func-input'
	}
]
