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
		label: '条形图单位',
		type: 'func-input',
	},
	{
		prop: 'showBackground',
		label: '柱状图柱的背景',
		type: 'func-switch',
	},
	{
		prop: 'showLegend',
		label: '显示图例',
		type: 'func-switch',
	},
	{
		prop: 'barBorderRadius',
		label: '柱的圆角',
		type: 'func-number',
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
			legend1: '', // 没有则取config中的数据
			legend2: '',
			legend3: '',
			data: [
				{yValue1: 120, yValue2: 120, yValue3: 120, xValue: '5月'},
				{yValue1: 200, yValue2: 200, yValue3: 200, xValue: '6月'},
				{yValue1: 150, yValue2: 150, yValue3: 150, xValue: '7月'},
				{yValue1: 80, yValue2: 80, yValue3: 80, xValue: '8月'},
				{yValue1: 70, yValue2: 70, yValue3: 70, xValue: '9月'},
				{yValue1: 110, yValue2: 110, yValue3: 110, xValue: '10月'},
				{yValue1: 130, yValue2: 130, yValue3: 130, xValue: '11月'},
			]
		}),
	},
	config: {
		color1: '#2C99FF',
		color2: '#01FDD2',
		color3: '#f8cd47',
		desc1: '工商户',
		desc2: '居民户',
		desc3: '测试',
		title: '台',
		showLegend: true,
		showBackground: true,
		barBorderRadius: 4
	}
};
