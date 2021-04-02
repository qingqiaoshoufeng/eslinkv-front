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
		prop: 'unit',
		label: '单位',
		type: 'func-input',
	},
]
export const value = {
	layout: {
		size: {
			width: 480,
			height: 214,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify([
			{
				x: '05月',
				a: 50,
				b: 40,
				c: 10,
			},
			{
				x: '06月',
				a: 23,
				b: 18,
				c: 5,
			},
			{
				x: '07月',
				a: 52,
				b: 42,
				c: 10,
			},
			{
				x: '08月',
				a: 15,
				b: 11,
				c: 4,
			},
			{
				x: '08月',
				a: 38,
				b: 26,
				c: 12,
			},
			{
				x: '10月',
				a: 51,
				b: 35,
				c: 16,
			},
		]),
	},
	config: {
		color1: '#00DDFF',
		color2: '#00FFCF',
		color3: '#E5615B',
		desc1: '申请数量',
		desc2: '审核通过',
		desc3: '审核未通过',
		unit: '单',
	},
}
