export const customConfig = [
	{
		prop: 'lineColor',
		label: '线条颜色',
		type: 'func-color',
	},
	{
		prop: 'lineStopColor',
		label: '渐变后颜色',
		type: 'func-color',
	},
	{
		prop: 'isShowXAxis',
		label: '显示横坐标',
		type: 'func-switch',
	},
	{
		prop: 'scale',
		label: '纵坐标是否以0开始',
		type: 'func-switch',
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
			width: 958,
			height: 140,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify([
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
		]),
	},
	config: {
		unit: 'm³',
		lineColor: '#FFDC45',
		lineStopColor: '',
		scale: false,
		isShowXAxis: false,
	},
}
