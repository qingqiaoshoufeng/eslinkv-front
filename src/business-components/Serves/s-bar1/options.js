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
		axisLine: {
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
		splitLine: {
			lineStyle: {
				type: "solid",
				color: "rgba(199, 209, 219, 0.2)"
			}
		},
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
        name:'%',
        nameTextStyle: {
            color: '#fff',
            fontSize: 16,
            align: 'left',
            padding: [2, 6, 5, 8],
            lineHeight:10
        },
        type: 'value',
        splitLine:{
            show: false
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
            show: false,
        }
    }],
    barGap: -0.8,
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
        type: 'bar',
        barWidth: 6,
        yAxisIndex:0,
        showBackground: true,
        itemStyle: {
            normal: {
                color: '#2C99FF',
            }
        },
    },{
		type: 'line',
        yAxisIndex:1,
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
                show: false,
            }
        },
        itemStyle:{
            normal: {
                color:'#yellow',
                lineStyle:{
                    width:2,
                    type:'dotted'  //'dotted'虚线 'solid'实线
                }
            }
        },
        smooth: true,
        axisLine: {
            show: false,
        }
    }]
};
