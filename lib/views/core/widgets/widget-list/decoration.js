const getTitleWidget = ({ label, background, size, font }, index) => {
    return {
        type: 'level-title',
        label,
        config: {
            layout: {
                size: {
                    width: 400,
                    height: 60,
                    ...(size || {})
                },
                position: {
                    value: 'relative'
                },
                background: {
                    url: background
                },
                font: {
                    ...(font || {})
                }
            },
            api: {
                data: `标题样式 ${index + 1}`
            }
        }
    }
}

const titles = [
    {
        label: '标题1',
        background: 'static/images/widgets/title/title1.png'
    },
    {
        label: '标题2',
        background: 'static/images/widgets/title/title2.png',
        size: {
            height: 50
        },
        font: {
            size: 18,
            lineHeight: 2.8,
            align: 'center'
        }
    },
    {
        label: '标题3',
        background: 'static/images/widgets/title/title5.png',
        size: {
            height: 30
        },
        font: {
            size: 15,
            fontWeight: 'bold',
            lineHeight: 2,
            align: 'left'
        }
    },
    {
        label: '标题4',
        background: 'static/images/widgets/title/title4.png',
        size: {
            height: 30
        },
        font: {
            size: 15,
            lineHeight: 2,
            align: 'right'
        }
    },
    {
        label: '标题5',
        background: 'static/images/widgets/title/title3.png',
        size: {
            height: 30
        },
        font: {
            color: 'lightgreen',
            size: 15,
            fontWeight: 'bold',
            lineHeight: 2,
            align: 'center'
        }
    }
]

const getBorderWidget = ({ label, type }) => {
    return {
        type: 'border',
        label,
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
                type
            }
        }
    }
}

const borders = [
    { label: '边框样式1', type: 1 },
    { label: '边框样式2', type: '2' },
    { label: '边框样式3', type: '3' },
    { label: '边框样式4', type: '4' },
    { label: '边框样式4-翻转', type: '4-reverse' },
    { label: '边框样式5', type: '5' },
    { label: '边框样式5-翻转', type: '5-reverse' },
    { label: '边框样式6', type: '6' },
    { label: '边框样式7', type: '7' },
    { label: '边框样式8', type: '8' },
    { label: '边框样式9', type: '9' },
    { label: '边框样式10', type: '10' },
    { label: '边框样式11', type: '11' },
    { label: '边框样式12', type: '12' },
    { label: '边框样式13', type: '13' }
]

const getDecorationWidget = ({ label, type, size: { width = 400, height = 200 } }) => {
    return {
        type: 'decoration',
        label,
        config: {
            layout: {
                size: {
                    width,
                    height
                },
                position: {
                    value: 'relative'
                }
            },
            config: {
                type
            }
        }
    }
}

const decorations = [
    { label: '拉花样式1', type: 1, size: { width: 250, height: 50 } },
    { label: '拉花样式2', type: '2', size: { width: 250, height: 15 } },
    { label: '拉花样式2-翻转', type: '2-reverse', size: { width: 15, height: 150 } },
    { label: '拉花样式3', type: '3', size: { width: 250, height: 30 } },
    { label: '拉花样式4', type: '4', size: { width: 15, height: 150 } },
    { label: '拉花样式4-翻转', type: '4-reverse', size: { width: 250, height: 15 } },
    { label: '拉花样式5', type: '5', size: { width: 400, height: 50 } },
    { label: '拉花样式6', type: '6', size: { width: 400, height: 50 } },
    { label: '拉花样式7', type: '7', size: { width: 250, height: 50 } },
    { label: '拉花样式8', type: '8', size: { width: 300, height: 50 } },
    { label: '拉花样式8-翻转', type: '8-reverse', size: { width: 300, height: 50 } },
    { label: '拉花样式9', type: '9', size: { width: 150, height: 150 } },
    { label: '拉花样式10', type: '10', size: { width: 400, height: 15 } },
    { label: '拉花样式11', type: '11', size: { width: 200, height: 60 } }
]

const decoration = {
    label: '装饰',
    name: 'decoration',
    widgets: [
        {
            type: 'title',
            label: '标题',
            widgets: titles.map(getTitleWidget)
        },
        {
            type: 'border',
            label: '边框',
            widgets: borders.map(getBorderWidget)
        },
        {
            type: 'decoration',
            label: '拉花',
            widgets: decorations.map(getDecorationWidget)
        },
        {
            type: 'date-time',
            label: '日期时间',
            widgets: [
                {
                    type: 'date-time',
                    label: '日期时间',
                    config: {
                        layout: {
                            size: {
                                width: 400,
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
            type: 'a-image',
            label: '图片',
            widgets: [
                {
                    type: 'a-image',
                    label: '图片',
                    config: {
                        layout: {
                            size: {
                                width: 200,
                                height: 200
                            },
                            position: {
                                value: 'relative'
                            }
                        },
                        config: {
                            src: './static/images/kanban/no-snapshot.png',
                            title: '示例图片标题'
                        }
                    }
                }
            ]
        },
        {
            type: 'a-svg',
            label: 'SVG',
            widgets: [
                {
                    type: 'a-svg',
                    label: 'SVG',
                    config: {
                        layout: {
                            size: {
                                width: 200,
                                height: 200
                            },
                            position: {
                                value: 'relative'
                            }
                        },
                        config: {
                            content: '<path d="M928.034999 416.018999c-28.415112 0-53.950314 12.351614-71.549764 31.999l-189.946064 0 134.299803-134.299803c26.303178 1.471954 53.11834-7.839755 73.213712-27.967126 37.502828-37.502828 37.502828-98.268929 0-135.771757s-98.268929-37.502828-135.771757 0c-20.095372 20.095372-29.407081 46.910534-27.967126 73.213712l-134.299803 134.299803 0-189.946064c19.647386-17.567451 31.999-43.102653 31.999-71.549764 0-53.022343-42.974657-95.997-95.997-95.997s-95.997 42.974657-95.997 95.997c0 28.415112 12.351614 53.950314 31.999 71.549764l0 189.946064-134.299803-134.299803c1.439955-26.303178-7.839755-53.11834-27.967126-73.213712-37.502828-37.502828-98.268929-37.502828-135.771757 0s-37.502828 98.268929 0 135.771757c20.095372 20.095372 46.910534 29.407081 73.213712 27.967126l134.299803 134.299803-189.946064 0c-17.567451-19.647386-43.102653-31.999-71.549764-31.999-53.022343 0-95.997 42.974657-95.997 95.997s42.974657 95.997 95.997 95.997c28.415112 0 53.950314-12.351614 71.549764-31.999l189.946064 0-134.299803 134.299803c-26.303178-1.471954-53.11834 7.839755-73.213712 27.967126-37.502828 37.502828-37.502828 98.268929 0 135.771757s98.268929 37.502828 135.771757 0c20.095372-20.095372 29.407081-46.910534 27.967126-73.213712l134.299803-134.299803 0 189.946064c-19.647386 17.567451-31.999 43.102653-31.999 71.517765 0 53.022343 42.974657 95.997 95.997 95.997s95.997-42.974657 95.997-95.997c0-28.415112-12.351614-53.950314-31.999-71.549764l0-189.946064 134.299803 134.299803c-1.471954 26.303178 7.839755 53.11834 27.967126 73.213712 37.502828 37.502828 98.268929 37.502828 135.771757 0s37.502828-98.268929 0-135.771757c-20.095372-20.095372-46.910534-29.407081-73.213712-27.967126l-134.299803-134.299803 189.946064 0c17.567451 19.647386 43.102653 31.999 71.517765 31.999 53.022343 0 95.997-42.974657 95.997-95.997s-42.974657-95.997-95.997-95.997z" fill="#1296db"></path>',
                            viewBox: [0, 0, 1024, 1024]
                        }
                    }
                }
            ]
        },
        {
            type: 'lottie',
            label: 'Lottie 动效',
            widgets: [
                {
                    type: 'lottie',
                    label: 'Lottie 动效',
                    config: {
                        layout: {
                            size: {
                                width: 200,
                                height: 200
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
          type: 'swiper',
          label: '轮播图',
          widgets: [
            {
              type: 'swiper',
              label: '轮播图',
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
          type: 'multiline-text',
          label: '多行文本/段落',
          widgets: [
            {
              type: 'multiline-text',
              label: '多行文本/段落',
              config: {
                layout: {
                  size: {
                    width: 400,
                    height: 150
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

export default decoration
