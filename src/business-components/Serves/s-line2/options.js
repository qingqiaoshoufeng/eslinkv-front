import { hexToRgba } from '@/utils/index'

export default function (data, config) {
    return {
        grid: {
            top: '20%',
            left: '6%',
            right: '4%',
            bottom: '10%',
        },
        legend: {
            icon: 'rect',
            orient: 'horizontal',
            align: 'left',
            top: '4%',
            right: 'center',
            itemWidth: 16,
            itemHeight: 8,
            itemGap: 16,
            textStyle: {
                color: '#fff',
                fontSize: 16
            }
        },
        textStyle: {
            color: '#fff',
            fontSize: 16
        },
        xAxis: [{
            type: 'category',
            data: data.xNames,
            axisLabel:{
                show: true
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false,

            },
            axisLine: {
                show: false,
            },

        }],
        yAxis: [{
            name: config.unit,
            type: 'value',
            axisLabel:{
                show: true
            },
            nameTextStyle: {
                padding: [0, 20, 0, 0]
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#C4C4C4'
                }
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            splitArea: {
                show: false
            }
        }],
        series: [{
            name: config.lineName1,
            type: 'line',
            data: data.value1,
            lineStyle: {
                color: config.color1
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: hexToRgba(config.color1, 0.6)
                    },
                        {
                            offset: 1,
                            color: hexToRgba(config.color1, 0)
                        }
                    ], false)
                }
            },
            symbol: 'emptyCircle',
            showSymbol: false, //是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
            itemStyle: {
                color: config.color1
            },
            smooth: true
        },
            {
                name: config.lineName2,
                type: 'line',
                data: data.value2,
                lineStyle: {
                    color: config.color2,
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: hexToRgba(config.color2, 0.6)
                        },
                            {
                                offset: 1,
                                color: hexToRgba(config.color2, 0)
                            }
                        ], false)
                    }
                },
                symbol: 'emptyCircle',
                showSymbol: false,
                itemStyle: {
                    color: config.color2
                },
                smooth: true
            }
        ]
    }
}