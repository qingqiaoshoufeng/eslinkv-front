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
    var  getname=['周一','周二','周三','周四','周五','周六','周日'];
    var  getvalue=[60,70,80,90,50,65,49];
    return {
        grid: {
            top: '10%',
            right: '5%',
            left: '5%',
            bottom: '5%'
        },

        textStyle: {
            fontSize: 16,
            color: '#FFF'
        },
        xAxis: [{
            data: getname,
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
            data: getvalue,
            symbol: 'circle',
            symbolSize: 0,
            /*itemStyle: {
                normal: {
                    color: '#FFF',
                    borderColor: '#94DDFF',
                    borderWidth: 3
                },
            },*/
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
        }]
    }
}