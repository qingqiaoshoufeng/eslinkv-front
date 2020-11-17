
export default function (data) {
    return {
        "series": [{
            "type": "pie",
            "center": ["50%", "50%"],
            "radius": [74, 78],
            "hoverAnimation": false,
            startAngle: 270,
            "data": [
                {
                    "name": "",
                    "value": data,
                    "label": {
                        "show": false
                    },
                    itemStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 1,
                            x2: 0,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "rgba(0,255,207,0)" // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "rgba(0,255,207,1)" // 100% 处的颜色
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    },
                    labelLine: {show: false}
                },
                { //画中间的图标
                    "name": "",
                    "value": 0,
                    "label": {
                        position: 'inside',
                        backgroundColor: '#fff',
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        padding: 8,
                        borderWidth: 5,
                        borderColor: '#fff'
                    },
                    labelLine: {show: false}
                },
                { //画剩余的刻度圆环
                    "name": "",
                    "value": 100 - data,
                    "label": {
                        show: false
                    },
                    itemStyle: {
                        color: 'rgba(0, 255, 207, 0.1)'
                    },
                    labelLine: {show: false}
                }
            ]
        }]
    }
}