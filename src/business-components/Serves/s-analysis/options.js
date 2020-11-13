export default {
    radar: {
        grid: {
            left: '5%',
            top: '5%',
            right: '5%',
            bottom: '5%',
        },
        backgroundColor: 'rgba(255,255,255,1)',
        name: {
            textStyle: {
                color: '#fff',
            }
        },
        splitArea: {
            areaStyle: {
                color: ['rgba(255,255,255,0)']
            },
            lineStyle: {
                color: "#fff"
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "#0E7AC3",
                width: 2
            }
        },

        splitLine: {
            show: true,
            lineStyle: {
                color: "#0E7AC3",
                width: 2
            }
        },
    },
    series: {
        type: 'radar',
        lineStyle: {
            normal: {
                color: "#000",
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0,221,255,0.6)'
                }, {
                    offset: 1,
                    color: 'rgba(0,255,207,0.6)'
                }]),
            }
        },
        data: [{ value: [] }],
    }
};