import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import {
  getInput, getSelect, getBooleanInput, getInputNumber,
  getRadio, getIconSelect, getFontSize, getColor,
  getFontWeight, getNumberWithUnit, getSelectWithInput
} from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    fields: {
      label: getInput('label', '文本描述'),
      unit: getSelectWithInput('unit', '数值单位', ['无', '%']),
      showIcon: getBooleanInput('showIcon', '显示图标'),
      icon: getIconSelect('icon', '选择图标', ['fas fa-arrow-up&fas fa-arrow-down', 'fas fa-arrow-circle-up&fas fa-arrow-circle-down', 'fas fa-arrow-alt-circle-up&fas fa-arrow-alt-circle-down', 'far fa-arrow-alt-circle-up&far fa-arrow-alt-circle-down', 'fas fa-long-arrow-alt-up&fas fa-long-arrow-alt-down', 'fas fa-sort-up&fas fa-sort-down', 'fas fa-angle-double-up&fas fa-angle-double-down', 'fas fa-level-up-alt&fas fa-level-down-alt', 'fas fa-caret-up&fas fa-caret-down']),
      trend: getRadio('trend', '变化趋势', ['升势:up', '降势:down']),
      layoutWay: getSelect('layoutWay', '排布方式', ['水平:row', '垂直:column', '水平反向:row-reverse', '垂直反向:column-reverse'],
        {
          control: [
            { type: 'remove', target: ['vertical'], condition: { compare: '==', value: 'row' } },
            { type: 'remove', target: ['vertical'], condition: { compare: '==', value: 'row-reverse' } },
            { type: 'remove', target: ['horizontal'], condition: { compare: '==', value: 'column' } },
            { type: 'remove', target: ['horizontal'], condition: { compare: '==', value: 'column-reverse' } },
          ]
        }),
      horizontal: getSelect('horizontal', '水平对齐', ['上:flex-start', '居中:center', '下:baseline']),
      vertical: getSelect('vertical', '垂直对齐', ['左:flex-start', '居中:center', '右:flex-end'])
    },
    labelConfig: {
      groupLabel: '文本描述配置',
      groupType: 'Collapse',
      fields: {
        fontSize: getFontSize('fontSize', 'unit'),
        color: getColor('color', '字体颜色'),
        weight: getFontWeight('weight'),
        marginLeft: getNumberWithUnit('左外边距', 'marginLeft', 'marginUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' }),
        marginRight: getNumberWithUnit('右外边距', 'marginRight', 'marginUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' })
      }
    },
    numberConfig: {
      groupLabel: '数值配置',
      groupType: 'Collapse',
      fields: {
        fontSize: getFontSize('fontSize', 'unit'),
        color: getColor('color', '字体颜色'),
        weight: getFontWeight('weight'),
        marginLeft: getNumberWithUnit('左外边距', 'marginLeft', 'marginUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' }),
        marginRight: getNumberWithUnit('右外边距', 'marginRight', 'marginUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' }),
        decimals: getInputNumber('decimals', '保留小数\n位数', { min: 0 }),
        thousand: getBooleanInput('thousand', '千分位\n格式')
      }
    },
    unitConfig: {
      groupLabel: '单位配置',
      groupType: 'Collapse',
      fields: {
        fontSize: getFontSize('fontSize', 'unit'),
        color: getColor('color', '字体颜色')
      }
    },
    iconConfig: {
      groupLabel: '图标配置',
      groupType: 'Collapse',
      fields: {
        fontSize: getInputNumber('fontSize', '图标大小'),
        'upColor.downColor': [
          getColor('upColor', '图标颜色', { placeholder: '升势' }),
          getColor('downColor', '图标颜色', { placeholder: '降势' })
        ],
        align: getSelect('align', '对齐方式', ['上:flex-start', '中:center', '下:baseline']),
        marginLeft: getNumberWithUnit('左外边距', 'marginLeft', 'marginLeftUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' }),
        marginRight: getNumberWithUnit('右外边距', 'marginRight', 'marginRightUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' })
      }
    }
  }
})

const localConfigValue = Object.freeze({
  layout: {
    font: {
      align: 'center'
    }
  },
  config: {
    label: '同比',
    unit: '%',
    showIcon: true,
    icon: 'fas fa-long-arrow-alt-up&fas fa-long-arrow-alt-down',
    trend: 'up',
    layoutWay: 'row',
    horizontal: 'baseline',
    vertical: 'center',
    labelConfig: {
      fontSize: 16,
      unit: 'px',
      color: '#fff',
      weight: '',
      marginLeft: 0,
      marginLeftUnit: 'px',
      marginRight: 15,
      marginRightUnit: 'px'
    },
    numberConfig: {
      fontSize: 32,
      unit: 'px',
      color: '#fff',
      weight: '',
      marginLeft: 0,
      marginLeftUnit: 'px',
      marginRight: 2,
      marginRightUnit: 'px',
      decimals: 0,
      thousand: false
    },
    unitConfig: {
      fontSize: 14,
      unit: 'px',
      color: '#fff',
    },
    iconConfig: {
      fontSize: 18,
      upColor: '#5BDC86',
      downColor: 'red',
      align: 'baseline',
      marginLeft: 10,
      marginLeftUnit: 'px',
      marginRight: 0,
      marginRightUnit: 'px'
    }
  },
  api: {
    data: JSON.stringify({
      value: 60,
      trend: 'down'
    }, null, 2)
  }
})

// 用于筛选预置配置项
const configParseMap = {
  layout: {
    size: {
      '$width.height.unit': true
    },
    font: {
      letterSpacing: true,
      align: true,
      family: true,
      indent: true
    },
    position: true,
    background: true,
    border: true,
    padding: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    label: true,
    unit: true,
    showIcon: true,
    icon: true,
    trend: true,
    layoutWay: true,
    horizontal: true,
    vertical: true,
    labelConfig: true,
    numberConfig: true,
    unitConfig: true,
    iconConfig: true
  },
  api: true,
  animation: true
}

const layoutAlignMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
}

export default {
  name: 'widget-number-display',
  label: '数值展示',
  mixins: [widgetMixin],
  render: function (createElement) {
    if (!this.mergedConfig) return
    const { layout } = this.config
    const {
      label, unit, icon, showIcon, trend, layoutWay, horizontal, layoutAlign,
      vertical, iconConfig, labelConfig, unitConfig, numberConfig } = this.mergedConfig

    let number = typeof this.data === 'object' ? this.data.value || 0 : this.data || 0
    number = numberConfig.thousand ? (number - 0).toLocaleString('en') : number
    let [intPart, decimalPart = ''] = number.toString().split('.')
    if (decimalPart.length > numberConfig.decimals) {
      decimalPart = decimalPart.substring(0, numberConfig.decimals)
    } else {
      decimalPart = decimalPart.padEnd(numberConfig.decimals, '0')
    }
    number = `${intPart}${decimalPart.length ? '.' : ''}${decimalPart}`

    const iconClass = this.getIcon(icon, trend)
    return createElement(
      'div',
      {
        style: `
                ${styleParser(layout, this.time)};
                display: flex;
                justify-content: ${layoutAlignMap[layoutAlign]};
                align-items: center;
              `,
        'class': ['widget-number-display', 'widget-part'],
        ref: 'widget'
      },
      [
        createElement(
          'div',
          {
            style: `
                     display: flex;
                     flex-direction: ${layoutWay};
                     align-items: ${layoutWay.indexOf('row') > -1 ? horizontal : vertical};
                   `
          },
          [
            createElement(
              'div',
              {
                style: {
                  color: labelConfig.color,
                  fontSize: `${labelConfig.fontSize}${labelConfig.unit}`,
                  fontWeight: labelConfig.weight,
                  marginLeft: `${labelConfig.marginLeft}${labelConfig.marginLeftUnit}`,
                  marginRight: `${labelConfig.marginRight}${labelConfig.marginRightUnit}`
                },
                'class': ['label']
              },
              label
            ),
            createElement(
              'div',
              {
                style: {
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: iconConfig.align
                },
                'class': ['value']
              },
              [
                createElement(
                  'div',
                  {
                    'class': ['number-unit'],
                    style: {
                      display: 'flex',
                      alignItems: 'baseline'
                    }
                  },
                  [
                    createElement(
                      'span',
                      {
                        style: {
                          fontSize: `${numberConfig.fontSize}${numberConfig.unit}`,
                          color: numberConfig.color,
                          fontWeight: numberConfig.weight,
                          lineHeight: 'initial',
                          marginLeft: `${numberConfig.marginLeft}${numberConfig.marginLeftUnit}`,
                          marginRight: `${numberConfig.marginRight}${numberConfig.marginRightUnit}`
                        },
                        'class': ['number']
                      },
                      number
                    ),
                    unit && createElement(
                      'span',
                      {
                        style: {
                          fontSize: `${unitConfig.fontSize}${unitConfig.unit}`,
                          color: unitConfig.color
                        },
                        'class': ['unit']
                      },
                      unit
                    )
                  ]
                ),
                showIcon && createElement(
                  'i',
                  {
                    style: {
                      color: trend === 'up' ? iconConfig.upColor : iconConfig.downColor,
                      fontSize: `${iconConfig.fontSize}px`,
                      marginLeft: `${iconConfig.marginLeft}${iconConfig.marginLeftUnit}`,
                      marginRight: `${iconConfig.marginRight}${iconConfig.marginRightUnit}`
                    },
                    'class': ['icon', iconClass]
                  }
                )
              ]
            )
          ]
        )
      ]
    )
  },
  methods: {
    getIcon (string, trend) {
      let icon = ''
      if (string) {
        if (string.indexOf('&') > -1) {
          icon = string.split('&').filter(item => {
            return item.indexOf(trend) > -1
          })
        } else {
          icon = string
        }
      }
      return icon
    },
  },
  computed: {
    mergedConfig () {
      if (!this.config.config) return
      const layoutAlign = this.config.layout.font.align
      const option = this.config.config
      option.layoutAlign = layoutAlign
      return option
    }
  },
  watch: {
    'data': {
      handler: function (value) {
        if (typeof value === 'object' && value.trend) {
          this.config.config.trend = value.trend
        }
      }
    }
  },
  created () {
    this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  }
}
