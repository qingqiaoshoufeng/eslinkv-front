export const value = {
	layout: {
		size: {
			width: 140,
			height: 64,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify({
			value: 320,
		}),
	},
	config: {
		desc: '计划巡检(件)',
		numFontSize: 40,
		descFontSize: 20,
		numColor: '#fff',
		descColor: '#00FFCF',
	},
}

export const customConfig = [
	{
		prop: 'desc',
		label: '描述',
		type: 'func-input',
	},
	{
		prop: 'numFontSize',
		label: '数字字体大小',
		type: 'func-number',
	},
	{
		prop: 'descFontSize',
		label: '描述字体大小',
		type: 'func-number',
	},
	{
		prop: 'numColor',
		label: '数字颜色',
		type: 'func-color',
	},
	{
		prop: 'descColor',
		label: '描述颜色',
		type: 'func-color',
	},
]
