export default {
    grid: {
        left: 35,
        right: 0,
        top: 45,
        bottom: 40
    },
    xAxis: {
        type: 'category',
        axisTick: {
            show: false,
        },
        axisLabel:{
            textStyle: {
                color: '#fff',
				fontSize: 16,
				lineHeight: 16
            }
        },
    },
    yAxis: {
        type: 'value',
        show: true,
        axisTick: {
            show: false,
            textStyle: {
                color: '#fff',
            }
        },
        axisLabel:{
            textStyle: {
                color: '#fff',
				fontSize: 16,
				lineHeight: 16
            }
        },
        axisLine: {
            show: false,
        }
    },
    barWidth: 6,
    barGap: 0.5,
    series: [{
        type: 'bar',
        showBackground: true,
        itemStyle: {
            normal: {
                color: '#2C99FF',
                barBorderRadius: 4
            }
        },
    }, {
        type: 'bar',
        showBackground: true,
        itemStyle: {
            normal: {
                color: '#00FFCF',
                barBorderRadius: 4
            }
        },
    }]
};
