export const value: ComponentValue = {
	layout: {
		size: {
			width: 992,
			height: 950,
		},
		position: {
			value: 'relative',
		},
	},
	api: {
		data: JSON.stringify({
			step: 8,
			value: {
				step1: {
					time: new Date('2020-10-30 22:20').getTime(),
					des: '燃气泄漏',
					name: '王磊',
					title: '报警人',
					address: '江干区三里亭东苑',
				},
				step2: {
					time: new Date('2020-10-30 22:21').getTime(),
					name: '秦芳芳',
					title: '客服部',
				},
				step3: {
					time: new Date('2020-10-30 22:31').getTime(),
					name: '林自原',
					title: '维修部',
				},
				step4: {
					time: new Date('2020-10-30 22:48').getTime(),
				},
				step5: {
					time: new Date('2020-10-30 23:13').getTime(),
				},
				step6: {
					time: new Date('2020-10-30 23:50').getTime(),
				},
				step7: {
					time: new Date('2020-10-31 11:21').getTime(),
				},
				step8: {
					time: new Date('2020-10-31 12:57').getTime(),
					title: '维修处置内容',
					content:
						'部分管道老旧破损严重导致燃气泄漏，关闭上游阀门后更换泄漏段管道，已恢复供气。',
				},
			},
		}),
	},
}
