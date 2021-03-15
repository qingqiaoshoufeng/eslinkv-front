export default {
    grid: {
        left: 35,
        right: 40,
        top: 45,
        bottom: 40
    },
    xAxis: {
        type: 'category',
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#fff',
				fontSize: 16,
				lineHeight: 16
            }
        }
    },
    yAxis: [
        {
            type: 'value',
            show: true,
            splitLine: {
                lineStyle: {
                    type: 'solid',
                    color: 'rgba(199, 209, 219, 0.2)'
                }
            },
            axisTick: {
                show: false,
                textStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff',
                    fontSize: 16,
                    lineHeight: 16
                }
            },
            axisLine: {
                show: false
            }
        },
        {
            type: 'value',
            show: true,
            splitLine: {
                show: false
            },
            axisTick: {
                show: false,
                textStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff',
                    fontSize: 16,
                    lineHeight: 16
                }
            },
            axisLine: {
                show: false
            }
        }
    ],
    barWidth: 6,
    barGap: 0.5,
    series: [{
        type: 'bar',
        itemStyle: {
            normal: {
                color: '#2C99FF'
            }
        }
    }, {
        type: 'bar',
        yAxisIndex: 1,
        itemStyle: {
            normal: {
                color: '#00FFCF'
            }
        }
    }]
}
