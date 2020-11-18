export default function getOption (percent) {
    return {
        legend: {
            show: false
        },
        series: [{
            name: '',
            type: 'pie',
            radius: ['90%', '98%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
                show: false
            },
            itemStyle: {},
            labelLine: {
                show: false
            },
            data: [{
                value: percent,
                name: '亮',
                itemStyle: {
                    color: '#00FFCF'
                }
            },
                {
                    value: 100 - percent,
                    name: '暗',
                    itemStyle: {
                        color: 'rgba(0, 87, 169, 0.5)'
                    }
                },
            ]
        }]
    }
}