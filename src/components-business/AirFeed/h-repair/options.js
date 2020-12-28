export default function (data) {
    const xAxisData = data.map(v => v.x)
    const yAxisData = data.map(v => v.y)
    return {
        grid: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        },
        xAxis: [{
            data: xAxisData,
            boundaryGap: false,
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
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        }],
        animation: false,
        series: [{
            name: '本周消费金额',
            type: 'line',
            data: yAxisData,
            symbol: 'circle',
            symbolSize: 0,
            smooth: true,
            lineStyle: {
                color: '#00DDFF'
            },
            areaStyle: {
                color: 'rgba(0, 221, 255, 0.2)',
            }
        }]
    }
}