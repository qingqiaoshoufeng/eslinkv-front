export const config = {
	animation: true
}
const testChildren = [
	{
		name: '星桥站',
		value: 6531
	},
	{
		name: '西郊站',
		value: 5234
	},
	{
		name: '北门站',
		value: 4922
	},
	{
		name: '狮子口阀室',
		value: 4422
	},
	{
		name: '乔司站',
		value: 4322
	},
	{
		name: '江北阀室',
		value: 3333
	},
	{
		name: '西部站',
		value: 3231
	},
	{
		name: '滨江站',
		value: 2232
	},
	{
		name: '东部站',
		value: 1125
	},
	{
		name: '之江站',
		value: 888
	},
	{
		name: '留祥站',
		value: 534
	},
	{
		name: '三墩站',
		value: 123
	},
]
export const value = {
	layout: {
		size: {
			width: 480,
			height: 492
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify([
			{
				name: '主城区',
				value: 37428,
				children: testChildren
			},
			{
				name: '余杭港华',
				value: 16062,
				children: testChildren
			},
			{
				name: '下沙热电',
				value: 7452,
				children: testChildren
			},
			{
				name: '钱江燃气',
				value: 3426,
				children: testChildren
			},
			{
				name: '富阳华润',
				value: 3156,
				children: testChildren
			},
			{
				name: '中燃',
				value: 2175,
				children: testChildren
			},
			{
				name: '萧山中奥',
				value: 957,
				children: testChildren
			},
			{
				name: '临安',
				value: 754,
				children: testChildren
			},
			{
				name: '桐庐',
				value: 256,
				children: testChildren
			}
		])
	}
}
