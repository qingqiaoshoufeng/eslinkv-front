export const customConfig = [
	{
		prop: 'color',
		label: '颜色',
		type: 'func-color',
	},
	{
		prop: 'suffix',
		label: '后缀',
		type: 'func-input',
	},
	{
		prop: 'background',
		label: '背景图片',
		type: 'func-background',
		options: ['/static/icons/h-ring1-1.svg', '/static/icons/h-ring1-2.svg', '/static/icons/h-ring1-3.svg']
	}
]
export const value = {
	layout: {
		size: {
			width: 992,
			height: 214
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify([
			{
				name: '区域',
				data: [
					{value: 13.5, des: '111', title: '南门站'},
					{value: 12.5, des: '', title: '北门站'},
					{value: 12.5, des: '', title: '下沙门站'},
					{value: 12.5, des: '', title: '江东门站'},
					{value: 12.5, des: '', title: '所前门站'},
					{value: 12.5, des: '', title: '杭州东站'},
					{value: 12.5, des: '', title: '杭州西站'},
					{value: 12.5, des: '', title: '杭州西站'},
					{value: 12.5, des: '', title: '杭州西站'},
					{value: 12.5, des: '', title: '杭州西站'},
					{value: 12.5, des: '', title: '杭州西站'},
				]
			},
			{
				name: '子公司',
				data: [
					{value: 14.5, des: '111', title: '南门站'},
					{value: 12.5, des: '', title: '北门站'},
					{value: 12.5, des: '', title: '下沙门站'},
					{value: 12.5, des: '', title: '江东门站'},
					{value: 12.5, des: '', title: '所前门站'},
					{value: 12.5, des: '', title: '杭州东站'},
					{value: 12.5, des: '', title: '杭州西站'},
					{value: 12.5, des: '', title: '杭州西站'},
					{value: 12.5, des: '', title: '杭州西站'},
					{value: 12.5, des: '', title: '杭州西站'},
					{value: 12.5, des: '', title: '杭州西站'},
				]
			},
			{
				name: '用气性质',
				data: [
					{value: 15.5, des: '111', title: '南门站'},
					{value: 12.5, des: '', title: '北门站'},
					{value: 12.5, des: '', title: '下沙门站'},
					{value: 12.5, des: '', title: '江东门站'},
					{value: 12.5, des: '', title: '所前门站'},
					{value: 12.5, des: '', title: '杭州东站'},
					{value: 12.5, des: '', title: '杭州西站'},
					{value: 12.5, des: '', title: '杭州西站'},
					{value: 12.5, des: '', title: '杭州西站'},
					{value: 12.5, des: '', title: '杭州西站'},
					{value: 12.5, des: '', title: '杭州西站'},
				]
			}
		])
	},
	config: {
		background: '/static/icons/h-ring1-1.svg',
		suffix: '%',
		color: JSON.stringify(['#00DDFF', 'rgba(1,253,210,1)', 'rgba(36,104,206,1)', 'rgba(228,53,53,1)', 'rgba(252,155,93,1)']),
	}
}
