
export default function (data) {
    const newData = []
    const newData1 = []
    const color = [0, 255, 207]
    for (let i = data; i > 0; i--) {
        let opacity = 1 - i / data
        if (opacity < 0) {
opacity = 0.1
}
        newData.push({
            value: 1,
            itemStyle: {
                borderRadius: 100,
                color: `rgba(${color[0]}, ${color[1]}, ${color[2]},${opacity})`
            }
        })
    }
    while (newData.length < 100) {
        newData.push({
            value: 1,
            itemStyle: {
                borderRadius: 100,
                color: `rgba(${color[0]}, ${color[1]}, ${color[2]},0)`
            }
        })
    }
    newData1.push({
        value: 100,
        itemStyle: {
            color: `rgba(${color[0]}, ${color[1]}, ${color[2]},0.1)`
        }
    })
    return {
        series: [
            {
                name: '访问',
                animation: false,
                type: 'pie',
                startAngle: 270,
                radius: ['92%', '100%'],
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    normal: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        },
                        smooth: 0.2,
                        length: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#fff'
                    }

                },
                data: newData1
            },
            {
                name: '访问来源',
                animation: false,
                type: 'pie',
                startAngle: 270,
                radius: ['93%', '99%'],
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    normal: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        },
                        smooth: 0.2,
                        length: 10
                    }
                },
                data: newData
            }
        ]
    }
}
