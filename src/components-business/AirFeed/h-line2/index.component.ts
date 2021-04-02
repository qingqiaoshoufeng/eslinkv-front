export const value = {
	api: {
		data: JSON.stringify({
			value: [
				['杭天', 250, '杭天全称', '+3%', '-3%'],
				['大江东', 350, '大江东全称', '+3%', '-3%'],
				['钱江', 150, '钱江全称', '+3%', '-3%'],
				['杭天滨江', 280, '杭天滨江全称', '+3%', '-3%'],
				['临安', 250, '临安全称', '+3%', '-3%'],
				['建德', 250, '建德全称', '+3%', '-3%'],
				['桐庐', 250, '桐庐全称', '+3%', '-3%'],
				['淳安', 250, '淳安全称', '+3%', '-3%'],
			],
		}),
	},
	config: {
		title: '万m³',
	},
	layout: {
		size: {
			width: 740,
			height: 200,
		},
		position: {
			value: 'relative',
		},
	},
}

export const customConfig = [
	{
		prop: 'title',
		label: '文字',
		type: 'func-input',
	},
]
