const placeHolderStyle = {
	normal: {
		label: {
			show: false,
		},
		labelLine: {
			show: false,
		},
		color: 'rgba(0,0,0,0)',
		borderWidth: 0,
	},
	emphasis: {
		color: 'rgba(0,0,0,0)',
		borderWidth: 0,
	},
}

export default {
	// 第一个图表
	series: [
		{
			type: 'pie',
			hoverAnimation: false,
			center: ['50%', '50%'],
			// w1:96 w2: 108 total 144
			radius: ['66%', '75%'],
			startAngle: 270,
			labelLine: {
				normal: {
					show: false,
				},
			},
			data: [
				{
					value: 0,
					itemStyle: {
						normal: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										color: '#00FFCF', // 0% 处的颜色
									},
									{
										offset: 1,
										color: '#00DDFF', // 100% 处的颜色
									},
								],
								global: false, // 缺省为 false
							},
							opacity: 0.5,
						},
					},
				},
				{
					value: 0,
					itemStyle: placeHolderStyle,
				},
			],
		},
		{
			type: 'pie',
			hoverAnimation: false,
			center: ['50%', '50%'],
			// w1: 108 w2: 112 total: 144
			radius: ['75%', '78%'],
			startAngle: 270,
			labelLine: {
				normal: {
					show: false,
				},
			},
			data: [
				{
					value: 0,
					itemStyle: {
						normal: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										color: '#00FFCF', // 0% 处的颜色
									},
									{
										offset: 1,
										color: '#00DDFF', // 100% 处的颜色
									},
								],
								global: false, // 缺省为 false
							},
						},
					},
				},
				{
					value: 0,
					itemStyle: placeHolderStyle,
				},
			],
		},
	],
}
