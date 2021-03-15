export default function getOption (data, config) {
    const x = []
    const y1 = []
    const y2 = []
	let y1Max = 0; let y1Min = 0; let y2Max = 0; let y2Min = 0; let diff1 = 0; let diff2 = 0
	if (data instanceof Array) {
		data.forEach(v => {
			x.push(v.x)
			y1.push(v.y1)
			y2.push(v.y2)
		})
		y1Max = Math.max(...y1)
		y1Min = Math.min(...y1)
		y2Max = Math.max(...y2)
		y2Min = Math.min(...y2)
		 diff1 = (y1Max - y1Min) / 5
		 diff2 = (y2Max - y2Min) / 5
	}
    const scale = 3
    y1Min = y1Min - diff1 * scale
    y1Max = y1Max + diff1 * scale
    y2Min = y2Min - diff2 * scale
    y2Max = y2Max + diff2 * scale
    return {
        textStyle: {
            fontSize: 16,
            color: '#FFF'
        },
        grid: {
            top: 40,
            left: 70,
            bottom: 30,
            right: 70
        },
        legend: {
            icon: 'rect',
            orient: 'horizontal',
            align: 'left',
            top: '2%',
            right: 'center',
            itemWidth: 16,
            itemHeight: 2,
            itemGap: 8,
            textStyle: {
                color: '#fff',
                fontSize: 16
            }
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                color: '#fff',
                fontSize: 16,
                lineHeight: 16,
                interval: 0
            },
            offset: 5,
            data: x
        }],
        yAxis: [
            {
                type: 'value',
                show: true,
                name: 'Mpa',
                scale: true,
                min: y1Min.toFixed(3),
                max: y1Max.toFixed(3),
                splitNumber: 4,
                axisTick: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                },
                nameTextStyle: {
                    color: 'rgba(255, 255, 255, 0.75)',
                    padding: [0, 30, 0, 0]
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize: 16,
                        lineHeight: 16
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color: 'rgba(199, 209, 219, 0.2)'
                    }
                },
                axisLine: {
                    show: false
                }
            },
            {
                name: 'Mpa',
                type: 'value',
                scale: true,
                min: y2Min.toFixed(3),
                max: y2Max.toFixed(3),
                splitLine: {
                    show: false
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: 16,
                    lineHeight: 16
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    color: 'rgba(255, 255, 255, 0.75)',
                    padding: [0, 0, 0, 30]
                },
                offset: 5
            }],
        series: [
            {
                name: '进站压力',
                type: 'line',
                symbolSize: 16,
                symbol: 'none',
                lineStyle: {
                    color: '#FB592C',
                    width: 3
                },
                smooth: true,
                itemStyle: {
                    color: '#FB592C'
                },
                data: y1,
                markPoint: {
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        color: '#fff',
                        borderWidth: 4,
                        borderColor: 'rgba(251, 89, 44, 0.64)'
                    },
                    label: {
                        show: true,
                        distance: 20,
                        offset: [0, -18],
                        textBorderWidth: 0,
                        textShadowBlur: 0,
                        textShadowColor: 'transparent',
                        width: 49,
                        height: 25,
                        fontSize: 14,
                        lineHeight: 22,
                        align: 'center',
                        backgroundColor: {
                            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAZCAYAAABzVH1EAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAU3SURBVHgB1VdLjxw1EHaV3T37mF0FlEjJAUJWXBIFCcGFOxducEwuaPklJP+AG1ducOHC/0AgoVx4SShCQrCI7JPZtl1Fld3u6e6ZWRayc0jteuy22+X66uVqOH9w/xGC+di8wERsHjsd/Hyye/D1nzd+O/GuOQ1V+DtinJGjQEhgDHNvE5jFJ2if5mOWP0jjMtfv57vNwv7xWn+qwgi1JdzE6KbOu2kVqrde/uPWnemRSUA8QTwUEIfNpDnylT+NLpwHGxt2VLiRgXbEYJ6b5rwEbquowlfXhmdgC9Mh44bzdmpj8BGryMieIepqCwTp2Nf+ma+bw/O6OY6TcKZAyFKkuTKhPaUwpyUilnnoSduJL/+thbte+a3i1SeLySK4FaxtXHTMkLQQxHs6IIKMRPCgYA7DRAGFM+/CjJBZUOt5ggdwZHwaASrrYr1Oi/lX+KT9hbJuxP1EOdRpnwz0FDJ0SgCCiXj6zFpLLKqX8cRG6w1yDwjwLFbhNLh44ittAkrcS+JELGKKFbKWMR2eY2AuKCQ34U7LkJXeCsxJ6zwPB1P4zKMKWkuTAkoG61sX5WEDg6gf2QWjIMKZC44JqAMiUc/n4l7iSvEsSvMunoWKZtFFNWFmxsCtjGDsiiCGBKgvGLRxQANbclpE43jsUmWtHyv6g8I62gx6C9HOApIX16f29QxEWtDAodRTI8C89BJILJmLW0GLVZgXDh8Qjwa8JAMtZAwerY33WnElTQubopdGlE4ibxA5izu6LEirBEbuP/PiIWOBVs6N12EFnyUgV59HyXvSHI/WcM5OHZGH0wT9jLOULpuL+T/Oj8+gf5EFM7N+RsnPRBcfCCvml73zvJSzAPcSxaJrJvmhDeiSR4trAa6+/C6jycu88z8pC0hz9acYEf1DSi2Q7goZRkl3shSHWi3J9CJdj1f7sXB5WuSiIls07a0qMqIqmoZA0ksSELXcnk5eclZu0Rg1T5homcfCDOqjnJW7rEkjcfpU9nR67O1Lj7DoAYW/yGes9LXKlxpJU+fJF2oGIo+1leJFSoCJDXZLSxNZ0UsoynuKvp/wh5kGOqCa08s4Ei54VjpR1JMVK9aH3ryZu3I+q9wjGS0KuwkE3JTbfEMKxxpTA5tr0wzEglaUZLerYOVStEEjS/ZPBIXmazYXx4qqjNoKILKVZtQ52xQ+17hNB6vr6plRe1B3wY7XEou0QGSf2UiVr1a9jdtyAkjGOATCsKVlMWlFKbeJmGtD7CM3p9WicVmpPs71IV1QwFpChCh9UoBYqCQQVPdVK5AUf7nXixohirKBEQZZacGSCnripGgUi+zU3u26ptqSEqVqIz4BEX+zO1VTRXE4LT4qsZBskJJF6xjkUhwONVVKllziiOACBvQbRqsC9hEog5kL4zIIdGIZbRJ+qVetIvR5a3QWi+Z6TJcrcacNCYEdVbrz1U7lKyfh0AGpLaMAqTUjTQTLpvNRrBFVyyUYS+ndB1NuWS06tYJWi8h3AikQ/QRIVqJcpmNKJJSEqcUKTs6sIAHCnClTrJpF1zJdvWVTXGSr6IfVjnxY1ci2A7I3PbquzVwh/XS8e/DpD3e/U6sUa+zvfX/33rW/bporJuKru3wHxPtvXovn/psvn+6d/Xi0c6jx8fZLBzfevfmrc58/uWPWQGjWQPDZt8/E/T9679bT129vn05f2TydvnP991d1zqyJ1mKRQv7h/U9+OZl+qLF1e/v4K/fFk7UBcWaN5Cbu0Wvm+H0de46PzYtM4eEbHzQP7u2bNdM/lyH+VubPiyIAAAAASUVORK5CYII='
                        },
                        rich: {},
                        formatter: function (param) {
                            return param.value.toFixed(3)
                        }
                    },
                    data: [{
                        type: 'max'
                    }, {
                        type: 'min'
                    }]
                },
                markLine: {
                    symbol: 'none',
                    label: {
                        show: false
                    },
                    data: [
                        [{
                            yAxis: 'min',
                            x: '10%'
                        }, {
                            type: 'min'
                        }],
                        [{
                            yAxis: 'max',
                            x: '10%'
                        }, {
                            type: 'max'
                        }]
                    ]
                }
            },
            {
                name: '出站压力',
                type: 'line',
                symbolSize: 16,
                symbol: 'none',
                smooth: true,
                itemStyle: {
                    color: '#56C1FF'
                },
                lineStyle: {
                    color: '#56C1FF',
                    width: 3
                },
                yAxisIndex: 1,
                data: y2,
                markPoint: {
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        color: '#fff',
                        borderWidth: 4,
                        borderColor: 'rgba(86, 193, 255, 0.64)'
                    },
                    label: {
                        show: true,
                        distance: 20,
                        offset: [0, -18],
                        textBorderWidth: 0,
                        textShadowBlur: 0,
                        textShadowColor: 'transparent',
                        width: 49,
                        height: 25,
                        fontSize: 14,
                        lineHeight: 22,
                        align: 'center',
                        backgroundColor: {
                            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAZCAYAAABzVH1EAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVgSURBVHgB1VdJjh1FEM2IzKr/f7vlti0DdjNIyN4YsUJiwQo4AJIlBEsEJ8G+AefAG8QB6D0bFkg+APbCSC2wTQ+/f1VG8iKHqqyeZXcvHPbvyqki48Vc9O1WeGDY/GjeZBLz0Olz7+m/2y8fP33W73UrWa56f9B5WfUSehETKBgTxpeYJjwC/pHJaxLG/TwOUvaVB54cyghn8nr9Tn1PPQcTcpa4sWxnztGidc2VWXP13ubttc0bJgIJ3vt+92DV/wcUu0Cx3/XS9V6AZwAheTBIbUbhTqVyJgwSDcqJvCiAIGVmNNFMfpfSewwc3DrLi1nvOmn0bOi8190EpBNRAN2Ogtlf+d1V3y97H2CgEC+VeOFUIjpG0HqtTCYWzXzCoac55v0aPGbEsAgzL5x1K3GAEIgNiQ8VEO9FYAW/s+z6nYMOYHqPoV91IVmiXPqqFJQHnX/9GIKVbOuIu9YGISELaLCOgb5HINC7hxE0Nvrdpe9gEVkeYA7X8iFakLJe4hiElzDlLI7uq+ko7pV53A+qCcomykJTfqfwUR6DZXQ7WWp0RpyzWF15ZshqLJNvbS8HnRNJDAYgGg8Cd5IlzANAfr9XK3lRBzZikuayZbKAlbaKN1WWG1ymcp9yvgA4tH5kb/QC1vW5SwlkZm04aBEPIsmqGUiMMIgscLcgANT3QYBJvA+6bhiCiy+X4umnl8d9Sc/BsUNa00HZH6nwNKfuVe8KrGA6b9gL+T5KCdl8TBQVkKyZkF1AnzXz6UVHqeyfdK6APC/Pk86pdCp4qPJD3uYJg0nYsZ4fTc/To2eunybcedYP3RFSWk5CUlVjuH5o3MWnydNjMtThCwuA0wQ5L8izCHfEBFDUigigoYjmq+JfTTSTnK3JScYidQLz8whw8aSdAHxfpnmiBDtpwYkZQ1FpXtTMxAi4UGlV5TpLyeXMcSBex0KqUstxECXl7GJcAcGWZlRCYqDeMTF+obXMMQ3KkGixnmTFSmyFdBLqCi1jnOmlpd6FQ83AAGiamhEJJKkdizVKlF/mz9YmAV36ocaTFsXSwCSL2NiQMc1c7GXcrImFMJYmpGSXVGzGC5s4Z71apZQhi8RxNKIPqTWJFqpaGApRjcS5HhkzNI1R0fGkxgSBTdGCFkT8dZBvhq6xafHEGL1jLKoDEABE+bd23lh3pbVwi5BaAoteRutIrsiD25jRxSRpLfpsSKSvG5/QlUSvVleFqfuqQaJv2EGOzDDQEdfVSq73q0VUdnS+bq11DFl5Zh1xBYTRVlpsuq5vtMrrJbZx7HuJoKq+dUwJMh2g5Q+p14HjIasoGp2ObqUGiCigNXUPZafCqREoFIEir0OxSCb3E5Cf5/CYxVzBNHbeOgDk0SKOrF2bNRBC1NyIBZa5ExfLZxQqabTWVmynsrpFGwJvCBU3oIkTbYDQGWijEIFG77DxP0GRuC19W7gELDVTVUFQ3lSK9NDyGIJHcduww7cIPKexa02jso4Wge8167NWXVVjxM8bD8HQxkvqGE3KZaXym8Ey6XMl4gFobW1CB2fQHkK/ZXq1kLYZJllD3aNhBcLxGQNW56WfTFFRNTkJCCer6Flu1CoNFN8AzLyhBh1wAbL23vWb+jMXSHtP/tl+8uj3P1O8qRcRvfvVJ/fW77x9y1w0ydmfd69E97fCtZbNH3//9nhv76/tFxrQVz/afOvGp3fcz5/Th+YS6IJ6iCn98iU9R1j9cPOzu3cXt66vz25vrG98/P4HumYuiS7FIoW+2Qo/LZ89/w7pM8zf2fj10Rd0aUAuxSKFOmMeLDavvVjc2niJj+aH5k2mr7fCfVjme3PJ9D/pwh8YaEo4QgAAAABJRU5ErkJggg=='
                        },
                        rich: {},
                        formatter: function (param) {
                            return param.value.toFixed(3)
                        }
                    },
                    data: [{
                        type: 'max'
                    }, {
                        type: 'min'
                    }]
                },
                markLine: {
                    symbol: 'none',
                    label: {
                        show: false
                    },
                    data: [
                        [{
                            yAxis: 'min',
                            x: '90%'
                        }, {
                            type: 'min'
                        }],
                        [{
                            yAxis: 'max',
                            x: '90%'
                        }, {
                            type: 'max'
                        }]
                    ]
                }
            }
        ]
    }
}
