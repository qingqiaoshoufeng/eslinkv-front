
export default function (percentage) {
    const options = {
        series: [
            {
                name: '外环底色',
                animation: false,
                type: 'pie',
                startAngle: 270,
                radius: ['82.5%', '97.5%'],
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    normal: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0)'
                        },
                        smooth: 0.2,
                        length: 10
                    }
                }
            },
            {
                name: '外环数据展示',
                animation: false,
                type: 'pie',
                startAngle: 270,
                radius: ['82%', '98%'],
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    normal: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        },
                        smooth: 0.2,
                        length: 10
                    }
                }
            },
            {
                name: '内环底色',
                animation: false,
                type: 'pie',
                startAngle: 270,
                radius: ['75%', '78%'],
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    normal: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        },
                        smooth: 0.2,
                        length: 10
                    }
                }
            },
            {
                name: '内环数据展示',
                animation: false,
                type: 'pie',
                startAngle: 270,
                radius: ['75%', '78%'],
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    normal: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        },
                        smooth: 0.2,
                        length: 10
                    }
                }
            }
        ]
    }
    let newData = []
    let newData1 = []
    let newData3 = []
    let newData4 = []

    for (let i = 0; i < percentage / 4; i++) {
        let opacity = (i * 4) / percentage
        if (opacity <= 0) {
opacity = 0.1
}
        newData = [
            ...newData,
            {
                value: 3.5,
                itemStyle: {
                    color: `rgba(0, 221, 255,${opacity})`
                }
            },
            {
                value: 0.5,
                itemStyle: {
                    color: 'rgba(0, 221, 255, 0)'
                }
            }
        ]
        newData1 = [
            ...newData1,
            {
                value: 3.5,
                itemStyle: {
                    color: `rgba(0, 221, 255,${opacity})`
                }
            },
            {
                value: 0.5,
                itemStyle: {
                    color: 'rgba(255, 255, 255, 0)'
                }
            }
        ]
        newData3 = [
            ...newData3,
            {
                value: 4,
                itemStyle: {
                    color: 'rgba(0, 221, 255, 0)'

                }
            }
        ]
        newData4 = [
            ...newData4,
            {
                value: 4,
                itemStyle: {
                    color: `rgba(0, 221, 255,${opacity})`
                }
            }
        ]
    }
    for (let i = 0; i <= (100 - percentage) / 4; i++) {
        newData = [...newData, {
            value: 3.5,
            itemStyle: {
                color: 'rgba(255, 255, 255, .1)'
            }
        }, {
            value: 0.5,
            itemStyle: {
                color: 'rgba(255, 255, 255, 0)'
            }
        }]
        newData1 = [...newData1, {
            value: 3.5,
            itemStyle: {
                color: 'rgba(255, 255, 255, .1)'
            }
        }, {
            value: 0.5,
            itemStyle: {
                color: 'rgba(255, 255, 255, 0)'
            }
        }]
        newData3 = [
            ...newData3,
            {
                value: 4,
                itemStyle: {
                    color: 'rgba(255, 255, 255, 0)'
                }
            }
        ]
        newData4 = [
            ...newData4,
            {
                value: 4,
                itemStyle: {
                    color: 'rgba(255, 255, 255, 0)'
                }
            }
        ]
    }
    options.series[0].data = newData1
    options.series[1].data = newData
    options.series[2].data = newData3
    options.series[3].data = newData4
    return options
}
