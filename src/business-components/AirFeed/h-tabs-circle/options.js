export function getCircleOption (data) {
    if (data.length === 0) return {}
    const xAxis = data.map(v => v.name + v.percent + '%')
    return {
        grid: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        textStyle: {
            fontSize: 16,
            color: '#FFF'
        },
        legend: {
            orient: 'vertical',
            left: '37%',
            top: '-2%',
            textStyle: {
                color: '#FFFFFF',
                fontSize: 16
            },
            itemGap: 0,
            itemWidth: 16,
            itemHeight: 1,
            data: xAxis
        },
        series: [
            {
                name: xAxis[2],
                clockWise: false,
                type: 'pie',
                center: ['40%', '50%'],
                radius: ['86%', '96%'],
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                label: {
                    show: false
                },
                color: '#2C99FF',
                hoverAnimation: false,
                data: [
                    {
                        value: data[2].percent,
                        name: '一般',

                    },
                    {
                        value: 100 - data[2].percent,
                        name: '',
                        itemStyle: {
                            color: "rgba(0,0,0,0)",
                            borderWidth: 0
                        },
                        tooltip: {
                            show: false
                        }
                    }
                ]
            },
            {
                name: xAxis[1],
                clockWise: false,
                type: 'pie',
                center: ['40%', '50%'],
                radius: ['66%', '76%'],
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                label: {
                    show: false
                },
                color: '#18CEB9',
                hoverAnimation: false,
                data: [
                    {
                        value: data[1].percent,
                        name: '良',

                    },
                    {
                        value: 100 - data[1].percent,
                        name: '',
                        itemStyle: {
                            color: "rgba(0,0,0,0)",
                            borderWidth: 0
                        },
                        tooltip: {
                            show: false
                        },
                    },

                ]
            },

            {
                name: xAxis[0],
                type: 'pie',
                clockWise: false,
                center: ['40%', '50%'],
                radius: ['46%', '56%'],
                hoverAnimation: false,
                label: {
                    show: false
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                color: '#FB592C',
                data: [
                    {
                        value: data[0].percent,
                        name: '优',
                    },
                    {
                        value: 100 - data[0].percent,
                        name: '',
                        itemStyle: {
                            color: "rgba(0,0,0,0)",
                            borderWidth: 0
                        },
                        tooltip: {
                            show: false
                        },
                    },
                ]
            },
        ]
    }
}

export function getLineOption (data) {
    return {
        grid: {
            top: '20%',
            right: '5%',
            left: '10%',
            bottom: '5%'
        },

        textStyle: {
            fontSize: 16,
            color: '#FFF'
        },
        xAxis: [{
            data: data.lineX,
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
        }],
        yAxis: [{
            name: 'km',
            nameTextStyle: {
                padding: [0,30,0,0]
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle:{
                    color:'rgba(255, 255, 255, 0.2)',
                    opacity:0.3
                }
            }
        }],
        animation: false,
        series: [{
            type: 'line',
            data: data.lineY,
            symbol: 'circle',
            symbolSize: 0,
            lineStyle: {
                width: 3,
                color: '#00DDFF'
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                        offset: 0,
                        color: 'rgba(0, 221, 255, 0.3)',

                    },
                        {
                            offset: 1,
                            color: 'rgba(0, 221, 255, 0.1)',
                        }],false),
                }
            },
            markPoint: {
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    color: '#fff',
                    borderWidth: 4,
                    borderColor: 'rgba(0, 255, 207, 0.5)'
                },
                label: {
                    show: true,
                    distance: 20,
                    offset: [-38, -24],
                    textBorderWidth: 0,
                    textShadowBlur: 0,
                    textShadowColor:'transparent',
                    formatter: param => {
                        return '{card|' + param.value + 'km}'
                    },
                    rich: {
                        'card': {
                            width: 84,
                            height: 30,
                            fontSize: 18,
                            lineHeight: 18,
                            backgroundColor: '#0057A9',
                            borderRadius: 0,
                            borderColor: '#00DDFF',
                            borderWidth: 1,
                            align: 'center',
                            color: '#ffffff'
                        }
                    }
                },
                data: [{
                    type: 'max'
                },{
                    type: 'min',
                    label: {
                        show: false
                    }
                }]
            }
        }]
    }
}