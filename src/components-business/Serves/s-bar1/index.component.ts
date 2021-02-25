export const customConfig = [
	{
		prop: 'color1',
		label: '颜色1',
		type: 'func-color',
	},
	{
		prop: 'color2',
		label: '颜色2',
		type: 'func-color',
	},
	{
		prop: 'color3',
		label: '颜色3',
		type: 'func-color',
	},
	{
		prop: 'desc1',
		label: '名称1',
		type: 'func-input',
	},
	{
		prop: 'desc2',
		label: '名称2',
		type: 'func-input',
	},
	{
		prop: 'desc3',
		label: '名称3',
		type: 'func-input',
	},
	{
		prop: 'title',
		label: '标题',
		type: 'func-input',
	},
	{
		prop: 'lineSmooth',
		label: '曲线是否平滑',
		type: 'func-switch',
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
	config: {
		color1: '#00DDFF',
		color2: '#0057A9',
		color3: '#01FDD2',
		desc1: '绑定户数',
		desc2: '抄表户数',
		desc3: '自助抄表率',
		title: '户',
		lineSmooth: true,
		hasSymbal: true,
	},
	api: {
		data: JSON.stringify([
			{
				yValue1: 120,
				yValue2: 130,
				yValue3: 30,
				xValue: '5月'
			},
			{
				yValue1: 200,
				yValue2: 400,
				yValue3: 10,
				xValue: '6月'
			},
			{
				yValue1: 150,
				yValue2: 170,
				yValue3: 20,
				xValue: '7月'
			},
			{
				yValue1: 80,
				yValue2: 100,
				yValue3: 30,
				xValue: '8月'
			},
			{
				yValue1: 70,
				yValue2: 100,
				yValue3: 30,
				xValue: '9月'
			},
			{
				yValue1: 110,
				yValue2: 110,
				yValue3: 50,
				xValue: '10月'
			},
			{
				yValue1: 130,
				yValue2: 130,
				yValue3: 30,
				xValue: '11月'
			},
		]),
	},
};
