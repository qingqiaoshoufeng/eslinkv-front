export default {
    grid: {
        left: 35,
        right: 30,
        top: 45,
        bottom: 40
    },
    xAxis: [{
        type: 'category',
        axisTick: {
            show: false,
        },
        axisLabel: {
            textStyle: {
                color: '#fff',
            }
        },
    }],
    yAxis: [{
        type: 'value',
        show: true,
        axisTick: {
            show: false,
            textStyle: {
                color: '#fff',
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff',
            }
        },
        axisLine: {
            show: false,
        }
    },{
        type: 'value',
        splitLine:{
            show: true
        },
        show: true,
        axisTick: {
            show: false,
            textStyle: {
                color: '#fff',
            }
        },
        axisLabel: {
            textStyle: {
                show: true,
                color: '#fff',
            }
        },
        interval: 25,
        axisLine: {
            show: true,
        }
    }],
    barGap: -1,
    series: [{
        type: 'bar',
        yAxisIndex:0,
        showBackground: true,
        itemStyle: {
            normal: {
                color: '#00FFCF',
            }
        },
        barWidth: 10,
    }, {
        name:'%',
        type: 'bar',
        barWidth: 10,
        yAxisIndex:0,
        showBackground: true,
        itemStyle: {
            normal: {
                color: '#2C99FF',
            }
        },
    }]
};