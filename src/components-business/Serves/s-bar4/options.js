const colorArry = [
	new echarts.graphic.LinearGradient(
		1,
		0,
		0,
		0,
		[
			{
				offset: 0,
				color: '#FB5325', // 0% 处的颜色
			},
			{
				offset: 1,
				color: 'rgba(251, 83, 37, 0.2)', // 100% 处的颜色
			},
		],
		false,
	),
	new echarts.graphic.LinearGradient(
		1,
		0,
		0,
		0,
		[
			{
				offset: 0,
				color: '#007CEF', // 0% 处的颜色
			},
			{
				offset: 1,
				color: 'rgba(0, 124, 239, 0.2)', // 100% 处的颜色
			},
		],
		false,
	),
	new echarts.graphic.LinearGradient(
		1,
		0,
		0,
		0,
		[
			{
				offset: 0,
				color: '#00FFCF', // 0% 处的颜色
			},
			{
				offset: 1,
				color: 'rgba(0, 255, 207, 0.2)', // 100% 处的颜色
			},
		],
		false,
	),
]

export default function (data) {
	return {
		color: colorArry,
		grid: {
			left: '2%',
			right: '3%',
			bottom: '3%',
			top: '0%',
			containLabel: true,
		},
		calculable: true,
		xAxis: [
			{
				type: 'value',
				boundaryGap: [0, 0.01],
				axisLabel: {
					show: true,
					color: 'rgba(255, 255, 255, 0.75)',
				},
				axisTick: {
					show: true,
					color: 'rgba(255, 255, 255, 0.75)',
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(255, 255, 255, 0.75)',
					},
				},
				splitLine: {
					show: false,
				},
			},
		],
		yAxis: [
			{
				type: 'category',
				name: '',
				data: data.map(v => v.x),
				axisLabel: {
					textStyle: {
						fontSize: 18,
						color: '#fff',
					},
				},
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
			},
		],
		series: [
			{
				name: '今日',
				type: 'bar',
				barWidth: 4,
				itemStyle: {
					barBorderRadius: 4,
				},
				data: data.map(v => v.y1),
			},
			{
				name: '昨日',
				type: 'bar',
				barWidth: 4,
				data: data.map(v => v.y2),
				itemStyle: {
					barBorderRadius: 4,
				},
			},
			{
				name: '前日',
				type: 'bar',
				barWidth: 4,
				data: data.map(v => v.y3),
				itemStyle: {
					barBorderRadius: 4,
				},
			},
		],
	}
}
