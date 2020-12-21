
export default function (data, config) {
    return {
        textStyle: {
            fontSize: 16,
            color: '#FFF'
        },
        legend: {
            show: false,
            icon: 'rect',
            orient: 'horizontal',
            align: 'left',
            top: '2%',
            left: 'center',
            itemWidth: 16,
            itemHeight: 8,
            itemGap: 8,
            textStyle: {
                color: '#fff',
                fontSize: 16
            }
        },
        tooltip: {},
        grid: {
            top: '20%',
            bottom: '4%',
            right:'3%',
            left:'1%',
            containLabel: true
        },
        animationDuration: 3000,
        xAxis: [{
            type: "category",
            axisLine: {
                show: false
            },
			axisLabel: {
				color: "#fff",
				fontSize: 16,
				lineHeight: 16
			},
            axisTick: {
                show: false
            },
            data: data.map(v => v.x),
        }],
        yAxis: [{
            type: 'value',
            name: config.unit,
            nameTextStyle: {
                padding: [0, 24, 0, 0]
            },
            axisTick: {
                show: false
            },
			axisLabel: {
				color: "#fff",
				fontSize: 16,
				lineHeight: 16
			},
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)'
                }
            }
        }],
        series: [
            {
                name: config.desc1,
                type: "bar",
                barGap: '-75%',
                barWidth: 16,
                itemStyle: {
                    color: 'transparent',
                    borderColor: config.color1,
                    borderWidth: 2,
                },
                data: data.map(v => v.a),
                zlevel: 1
            }, {
                name: config.desc2,
                type: "bar",
                stack: "总量",
                barMaxWidth: 8,
				barMinHeight:10,
                itemStyle: {
                    color: config.color2
                },
                data: data.map(v => v.b),
                zlevel: 2
            }, {
                name: config.desc3,
                type: "bar",
                stack: "总量",
                barMaxWidth: 8,
				barMinHeight:10,
                itemStyle: {
                    color: config.color3
                },

                data: data.map(v => v.c),
                zlevel: 2
            }]
    }
}
