import { getSelect, getInput, getEChartsFunction, getBooleanInput, getInputNumber, getColor, getSelectWithInput, getRatio, getFontWeight, getNumberWithUnit, getArrayGroup } from '../lib/config-tools'
const lineStyle = Object.freeze({
  groupLabel: '线条样式配置',
  groupType: 'Collapse',
  fields: {
    'color.width.type': [
      getColor('color', '线条样式', { placeholder: '颜色' }),
      getInputNumber('width', '线条样式', { placeholder: '线宽' }),
      getSelect('type', '线条样式', ['solid', 'dashed', 'dotted'], { placeholder: '类型' })
    ],
    'shadowColor.shadowBlur.shadowOffsetX.shadowOffsetY': [
      getColor('shadowColor', '图形投影', { placeholder: '配色' }),
      getInputNumber('shadowBlur', '图形投影', { placeholder: '尺寸' }),
      getInputNumber('shadowOffsetX', '图形投影', { placeholder: 'X偏移', title: '水平偏移' }),
      getInputNumber('shadowOffsetY', '图形投影', { placeholder: 'Y偏移', title: '垂直偏移' })
    ],
    opacity: getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 })
  }
})
const textStyle = Object.freeze({
  'fontSize.color.fontStyle.fontWeight': [
    getInputNumber('fontSize', '文本样式', { placeholder: '大小' }),
    getColor('color', '文本样式', { placeholder: '颜色' }),
    getSelect('fontStyle', '文本样式', ['normal', 'italic', 'oblique'], { placeholder: '风格' }),
    getFontWeight('fontWeight', '文本样式', { placeholder: '粗细' })
  ],
  backgroundColor: getColor('backgroundColor', '背景颜色'),
  'borderColor.borderWidth.borderRadius': [
    getColor('borderColor', '边框', { placeholder: '颜色' }),
    getInputNumber('borderWidth', '边框', { placeholder: '线宽' }),
    getInput('borderRadius', '边框', { placeholder: '圆角' })
  ],
  'shadowColor.shadowBlur.shadowOffsetX.shadowOffsetY': [
    getColor('shadowColor', '图形投影', { placeholder: '配色' }),
    getInputNumber('shadowBlur', '图形投影', { placeholder: '尺寸' }),
    getInputNumber('shadowOffsetX', '图形投影', { placeholder: 'X偏移', title: '水平偏移' }),
    getInputNumber('shadowOffsetY', '图形投影', { placeholder: 'Y偏移', title: '垂直偏移' })
  ],
  'with.height': [
    getInput('with', '文字块', { placeholder: '宽度' }),
    getInput('height', '文字块', { placeholder: '高度' }),
  ],
  'textBorderColor.textBorderWidth': [
    getColor('textBorderColor', '文字描边', { placeholder: '颜色' }),
    getInputNumber('textBorderWidth', '文字描边', { placeholder: '宽度' }),
  ],
  'textShadowColor.textShadowBlur.textShadowOffsetX.textShadowOffsetY': [
    getColor('textShadowColor', '文字阴影', { placeholder: '颜色' }),
    getInputNumber('textShadowBlur', '文字阴影', { placeholder: '长度' }),
    getInputNumber('textShadowOffsetX', '文字阴影', { placeholder: 'X 偏移' }),
    getInputNumber('textShadowOffsetY', '文字阴影', { placeholder: ' Y 偏移' })
  ]
})
const label = Object.freeze({
  groupLabel: '标签配置',
  groupType: 'Collapse',
  group: 'label',
  fields: {
    show: getBooleanInput('show', '显示标签'),
    position: getSelectWithInput('position', '标签位置', [
      'top', 'left', 'right', 'bottom', 'inside', 'insideLeft', 'insideRight', 'insideTop',
      'insideBottom', 'insideTopLeft', 'insideBottomLeft', 'insideTopRight', 'insideBottomRight'
    ]),
    'distance.rotate.offset': [
      getInputNumber('distance', '标签方位', { placeholder: '间隔' }),
      getInputNumber('rotate', '标签方位', { placeholder: '旋转' }),
      getInput('offset', '标签方位', { placeholder: '偏移' })
    ],
    formatter: getInput('formatter', '文本格式化'),
    enable: [
      getBooleanInput('formatterFuncEnable', '文本格式化', { placeholder: '启用', defaultValue: false }),
      getEChartsFunction('formatterFunc', '函数配置', ['params'], {
        tips: '// 可用参数 params\n// 其中params 是 formatter 需要的单个数据集 。\n// 例：\n// console.log(params);\n\n'
      })
    ],
    'fontSize.color.fontStyle.fontWeight': [
      getInputNumber('fontSize', '文本样式', { placeholder: '大小' }),
      getColor('color', '文本样式', { placeholder: '颜色' }),
      getSelect('fontStyle', '文本样式', ['normal', 'italic', 'oblique'], { placeholder: '风格' }),
      getFontWeight('fontWeight', '文本样式', { placeholder: '粗细' })
    ],
    'align.verticalAlign': [
      getSelect('align', '文本对齐', ['left', 'center', 'right'], { placeholder: '水平' }),
      getSelect('verticalAlign', '文本对齐', ['top', 'middle', 'bottom'], { placeholder: '垂直' })
    ]
  }
})
const itemStyle = Object.freeze({
  groupLabel: '条目样式',
  groupType: 'Collapse',
  group: 'itemStyle',
  fields: {
    color: getColor('color', '填充配色'),
    'borderColor.borderWidth.borderType': [
      getColor('borderColor', '图形边框', { placeholder: '配色' }),
      getInputNumber('borderWidth', '图形边框', { placeholder: '尺寸' }),
      getSelect('borderType', '图形边框', ['solid', 'dashed', 'dotted'], { placeholder: '样式' })
    ],
    'shadowColor.shadowBlur.shadowOffsetX.shadowOffsetY': [
      getColor('shadowColor', '图形投影', { placeholder: '配色' }),
      getInputNumber('shadowBlur', '图形投影', { placeholder: '尺寸' }),
      getInputNumber('shadowOffsetX', '图形投影', { placeholder: 'X偏移', title: '水平偏移' }),
      getInputNumber('shadowOffsetY', '图形投影', { placeholder: 'Y偏移', title: '垂直偏移' })
    ],
    'opacity': getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 })
  }
})
const line = Object.freeze({
  groupLabel: '系列配置',
  groupType: 'Collapse',
  group: 'line',
  fields: {
    stack: getInput('stack', '数据堆叠'),
    step: getBooleanInput('step', '阶梯线图'),
    smooth: getBooleanInput('smooth', '平滑曲线'),
  },
  symbol: {
    groupLabel: '标记图形配置',
    groupType: 'Collapse',
    fields: {
      showSymbol: getBooleanInput('showSymbol', '显示图形', { title: '如果 false 则只有在 tooltip hover 的时候显示' }),
      symbol: getSelectWithInput(
        'symbol', '标记图形',
        ['circle', 'emptyCircle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
        {
          defaultValue: 'circle',
          placeholder: '选择或自定义',
          title: '可选择预设图形或配置自定义图形，支持 通过 "image://url"、"dataURI" 设置图片或通过 "path://" 设置矢量路径'
        }
      ),
      symbolEnable: [
        getBooleanInput('symbolFuncEnable', '标记图形', { placeholder: '启用', defaultValue: false }),
        getEChartsFunction('symbolFunc', '函数配置', ['value', 'params'], {
          tips: '// 可用参数 value、params\n// 其中第一个参数 value 为 data 中的数据值，第二个参数params 是其它的数据项参数。\n// 例：\n// console.log(params);\n\n'
        })
      ],
      symbolSize: getRatio('symbolSize', '图形尺寸', { symbol: ',', placeholder: '大小', defaultValue: [4] }),
      sizeEnable: [
        getBooleanInput('symbolSizeFuncEnable', '图形尺寸', { placeholder: '启用', defaultValue: false }),
        getEChartsFunction('symbolSizeFunc', '函数配置', ['value', 'params'], {
          tips: '// 可用参数 value、params\n// 其中第一个参数 value 为 data 中的数据值，第二个参数params 是其它的数据项参数。\n// 例：\n// console.log(value);\n\n'
        })
      ],
      symbolRotate: getInput('symbolRotate', '旋转角度'),
      rotateEnable: [
        getBooleanInput('symbolRotateFuncEnable', '旋转角度', { placeholder: '启用', defaultValue: false }),
        getEChartsFunction('symbolRotateFunc', '函数配置', ['value', 'params'], {
          tips: '// 可用参数 value、params\n// 其中第一个参数 value 为 data 中的数据值，第二个参数params 是其它的数据项参数。\n// 例：\n// console.log(value);\n\n'
        })
      ],
      symbolKeepAspect: getBooleanInput('symbolKeepAspect', '约束比例'),
      symbolOffset: getRatio('symbolOffset', '标记偏移', { symbol: ',', defaultValue: [0, 0] })
    }
  },
  lineStyle,
  areaStyle: {
    groupLabel: '区域填充样式配置',
    groupType: 'Collapse',
    fields: {
      'color.origin': [
        getColor('color', '填充样式', { placeholder: '颜色' }),
        getSelect('origin', '填充样式', ['auto:auto', 'start:start', 'end:end'], { placeholder: '起始位置' })
      ],
      'shadowColor.shadowBlur.shadowOffsetX.shadowOffsetY': [
        getColor('shadowColor', '图形投影', { placeholder: '配色' }),
        getInputNumber('shadowBlur', '图形投影', { placeholder: '尺寸' }),
        getInputNumber('shadowOffsetX', '图形投影', { placeholder: 'X偏移', title: '水平偏移' }),
        getInputNumber('shadowOffsetY', '图形投影', { placeholder: 'Y偏移', title: '垂直偏移' })
      ],
      opacity: getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02, defaultValue: 0 })
    }
  }
})

const bar = Object.freeze({
  groupLabel: '系列配置',
  groupType: 'Collapse',
  group: 'bar',
  fields: {
    stack: getInput('stack', '数据堆叠'),
    'barWidth.barMinWidth.barMaxWidth': [
      getInput('barWidth', '柱条宽度', { placeholder: '宽度' }),
      getInput('barMinWidth', '柱条宽度', { placeholder: '最小值' }),
      getInput('barMaxWidth', '柱条宽度', { placeholder: '最大值' }),
    ],
    barMinHeight: getInputNumber('barMinHeight', '柱条最小高度'),
    barCategoryGap: getInput('barCategoryGap', '同系列\n柱间距离'),
    barGap: getInput('barGap', '不同系列\n柱间距离'),
    showBackground: getBooleanInput('showBackground', '显示背景色'),
  },
  backgroundStyle: {
    groupLabel: '背景样式配置',
    groupType: 'Collapse',
    fields: {
      color: getColor('color', '颜色'),
      'borderColor.borderWidth.borderType.barBorderRadius': [
        getColor('borderColor', '边框', { placeholder: '颜色' }),
        getInputNumber('borderWidth', '边框', { placeholder: '线宽' }),
        getSelect('borderType', '边框', ['solid', 'dashed', 'dotted'], { placeholder: '类型' }),
        getInput('barBorderRadius', '边框', { placeholder: '圆角' })
      ],
      'shadowColor.shadowBlur.shadowOffsetX.shadowOffsetY': [
        getColor('shadowColor', '图形投影', { placeholder: '配色' }),
        getInputNumber('shadowBlur', '图形投影', { placeholder: '尺寸' }),
        getInputNumber('shadowOffsetX', '图形投影', { placeholder: 'X偏移', title: '水平偏移' }),
        getInputNumber('shadowOffsetY', '图形投影', { placeholder: 'Y偏移', title: '垂直偏移' })
      ],
      opacity: getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 })
    }
  }
})

const pie = Object.freeze({
  groupLabel: '系列配置',
  groupType: 'Collapse',
  group: 'pie',
  fields: {
    'radius.radiusUnit': [
      getRatio('radius', '半径', { symbol: ',', placeholder: '大小', defaultValue: [0, 60] }),
      getSelect('radiusUnit', '半径', ['无', '%'], { placeholder: '单位', defaultValue: '%' }),
    ],
    'center.centerUnit': [
      getRatio('center', '中心坐标', { symbol: ',', placeholder: '坐标', defaultValue: [50, 50] }),
      getSelect('centerUnit', '中心坐标', ['无', '%'], { placeholder: '单位', defaultValue: '%' }),
    ],
    left: getSelectWithInput('left', '左侧边距', ['left', 'center', 'right']),
    right: getInput('right', '右侧边距'),
    top: getSelectWithInput('top', '上侧边距', ['top', 'middle', 'bottom']),
    bottom: getInput('bottom', '下侧边距'),
    roseType: getSelect('roseType', '南丁格尔图', ['无', 'radius', 'area'], { placeholder: '模式' }),
  },
  labelLine: {
    groupLabel: '标签引导线配置',
    groupType: 'Collapse',
    fields: {
      show: getBooleanInput('show', '显示引导线'),
      'length.length2': [
        getInputNumber('length', '引导线长度', { placeholder: '第一段' }),
        getInputNumber('length2', '引导线长度', { placeholder: '第二段' })
      ],
      smooth: getBooleanInput('smooth', '平滑显示')
    },
    lineStyle
  }
})

const scatter = Object.freeze({
  groupLabel: '系列配置',
  groupType: 'Collapse',
  group: 'scatter',
  fields: {
    large: getBooleanInput('large', '大数据优化')
  },
  symbol: {
    groupLabel: '标记图形配置',
    groupType: 'Collapse',
    fields: {
      symbol: getSelectWithInput(
        'symbol', '标记图形',
        ['circle', 'emptyCircle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
        {
          defaultValue: 'circle',
          placeholder: '选择或自定义',
          title: '可选择预设图形或配置自定义图形，支持 通过 "image://url"、"dataURI" 设置图片或通过 "path://" 设置矢量路径'
        }
      ),
      symbolEnable: [
        getBooleanInput('symbolFuncEnable', '标记图形', { placeholder: '启用', defaultValue: false }),
        getEChartsFunction('symbolFunc', '函数配置', ['value', 'params'], {
          tips: '// 可用参数 value、params\n// 其中第一个参数 value 为 data 中的数据值，第二个参数params 是其它的数据项参数。\n// 例：\n// console.log(params);\n\n'
        })
      ],
      symbolSize: getRatio('symbolSize', '图形尺寸', { symbol: ',', placeholder: '大小', defaultValue: [10] }),
      sizeEnable: [
        getBooleanInput('symbolSizeFuncEnable', '图形尺寸', { placeholder: '启用', defaultValue: false }),
        getEChartsFunction('symbolSizeFunc', '函数配置', ['value', 'params'], {
          tips: '// 可用参数 value、params\n// 其中第一个参数 value 为 data 中的数据值，第二个参数params 是其它的数据项参数。\n// 例：\n// console.log(value);\n\n'
        })
      ],
      symbolRotate: getInput('symbolRotate', '旋转角度'),
      rotateEnable: [
        getBooleanInput('symbolRotateFuncEnable', '旋转角度', { placeholder: '启用', defaultValue: false }),
        getEChartsFunction('symbolRotateFunc', '函数配置', ['value', 'params'], {
          tips: '// 可用参数 value、params\n// 其中第一个参数 value 为 data 中的数据值，第二个参数params 是其它的数据项参数。\n// 例：\n// console.log(value);\n\n'
        })
      ],
      symbolKeepAspect: getBooleanInput('symbolKeepAspect', '约束比例'),
      symbolOffset: getRatio('symbolOffset', '标记偏移', { symbol: ',', defaultValue: [0, 0] })
    }
  }
})

const effectScatter = Object.freeze({
  groupLabel: '系列配置',
  groupType: 'Collapse',
  group: 'effectScatter',
  fields: {
    effectType: getSelect('effectType', '特效类型', ['ripple']),
    showEffectOn: getSelect('showEffectOn', '何时显示特效', ['绘制完成:render', '高亮（hover):emphasis'])
  },
  symbol: {
    groupLabel: '标记图形配置',
    groupType: 'Collapse',
    fields: {
      symbol: getSelectWithInput(
        'symbol', '标记图形',
        ['circle', 'emptyCircle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
        {
          defaultValue: 'circle',
          placeholder: '选择或自定义',
          title: '可选择预设图形或配置自定义图形，支持 通过 "image://url"、"dataURI" 设置图片或通过 "path://" 设置矢量路径'
        }
      ),
      symbolEnable: [
        getBooleanInput('symbolFuncEnable', '标记图形', { placeholder: '启用', defaultValue: false }),
        getEChartsFunction('symbolFunc', '函数配置', ['value', 'params'], {
          tips: '// 可用参数 value、params\n// 其中第一个参数 value 为 data 中的数据值，第二个参数params 是其它的数据项参数。\n// 例：\n// console.log(params);\n\n'
        })
      ],
      symbolSize: getRatio('symbolSize', '图形尺寸', { symbol: ',', placeholder: '大小', defaultValue: [10] }),
      sizeEnable: [
        getBooleanInput('symbolSizeFuncEnable', '图形尺寸', { placeholder: '启用', defaultValue: false }),
        getEChartsFunction('symbolSizeFunc', '函数配置', ['value', 'params'], {
          tips: '// 可用参数 value、params\n// 其中第一个参数 value 为 data 中的数据值，第二个参数params 是其它的数据项参数。\n// 例：\n// console.log(value);\n\n'
        })
      ],
      symbolRotate: getInput('symbolRotate', '旋转角度'),
      rotateEnable: [
        getBooleanInput('symbolRotateFuncEnable', '旋转角度', { placeholder: '启用', defaultValue: false }),
        getEChartsFunction('symbolRotateFunc', '函数配置', ['value', 'params'], {
          tips: '// 可用参数 value、params\n// 其中第一个参数 value 为 data 中的数据值，第二个参数params 是其它的数据项参数。\n// 例：\n// console.log(value);\n\n'
        })
      ],
      symbolKeepAspect: getBooleanInput('symbolKeepAspect', '约束比例'),
      symbolOffset: getRatio('symbolOffset', '标记偏移', { symbol: ',', defaultValue: [0, 0] })
    }
  },
  rippleEffect: {
    groupLabel: '涟漪特效相关配置',
    groupType: 'Collapse',
    fields: {
      color: getColor('color', '涟漪颜色'),
      period: getInputNumber('period', '动画周期', { title: '动画的周期，秒数' }),
      scale: getInputNumber('scale', '缩放比例', { title: '动画中波纹的最大缩放比例' }),
      brushType: getSelect('brushType', '绘制方式', ['stroke', 'fill'])
    }
  }
})


const radar = Object.freeze({
  groupLabel: '系列配置',
  groupType: 'Collapse',
  group: 'radar',
  fields: {},
  symbol: {
    groupLabel: '标记图形配置',
    groupType: 'Collapse',
    fields: {
      showSymbol: getBooleanInput('showSymbol', '显示图形', { title: '如果 false 则只有在 tooltip hover 的时候显示' }),
      symbol: getSelectWithInput(
        'symbol', '标记图形',
        ['circle', 'emptyCircle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
        {
          placeholder: '选择或自定义',
          title: '可选择预设图形或配置自定义图形，支持 通过 "image://url"、"dataURI" 设置图片或通过 "path://" 设置矢量路径'
        }
      ),
      symbolEnable: [
        getBooleanInput('symbolFuncEnable', '标记图形', { placeholder: '启用', defaultValue: false }),
        getEChartsFunction('symbolFunc', '函数配置', ['value', 'params'], {
          tips: '// 可用参数 value、params\n// 其中第一个参数 value 为 data 中的数据值，第二个参数params 是其它的数据项参数。\n// 例：\n// console.log(params);\n\n'
        })
      ],
      symbolSize: getRatio('symbolSize', '图形尺寸', { symbol: ',', placeholder: '大小', defaultValue: [4] }),
      sizeEnable: [
        getBooleanInput('symbolSizeFuncEnable', '图形尺寸', { placeholder: '启用', defaultValue: false }),
        getEChartsFunction('symbolSizeFunc', '函数配置', ['value', 'params'], {
          tips: '// 可用参数 value、params\n// 其中第一个参数 value 为 data 中的数据值，第二个参数params 是其它的数据项参数。\n// 例：\n// console.log(value);\n\n'
        })
      ],
      symbolRotate: getInput('symbolRotate', '旋转角度'),
      rotateEnable: [
        getBooleanInput('symbolRotateFuncEnable', '旋转角度', { placeholder: '启用', defaultValue: false }),
        getEChartsFunction('symbolRotateFunc', '函数配置', ['value', 'params'], {
          tips: '// 可用参数 value、params\n// 其中第一个参数 value 为 data 中的数据值，第二个参数params 是其它的数据项参数。\n// 例：\n// console.log(value);\n\n'
        })
      ],
      symbolKeepAspect: getBooleanInput('symbolKeepAspect', '约束比例'),
      symbolOffset: getRatio('symbolOffset', '标记偏移', { symbol: ',', defaultValue: [0, 0] })
    }
  },
  lineStyle,
  areaStyle: {
    groupLabel: '区域填充样式配置',
    groupType: 'Collapse',
    fields: {
      'color.origin': [
        getColor('color', '填充样式', { placeholder: '颜色' }),
        getInputNumber('origin', '填充样式', { placeholder: '起始位置' })
      ],
      'shadowColor.shadowBlur.shadowOffsetX.shadowOffsetY': [
        getColor('shadowColor', '图形投影', { placeholder: '配色' }),
        getInputNumber('shadowBlur', '图形投影', { placeholder: '尺寸' }),
        getInputNumber('shadowOffsetX', '图形投影', { placeholder: 'X偏移', title: '水平偏移' }),
        getInputNumber('shadowOffsetY', '图形投影', { placeholder: 'Y偏移', title: '垂直偏移' })
      ],
      opacity: getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 })
    }
  }
})

const gauge = Object.freeze({
  groupLabel: '系列配置',
  groupType: 'Collapse',
  group: 'gauge',
  fields: {
    radius: getNumberWithUnit('半径', 'radius', 'radiusUnit', ['无', '%'], { placeholder: '大小' }),
    startAngle: getInputNumber('startAngle', '起始角度'),
    endAngle: getInputNumber('endAngle', '结束角度'),
    clockwise: getBooleanInput('clockwise', '刻度顺时针增长'),
    'min.max': [
      getInputNumber('min', '最值', { placeholder: '最小值' }),
      getInputNumber('max', '最值', { placeholder: '最大值' })
    ],
    splitNumber: getInputNumber('splitNumber', '刻度分割段数'),
  },
  pointer: {
    groupLabel: '仪表盘指针',
    groupType: 'Collapse',
    fields: {
      show: getBooleanInput('show', '显示指针'),
      length: getInputNumber('length', '指针长度'),
      width: getInputNumber('width', '指针宽度')
    }
  },
  title: {
    groupLabel: '仪表盘标题',
    groupType: 'Collapse',
    fields: {
      show: getBooleanInput('show', '显示标题'),
      'offsetCenter.offsetCenterUnit': [
        getRatio('offsetCenter', '位置偏移', { symbol: ',', placeholder: '大小' }),
        getSelect('offsetCenterUnit', '位置偏移', ['无', '%'], { placeholder: '单位' }),
      ],
      ...textStyle
    }
  },
  detail: {
    groupLabel: '仪表盘详情',
    groupType: 'Collapse',
    fields: {
      show: getBooleanInput('show', '显示详情'),
      'offsetCenter.offsetCenterUnit': [
        getRatio('offsetCenter', '位置偏移', { symbol: ',', placeholder: '大小' }),
        getSelect('offsetCenterUnit', '位置偏移', ['无', '%'], { placeholder: '单位' }),
      ],
      formatter: getInput('formatter', '文本格式化'),
      ...textStyle
    }
  },
  axisLine: {
    groupLabel: '仪表盘轴线配置',
    groupType: 'Collapse',
    fields: {
      show: getBooleanInput('show', '显示轴线')
    },
    lineStyle
  },
  splitLine: {
    groupLabel: '分割线样式配置',
    groupType: 'Collapse',
    fields: {
      show: getBooleanInput('show', '显示分割线'),
      length: getInputNumber('length', '分隔线线长')
    },
    lineStyle
  },
  axisTick: {
    groupLabel: '刻度线样式配置',
    groupType: 'Collapse',
    fields: {
      show: getBooleanInput('show', '显示刻度'),
      splitNumber: getInputNumber('splitNumber', '刻度分割段数'),
      length: getInputNumber('length', '刻度线线长')
    },
    lineStyle
  },
  axisLabel: {
    groupLabel: '刻度标签样式配置',
    groupType: 'Collapse',
    fields: {
      show: getBooleanInput('show', '显示标签'),
      distance: getInputNumber('distance', '标签距离'),
      ...textStyle
    }
  }
})

const heatmap = Object.freeze({
  groupLabel: '系列配置',
  groupType: 'Collapse',
  group: 'heatmap',
  fields: {
    'geoIndex.calendarIndex': [
      getInputNumber('geoIndex', '坐标系索引', { placeholder: '地理坐标系' }),
      getInputNumber('calendarIndex', '坐标系索引', { placeholder: '日历坐标系' })
    ],
    'pointSize.blurSize': [
      getInputNumber('pointSize', '点的样式', { title: '每个点的大小，在地理坐标系上有效', placeholder: '大小' }),
      getInputNumber(' blurSize', '点的样式', { title: '每个点模糊的大小，在地理坐标系上有效', placeholder: '模糊度' })
    ],
    'minOpacity.maxOpacity': [
      getInputNumber('minOpacity', '透明度', { title: '最小的透明度，在地理坐标系上有效', placeholder: '最小值' }),
      getInputNumber('maxOpacity', '透明度', { title: '最大的透明度，在地理坐标系上有效', placeholder: '最大值' })
    ]
  }
})

const funnel = Object.freeze({
  groupLabel: '系列配置',
  groupType: 'Collapse',
  group: 'funnel',
  fields: {
    'min.minSize': [
      getInputNumber('min', '最小值', { placeholder: '大小' }),
      getInput('最小值', 'minSize', { placeholder: '映射宽度' }),
    ],
    'max.maxSize': [
      getInputNumber('max', '最大值', { placeholder: '大小' }),
      getInput('最大值', 'maxSize', { placeholder: '映射宽度' }),
    ],
    sort: getSelect('sort', '数据排序', ['升序:ascending', '降序:descending', '无:none']),
    eEnable: [
      getBooleanInput('sortFuncEnable', '排序方式', { placeholder: '启用', defaultValue: false }),
      getEChartsFunction('sortFunc', '函数配置', ['nodeA', 'nodeB'], {
        tips: '// 可用参数 nodeA、nodeB\n// 例：\n// return nodeA - nodeB\n\n'
      })
    ],
    gap: getInputNumber('gap', '数据图形间距'),
    funnelAlign: getSelect('funnelAlign', '水平方向\n对齐方式', ['left', 'center', 'right']),
    left: getSelectWithInput('left', '左侧边距', ['left', 'center', 'right']),
    right: getInput('right', '右侧边距'),
    top: getSelectWithInput('top', '上侧边距', ['top', 'middle', 'bottom']),
    bottom: getInput('bottom', '下侧边距'),
    width: getSelectWithInput('width', '宽度', ['auto']),
    height: getSelectWithInput('height', '高度', ['auto'])
  },
  labelLine: {
    groupLabel: '标签引导线样式配置',
    groupType: 'Collapse',
    fields: {
      show: getBooleanInput('show', '显示引导线'),
      length: getInputNumber('length', '引导线长度')
    },
    lineStyle
  }
})

const lines = Object.freeze({
  groupLabel: '系列配置',
  groupType: 'Collapse',
  group: 'lines',
  fields: {
    polyline: getBooleanInput('ployline', '多线段'),
    symbol: getSelectWithInput(
      'symbol', '标记图形',
      ['circle', 'emptyCircle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
      {
        placeholder: '选择或自定义',
        title: '可选择预设图形或配置自定义图形，支持 通过 "image://url"、"dataURI" 设置图片或通过 "path://" 设置矢量路径'
      }
    ),
    symbolSize: getInput('symbolSize', '图形尺寸')
  },
  effect: {
    groupLabel: '线特效配置',
    groupType: 'Collapse',
    fields: {
      show: getBooleanInput('show', '显示特效'),
      'period.delay.constantSpeed': [
        getInputNumber('period', '特效动画', { placeholder: '时间' }),
        getInputNumber('delay', '特效动画', { placeholder: '延时' }),
        getInputNumber('constantSpeed', '特效动画', { placeholder: '速度' })
      ],
      symbol: getSelectWithInput(
        'symbol', '标记图形',
        ['circle', 'emptyCircle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
        {
          placeholder: '选择或自定义',
          title: '可选择预设图形或配置自定义图形，支持 通过 "image://url"、"dataURI" 设置图片或通过 "path://" 设置矢量路径'
        }
      ),
      symbolSize: getInput('symbolSize', '图形尺寸')
    }
  },
  lineStyle
})

const parallel = Object.freeze({
  groupLabel: '系列配置',
  groupType: 'Collapse',
  group: 'parallel',
  fields: {
    parallelIndex: getInputNumber('parallelIndex', '坐标系索引', { defaultValue: 0 }),
    inactiveOpacity: getInputNumber('inactiveOpacity', '未选中线条透明度', { min: 0, max: 1, step: 0.02 }),
    activeOpacity: getInputNumber('activeOpacity', '选中线条透明度', { min: 0, max: 1, step: 0.02 }),
    realtime: getBooleanInput('realtime', '实时刷新'),
    smooth: getBooleanInput('smooth', '平滑曲线')
  },
  lineStyle
})

const sunburst = Object.freeze({
  groupLabel: '系列配置',
  groupType: 'Collapse',
  group: 'sunburst',
  fields: {
    'center.centerUnit': [
      getRatio('center', '圆心坐标', { symbol: ',', placeholder: '坐标', defaultValue: [50, 50] }),
      getSelect('centerUnit', '圆心坐标', ['无', '%'], { placeholder: '单位', defaultValue: '%' }),
    ],
    'radius.radiusUnit': [
      getRatio('radius', '半径', { symbol: ',', placeholder: '大小', defaultValue: [0, 95] }),
      getSelect('radiusUnit', '半径', ['无', '%'], { placeholder: '单位', defaultValue: '%' }),
    ],
    highlightPolicy: getSelect('highlightPolicy', '扇形高亮', ['高亮扇形块和后代元素:descendant', '高亮扇形块和祖先元素:ancestor', '高亮自身:self', '不淡化其他元素:none']),
    nodeClick: getSelect('nodeClick', '点击节点后行为', ['无反应:false', '以该节点为根结点:rootToNode', '超链接跳转:link']),
    sort: getSelect('sort', '排序方式', ['desc', 'asc', '无']),
    eEnable: [
      getBooleanInput('sortFuncEnable', '排序方式', { placeholder: '启用', defaultValue: false }),
      getEChartsFunction('sortFunc', '函数配置', ['nodeA', 'nodeB'], {
        tips: '// 可用参数 nodeA、nodeB\n// 例：\n// return nodeA.getValue() - nodeB.getValue();\n\n'
      })
    ],
    levels: getArrayGroup('levels', '多层配置', [
      {
        groupLabel: '鼠标悬停后相关扇形块配置',
        groupType: 'Collapse',
        group: 'highlight',
        fields: {},
        label,
        itemStyle
      },
      {
        groupLabel: '鼠标悬停后不相关扇形块配置',
        groupType: 'Collapse',
        group: 'downplay',
        fields: {},
        label,
        itemStyle
      }
    ])
  },
  highlight: {
    groupLabel: '鼠标悬停后相关扇形块配置',
    groupType: 'Collapse',
    fields: {},
    label,
    itemStyle
  },
  downplay: {
    groupLabel: '鼠标悬停后不相关扇形块配置',
    groupType: 'Collapse',
    fields: {},
    label,
    itemStyle
  }
})

const chartsItemConfig = [
  line,
  bar,
  pie,
  scatter,
  effectScatter,
  radar,
  gauge,
  heatmap,
  funnel,
  lines,
  parallel,
  sunburst
]

export default chartsItemConfig
