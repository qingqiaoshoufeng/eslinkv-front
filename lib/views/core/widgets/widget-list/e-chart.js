const eChart = {
  label: 'Echarts',
  name: 'eChart',
  widgets: [
    {
      type: 'bar',
      label: '柱图',
      widgets: [
        {
          type: 'bar',
          label: '柱图',
          config: {
            layout: {
              size: {
                width: 400,
                height: 300
              },
              position: {
                value: 'relative'
              }
            }
          }
        },
        {
          type: 'bar',
          label: '柱图-横向',
          config: {
            layout: {
              size: {
                width: 400,
                height: 200
              },
              position: {
                value: 'relative'
              }
            },
            config: {
              grid: {
                grids: [{
                  top: 20,
                  left: 50,
                  right: 15,
                  bottom: 30
                }],
                xAxis: [{
                  type: 'value',
                  gridIndex: 0
                }],
                yAxis: [{
                  type: 'category',
                  gridIndex: 0,
                  dataIndex: 'name'
                }]
              }
            }
          }
        }
      ]
    },
    {
      type: 'line-chart',
      label: '折线',
      widgets: [
        {
          type: 'line-chart',
          label: '折线图',
          config: {
            layout: {
              size: {
                width: 400,
                height: 300
              },
              position: {
                value: 'relative'
              }
            }
          }
        }
      ]
    },
    {
      type: 'pie',
      label: '饼图',
      widgets: [
        {
          type: 'pie',
          label: '饼图',
          config: {
            layout: {
              size: {
                width: 400,
                height: 300
              },
              position: {
                value: 'relative'
              }
            }
          }
        }
      ]
    },
    {
      type: 'scatter',
      label: '散点图',
      widgets: [
        {
          type: 'scatter',
          label: '散点图',
          config: {
            layout: {
              size: {
                width: 400,
                height: 300
              },
              position: {
                value: 'relative'
              }
            }
          }
        }
      ]
    },
    {
      type: 'effectScatter',
      label: '特效散点图',
      widgets: [
        {
          type: 'effectScatter',
          label: '特效散点图',
          config: {
            layout: {
              size: {
                width: 400,
                height: 300
              },
              position: {
                value: 'relative'
              }
            }
          }
        }
      ]
    },
    {
      type: 'radar',
      label: '雷达图',
      widgets: [
        {
          type: 'radar',
          label: '雷达图',
          config: {
            layout: {
              size: {
                width: 400,
                height: 300
              },
              position: {
                value: 'relative'
              }
            }
          }
        }
      ]
    },
    {
      type: 'gauge',
      label: '仪表盘',
      widgets: [
        {
          type: 'gauge',
          label: '仪表盘',
          config: {
            layout: {
              size: {
                width: 400,
                height: 300
              },
              position: {
                value: 'relative'
              }
            }
          }
        }
      ]
    },
    {
      type: 'heatmap',
      label: '热力图',
      widgets: [
        {
          type: 'heatmap',
          label: '热力图',
          config: {
            layout: {
              size: {
                width: 400,
                height: 300
              },
              position: {
                value: 'relative'
              }
            }
          }
        }
      ]
    },
    {
      type: 'funnel',
      label: '漏斗图',
      widgets: [
        {
          type: 'funnel',
          label: '漏斗图',
          config: {
            layout: {
              size: {
                width: 400,
                height: 300
              },
              position: {
                value: 'relative'
              }
            }
          }
        }
      ]
    },
    {
      type: 'map-chart',
      label: '地图',
      widgets: [
        {
          type: 'map-chart',
          label: '地图',
          config: {
            layout: {
              size: {
                width: 400,
                height: 300
              },
              position: {
                value: 'relative'
              }
            },
            config: {
              
              visualMap: {
                enable: true,
                visualMaps: [
                  {
                    show: true,
                    min: 0,
                    max: 100,
                    calculable: true,
                    inRange: {
                      color: ['yellow', 'orangered']
                    },
                    outOfRange: {
                      color: ['transparent']
                    },
                    range: [0, 100],
                    controller: {
                      outOfRange: {
                        color: ['#999']
                      }
                    }
                  }
                ]
              }
            },
            api: {
              data: {
                value: [
                  {
                    name: '北京',
                    value: 100
                  }, {
                    name: '天津',
                    value: 69
                  }, {
                    name: '上海',
                    value: 45
                  }, {
                    name: '重庆',
                    value: 89
                  }, {
                    name: '河北',
                    value: 99
                  }, {
                    name: '河南',
                    value: 66
                  }, {
                    name: '云南',
                    value: 78
                  }, {
                    name: '辽宁',
                    value: 92
                  }, {
                    name: '黑龙江',
                    value: 56
                  }, {
                    name: '湖南',
                    value: 32
                  }, {
                    name: '安徽',
                    value: 11
                  }, {
                    name: '山东',
                    value: 56
                  }, {
                    name: '新疆',
                    value: 66
                  }, {
                    name: '江苏',
                    value: 100
                  }, {
                    name: '浙江',
                    value: 12
                  }, {
                    name: '江西',
                    value: 24
                  }, {
                    name: '湖北',
                    value: 36
                  }, {
                    name: '广西',
                    value: 78
                  }, {
                    name: '甘肃',
                    value: 99
                  }, {
                    name: '山西',
                    value: 88
                  }, {
                    name: '内蒙古',
                    value: 93
                  }, {
                    name: '陕西',
                    value: 97
                  }, {
                    name: '吉林',
                    value: 100
                  }, {
                    name: '福建',
                    value: 96
                  }, {
                    name: '贵州',
                    value: 86
                  }, {
                    name: '广东',
                    value: 76
                  }, {
                    name: '青海',
                    value: 16
                  }, {
                    name: '西藏',
                    value: 56
                  }, {
                    name: '四川',
                    value: 36
                  }, {
                    name: '宁夏',
                    value: 52
                  }, {
                    name: '海南',
                    value: 88
                  }, {
                    name: '台湾',
                    value: 37
                  }, {
                    name: '香港',
                    value: 26
                  }, {
                    name: '澳门',
                    value: 12
                  }
                ]
              }
            }
          }
        },
        {
          type: 'map-chart',
          label: '地图-bmap',
          config: {
            layout: {
              size: {
                width: 400,
                height: 300
              },
              position: {
                value: 'relative'
              }
            },
            config: {
              series: [
                {
                  type: 'scatter',
                  id: '',
                  dataIndex: 'value',
                  geoIndex: 0,
                  coordinateSystem: 'geo'
                }
              ],
              visualMap: {
                enabled: false,
                visualMaps: []
              }
            },
            api: {
              data: {
                value: [
                  [121.15, 31.89, 9],
                  [109.781327, 39.608266, 12],
                  [120.38, 37.35, 12],
                  [122.207216, 29.985295, 12],
                  [116.1, 24.55, 25],
                  [122.05, 37.2, 25],
                  [121.48, 31.22, 25],
                  [101.718637, 26.582347, 25],
                  [122.1, 37.5, 25],
                  [117.93, 40.97, 25],
                  [118.1, 24.46, 26],
                  [115.375279, 22.786211, 26],
                  [121.56, 29.86, 33],
                  [110.359377, 21.270708, 33],
                  [113.06, 22.61, 45],
                  [106.9, 27.7, 63],
                  [120.58, 30.01, 63],
                  [119.42, 32.39, 64],
                  [119.95, 31.79, 64],
                  [119.1, 36.62, 65],
                  [106.54, 29.59, 66],
                  [121.420757, 28.656386, 67],
                  [118.78, 32.04, 67],
                  [118.03, 37.36, 70],
                  [106.71, 26.57, 71],
                  [120.29, 31.59, 71],
                  [123.73, 41.3, 71],
                  [118.05, 36.78, 85],
                  [122.85, 41.12, 86],
                  [119.48, 31.43, 86],
                  [86.06, 41.68, 86],
                  [114.35, 36.1, 90],
                  [114.35, 34.79, 90],
                  [117, 36.65, 92],
                  [104.37, 31.13, 93],
                  [120.65, 28.01, 95],
                  [115.97, 29.71, 96],
                  [116.59, 35.38, 120],
                  [112.239741, 30.335165, 127],
                  [113, 28.21, 175],
                  [118.88, 28.97, 177],
                  [116.7, 39.53, 193],
                  [115.480656, 35.23375, 194],
                  [117.27, 31.86, 229],
                  [114.31, 30.52, 273],
                  [125.03, 46.58, 279]
                ]
              }
            }
          }
        }
      ]
    },
    {
      type: 'parallel',
      label: '平行图',
      widgets: [
        {
          type: 'parallel',
          label: '平行图',
          config: {
            layout: {
              size: {
                width: 400,
                height: 300
              },
              position: {
                value: 'relative'
              }
            }
          }
        }
      ]
    },
    {
      type: 'sunburst',
      label: '旭日图',
      widgets: [
        {
          type: 'sunburst',
          label: '旭日图',
          config: {
            layout: {
              size: {
                width: 400,
                height: 300
              },
              position: {
                value: 'relative'
              }
            }
          }
        }
      ]
    }
  ]
}

export default eChart
