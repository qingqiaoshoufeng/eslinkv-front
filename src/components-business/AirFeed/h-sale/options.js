export const test = [
	{
		name: '11月',
		lineValue: 10,
		barValue1: 20,
		barValue2: 30,
		barValue3: 40,
	},
	{
		name: '12月',
		lineValue: 40,
		barValue1: 20,
		barValue2: 30,
		barValue3: 40,
	},
	{
		name: '1月',
		lineValue: 30,
		barValue1: 20,
		barValue2: 30,
		barValue3: 40,
	},
	{
		name: '2月',
		lineValue: 20,
		barValue1: 20,
		barValue2: 30,
		barValue3: 40,
	},
	{
		name: '3月',
		lineValue: 10,
		barValue1: 20,
		barValue2: 30,
		barValue3: 40,
	},
	{
		name: '4月',
		lineValue: 50,
		barValue1: 20,
		barValue2: 30,
		barValue3: 40,
	},
	{
		name: '5月',
		lineValue: 70,
		barValue1: 20,
		barValue2: 30,
		barValue3: 40,
	},
	{
		name: '6月',
		lineValue: 60,
		barValue1: 20,
		barValue2: 30,
		barValue3: 40,
	},
	{
		name: '7月',
		lineValue: 80,
		barValue1: 20,
		barValue2: 30,
		barValue3: 40,
	},
	{
		name: '8月',
		lineValue: 40,
		barValue1: 20,
		barValue2: 30,
		barValue3: 40,
	},
	{
		name: '9月',
		lineValue: 40,
		barValue1: 40,
		barValue2: 30,
		barValue3: 40,
	},
	{
		name: '10月',
		lineValue: 40,
		barValue1: 20,
		barValue2: 30,
		barValue3: 40,
	},
]

export default function (data) {
	return {
		textStyle: {
			fontSize: 16,
			color: '#FFF',
		},
		tooltip: {
			trigger: 'axis',
			triggerOn: 'mousemove|click',
			axisPointer: {
				lineStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: 'rgba(0, 255, 207, 0.5)',
							},
							{
								offset: 1,
								color: 'rgba(0, 255, 207, 0)',
							},
						],
						global: false,
					},
				},
			},
		},
		color: '#52EDC5',
		xAxis: [
			{
				type: 'category',
				data: data.map(item => item.name),
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
				offset: 5,
			},
			{
				type: 'category',
				data: data.map(item => item.name),
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
				offset: 5,
				position: 'top',
				gridIndex: 1,
			},
		],
		grid: [
			{
				left: 50,
				right: 50,
				top: '55%',
				height: '35%',
			},
			{
				left: 50,
				right: 50,
				top: 35,
				height: '35%',
			},
		],
		yAxis: [
			{
				name: '吨',
				type: 'value',
				splitLine: {
					show: true,
					lineStyle: {
						type: 'solid',
						color: 'rgba(199, 209, 219, 0.4)',
					},
				},
				axisLabel: {
					color: '#fff',
				},
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				nameTextStyle: {
					color: '#fff',
				},
				offset: 5,
			},
			{
				name: 'm³',
				type: 'value',
				splitLine: {
					show: true,
					lineStyle: {
						type: 'solid',
						color: 'rgba(199, 209, 219, 0.4)',
					},
				},
				axisLabel: {
					color: '#fff',
				},
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				nameTextStyle: {
					color: '#fff',
				},
				offset: 5,
				gridIndex: 1,
			},
		],
		series: [
			{
				name: '进液量',
				type: 'bar',
				barWidth: 8,
				itemStyle: {
					color: '#2C99FF',
					barBorderRadius: 3.5,
				},
				xAxisIndex: 1,
				yAxisIndex: 1,
				data: data.map(item => item.barValue1),
			},
			{
				name: '出液量',
				type: 'bar',
				barWidth: 8,
				itemStyle: {
					color: '#E5615B',
					barBorderRadius: 3.5,
				},
				xAxisIndex: 1,
				yAxisIndex: 1,
				barGap: '100%',
				data: data.map(item => item.barValue2),
			},
			{
				name: '气化量',
				type: 'line',
				symbolSize: 16,
				symbol: 'none',
				itemStyle: {
					color: '#fff',
					borderColor: '#00DDFF',
				},
				lineStyle: {
					color: '#00DDFF',
				},
				smooth: true,
				areaStyle: {
					color: new echarts.graphic.LinearGradient(
						0,
						0,
						0,
						1,
						[
							{
								offset: 0,
								color: 'rgba(0, 221, 255, 0.4)',
							},
							{
								offset: 1,
								color: 'rgba(0, 221, 255, 0.1)',
							},
						],
						false,
					),
				},
				data: data.map(item => item.lineValue),
			},
		],
	}
}
