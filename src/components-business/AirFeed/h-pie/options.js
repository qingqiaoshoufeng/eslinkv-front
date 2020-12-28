export default function (data, config) {
    const total = data.reduce((p, n) => p + n.value, 0)
    return {
        series: [{
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['45%', '60%'],
            avoidLabelOverlap: false,
            startAngle: 270,
            color: config.colors,
            label: {
                formatter: function(params) {
                    const percent = ~~(params.value * 100 / total)
                    return `{normal|${params.name}}\n{value|${params.value}${config.unit} ${percent}%}`
                },
                padding: [0, -70],
                rich: {
                    normal: {
                        fontSize: 18,
                        lineHeight: 24,
                        color: '#fff',
                        padding: [0, 11, 0, 10],
                        align: 'left'
                    },
                    value: {
                        align: 'left',
                        fontSize: 18,
                        lineHeight: 24,
                        color: '#fff',
                        padding: [-6, 0, 0, 0],
                    }
                }
            },
            labelLine: {
                length: 10,
                length2: 80
            },
            data: data
        }]
    }
}