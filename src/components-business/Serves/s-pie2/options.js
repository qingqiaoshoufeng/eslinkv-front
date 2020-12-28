export default function getOption (data, config) {
	return {
		color: JSON.parse(config.color),
		series: [
			{
				center: ['50%', '50%'],
				type: 'pie',
				radius: ['45%', '57%'],
				minAngle: 10,
				label: {
					show: false,
				},
				data: data.map(item => item.value),
				itemStyle: {
					opacity: 0.5
				},
				emphasis: {
					itemStyle: {
						opacity: 1
					}
				}
			}
		]
	}
}
