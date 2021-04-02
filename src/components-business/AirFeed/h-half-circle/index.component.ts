export const value = {
	layout: {
		size: {
			width: 170,
			height: 90,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify({
			percent: 30,
		}),
	},
	config: {
		title: '巡检完成率',
		mainColor: '#00DDFF',
		bgColor: 'rgba(0, 87, 169, 0.5)',
		pointerColor: '#00FFCF',
		titleColor: '#fff',
		subTitleColor: '#00DDFF',
	},
}

export const customConfig = [
	{
		prop: 'title',
		label: '标题',
		type: 'func-input',
	},
	{
		prop: 'mainColor',
		label: '环形主颜色',
		type: 'func-color',
	},
	{
		prop: 'pointerColor',
		label: '圆点颜色',
		type: 'func-color',
	},
	{
		prop: 'titleColor',
		label: '标题颜色',
		type: 'func-color',
	},
	{
		prop: 'subTitleColor',
		label: '副标题颜色',
		type: 'func-color',
	},
]
