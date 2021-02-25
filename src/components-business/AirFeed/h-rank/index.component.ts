export const value = {
	layout: {
		size: {
			width: 310,
			height: 210
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify([
			{
				name: '阀门异常',
				value: 47
			},
			{
				name: '压力异常',
				value: 23
			},
			{
				name: '第三方破坏',
				value: 123
			},
			{
				name: '管道破裂',
				value: 43
			},
			{
				name: '燃气泄露',
				value: 66
			},
			{
				name: '爆管',
				value: 85
			}
		])
	},
	config: {
		unit: '件'
	}
}


export const customConfig = [
	{
		prop: 'unit',
		label: '单位',
		type: 'func-input',
	},
]
