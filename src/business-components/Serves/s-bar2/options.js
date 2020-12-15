export default function getOption (data, config) {
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
            data: data.map(v => v.xValue)
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
            type: 'value',
            splitLine:{
                show: true
            },
            show: true,
            axisTick: {
                show: false,
                textStyle: {
                    color: '#fff',
                }
            },
            axisLabel: {
                textStyle: {
                    show: true,
                    color: '#fff',
                }
            },
            interval: 25,
            axisLine: {
                show: true,
            }
        }],
        barGap: -1,
        series: [{
            type: 'bar',
            yAxisIndex:0,
            stack: 'a',
            showBackground: true,
            itemStyle: {
                normal: {
                    color: config.color1,
                }
            },
            barWidth: 10,
            data: data.map(v => v.yValue1)
        }, {
            name:'%',
            type: 'bar',
            stack: 'a',
            barWidth: 10,
            yAxisIndex:0,
            showBackground: true,
            itemStyle: {
                normal: {
                    color: config.color2
                }
            },
            data: data.map(v => v.yValue)
        }]
    }
}
