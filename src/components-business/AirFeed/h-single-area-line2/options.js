export default {
	textStyle: {
		fontSize: 16,
		color: '#FFF',
	},
	grid: {
		top: 40,
		left: 40,
		bottom: 30,
		right: 0,
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
							color: 'rgba(0, 221, 255, .5)',
						},
						{
							offset: 1,
							color: 'rgba(0, 221, 255, 0)',
						},
					],
					global: false,
				},
			},
		},
	},
	color: 'rgba(0, 221, 255, 1)',
	xAxis: [
		{
			type: 'category',
			axisTick: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			axisLabel: {
				color: '#fff',
				fontSize: 16,
				lineHeight: 16,
				interval: 0,
			},
			offset: 5,
		},
	],
	yAxis: [
		{
			name: '%',
			type: 'value',
			splitLine: {
				show: true,
				lineStyle: {
					type: 'solid',
					color: 'rgba(199, 209, 219, 0.2)',
				},
			},
			axisLabel: {
				color: '#fff',
				fontSize: 16,
				lineHeight: 16,
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
	],
	series: [
		{
			type: 'line',
			symbolSize: 16,
			symbol:
				'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFKSURBVHgBjVPbUcNADNwz/wwlOMPwTUogFUAHkA7ogFABdBA6MKnAUIH9TTB2BzYFgLKSnfj8ymRndL7T6bEnyQ59bOUGDneUW55C0wlSnlMEeMbMFb55cNjlckF5oSaiQ8XvApfOmZxhSd0n/hEjo01C2w7U+VsSypvtp1DbvZptJ4hm1otToYmUSeMc8pD7mUUkpMSUUmpEquswyaS0ejW073vOe0cfZSfIVlY1a33Pl8y9AJFMI/ZY1My5iP88OY6yUwv6BiMlqjCNQYc0QGF0WqRHAmzQPmGuAxZw2XBAHjyj5QQL1T0eTn+Y23RaK7QlyaCNkVf9eKSNectc25HJGqdiMHga8YftHJ1zoJd5ba1vBq/uwsxVfM+C9XA4R2KD5c2GUc3libXKafPLn2thPoQbyRKyQCvurnm7D1JYsQXvuHIfvvkO+Uc0txLiEPoAAAAASUVORK5CYII=',
			itemStyle: {
				color: '#fff',
				borderColor: 'rgba(0, 221, 255, 1)',
			},
			lineStyle: {
				color: 'rgba(0, 221, 255, 1)',
			},
			areaStyle: {
				color: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1,
					[
						{
							offset: 0,
							color: 'rgba(0, 221, 255, 0.5)',
						},
						{
							offset: 1,
							color: 'rgba(0, 221, 255, 0)',
						},
					],
					false,
				),
			},
		},
	],
}
