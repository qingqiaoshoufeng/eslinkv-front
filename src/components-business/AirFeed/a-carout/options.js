export default {
    series: [
        {
            name: '访问',
            animation: false,
            type: 'pie',
            startAngle: 270,
            radius: ['92%', '100%'],
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                normal: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 1)'
                    },
                    smooth: 0.2,
                    length: 10
                }
            },
            itemStyle: {
                normal: {
                    color:'#fff',
                }
                
            }  
        },
        {
            name: '访问来源',
            animation: false,
            type: 'pie',
            startAngle: 270,
            radius: ['93%', '99%'],
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                normal: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 1)'
                    },
                    smooth: 0.2,
                    length: 10
                }
            },
        },
        // {
        //     name: '访问',
        //     animation: false,
        //     type: 'pie',
        //     startAngle: 270,
        //     radius: ['93%', '100%'],
        //     label: {
        //         show: false,
        //         position: 'center'
        //     },
        //     labelLine: {
        //         normal: {
        //             show: false
        //         }
        //     },
        //     itemStyle: {
        //         normal: {
        //             color:'#fff',
        //         }
                
        //     }  
        // },
        // {
        //     name: '访问来源',
        //     animation: false,
        //     type: 'pie',
        //     startAngle: 270,
        //     radius: ['93%', '100%'],
        //     label: {
        //         show: false,
        //         position: 'center'
        //     },
        //     labelLine: {
        //         normal: {
        //             show: false
        //         }
        //     },
        //     itemStyle: {
        //         normal: {
        //             borderColor: "#ffffff",
        //             borderWidth: 6
        //         }
        //     }
        // },
    ]
};