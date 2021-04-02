export const customConfig = [
	{
		prop: 'color',
		label: '颜色',
		type: 'func-input',
	},
	{
		prop: 'intervalTime',
		label: '轮播时长',
		type: 'func-number',
	},
	{
		prop: 'timeoutTime',
		label: '轮播点击后间隔时长',
		type: 'func-number',
	},
]

const itemList = [
	{
		title: '钢管（米）',
		value: [
			{ title: '设计量1：', value: 34452 },
			{ title: '领用量1：', value: 23445 },
			{ title: '核销量1：', value: 13345 },
		],
	},
	{
		title: '钢管（米）',
		value: [
			{ title: '设计量：', value: 34452 },
			{ title: '领用量：', value: 23445 },
			{ title: '核销量：', value: 13345 },
		],
	},
	{
		title: '钢管（米）',
		value: [
			{ title: '设计量：', value: 34452 },
			{ title: '领用量：', value: 23445 },
			{ title: '核销量：', value: 13345 },
		],
	},
]
export const value = {
	layout: {
		size: {
			width: 480,
			height: 140,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify({
			list: ['笔数', '气量', '金额'],
			itemList: itemList,
		}),
	},
	config: {
		intervalTime: 2000,
		timeoutTime: 2000,
		color: JSON.stringify([
			'rgba(0, 62, 144, 0.8)',
			'rgba(0, 145, 210, 0.8)',
			'rgba(0, 233, 194, 0.8)',
		]),
	},
}
