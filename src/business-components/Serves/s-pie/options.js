export default function (data, config) {
    return {
        grid: {
            left: 35,
            right: 30,
            top: 45,
            bottom: 40
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    color: '#fff',
                }
            },
            data: data.xValue
        }],
        yAxis: [{
            type: 'value',
            show: true,
            axisTick: {
                show: false,
                textStyle: {
                    color: '#fff',
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff',
                }
            },
            axisLine: {
                show: false,
            }
        },{
            name:'%',
            nameTextStyle: {
                color: '#fff',
                fontSize: 16,
                align: 'left',
                padding: [2, 6, 5, 8],
                lineHeight:10
            },
            type: 'value',
            splitLine:{
                show: false
            },
            show: false,
            axisTick: {
                show: false,
                textStyle: {
                    color: '#fff',
                }
            },
            axisLabel: {
                textStyle: {
                    show: false,
                    color: '#fff',
                }
            },
            interval: 25,
            axisLine: {
                show: false,
            }
        }],
        barGap: -0.8,
        series: [{
            type: 'bar',
            yAxisIndex:0,
            showBackground: true,
            itemStyle: {
                normal: {
                    color: config.color2,
                }
            },
            barWidth: 10,
            data: data.yValue1
        }, {
            type: 'bar',
            barWidth: 6,
            yAxisIndex:0,
            showBackground: true,
            itemStyle: {
                normal: {
                    color: config.color1,
                }
            },
            data: data.yValue
        },{
            type: 'line',
            yAxisIndex:1,
            show: true,
            axisTick: {
                show: false,
                textStyle: {
                    color: '#fff',
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff',
                    show: false,
                }
            },
            itemStyle:{
                normal: {
                    color: config.color3
                }
            },
            axisLine: {
                show: false,
            },
            data: lineValue
        }]
    }
}