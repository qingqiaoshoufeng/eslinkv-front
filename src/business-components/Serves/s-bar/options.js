export default function getOption(data, config) {
    return {
        grid: {
            left: 35,
            right: 0,
            top: 45,
            bottom: 40
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false,
            },
            axisLabel:{
                textStyle: {
                    color: '#fff',
                    fontSize: 16,
                    lineHeight: 16
                }
            },
            data: data.map(item => item.xValue)
        },
        yAxis: {
            type: 'value',
            show: true,
            splitLine: {
                lineStyle: {
                    type: "solid",
                    color: "rgba(199, 209, 219, 0.2)"
                }
            },
            axisTick: {
                show: false,
                textStyle: {
                    color: '#fff',
                }
            },
            axisLabel:{
                textStyle: {
                    color: '#fff',
                    fontSize: 16,
                    lineHeight: 16
                }
            },
            axisLine: {
                show: false,
            }
        },
        barWidth: 6,
        barGap: 0.5,
        series: [{
            type: 'bar',
            showBackground: true,
            itemStyle: {
                normal: {
                    color: config.color1,
                    barBorderRadius: 4
                }
            },
            data: data.map(item => item.yValue1)
        }, {
            type: 'bar',
            showBackground: true,
            itemStyle: {
                normal: {
                    color: config.color2,
                    barBorderRadius: 4
                }
            },
            data: data.map(item => item.yValue2)
        }]
    }
}
