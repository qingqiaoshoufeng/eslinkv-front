export const value = {
	layout: {
		size: {
			width: 988,
			height: 214
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify(
			[
				{ value: 12.5, des: '111', title: '南门站' },
				{ value: 12.5, des: '', title: '北门站' },
				{ value: 12.5, des: '', title: '下沙门站' },
				{ value: 12.5, des: '', title: '江东门站' },
				{ value: 12.5, des: '', title: '所前门站' },
				{ value: 12.5, des: '', title: '杭州东站' },
				{ value: 12.5, des: '', title: '杭州西站' }
			]
		)
	},
	config: {
		background: '/static/icons/h-ring1-3.svg',
		suffix: '%',
		color: JSON.stringify(['#db4f49', '#367cf6', '#84e4fc', '#f8cd47', '#fceb50', '#ed9144', '#5fcbb9'])
	}
}

export const customConfig = [
	{
		prop: 'background',
		label: '背景图片',
		type: 'func-background',
		options: ['/static/icons/h-ring1-1.svg', '/static/icons/h-ring1-2.svg', '/static/icons/h-ring1-3.svg']
	},
	{
		prop: 'color',
		label: '颜色',
		type: 'func-input'
	},
	{
		prop: 'suffix',
		label: '后缀',
		type: 'func-input'
	}
]
