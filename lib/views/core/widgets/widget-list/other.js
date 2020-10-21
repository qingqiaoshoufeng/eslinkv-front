const other = {
  label: '其他',
  name: 'other',
  widgets: [
    {
      type: 'preset-slot',
      label: '预置槽位',
      widgets: [
        {
          type: 'preset-slot',
          label: '预置槽位',
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
            config: {}
          }
        }
      ]
    },
    {
      type: 'inquiry',
      label: '查询小工具',
      widgets: [
        {
          type: 'property-select',
          label: '下拉条件切换',
          config: {
            layout: {
              size: {
                width: 100,
                height: 30
              },
              position: {
                value: 'relative'
              }
            }
          }
        },
        {
          type: 'property-select',
          label: '下拉条件切换-带标签',
          config: {
            layout: {
              size: {
                width: 160,
                height: 30
              },
              position: {
                value: 'relative'
              }
            },
            config: {
              showLabel: true
            }
          }
        },
        {
          type: 'property-switch',
          label: '点选条件切换',
          config: {
            layout: {
              size: {
                width: 300,
                height: 30
              },
              position: {
                value: 'relative'
              }
            }
          }
        },
        {
          type: 'property-switch',
          label: '点选条件切换-带标签',
          config: {
            layout: {
              size: {
                width: 300,
                height: 30
              },
              position: {
                value: 'relative'
              }
            },
            config: {
              showLabel: true,
              label: '请选择'
            }
          }
        },
        {
          type: 'keyword-input',
          label: '关键字查询',
          config: {
            layout: {
              size: {
                width: 200,
                height: 30
              },
              position: {
                value: 'relative'
              }
            },
            config: {
              showLabel: false
            }
          }
        },
        {
          type: 'keyword-input',
          label: '关键字查询-带标签',
          config: {
            layout: {
              size: {
                width: 240,
                height: 30
              },
              position: {
                value: 'relative'
              }
            },
            config: {
              showLabel: true
            }
          }
        },
        {
          type: 'float-form',
          label: '浮动查询表单',
          config: {
            layout: {
              size: {
                width: 400,
                height: 240
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
      type: 'iframe-web',
      label: 'iframe小工具',
      widgets: [
        {
          type: 'iframe-web',
          label: 'iframe小工具',
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
      type: 'baidu-map',
      label: '百度地图',
      widgets: [
        {
          type: 'baidu-map',
          label: '百度地图',
          config: {
            layout: {
              size: {
                width: 400,
                height: 400
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
      type: 'slot-table',
      label: '插槽表格',
      widgets: [
        {
          type: 'slot-table',
          label: '插槽表格',
          config: {
            layout: {
              size: {
                width: 400,
                height: 210
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
      type: 'menu-list',
      label: '菜单小工具',
      widgets: [
        {
          type: 'menu-list',
          label: '菜单小工具',
          config: {
            layout: {
              size: {
                width: 400,
                height: 40
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
      type: 'combination',
      label: '组合小工具',
      widgets: [
        {
          type: 'combination',
          label: '组合小工具',
          config: {
            layout: {
              size: {
                width: 400,
                height: 360
              },
              position: {
                value: 'relative'
              }
            }
          }
        },
        {
          type: 'combination',
          label: '组合小工具-轮播',
          config: {
            layout: {
              size: {
                width: 400,
                height: 360
              },
              position: {
                value: 'relative'
              }
            },
            config: {
              mode: 'slide'
            }
          }
        }
      ]
    },
    {
      type: 'ratio-bar',
      label: '比例条',
      widgets: [
        {
          type: 'ratio-bar',
          label: '比例条',
          config: {
            layout: {
              size: {
                width: 300,
                height: 50
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
      type: 'marquee',
      label: '跑马灯',
      widgets: [
        {
          type: 'marquee',
          label: '跑马灯',
          config: {
            layout: {
              size: {
                width: 200,
                height: 30
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
      type: 'number-display',
      label: '数值展示',
      widgets: [
        {
          type: 'number-display',
          label: '数值展示',
          config: {
            layout: {
              size: {
                width: 200,
                height: 30
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

export default other
