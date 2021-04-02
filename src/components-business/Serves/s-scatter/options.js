export default function (data, config) {
	return {
		textStyle: {
			fontSize: 16,
			color: '#FFF',
		},
		grid: {
			top: 40,
			bottom: 30,
			left: 40,
			right: 10,
		},
		yAxis: {
			axisLabel: {
				margin: 10,
			},
			name: config.unit,
			nameTextStyle: {
				padding: [0, 24, 0, 0],
			},
			axisTick: {
				show: false,
			},
			axisLine: { show: false },
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(255, 255, 255, 0.2)',
				},
			},
		},
		xAxis: {
			data: data.xAxis,
			axisLabel: {
				margin: 10,
			},
			axisTick: {
				show: false,
			},
			axisLine: { show: false },
			splitLine: {
				show: false,
				lineStyle: {
					color: '#D1D1D1',
				},
			},
		},
		series: [
			{
				type: 'scatter',
				symbol: 'circle',
				symbolSize: function (data) {
					return data[2]
				},
				itemStyle: {
					color: 'rgba(0, 221, 255, 0.5)',
				},
				data: data.data,
			},
		],
	}
}
