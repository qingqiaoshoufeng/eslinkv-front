export default {
	series: [
		{
			name: '外环底色',
			animation: false,
			type: 'pie',
			startAngle: 270,
			radius: ['82.5%', '97.5%'],
			label: {
				show: false,
				position: 'center',
			},
			labelLine: {
				normal: {
					show: true,
					lineStyle: {
						color: 'rgba(255, 255, 255, 0)',
					},
					smooth: 0.2,
					length: 10,
				},
			},
		},
		{
			name: '外环数据展示',
			animation: false,
			type: 'pie',
			startAngle: 270,
			radius: ['82%', '98%'],
			label: {
				show: false,
				position: 'center',
			},
			labelLine: {
				normal: {
					show: true,
					lineStyle: {
						color: 'rgba(255, 255, 255, 1)',
					},
					smooth: 0.2,
					length: 10,
				},
			},
		},
		{
			name: '内环底色',
			animation: false,
			type: 'pie',
			startAngle: 270,
			radius: ['75%', '78%'],
			label: {
				show: false,
				position: 'center',
			},
			labelLine: {
				normal: {
					show: true,
					lineStyle: {
						color: 'rgba(255, 255, 255, 1)',
					},
					smooth: 0.2,
					length: 10,
				},
			},
		},
		{
			name: '内环数据展示',
			animation: false,
			type: 'pie',
			startAngle: 270,
			radius: ['75%', '78%'],
			label: {
				show: false,
				position: 'center',
			},
			labelLine: {
				normal: {
					show: true,
					lineStyle: {
						color: 'rgba(255, 255, 255, 1)',
					},
					smooth: 0.2,
					length: 10,
				},
			},
		},
	],
}
