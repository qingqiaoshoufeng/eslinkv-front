
export default function (data, config) {
    var xData = ['省直', '济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁','1','2','3','4','5','6'];
    var yydata = [122, 111, 111, 232, 113, 333, 123, 123,211, 232, 113, 333, 123, 123, 112];
    var ysdata = [122, 111, 111, 232, 113, 333, 123, 123,211, 232, 113, 333, 123, 123, 112];
    var hsdata = [122, 111, 111, 232, 113, 333, 123, 123,211, 232, 113, 333, 123, 123, 112];

    return {
        textStyle: {
            fontSize: 16,
            color: '#FFF'
        },
        legend: {
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
        grid: {
            top: '20%',
            bottom: '4%',
            right:'3%',
            left:'0%',
            containLabel: true
        },
        animationDuration: 3000,
        xAxis: [{
            type: "category",
            axisLine: {
                show: false
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
                stack: "总量",
                barMaxWidth: 8,
                barGap: "10%",
                itemStyle: {
                    color: config.color1
                },
                data: data.map(v => v.a)
            }, {
                name: config.desc2,
                type: "bar",
                stack: "总量",
                barMaxWidth: 8,
                barGap: "10%",
                itemStyle: {
                    color: config.color2
                },
                data: data.map(v => v.b)
            }, {
                name: config.desc3,
                type: "bar",
                stack: "总量",
                barMaxWidth: 8,
                barGap: "10%",
                itemStyle: {
                    color: config.color3
                },

                data: data.map(v => v.c)
            }]
    }
}