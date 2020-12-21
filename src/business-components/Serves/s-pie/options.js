import { hexToRgba } from '@/utils/index'

export default function (value1, value2, config,percent1,percent2) {
    return {
        series: [
            // 主要展示层的
            {
                radius: [0, 72],
                center: ['50%', '50%'],
                type: 'pie',

                data: [
                    {
                        value: value1,
                        itemStyle: {
                            color: hexToRgba(config.color1, 0.3)
                        },
                        label: {
                            formatter: function(params) {
                                return `{normal|${config.desc1}}{value|${Number(params.value).toLocaleString()}}\n{unit|${percent1}%}`
                            },
                            padding: [0, -100],
                            rich: {
                                normal: {
                                    fontSize: 18,
                                    lineHeight: 24,
                                    color: '#fff',
                                    padding: [0, 11, -6, 0],
                                    align: 'left'
                                },
                                value: {
                                    align: 'left',
                                    fontSize: 24,
                                    lineHeight: 24,
                                    color: '#00FFCF',
									fontFamily: 'font-num',
                                    padding: [0, 0, -6, 0],
                                },
                                unit: {
                                    align: 'left',
                                    fontSize: 18,
                                    lineHeight: 24,
                                    color: '#fff',
									fontFamily: 'font-num',
                                    padding: [-6, 0, 0, 0],
                                }
                            }
                        },
                        labelLine: {
                            length: 10,
                            length2: 120,
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.4)'
                            }
                        },
                    },{
                        value: value2,
                        itemStyle: {
                            color: 'rgba(0 ,0,0,0)'
                        },
                        label: {
                            show: false
                        }
                    }]
            },
            // 边框的设置
            {
                radius: [68, 72],
                center: ['50%', '50%'],
                type: 'pie',
                animation: false,
                itemStyle: {
                    color: config.color1
                },
                label: {
                    show: false
                },
                data: [
                    {value:value1},
                    {
                        value:value2,
                        itemStyle: {
                            color: 'rgba(0 ,0,0,0)'
                        }
                    }
                ]
            },
            {
                radius: [0, 80],
                center: ['50%', '50%'],
                type: 'pie',
                data: [
                    {
                        value: value1,
                        itemStyle: {
                            color: 'rgba(0 ,0,0,0)'
                        },
                        label: {
                            show: false
                        }
                    },{
                        value: value2,
                        itemStyle: {
                            color: hexToRgba(config.color2, 0.2)
                        },
                        label: {
                            formatter: function(params) {
                                return `{normal|${config.desc2}}{value|${Number(params.value).toLocaleString()}}\n{unit|${percent2}%}`
                            },
                            padding: [0, -100],
                            rich: {
                                normal: {
                                    fontSize: 18,
                                    lineHeight: 24,
                                    color: '#fff',
                                    padding: [0, 11, -6, 0],
                                    align: 'left'
                                },
                                value: {
                                    align: 'left',
                                    fontSize: 24,
                                    lineHeight: 24,
                                    color: '#E5615B',
                                    fontFamily: 'font-num',
                                    padding: [0, 0, -6, 0],
                                },
                                unit: {
                                    align: 'left',
                                    fontSize: 18,
                                    lineHeight: 24,
                                    color: '#fff',
                                    fontFamily: 'font-num',
                                    padding: [-6, 0, 0, 0],
                                }
                            }
                        },
                        labelLine: {
                            length: 10,
                            length2: 120,
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.4)'
                            }
                        },
                    }]
            },
            // 边框的设置
            {
                radius: [76, 80],
                center: ['50%', '50%'],
                type: 'pie',
                animation: false,
                itemStyle: {
                    color: config.color2
                },
                label: {
                    show: false
                },
                data: [
                    {
                        value: value1,
                        itemStyle: {
                            color: 'rgba(0 ,0,0,0)'
                        }
                    },
                    {value:value2},
                ]
            }
        ]
    }
}
