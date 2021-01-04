import {getInput} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            transform: getInput('transform', '旋转角度'),
            left: getInput('left', '位移'),
        }
    }
}
const config = {
    animation: true,
    config: {
        transform: true,
        left: true,
    }
}
const value = {
    layout: {
        size: {
            width: 600,
            height: 952
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: {
            ling: {
                toDayLING: 100,
                yearLING: 999999999,
                linCharts: [
                    {
                        x: '1月',
                        y: 100
                    },
                    {
                        x: '2月',
                        y: 200
                    },
                    {
                        x: '3月',
                        y: 300
                    },
                    {
                        x: '4月',
                        y: 240
                    },
                    {
                        x: '5月',
                        y: 366
                    },
                    {
                        x: '6月',
                        y: 400
                    },
                    {
                        x: '7月',
                        y: 321
                    },
                    {
                        x: '8月',
                        y: 374
                    },
                    {
                        x: '9月',
                        y: 222
                    },
                    {
                        x: '10月',
                        y: 216
                    },
                    {
                        x: '11月',
                        y: 300
                    },
                    {
                        x: '12月',
                        y: 111
                    }
                ]
            },
            sale: {
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
        }
    },
    config: {
        transform: 15,
        left: 100,
    }
}

export {config, value, configSource}
