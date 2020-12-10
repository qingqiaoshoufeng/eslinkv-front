
export default function (data) {
    return {
        grid: {
            top: 0,
            left: '0',
            right: '0',
            bottom: 0,
            containLabel: false
        },
        xAxis: {
            type: 'value',
            inverse: true,
            show: false
        },
        yAxis: {
            show: false,
            inverse: true,
            position: 'right',
            type: 'category'
        },
        series: [{
            name: 'count',
            type: 'bar',
            barWidth: 6,
            zlevel: 2,
            label: {
                show: false
            },
            itemStyle: {
                color: 'rgba(0,221,255,0.3)'
            },
            emphasis: {
                itemStyle: {
                    color: '#00DDFF'
                }
            },
            data: data.map(v => v.actual)
        },
            { //背景条
                zlevel: 1,
                yAxisIndex: 0,
                type: "bar",
                itemStyle: {
                    color: 'rgba(0,87,169,0.5)'
                },
                emphasis: {
                    itemStyle: {
                        color: 'rgba(0,87,169, 1)'
                    }
                },
                barWidth: 12,
                barGap: "-150%",
                tooltip: {
                    show: false
                },
                cursor: "default",
                data: data.map(v => v.plan),
                animation: false
            }
        ]
    }
}
