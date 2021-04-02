export const customConfig = [
	{
		prop: 'size',
		label: '每页数量',
		type: 'func-input',
	},
]

export const value = {
	layout: {
		size: {
			width: 480,
			height: 540,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify({
			list: [
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '安装',
					statusDesc: '新申请',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '安装',
					statusDesc: '已受理',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '安装',
					statusDesc: '审核中',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '安装',
					statusDesc: '审核中',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '安装',
					statusDesc: '未通过',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '安装',
					statusDesc: '审核中',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '安装',
					statusDesc: '审核中',
				},
				{
					time: '06/03 09:11',
					channel: '在线客服',
					businessType: '安装',
					statusDesc: '已受理',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '维修',
					statusDesc: '已办结',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '开户',
					customer: '李的萌萌',
					statusDesc: '新申请',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '安装',
					statusDesc: '新申请',
				},
			],
			activeStatus: '已办结',
		}),
	},
	config: {
		size: 4,
	},
}
