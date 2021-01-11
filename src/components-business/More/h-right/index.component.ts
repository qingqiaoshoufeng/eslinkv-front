import {getInput} from '../../../../lib'

export const configSource: ComponentConfigSource = {
    config: {
        fields: {
            transform: getInput('transform', '旋转角度'),
            left: getInput('left', '位移'),
        }
    }
}
export const config: ComponentConfig = {
    animation: true,
    config: {
        transform: true,
        left: true,
    }
}
export const value: ComponentValue = {
    layout: {
        size: {
            width: 600,
            height: 954
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: {
            barCharts: [
                {
                    name: '居民户',
                    value: 1233556,
                    percent: 60,
                    icon: '/static/images/home/gas-use1.svg'
                },
                {
                    name: '公建户',
                    value: 125638,
                    percent: 70,
                    icon: '/static/images/home/gas-use2.svg'
                },
                {
                    name: '工业户',
                    value: 1689667,
                    percent: 90,
                    icon: '/static/images/home/gas-use3.svg'
                }
            ],
            fanCharts: [
                {
                    name: '城区1',
                    value: 72
                },
                {
                    name: '城区2',
                    value: 32
                },
                {
                    name: '城区3',
                    value: 12
                },
            ]
        }
    },
    config: {
        transform: -15,
        left: 100,
    }
}