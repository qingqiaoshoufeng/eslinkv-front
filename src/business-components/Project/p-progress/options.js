export default {
    grid: {
		top: 40,
		left: 40,
		bottom: 30,
		right: 0
	},
    xAxis: {name: 'amount'},
    yAxis: {type: 'category'},
    
    series: [
        {
            type: 'bar',
            barWidth: 10,
            encode: {
                // Map the "amount" column to X axis.
                x: 'amount',
                // Map the "product" column to Y axis
                y: 'product'
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 1,
                        [
                            {offset: 0, color: 'rgba(255,255,255,.6)'},
                            {offset: 1, color: 'rgba(255,255,255,0)'}
                        ]
                    )
                }
            },
        }
    ]
}

