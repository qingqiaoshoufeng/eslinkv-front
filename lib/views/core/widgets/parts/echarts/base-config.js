import {
  getInput,
  getSelect,
  getRadio,
  getBooleanInput,
  getColor,
  getColors,
  getInputNumber,
  getFontWeight,
  getFontFamilyList,
  getSelectWithInput,
  getArrayGroup,
  getAnimationCurve,
  getRatio,
  getText,
  getEChartsFunction
} from '../lib/config-tools'
import chartsItemConfig from './charts-item-config'

const shadowStyle = Object.freeze({
  'shadowColor.shadowBlur.shadowOffsetX.shadowOffsetY': [
    getColor('shadowColor', '图形投影', { placeholder: '配色' }),
    getInputNumber('shadowBlur', '图形投影', { placeholder: '尺寸' }),
    getInputNumber('shadowOffsetX', '图形投影', { placeholder: 'X偏移', title: '水平偏移' }),
    getInputNumber('shadowOffsetY', '图形投影', { placeholder: 'Y偏移', title: '垂直偏移' })
  ]
})

const label = Object.freeze({
  groupLabel: '标签配置',
  groupType: 'Collapse',
  group: 'label',
  fields: {
    show: getBooleanInput('show', '显示标签', { defaultValue: false }),
    position: getSelectWithInput('position', '标签位置', [
      'top', 'left', 'right', 'bottom', 'inside', 'insideLeft', 'insideRight', 'insideTop',
      'insideBottom', 'insideTopLeft', 'insideBottomLeft', 'insideTopRight', 'insideBottomRight'
    ], { defaultValue: 'inside' }),
    'distance.rotate.offset': [
      getInputNumber('distance', '标签方位', { placeholder: '间隔' }),
      getInputNumber('rotate', '标签方位', { placeholder: '旋转' }),
      getInput('offset', '标签方位', { placeholder: '偏移' })
    ],
    formatter: getInput('formatter', '文本格式化'),
    enable: [
      getBooleanInput('formatterFuncEnable', '文本格式化', { placeholder: '启用', defaultValue: false }),
      getEChartsFunction('formatterFunc', '函数配置', ['params'], {
        tips: '// 可用参数 params\n// 其中参数 params 是 formatter 需要的单个数据集。\n// 例：\n// console.log(params);\n\n'
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

const animation = Object.freeze({
  groupLabel: '动画配置',
  groupType: 'Collapse',
  group: 'animation',
  fields: {
    animation: getBooleanInput('animation', '开启动画'),
    animationThreshold: getInputNumber('animationThreshold', '动画阈值'),
    'animationDuration.animationEasing.animationDelay': [
      getInputNumber('animationDuration', '初始动画', { placeholder: '时长' }),
      getAnimationCurve('animationEasing', '初始动画', { placeholder: '动效' }),
      getInputNumber('animationDelay', '初始动画', { placeholder: '延时' })
    ],
    'animationEasingUpdate.animationDelayUpdate': [
      getAnimationCurve('animationEasingUpdate', '数据更新', { placeholder: '动效' }),
      getInputNumber('animationDelayUpdate', '数据更新', { placeholder: '延时' })
    ]
  }
})

const symbol = Object.freeze({
  groupLabel: '标注图标配置',
  groupType: 'Collapse',
  group: 'symbol',
  fields: {
    symbol: getSelectWithInput(
      'symbol', '标记图形',
      ['circle', 'emptyCircle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
      {
        placeholder: '选择或自定义',
        title: '可选择预设图形或配置自定义图形，支持 通过 "image://url"、"dataURI" 设置图片或通过 "path://" 设置矢量路径'
      }
    ),
    'symbolSize.symbolRotate.symbolKeepAspect': [
      getInput('symbolSize', '标记图形', { placeholder: '尺寸' }),
      getInputNumber('symbolRotate', '标记图形', { placeholder: '旋转' }),
      getBooleanInput('symbolKeepAspect', '标记图形', { placeholder: '约束比例' })
    ],
    symbolOffset: getRatio('symbolOffset', '标记偏移', { symbol: ',', defaultValue: [0, 0] })
  }
})

const markLineLabel = Object.freeze({
  groupLabel: '标线标签配置',
  groupType: 'Collapse',
  group: 'label',
  fields: {
    show: getBooleanInput('show', '显示标签'),
    position: getSelect('position', '标签位置', ['start', 'middle', 'end', 'insideStartTop', 'insideStartBottom', 'insideMiddleTop', 'insideMiddleBottom', 'insideEndTop', 'insideEndBottom']),
    distance: getRatio('distance', '标签距离', { symbol: ',', defaultValue: [0, 0] }),
    formatter: getInput('formatter', '格式化')
  }
})

const lineStyle = Object.freeze({
  groupLabel: '标线线条样式配置',
  groupType: 'Collapse',
  group: 'lineStyle',
  fields: {
    'color.width.type': [
      getColor('color', '线条样式', { placeholder: '颜色' }),
      getInputNumber('width', '线条样式', { placeholder: '宽度' }),
      getSelect('type', '线条样式', ['solid', 'dashed', 'dotted'], { placeholder: '类型' })
    ],
    ...shadowStyle,
    opacity: getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 }),
    curveness: getInputNumber('curveness', '线条曲度', { min: 0, max: 1, step: 0.02 })
  }
})

// ! map/treemap/ 类型图表系列中， itemStyle 配置有细微差别，当前阶段忽略这些差异
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
    ...shadowStyle,
    'opacity': getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 })
  }
})

const markPoint = Object.freeze({
  groupLabel: '标注配置',
  groupType: 'Collapse',
  group: 'markPoint',
  fields: {
    data: getArrayGroup('data', '标注数据配置', [
      getInput('name', '标注名称'),
      getSelect('type', '标注类型', ['min', 'max', 'average']),
      getInputNumber('valueIndex', '维度索引', { min: 0, step: 1, placeholder: '缺省' }),
      getInput('valueDim', '维度名称', { placeholder: '缺省' }),
      symbol,
      label,
      itemStyle,
      animation
    ], {
      defaultCollapse: false
    }),
    silent: getBooleanInput('silent', '响应鼠标'),
    symbol: {
      groupLabel: '标注图标配置',
      groupType: 'Collapse',
      group: 'symbol',
      fields: {
        symbol: getSelectWithInput(
          'symbol', '标记图形',
          ['circle', 'emptyCircle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
          {
            defaultValue: 'pin',
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
        symbolSize: getRatio('symbolSize', '图形尺寸', { symbol: ',', placeholder: '大小', defaultValue: [40] }),
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
            tips: '// 可用参数 value、params\n// 其中第一个参数 value 为 data 中的数据值，第二个参数params 是其它的数据项参数。\n// 例：\n // console.log(value);\n\n'
          })
        ],
        symbolKeepAspect: getBooleanInput('symbolKeepAspect', '约束比例')
      }
    },
    label,
    itemStyle,
    animation
  }
})

const markLine = Object.freeze({
  groupLabel: '标线配置',
  groupType: 'Collapse',
  group: 'markLine',
  fields: {
    data: getArrayGroup('data', '标线数据配置', [
      getArrayGroup('data', '数据标注点配置', [
        getInput('name', '标注名称'),
        getSelect('type', '标注类型', ['min', 'max', 'average']),
        getInputNumber('valueIndex', '维度索引', { min: 0, step: 1, placeholder: '缺省' }),
        getInput('valueDim', '维度名称', { placeholder: '缺省' }),
        symbol,
        markLineLabel,
        lineStyle
      ], { max: 2 }),
      getBooleanInput('linkPoints', '连接两个\n标注点')
    ]),
    silent: getBooleanInput('silent', '响应鼠标'),
    markLineLabel,
    lineStyle,
    animation
  }
})

const markArea = Object.freeze({
  groupLabel: '标域配置',
  groupType: 'Collapse',
  group: 'markArea',
  fields: {
    data: getArrayGroup('data', '标域数据配置', [
      getArrayGroup('data', '数据标注点配置', [
        getInput('name', '标注名称'),
        getSelect('type', '标注类型', ['min', 'max', 'average']),
        getInputNumber('valueIndex', '维度索引', { min: 0, step: 1, placeholder: '缺省' }),
        getInput('valueDim', '维度名称', { placeholder: '缺省' }),
        label,
        itemStyle
      ], { max: 2 })
    ]),
    silent: getBooleanInput('silent', '响应鼠标'),
    label,
    itemStyle,
    animation
  }
})

const axisNameTextStyle = Object.freeze({
  groupLabel: '坐标轴名称样式配置',
  groupType: 'Collapse',
  group: 'nameTextStyle',
  fields: {
    'color.fontSize.lineHeight': [
      getColor('color', '字体', { placeholder: '颜色' }),
      getInputNumber('fontSize', '字体', { placeholder: '大小' }),
      getInputNumber('lineHeight', '字体', { placeholder: '行高' })
    ],
    'fontStyle.fontWeight': [
      getSelect('fontStyle', '字体风格', ['normal', 'italic', 'oblique']),
      getFontWeight('fontWeight', '字体粗细')
    ],
    fontFamily: getFontFamilyList('fontFamily', '字体'),
    'align.verticalAlign': [
      getSelect('align ', '对齐方式', ['left', 'center', 'right'], { placeholder: '水平' }),
      getSelect('verticalAlign', '对齐方式', ['top', 'middle', 'bottom'], { placeholder: '垂直' })
    ],
    backgroundColor: getColor('backgroundColor', '背景色'),
    'borderColor.borderWidth.borderRadius': [
      getColor('borderColor', '边框', { placeholder: '颜色' }),
      getInputNumber('borderWidth', '边框', { placeholder: '线宽' }),
      getInput('borderRadius', '边框', { placeholder: '圆角' })
    ],
    padding: getInput('padding', '内边距'),
    ...shadowStyle,
    'with.height': [
      getInput('with', '字块尺寸', { placeholder: '宽度' }),
      getInput('height', '字块尺寸', { placeholder: '高度' })
    ],
    'textBorderColor.textBorderWidth': [
      getColor('textBorderColor', '文字描边', { placeholder: '颜色' }),
      getInputNumber('textBorderWidth', '文字描边', { placeholder: '宽度' })
    ],
    'textShadowColor.textShadowBlur.textShadowOffsetX.textShadowOffsetY': [
      getColor('textShadowColor', '文字阴影', { placeholder: '颜色' }),
      getInputNumber('textShadowBlur', '文字阴影', { placeholder: '长度' }),
      getInputNumber('textShadowOffsetX', '文字阴影', { placeholder: 'X 偏移' }),
      getInputNumber('textShadowOffsetY', '文字阴影', { placeholder: ' Y 偏移' })
    ]
  }
})

const nameText = Object.freeze({
  groupLabel: '坐标轴名称配置',
  groupType: 'Collapse',
  group: 'nameText',
  fields: {
    name: getInput('name', '坐标轴名称'),
    nameLocation: getSelect('nameLocation', '名称位置', ['尾部:end', '中部:middle', '头部:start']),
    nameGap: getInputNumber('nameGap', '轴线距离'),
    nameRotate: getInputNumber('nameRotate', '旋转角度'),
    nameTextStyle: axisNameTextStyle
  }
})

const axisCommon = Object.freeze({
  id: getInput('id', '坐标轴ID'),
  dataIndex: getInput('dataIndex', '数据索引', { title: '通过 dataIndex 为当前坐标轴指定数据源索引，即该坐标轴使用数据源中哪一部分的数据，例：data[dataIndex]。\n如果数据源类型为数组，则会尝试将 dataIndex 解析为数组下标；\n如果数据源类型为对象，则尝试获取数据源 dataIndex 属性的数据；\n如果未指定 dataIndex，则尝试将整个数据源应用到该系列。' }),
  show: getBooleanInput('show', '显示\n坐标轴', { defaultValue: true }),
  'textColor.axisColor': [
    getColor('textColor', '颜色设置', { title: '坐标刻度标签、坐标轴名称文本颜色', placeholder: '文本颜色', defaultValue: '#e6e6e6' }),
    getColor('axisColor', '颜色设置', { title: '坐标轴线、刻度等颜色', placeholder: '轴体颜色', defaultValue: '#FFFFFFC2' })
  ]
})

const axisLine = Object.freeze({
  groupLabel: '坐标轴线样式配置',
  groupType: 'Collapse',
  group: 'axisLine',
  fields: {
    show: getBooleanInput('show', '显示轴线'),
    symbol: getSelectWithInput(
      'symbol', '轴线图形',
      ['circle', 'emptyCircle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
      {
        placeholder: '图形',
        title: '可选择预设图形或配置自定义图形，支持 通过 "image://url"、"dataURI" 设置图片或通过 "path://" 设置矢量路径'
      }
    ),
    symbolSize: getRatio('symbolSize', '图形尺寸', { symbol: ',', defaultValue: [10, 15] }),
    symbolOffset: getRatio('symbolOffset', '图形偏移', { symbol: ',', defaultValue: [0, 0] }),
  },
  lineStyle: {
    groupLabel: '轴线样式',
    groupType: 'Collapse',
    fields: {
      'color.width.type.opacity': [
        getColor('color', '线条样式', { placeholder: '颜色' }),
        getInputNumber('width', '线条样式', { placeholder: '宽度' }),
        getSelect('type', '线条样式', ['solid', 'dashed', 'dotted'], { placeholder: '类型' }),
        getInputNumber('opacity', '线条样式', { min: 0, max: 1, step: 0.02, placeholder: '透明度' })
      ],
      ...shadowStyle
    }
  }
})

const axisTick = Object.freeze({
  groupLabel: '坐标轴刻度样式配置',
  groupType: 'Collapse',
  group: 'axisTick',
  fields: {
    show: getBooleanInput('show', '显示刻度'),
    alignWithLabel: getBooleanInput('alignWithLabel', '刻度线标签对齐', { title: '类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐' }),
    interval: getSelectWithInput('interval', '刻度间隔', ['auto']),
    inside: getBooleanInput('inside', '刻度朝内'),
    length: getInputNumber('length', '刻度长度')
  },
  lineStyle: {
    groupLabel: '刻度线样式',
    groupType: 'Collapse',
    fields: {
      'color.width.type.opacity': [
        getColor('color', '线条样式', { placeholder: '颜色' }),
        getInputNumber('width', '线条样式', { placeholder: '宽度' }),
        getSelect('type', '线条样式', ['solid', 'dashed', 'dotted'], { placeholder: '类型' }),
        getInputNumber('opacity', '线条样式', { min: 0, max: 1, step: 0.02, placeholder: '透明度' })
      ],
      ...shadowStyle
    }
  }
})

const axisLabel = Object.freeze({
  groupLabel: '坐标轴刻度标签配置',
  groupType: 'Collapse',
  group: 'axisLabel',
  fields: {
    show: getBooleanInput('show', '显示标签'),
    interval: getSelectWithInput('interval', '标签间隔', ['auto']),
    inside: getBooleanInput('inside', '标签朝内'),
    rotate: getInputNumber('rotate', '旋转角度'),
    margin: getInputNumber('margin', '与轴线间距离'),
    formatter: getInput('formatter', '文本格式化', { placeholder: '{value}%' }),
    enable: [
      getBooleanInput('formatterFuncEnable', '文本格式化', { placeholder: '启用', defaultValue: false }),
      getEChartsFunction('formatterFunc', '函数配置', ['value', 'index'], {
        tips: '// 可用参数 value、index\n// 其中第一参数value为刻度数值（类目），第二个参数index为刻度的索引。\n// 例：\n// console.log(value);\n\n'
      })
    ],
    color: getColor('color', '文字颜色'),
    fontStyle: getSelect('fontStyle', '文字风格', ['normal', 'italic', 'oblique']),
    fontWeight: getFontWeight('fontWeight', '字体粗细'),
    fontFamily: getFontFamilyList('fontFamily', '字体'),
    fontSize: getInputNumber('fontSize', '字体大小'),
    lineHeight: getInputNumber('lineHeight', '行高'),
    align: getSelect('align', '水平对齐方式', ['left', 'center', 'right']),
    verticalAlign: getSelect('verticalAlign', '垂直对齐方式', ['top', 'middle', 'bottom']),
    backgroundColor: getColor('backgroundColor', '背景颜色'),
    'borderColor.borderWidth.borderRadius': [
      getColor('borderColor', '边框', { placeholder: '颜色' }),
      getInputNumber('borderWidth', '边框', { placeholder: '线宽' }),
      getInput('borderRadius', '边框', { placeholder: '圆角' })
    ],
    ...shadowStyle,
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
  }
})

const splitLine = Object.freeze({
  groupLabel: '坐标轴分割线配置',
  groupType: 'Collapse',
  group: 'splitLine',
  fields: {
    show: getBooleanInput('show', '显示分割线'),
    interval: getSelectWithInput('interval', '分割线间隔', ['auto'])
  },
  lineStyle: {
    groupLabel: '分隔线样式',
    groupType: 'Collapse',
    fields: {
      'color.width.type.opacity': [
        getColor('color', '线条样式', { placeholder: '颜色', defaultValue: '#ffffff0a' }),
        getInputNumber('width', '线条样式', { placeholder: '宽度' }),
        getSelect('type', '线条样式', ['solid', 'dashed', 'dotted'], { placeholder: '类型' }),
        getInputNumber('opacity', '线条样式', { min: 0, max: 1, step: 0.02, placeholder: '透明度' })
      ],
      ...shadowStyle
    }
  }
})

const splitArea = Object.freeze({
  groupLabel: '坐标轴分割区域配置',
  groupType: 'Collapse',
  group: 'splitArea',
  fields: {
    show: getBooleanInput('show', '显示分隔区域'),
    interval: getSelectWithInput('interval', '分割区域间隔', ['auto'])
  },
  areaStyle: {
    groupLabel: '分隔区域样式',
    groupType: 'Collapse',
    fields: {
      'color.opacity': [
        getColor('color', '区域样式', { placeholder: '颜色', defaultValue: '#ffffff0a' }),
        getInputNumber('opacity', '区域样式', { min: 0, max: 1, step: 0.02, placeholder: '透明度' })
      ],
      ...shadowStyle
    }
  }
})

const axisDetail = {
  groupLabel: '轴体详细配置',
  groupType: 'Collapse',
  group: 'axisDetail',
  fields: {
    offset: getInputNumber('offset', '位置偏移'),
    inverse: getBooleanInput('inverse', '反向\n坐标轴'),
    boundaryGap: getBooleanInput('boundaryGap', '轴两侧\n留白', { defaultValue: true }),
    scale: getBooleanInput('scale', '忽略\n零刻度'),
    'min.max': [
      getInput('min', '最值', { placeholder: '最小值' }),
      getInput('max', '最值', { placeholder: '最大值' }),
    ],
    maxEnable: [
      getBooleanInput('maxFuncEnable', '最大值', { placeholder: '启用', defaultValue: false }),
      getEChartsFunction('maxFunc', '函数配置', ['value'], {
        tips: '// 可用参数 value，其中 value 是一个包含 min 和 max 的对象，分别表示数据的最大最小值\n// 这个函数可返回坐标轴的最大值，也可返回 null/undefined 来表示“自动计算最小值”\n// 例：\n// console.log(value.max);\n\n'
      })
    ],
    mimEnable: [
      getBooleanInput('minFuncEnable', '最小值', { placeholder: '启用', defaultValue: false }),
      getEChartsFunction('minFunc', '函数配置', ['value'], {
        tips: '// 可用参数 value，其中 value 是一个包含 min 和 max 的对象，分别表示数据的最大最小值\n// 这个函数可返回坐标轴的最小值，也可返回 null/undefined 来表示“自动计算最小值”\n// 例：\n// console.log(value.min);\n\n'
      })
    ],
    'splitNumber.minInterval.maxInterval': [
      getInputNumber('splitNumber', '坐标轴刻度分割', { min: 1, placeholder: '分段数' }),
      getInputNumber('minInterval', '坐标轴刻度分割', { min: 0, placeholder: '最小间隔' }),
      getInputNumber('maxInterval', '坐标轴刻度分割', { placeholder: '最大间隔' })
    ],
    silent: getBooleanInput('silent', '响应鼠标'),
    axisLine,
    axisTick,
    axisLabel,
    nameText,
    splitLine,
    splitArea
  }
}

const tooltip = Object.freeze({
  groupLabel: 'Tooltip 配置',
  groupType: 'Collapse',
  group: 'tooltip',
  fields: {
    show: getBooleanInput('show', '显示提示框'),
    trigger: getSelect('trigger ', '触发类型', ['item', 'axis', 'none']),
    position: getSelectWithInput('position', '位置', ['inside', 'top', 'left', 'right', 'bottom']),
    formatter: getInput('formatter', '文本格式化'),
    enable: [
      getBooleanInput('formatterFuncEnable', '文本格式化', { placeholder: '启用', defaultValue: false }),
      getEChartsFunction('formatterFunc', '函数配置', ['params', 'ticket', 'callback'], {
        tips: '// 可用参数 params、ticket、callback\n// 第一个参数 params 是 formatter 需要的数据集 \n// 第二个参数 ticket 是异步回调标识，配合第三个参数 callback 使用，第三个参数 callback 是异步回调\n// 例：\n// console.log(params);\n\n'
      })
    ],
    backgroundColor: getColor('backgroundColor', '背景颜色'),
    'borderColor.borderWidth': [
      getColor('borderColor', '边框', { placeholder: '颜色' }),
      getInputNumber('borderWidth', '边框', { placeholder: '线宽' })
    ],
    padding: getInput('padding', '内边距'),
    extraCssText: getInput('extraCssText', '额外样式')
  },
  axisPointer: {
    groupLabel: '坐标轴指示器配置',
    groupType: 'Collapse',
    fields: {
      type: getSelect('type', '指示器类型', ['line', 'shadow', 'none', 'cross']),
      axis: getSelect('axis', '指示器的坐标轴', ['auto', 'x', 'y', 'radius', 'angle']),
      snap: getBooleanInput('snap', '自动吸附'),
      animation
    },
    label: {
      groupLabel: '坐标轴指示器的文本标签配置',
      groupType: 'Collapse',
      fields: {
        show: getBooleanInput('show', '显示文本标签'),
        precision: getInput('precision', '数值精度'),
        formatter: getInput('formatter', '文本格式化'),
        'fontSize.color.fontStyle.fontWeight': [
          getInputNumber('fontSize', '文本样式', { placeholder: '大小' }),
          getColor('color', '文本样式', { placeholder: '颜色' }),
          getSelect('fontStyle', '文本样式', ['normal', 'italic', 'oblique'], { placeholder: '风格' }),
          getFontWeight('fontWeight', '文本样式', { placeholder: '粗细' })
        ],
        fontFamily: getFontFamilyList('fontFamily', '字体'),
        lineHeight: getInputNumber('lineHeight', '行高'),
        'margin.padding': [
          getInputNumber('margin', '边距', { placeholder: '外边距' }),
          getInputNumber('padding', '边距', { placeholder: '内边距' })
        ],
        'width.height': [
          getInput('width', '文字块', { placeholder: '宽度' }),
          getInput('height', '文字块', { placeholder: '高度' }),
        ],
        'textBorderColor.textBorderWidth': [
          getColor('textBorderColor', '文本描边', { placeholder: '描边颜色' }),
          getInputNumber('textBorderWidth', '文本描边', { placeholder: '描边宽度' }),
        ],
        'textShadowColor.textShadowBlur.textShadowOffsetX.textShadowOffsetY': [
          getColor('textShadowColor', '文字阴影', { placeholder: '颜色' }),
          getInputNumber('textShadowBlur', '文字阴影', { placeholder: '长度' }),
          getInputNumber('shadowOffsetX', '文字阴影', { placeholder: 'X 偏移' }),
          getInputNumber('shadowOffsetY', '文字阴影', { placeholder: ' Y 偏移' })
        ],
        backgroundColor: getColor('backgroundColor', '背景颜色'),
        'borderColor.borderWidth': [
          getColor('borderColor', '边框颜色', { placeholder: '边框' }),
          getInputNumber('borderWidth', '边框颜色', { placeholder: '边框' })
        ],
        ...shadowStyle
      }
    },
    lineStyle: {
      groupLabel: '直线指示器配置',
      groupType: 'Collapse',
      fields: {
        'color.width.type': [
          getColor('color', '线条样式', { placeholder: '颜色' }),
          getInputNumber('width', '线条样式', { placeholder: '宽度' }),
          getSelect('type', '线条样式', ['solid', 'dashed', 'dotted'], { placeholder: '类型' })
        ],
        ...shadowStyle,
        opacity: getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 }),
      }
    },
    shadowStyle: {
      groupLabel: '阴影指示器配置',
      groupType: 'Collapse',
      fields: {
        color: getColor('color', '填充颜色'),
        ...shadowStyle,
        opacity: getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 })
      }
    },
    crossStyle: {
      groupLabel: '十字准星指示器配置',
      groupType: 'Collapse',
      fields: {
        'color.width.type': [
          getColor('color', '线条样式', { placeholder: '颜色' }),
          getInputNumber('width', '线条样式', { placeholder: '宽度' }),
          getSelect('type', '线条样式', ['solid', 'dashed', 'dotted'], { placeholder: '类型' })
        ],
        ...shadowStyle,
        opacity: getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 }),
      }
    }
  },
  textStyle: {
    groupLabel: '提示框浮层的文本样式',
    groupType: 'Collapse',
    fields: {
      'fontSize.color.fontStyle.fontWeight': [
        getInputNumber('fontSize', '文本样式', { placeholder: '大小' }),
        getColor('color', '文本样式', { placeholder: '颜色' }),
        getSelect('fontStyle', '文本样式', ['normal', 'italic', 'oblique'], { placeholder: '风格' }),
        getFontWeight('fontWeight', '文本样式', { placeholder: '粗细' })
      ],
      fontFamily: getFontFamilyList('fontFamily', '字体'),
      lineHeight: getInputNumber('lineHeight', '行高'),
      'width.height': [
        getInput('width', '文字块', { placeholder: '宽度' }),
        getInput('height', '文字块', { placeholder: '高度' }),
      ],
      'textBorderColor.textBorderWidth': [
        getColor('textBorderColor', '文字描边', { placeholder: '颜色' }),
        getInputNumber('textBorderWidth', '文字描边', { placeholder: '宽度' }),
      ],
      'textShadowColor.textShadowBlur.textShadowOffsetX.textShadowOffsetY': [
        getColor('textShadowColor', '文字阴影', { placeholder: '颜色' }),
        getInputNumber('textShadowBlur', '文字阴影', { placeholder: '长度' }),
        getInputNumber('shadowOffsetX', '文字阴影', { placeholder: 'X 偏移' }),
        getInputNumber('shadowOffsetY', '文字阴影', { placeholder: ' Y 偏移' })
      ]
    }
  }
})

const filterChartTarget = function (type) {
  const charts = [
    'line', 'bar', 'pie', 'scatter', 'radar', 'effectScatter', 'heatmap', 'map',
    'funnel', 'gauge', 'lines', 'sunburst', 'parallel'
  ]
  return charts.filter(item => item !== type)
}

const baseConfigSource = Object.freeze({
  config: {
    groupLabel: '组件配置',
    groupType: 'Tabs',
    fields: {
      colors: getColors('colors', '图表配色'),
      series: getArrayGroup('series', '数据系列', [
        getSelect('type', '系列类型', [
          '线图:line', '柱图:bar', '饼图:pie', '散点图:scatter', '特效散点图:effectScatter', '雷达图:radar', '热力图:heatmap',
          '地图:map', '漏斗图:funnel', '仪表盘:gauge', '路径图:lines', '旭日图:sunburst', '平行图:parallel', '路径图:lines'
        ], {
          control: [
            { type: 'remove', target: filterChartTarget(), condition: { compare: '==', value: null } },
            { type: 'remove', target: filterChartTarget('line'), condition: { compare: '==', value: 'line' } },
            { type: 'remove', target: filterChartTarget('bar'), condition: { compare: '==', value: 'bar' } },
            { type: 'remove', target: filterChartTarget('pie'), condition: { compare: '==', value: 'pie' } },
            { type: 'remove', target: filterChartTarget('scatter'), condition: { compare: '==', value: 'scatter' } },
            { type: 'remove', target: filterChartTarget('effectScatter'), condition: { compare: '==', value: 'effectScatter' } },
            { type: 'remove', target: [...filterChartTarget('radar'), 'markPoint', 'markLine', 'markArea'], condition: { compare: '==', value: 'radar' } },
            { type: 'remove', target: [...filterChartTarget('gauge'), 'coordinateSystem', 'xAxisIndex', 'yAxisIndex', 'polarIndex', 'geoIndex', 'label'], condition: { compare: '==', value: 'gauge' } },
            { type: 'remove', target: filterChartTarget('heatmap'), condition: { compare: '==', value: 'heatmap' } },
            { type: 'remove', target: [...filterChartTarget('funnel'), 'coordinateSystem', 'xAxisIndex', 'yAxisIndex', 'polarIndex', 'geoIndex'], condition: { compare: '==', value: 'funnel' } },
            { type: 'remove', target: [...filterChartTarget('map'), 'xAxisIndex', 'yAxisIndex', 'polarIndex'], condition: { compare: '==', value: 'map' } },
            { type: 'remove', target: [...filterChartTarget('lines')], condition: { compare: '==', value: 'lines' } },
            { type: 'remove', target: [...filterChartTarget('parallel'), 'xAxisIndex', 'yAxisIndex', 'polarIndex', 'geoIndex', 'label', 'itemStyle', 'markPoint', 'markLine', 'markArea'], condition: { compare: '==', value: 'parallel' } },
            { type: 'remove', target: [...filterChartTarget('sunburst'), 'coordinateSystem', 'xAxisIndex', 'yAxisIndex', 'polarIndex', 'geoIndex', 'markPoint', 'markLine', 'markArea'], condition: { compare: '==', value: 'sunburst' } }
          ]
        }),
        getInput('name', '系列名称', { title: '用于tooltip的显示、legend 的图例筛选及更新数据和配置项时用于指定对应的系列' }),
        getInput('dataIndex', '数据索引', { title: '通过 dataIndex 为当前系列指定数据源索引，即该系列使用数据源中哪一部分的数据，例：data[dataIndex]。\n如果数据源类型为数组，则会尝试将 dataIndex 解析为数组下标；\n如果数据源类型为对象，则尝试获取数据源 dataIndex 属性的数据；\n如果未指定 dataIndex，则尝试将整个数据源应用到该系列。' }),
        getInput('id', '系列ID'),
        getSelect(
          'coordinateSystem',
          '坐标系\n类型', ['二维直角坐标系:cartesian2d', '极坐标系:polar', '地理坐标系:geo', '平行坐标系:parallel', '百度地图坐标系:bmap'],
          {
            control: [
              {
                type: 'remove', target: ['xAxisIndex', 'yAxisIndex', 'polarIndex', 'geoIndex'], condition: { compare: '==', value: 'bmap' }
              }
            ]
          }
        ),
        [
          getInputNumber('xAxisIndex', '坐标轴\n索引', { placeholder: 'X轴', title: '当二维直角坐标系配置多个 X 轴轴时，可以通过该配置选定使用哪个 X 轴' }),
          getInputNumber('yAxisIndex', '坐标轴\n索引', { placeholder: 'Y轴', title: '当二维直角坐标系配置多个 Y 轴轴时，可以通过该配置选定使用哪个 Y 轴' })
        ],
        [
          getInputNumber('polarIndex', '坐标系\n索引', { placeholder: '极坐标系', title: '当配置多个极坐标系时，可以通过该配置选定使用哪个极坐标系' }),
          getInputNumber('geoIndex', '坐标系\n索引', { placeholder: '地理坐标系', title: '当配置多个地理坐标系时，可以通过该配置选定使用哪个地理坐标系' })
        ],
        ...chartsItemConfig,
        label,
        itemStyle,
        markPoint,
        markLine,
        markArea
      ], { defaultCollapse: true, hideItemsMoreThan: 3 })
    },
    font: {
      groupLabel: '全局文本样式',
      groupType: 'Collapse',
      fields: {
        'color.fontSize.lineHeight.fontWeight': [
          getColor('color', '文本常规', { placeholder: '颜色', defaultValue: '#E9E9E9' }),
          getInputNumber('fontSize', '文本常规', { placeholder: '大小' }),
          getInputNumber('lineHeight', '文本常规', { placeholder: '行高' }),
          getFontWeight('fontWeight', '文本常规', { placeholder: '字重', styleSet: 'width: 64px;' })
        ],
        fontFamily: getFontFamilyList('fontFamily'),
        fontStyle: getSelect('fontStyle', '字体风格', ['normal', 'italic', 'oblique']),
        'textBorderColor.textBorderWidth': [
          getColor('textBorderColor', '文本描边', { placeholder: '颜色' }),
          getInputNumber('textBorderWidth', '文本描边', { placeholder: '大小' })
        ],
        ...shadowStyle
      }
    },
    axisCommonStyle: {
      groupLabel: '全局坐标轴线样式',
      groupType: 'Collapse',
      axisStyle: {
        groupLabel: '轴体样式',
        groupType: 'Collapse',
        fields: {
          showLine: getBooleanInput('showLine', '显示轴线', { defaultValue: true }),
          showTick: getBooleanInput('showTick', '显示刻度', { defaultValue: true }),
          'color.width.type.opacity': [
            getColor('color', '轴体样式', { placeholder: '颜色', defaultValue: '#ffffffc2' }),
            getInputNumber('width', '轴体样式', { placeholder: '宽度' }),
            getSelect('type', '轴体样式', ['solid', 'dashed', 'dotted'], { placeholder: '类型', styleSet: 'width: 60px;' }),
            getInputNumber('opacity', '轴体样式', { min: 0, max: 1, step: 0.02, placeholder: '透明度' })
          ]
        }
      },
      splitLine: {
        groupLabel: '分隔线样式',
        groupType: 'Collapse',
        fields: {
          show: getBooleanInput('show', '显示\n分割线', { defaultValue: true }),
          'color.width.type.opacity': [
            getColor('color', '线条样式', { placeholder: '颜色', defaultValue: '#ffffff0a' }),
            getInputNumber('width', '线条样式', { placeholder: '宽度' }),
            getSelect('type', '线条样式', ['solid', 'dashed', 'dotted'], { placeholder: '类型', styleSet: 'width: 60px;' }),
            getInputNumber('opacity', '线条样式', { min: 0, max: 1, step: 0.02, placeholder: '透明度' })
          ]
        }
      },
      splitArea: {
        groupLabel: '分隔区域样式',
        groupType: 'Collapse',
        fields: {
          show: getBooleanInput('show', '显示\n分割区域', { defaultValue: true }),
          'color.opacity': [
            getColor('color', '线条样式', { placeholder: '颜色', defaultValue: '#ffffff0a' }),
            getInputNumber('opacity', '线条样式', { min: 0, max: 1, step: 0.02, placeholder: '透明度' })
          ]
        }
      }
    },
    legend: {
      groupLabel: '图例配置',
      groupType: 'Collapse',
      fields: {
        legends: getArrayGroup('legends', '图例配置', [
          getBooleanInput('show', '显示图例', { defaultValue: true }),
          getSelect('type', '图例类型', ['普通:plain', '滚动:scroll'], { title: '如选择滚动，可以通过粘贴配置片段自动以翻页控件样式' }),
          getSelectWithInput('left', '水平位置', ['auto', 'left', 'center', 'right']),
          getSelectWithInput('top', '垂直位置', ['auto', 'top', 'middle', 'bottom']),
          getInput('id', '图例ID'),
          [
            getInput('width', '图例尺寸', { placeholder: '宽度', title: '图例组件的宽度' }),
            getInput('height', '图例尺寸', { placeholder: '高度', title: '图例组件的高度' })
          ],
          [
            getInputNumber('itemWidth', '标记尺寸', { placeholder: '宽度', title: '图例标记的图形宽度' }),
            getInputNumber('itemHeight', '标记尺寸', { placeholder: '高度', title: '图例标记的图形高度' })
          ],
          [
            getSelect('align', '对齐朝向', ['auto', 'left', 'right'], { placeholder: '对齐' }),
            getSelect('orient', '对齐朝向', ['horizontal', 'vertical'], { placeholder: '朝向' })
          ],
          [
            getInput('padding', '边距间隔', { placeholder: '内边距', defaultValue: '10' }),
            getInputNumber('itemGap', '边距间隔', { placeholder: '间隔' })
          ],
          getInput('formatter', '文本格式化', { title: '用来格式化图例文本，支持字符串模板' }),
          [
            getBooleanInput('formatterFuncEnable', '文本格式化', { placeholder: '启用', defaultValue: false }),
            getEChartsFunction('formatterFunc', '函数配置', ['name'], {
              tips: '// 可用参数 name\n// 其中name 为 图例名称。\n// 例：\n// console.log(name);\n\n'
            })
          ],
          getSelectWithInput('icon', '标记图标', ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'])
        ], { hideItemsMoreThan: 4, defaultCollapse: false })
      }
    },
    tooltip,
    grid: {
      groupLabel: '直角坐标系配置',
      groupType: 'Collapse',
      fields: {
        grids: getArrayGroup('grids', '网格配置', [
          getInput('id', '网格ID'),
          getBooleanInput('show', '显示网格'),
          getSelectWithInput('left', '左侧边距', ['left', 'center', 'right']),
          getSelectWithInput('top', '上侧边距', ['top', 'middle', 'bottom']),
          [
            getInput('right', '其他边距', { placeholder: '右侧' }),
            getInput('bottom', '其他边距', { placeholder: '下侧' }),
          ],
          [
            getInput('with', '网格尺寸', { placeholder: '宽度' }),
            getInput('height', '网格尺寸', { placeholder: '高度' })
          ],
          getBooleanInput('containLabel', '包含刻度标签'),
          getColor('backgroundColor', '背景色'),
          [
            getColor('borderColor', '边框', { placeholder: '颜色' }),
            getInputNumber('borderWidth', '边框', { placeholder: '线宽' })
          ],
          ...Object.values(shadowStyle)
        ], { hideItemsMoreThan: 5 }),
        xAxis: getArrayGroup('xAxis', 'X（横轴）轴配置', [
          getSelect('type', '坐标轴\n类型', ['数值轴:value', '类目轴:category', '时间轴:time', '对数轴:log'], { defaultValue: 'category' }),
          ...Object.values(axisCommon),
          getRadio('position', 'X轴位置', ['底部:bottom', '顶部:top'], { defaultValue: 'bottom' }),
          getInputNumber('gridIndex', '坐标系\n索引'),
          axisDetail
        ], { hideItemsMoreThan: 5 }),
        yAxis: getArrayGroup('yAxis', 'Y（竖轴）轴配置', [
          getSelect('type', '坐标轴\n类型', ['数值轴:value', '类目轴:category', '时间轴:time', '对数轴:log'], { defaultValue: 'value' }),
          ...Object.values(axisCommon),
          getRadio('position', 'Y轴位置', ['左侧:left', '右侧:right'], { defaultValue: 'left' }),
          getInputNumber('gridIndex', '坐标系\n索引'),
          axisDetail
        ], { hideItemsMoreThan: 5 })
      }
    },
    polar: {
      groupLabel: '极坐标系配置',
      groupType: 'Collapse',
      fields: {
        angleAxis: getArrayGroup('angleAxis', '角度轴配置', [
          getInput('id', '坐标轴ID'),
          getInputNumber('polarIndex', '坐标系索引'),
          getSelect('type', '坐标轴\n类型', ['数值轴:value', '类目轴:category', '时间轴:time', '对数轴:log'], { defaultValue: 'category' }),
          getInput('dataIndex', '数据索引', { title: '通过 dataIndex 为当前坐标轴指定数据源索引，即该坐标轴使用数据源中哪一部分的数据，例：data[dataIndex]。\n如果数据源类型为数组，则会尝试将 dataIndex 解析为数组下标；\n如果数据源类型为对象，则尝试获取数据源 dataIndex 属性的数据；\n如果未指定 dataIndex，则尝试将整个数据源应用到该系列。' }),
          getBooleanInput('inverse', '反向\n坐标轴'),
          getBooleanInput('boundaryGap', '轴两侧\n留白'),
          getBooleanInput('scale', '忽略\n零刻度'),
          [
            getInputNumber('splitNumber', '坐标轴刻度分割', { min: 1, placeholder: '分段数' }),
            getInputNumber('minInterval', '坐标轴刻度分割', { min: 0, placeholder: '最小间隔' }),
            getInputNumber('maxInterval', '坐标轴刻度分割', { placeholder: '最大间隔' })
          ],
          getBooleanInput('silent', '响应鼠标'),
          axisLine,
          axisTick,
          axisLabel,
          nameText,
          splitLine,
          splitArea
        ]),
        radiusAxis: getArrayGroup('radiusAxis', '径向轴配置', [
          getInput('id', '坐标轴ID'),
          getInputNumber('polarIndex', '坐标系索引'),
          getSelect('type', '坐标轴\n类型', ['数值轴:value', '类目轴:category', '时间轴:time', '对数轴:log'], { defaultValue: 'category' }),
          getInput('dataIndex', '数据索引', { title: '通过 dataIndex 为当前坐标轴指定数据源索引，即该坐标轴使用数据源中哪一部分的数据，例：data[dataIndex]。\n如果数据源类型为数组，则会尝试将 dataIndex 解析为数组下标；\n如果数据源类型为对象，则尝试获取数据源 dataIndex 属性的数据；\n如果未指定 dataIndex，则尝试将整个数据源应用到该系列。' }),
          getBooleanInput('inverse', '反向\n坐标轴'),
          getBooleanInput('boundaryGap', '轴两侧\n留白'),
          getBooleanInput('scale', '忽略\n零刻度'),
          getBooleanInput('clockwise', '刻度增长\n顺时针'),
          getInputNumber('startAngle ', '起始角度'),
          [
            getInputNumber('splitNumber', '坐标轴刻度分割', { min: 1, placeholder: '分段数' }),
            getInputNumber('minInterval', '坐标轴刻度分割', { min: 0, placeholder: '最小间隔' }),
            getInputNumber('maxInterval', '坐标轴刻度分割', { placeholder: '最大间隔' })
          ],
          getBooleanInput('silent', '响应鼠标'),
          axisLine,
          axisTick,
          axisLabel,
          nameText,
          splitLine,
          splitArea
        ])
      },
      polars: {
        groupLabel: '坐标系配置',
        groupType: 'Collapse',
        fields: {
          'radius.radiusUnit': [
            getRatio('radius', '半径', { symbol: ',', placeholder: '大小', defaultValue: [10, 10] }),
            getSelect('radiusUnit', '半径', ['无', '%'], { placeholder: '单位', defaultValue: '%' })
          ],
          'center.centerUnit': [
            getRatio('center', '中心坐标', { symbol: ',', placeholder: '坐标', defaultValue: [0, 0] }),
            getSelect('centerUnit', '中心坐标', ['无', '%'], { placeholder: '单位', defaultValue: '%' })
          ]
        }
      }
    },
    singleAxis: {
      groupLabel: '配置',
      groupType: 'Collapse',
      fields: {
        singleAxis: getArrayGroup('singleAxis', '配置', [

        ])
      }
    },
    parallel: {
      groupLabel: '平行坐标系配置',
      groupType: 'Collapse',
      fields: {
        parallels: getArrayGroup('parallels', '坐标系配置', [
          getSelectWithInput('left', '左侧边距', ['left', 'center', 'right']),
          getSelectWithInput('top', '上侧边距', ['top', 'middle', 'bottom']),
          getInput('right', '右侧边距'),
          getInput('bottom', '下侧边距'),
          getSelect('layout', '布局方式', ['horizontal', 'vertical']),
          getBooleanInput('axisExpandable', '允许点击展开折叠axis'),
          [
            getInputNumber('axisExpandCenter', '轴配置', { placeholder: '中心轴索引', title: '初始时，以哪个轴为中心展开，这里给出轴的 index' }),
            getInputNumber('axisExpandCount', '轴配置', { placeholder: '展开数量', title: '初始时，有多少个轴会处于展开状态' }),
            getInputNumber('axisExpandWidth', '轴配置', { placeholder: '间距', title: '初始时，有多少个轴会处于展开状态' })
          ],
          {
            groupLabel: '坐标轴统一配置',
            groupType: 'Collapse',
            group: 'parallelAxisDefault',
            fields: {
              type: getSelect('type', '坐标轴类型', ['value', 'category', 'time', 'log']),
              name: getInput('name', '坐标轴名称'),
              nameLocation: getSelect('nameLocation', '名称位置', ['尾部:end', '中部:middle', '头部:start']),
              nameGap: getInputNumber('nameGap', '轴线距离'),
              nameRotate: getInputNumber('nameRotate', '旋转角度'),
              boundaryGap: getBooleanInput('boundaryGap', '轴两侧\n留白'),
              inverse: getBooleanInput('inverse', '反向\n坐标轴'),
              scale: getBooleanInput('scale', '忽略\n零刻度'),
              'splitNumber.minInterval.maxInterval': [
                getInputNumber('splitNumber', '坐标轴刻度分割', { min: 1, placeholder: '分段数' }),
                getInputNumber('minInterval', '坐标轴刻度分割', { min: 0, placeholder: '最小间隔' }),
                getInputNumber('maxInterval', '坐标轴刻度分割', { placeholder: '最大间隔' })
              ],
              silent: getBooleanInput('silent', '响应鼠标'),
              nameTextStyle: axisNameTextStyle,
              axisLabel,
              axisLine,
              axisTick
            }
          }
        ]),
        parallelAxis: getArrayGroup('parallelAxis', '配置', [
          getInputNumber('dim', '纬度序号'),
          getInputNumber('parallelIndex', '坐标系索引'),
          getInput('dataIndex', '数据索引'),
          getBooleanInput('realtime', '实时刷新视图'),
          getSelect('type', '坐标轴类型', ['value', 'category', 'time', 'log']),
          getInput('name', '坐标轴名称'),
          getSelect('nameLocation', '名称位置', ['尾部:end', '中部:middle', '头部:start']),
          getInputNumber('nameGap', '轴线距离'),
          getInputNumber('nameRotate', '旋转角度'),
          getBooleanInput('boundaryGap', '轴两侧\n留白'),
          getBooleanInput('inverse', '反向\n坐标轴'),
          getBooleanInput('scale', '忽略\n零刻度'),
          [
            getInputNumber('splitNumber', '坐标轴刻度分割', { min: 1, placeholder: '分段数' }),
            getInputNumber('minInterval', '坐标轴刻度分割', { min: 0, placeholder: '最小间隔' }),
            getInputNumber('maxInterval', '坐标轴刻度分割', { placeholder: '最大间隔' })
          ],
          getBooleanInput('silent', '响应鼠标'),
          {
            groupLabel: '框选配置',
            groupType: 'Collapse',
            group: 'areaSelectStyle',
            fields: {
              width: getInputNumber('width', '框选宽度'),
              color: getColor('color', '框选填充色'),
              'borderWidth.borderColor.color': [
                getInputNumber('borderWidth', '选框边框', { placeholder: '宽度' }),
                getColor('borderColor', '选框边框', { placeholder: '颜色' })
              ],
              opacity: getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 })
            }
          },
          axisNameTextStyle,
          axisLine,
          axisTick,
          axisLabel
        ])
      }
    },
    radar: {
      groupLabel: '雷达图坐标系配置',
      groupType: 'Collapse',
      fields: {
        radars: getArrayGroup('radars', '雷达图坐标系配置', [
          [
            getRatio('radius', '半径', { symbol: ',', placeholder: '大小' }),
            getSelect('radiusUnit', '半径', ['无', '%'], { placeholder: '单位' }),
          ],
          [
            getRatio('center', '中心坐标', { symbol: ',', placeholder: '坐标' }),
            getSelect('centerUnit', '中心坐标', ['无', '%'], { placeholder: '单位' }),
          ],
          getInputNumber('startAngle', '起始角度'),
          getInputNumber('nameGap', '轴线距离'),
          getInputNumber('splitNumber', '坐标刻度分割'),
          getBooleanInput('scale', '忽略\n零刻度'),
          getSelect('shape', '绘制类型', ['polygon', 'circle']),
          getBooleanInput('triggerEvent', '响应鼠标'),
          getArrayGroup('indicator', '指示器', [
            getInput('name', '名称'),
            [
              getInputNumber('min', '最值', { placeholder: '最小值' }),
              getInputNumber('max', '最值', { placeholder: '最大值' }),
            ],
            getColor('color', '标签颜色')
          ]),
          {
            groupLabel: '坐标轴名称配置',
            groupType: 'Collapse',
            group: 'name',
            fields: {
              show: getBooleanInput('show', '显示标签'),
              formatter: getInput('formatter', '文本格式化', { innerType: 'textarea', rows: 2 }),
              enable: [
                getBooleanInput('formatterFuncEnable', '文本格式化', { placeholder: '启用', defaultValue: false }),
                getEChartsFunction('formatterFunc', '函数配置', ['value', 'indicator'], {
                  tips: '// 可用参数 value、indicator\n// 其中第一个参数value 为 指示器名称，第二个参数indicator 为指示器配置项。\n// 例：\n// console.log(value);\n\n'
                })
              ],
              textStyle: axisNameTextStyle
            }
          },
          axisLine,
          axisTick,
          axisLabel,
          splitLine,
          splitArea
        ])
      }
    },
    visualMap: {
      groupLabel: '视觉映射组件配置',
      groupType: 'Collapse',
      fields: {
        enable: getBooleanInput('enable', '启用组件', { defaultValue: true }),
        visualMaps: getArrayGroup('visualMaps', '视觉映射组件配置', [
          getBooleanInput('show', '显示组件', { defaultValue: true }),
          getSelect('type', '类型', ['continuous', 'piecewise'], {
            defaultValue: 'continuous',
            control: [
              { type: 'remove', target: ['splitNumber', 'pieces', 'selectedMode', 'categories', 'showLabel'], condition: { compare: '==', value: 'continuous' } },
              { type: 'remove', target: ['range', 'realtime'], condition: { compare: '==', value: 'piecewise' } }
            ]
          }),
          getInputNumber('splitNumber', '分割段数'),
          getArrayGroup('pieces', '自定义\n数值范围', [
            [
              getInputNumber('min', '最值', { placeholder: '最小值' }),
              getInputNumber('max', '最值', { placeholder: '最大值' })
            ],
            getInputNumber('value', '自定义\n值'),
            getInput('label', '自定义\n标签'),
            getColor('color', '自定义\n颜色')
          ]),
          getInput('categories', '离散型\n数据', { title: '用于表示离散型数据（或可以称为类别型数据、枚举型数据）的全集' }),
          [
            getInputNumber('min', '最值', { placeholder: '最小值' }),
            getInputNumber('max', '最值', { placeholder: '最大值' })
          ],
          getInputNumber('seriesIndex', '系列索引'),
          getInputNumber('dimension', '数据维度'),
          getSelect('selectedMode', '选择模式', ['multiple', 'single']),
          getRatio('range', '手柄对应\n数值位置', { symbol: ',', defaultValue: [0, 100], width: '40%' }),
          getBooleanInput('calculable', '显示手柄'),
          getBooleanInput('realtime', '实时更新数据'),
          getBooleanInput('inverse', '反转组件'),
          getInputNumber('precision', '小数精度'),
          [
            getInputNumber('itemWidth', '图形尺寸', { placeholder: '宽度' }),
            getInputNumber('itemHeight', '图形尺寸', { placeholder: '高度' })
          ],
          getSelect('align', '对齐方式', ['auto', 'left', 'right', 'top', 'bottom']),
          getInput('text', '两端文本'),
          getBooleanInput('showLabel', '显示文本标签'),
          getInputNumber('textGap', '文本主体间距'),
          getSelectWithInput('left', '左侧边距', ['auto', 'left', 'center', 'right']),
          getSelectWithInput('right', '右侧边距', ['auto']),
          getSelectWithInput('top', '上侧边距', ['auto', 'top', 'middle', 'bottom']),
          getSelectWithInput('bottom', '下侧边距', ['auto']),
          getSelect('orient', '布局朝向', ['horizontal', 'vertical']),
          getInput('padding', '内边距'),
          getColor('backgroundColor', '背景颜色'),
          [
            getColor('borderColor', '边框', { placeholder: '颜色' }),
            getInputNumber('borderWidth', '边框', { placeholder: '宽度' }),
          ],
          getInput('formatter', '文本格式化'),
          {
            groupLabel: '选中范围中的视觉元素配置',
            groupType: 'Collapse',
            group: 'inRange',
            fields: {
              symbolSize: getRatio('symbolSize', '图元大小', { symbol: ',', defaultValue: [30, 30] }),
              color: getColors('color', '图元颜色'),
              opacity: getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 })
            }
          },
          {
            groupLabel: '选中范围外的视觉元素配置',
            groupType: 'Collapse',
            group: 'outOfRange',
            fields: {
              symbolSize: getRatio('symbolSize', '图元大小', { symbol: ',', defaultValue: [30, 30] }),
              color: getColors('color', '图元颜色'),
              opacity: getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 })
            }
          },
          {
            groupLabel: '控制器配置',
            groupType: 'Collapse',
            group: 'controller',
            fields: {},
            inRange: {
              groupLabel: '选中范围中的视觉元素配置',
              groupType: 'Collapse',
              fields: {
                symbolSize: getRatio('symbolSize', '图元大小', { symbol: ',', defaultValue: [30, 30] }),
                color: getColors('color', '图元颜色'),
                opacity: getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 })
              }
            },
            outOfRange: {
              groupLabel: '选中范围外的视觉元素配置',
              groupType: 'Collapse',
              fields: {
                symbolSize: getRatio('symbolSize', '图元大小', { symbol: ',', defaultValue: [30, 30] }),
                color: getColors('color', '图元颜色'),
                opacity: getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 })
              }
            }
          },
          {
            groupLabel: '文字样式配置',
            groupType: 'Collapse',
            group: 'textStyle',
            fields: {
              'fontSize.color.fontStyle.fontWeight': [
                getInputNumber('fontSize', '文本样式', { placeholder: '大小' }),
                getColor('color', '文本样式', { placeholder: '颜色' }),
                getSelect('fontStyle', '文本样式', ['normal', 'italic', 'oblique'], { placeholder: '风格' }),
                getFontWeight('fontWeight', '文本样式', { placeholder: '粗细' })
              ],
              fontFamily: getFontFamilyList('fontFamily', '字体'),
              lineHeight: getInputNumber('lineHeight', '行高'),
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
                getInputNumber('shadowOffsetX', '文字阴影', { placeholder: 'X 偏移' }),
                getInputNumber('shadowOffsetY', '文字阴影', { placeholder: ' Y 偏移' })
              ]
            }
          }
        ], {
          hideItemsMoreThan: 10
        })
      }
    },
    geo: {
      groupLabel: '地理坐标系组件配置',
      groupType: 'Collapse',
      fields: {
        enable: getBooleanInput('enable', '启用组件', { defaultValue: true }),
        geos: getArrayGroup('geos', '地理坐标系组件配置', [
          getSelectWithInput('map', '地图类型', ['中国:china', '安徽', '澳门', '北京', '重庆', '福建', '甘肃', '广西', '贵州', '海南', '河北', '黑龙江', '河南', '湖北', '湖南', '江苏', '江西', '吉林', '辽宁', '内蒙古', '宁夏', '青海', '山东', '上海', '山西', '陕西', '四川', '台湾', '天津', '香港', '新疆', '西藏', '云南', '浙江'], { defaultValue: 'china' }),
          getSelect('roam', '鼠标事件', ['无:false', '缩放:scale', '平移:move', '缩放平移:all']),
          getRatio('center', '中心点', { symbol: ',', defaultValue: [null, null], step: 0.00001, width: '40%' }),
          getInputNumber('aspectScale', '长宽比', { step: 0.01 }),
          getInputNumber('zoom', '缩放级别'),
          getInput('nameMap', '名称映射', { innerType: 'textarea', rows: 4, placeholder: '自定义地区的名称映射，如：\n{\nChina : 中国\n}' }),
          getSelect('selectedMode', '选中模式', ['无', 'single', 'multiple']),
          getSelectWithInput('left', '左侧边距', ['auto', 'left', 'center', 'right']),
          getSelectWithInput('right', '右侧边距', ['auto']),
          getSelectWithInput('top', '上侧边距', ['auto', 'top', 'middle', 'bottom']),
          getSelectWithInput('bottom', '下侧边距', ['auto']),
          [
            getRatio('layoutCenter', '地图中心点', { symbol: ',', placeholder: '大小', defaultValue: [30, 30], title: '定义地图中心在屏幕中的位置' }),
            getSelect('layoutCenterUnit', '地图中心点', ['无', '%'], { placeholder: '单位' }),
          ],
          getInput('layoutSize', '地图大小', { title: '定义地图的大小' }),
          getArrayGroup('regions', '特定区域样式配置', [
            getInput('name', '区域名称'),
            getBooleanInput('selected', '选中区域'),
            {
              groupLabel: '区域多边形样式设置',
              groupType: 'Collapse',
              group: 'itemStyle',
              fields: {
                areaColor: getColor('areaColor', '区域颜色'),
                color: getColor('color', '图形颜色'),
                'borderColor.borderWidth.borderType': [
                  getColor('borderColor', '图形边框', { placeholder: '配色' }),
                  getInputNumber('borderWidth', '图形边框', { placeholder: '尺寸' }),
                  getSelect('borderType', '图形边框', ['solid', 'dashed', 'dotted'], { placeholder: '样式' })
                ],
                ...shadowStyle,
                'opacity': getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 })
              }
            },
            label
          ]),
          label,
          {
            groupLabel: '滚轮缩放的极限控制',
            groupType: 'Collapse',
            group: 'scaleLimit',
            fields: {
              min: getInputNumber('min', '最小值'),
              max: getInputNumber('max', '最大值')
            }
          },
          {
            groupLabel: '图形高亮样式',
            groupType: 'Collapse',
            group: 'emphasis',
            fields: {},
            label,
            itemStyle: {
              groupLabel: '区域多边形样式设置',
              groupType: 'Collapse',
              fields: {
                areaColor: getColor('areaColor', '区域颜色'),
                color: getColor('color', '图形颜色'),
                'borderColor.borderWidth.borderType': [
                  getColor('borderColor', '图形边框', { placeholder: '配色' }),
                  getInputNumber('borderWidth', '图形边框', { placeholder: '尺寸' }),
                  getSelect('borderType', '图形边框', ['solid', 'dashed', 'dotted'], { placeholder: '样式' })
                ],
                ...shadowStyle,
                'opacity': getInputNumber('opacity', '透明度', { min: 0, max: 1, step: 0.02 })
              }
            }
          }
        ], {
          hideItemsMoreThan: 7,
          defaultCollapse: false
        })
      }
    },
    bmap: {
      groupLabel: '百度地图坐标系配置',
      groupType: 'Collapse',
      fields: {
        enable: getBooleanInput('enable', '启用组件'),
        text: getText('text', '组件说明', '启用后页面将自动嵌入百度地图相关依赖，请先设置百度地图 APIKey'),
        ak: getInput('ak', '地图APIKey', '', { title: '请申请并将百度地图应用 APIKey 填入此处。\n默认的 APIKey 有不稳定的风险。', defaultValue: 'KOmVjPVUAey1G2E8zNhPiuQ6QiEmAwZu' }),
        center: getRatio('center', '中心坐标', { defaultValue: [116.46, 39.92], width: '40%', symbol: ',' }),
        zoom: getInputNumber('zoom', '缩放级别', { defaultValue: '12' }),
        roam: getBooleanInput('roam', '响应操作'),
        mapStyle: getInput('mapStyle', '风格配置', {
          placeholder: '[{…}]',
          defaultValue: '', innerType: 'textarea', rows: 5
        })
      }
    }
  }
})

const baseConfigValue = () => Object.freeze({
  config: {
    colors: ["#37a2da", "#32c5e9", "#67e0e3", "#9fe6b8", "#ffdb5c", "#ff9f7f", "#fb7293"],
    series: [],
    font: {
      color: '#E9E9E9',
      fontSize: 12,
      fontWeight: 'normal',
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
      lineHeight: 18,
      textBorderColor: 'transparent',
      textBorderWidth: 0,
      textShadowColor: 'transparent',
      textShadowBlur: 0,
      textShadowOffsetX: 0,
      textShadowOffsetY: 0
    },
    axisCommonStyle: {
      axisStyle: {},
      splitLine: {},
      splitArea: {}
    },
    legend: {
      legends: []
    },
    tooltip: {},
    grid: {
      grids: [],
      xAxis: [],
      yAxis: []
    },
    polar: {
      polars: {},
      angleAxis: [],
      radiusAxis: []
    },
    parallel: {
      parallels: [],
      parallelAxis: []
    },
    singleAxis: {
      singleAxis: []
    },
    radar: {
      radars: []
    },
    visualMap: {
      enable: true,
      visualMaps: []
    },
    geo: {
      enable: true,
      geos: []
    },
    bmap: {
      enable: false,
      ak: 'KOmVjPVUAey1G2E8zNhPiuQ6QiEmAwZu',
      center: [105, 36],
      zoom: 5,
      roam: false,
      mapStyle: ''
    }
  }
})

export { baseConfigSource, baseConfigValue }
