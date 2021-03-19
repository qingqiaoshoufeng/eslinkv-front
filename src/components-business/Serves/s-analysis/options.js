export default function getOption (data) {
    return {
        radar: {
            grid: {
                left: '5%',
                top: '5%',
                right: '5%',
                bottom: '5%'
            },
            splitNumber: 4,
            backgroundColor: 'rgba(255,255,255,1)',
            name: {
                textStyle: {
                    color: '#fff'
                }
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(255,255,255,0)']
                },
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#0E7AC3',
                    width: 2
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#0E7AC3',
                    width: 2
                }
            },
            indicator: data.dataList.map(item => {
                return { name: item.name, max: 1 }
            })
        },
        series: {
            type: 'radar',
            lineStyle: {
                normal: {
                    color: '#000',
                    width: 0
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0,221,255,0.6)'
                    }, {
                        offset: 1,
                        color: 'rgba(0,255,207,0.6)'
                    }])
                }
            },
            data: [
                {
                    value: data.dataList.map(item => item.percent),
                    symbolSize: 0
                }
            ]
        }
    }
}
