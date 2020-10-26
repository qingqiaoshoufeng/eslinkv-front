<script>
import styleParser from '../../lib/style-parser'
import widgetMixin from '../../lib/widget-mixin'
import { getInput, getSelect, getBooleanInput, getInputNumber, getNumberWithUnit, getColor, getBackground } from '../../lib/config-tools'
import isEqualByType from './is-equal-by-type'
import getValueByType from './get-value-by-type'
import optionsParser from './options-parser'

// 组件参数配置
const localConfigSource = Object.freeze({
  layout: {
    background: {
      fields: {
        url: getBackground('url', '背景图片', { params: { type: 3 }, mountToBody: true }),
      }
    }
  },
  config: {
    fields: {
      showLabel: getBooleanInput('showLabel', '显示标签'),
      label: getInput('label', '标签文本', { placeholder: '标签文本' }),
      options: getInput('options', '选项清单', {
        innerType: 'textarea',
        rows: 3,
        placeholder: 'label1:value1,label2,value2',
        title: 'label1:value1,label2,value2'
      }),
      optionGap: getNumberWithUnit('选项间距', 'optionGap', 'optionGapUnit', ['px', 'em', '%'], { min: 0, step: 1, placeholder: '选项间距' }),
      optionWidth: getNumberWithUnit('选项宽度', 'optionWidth', 'optionWidthUnit', ['px', 'em', '%'], { min: 0, step: 1, placeholder: '选项宽度', title: '0 表示自动' }),
      optionAlign: getSelect('optionAlign', '选项对齐', ['左对齐:left', '右对齐:right', '居中对齐:center', '分散对齐:justify']),
      'color.activeColor.backgroundColor.activeBackgroundColor': [
        getColor('color', '选项配色', { placeholder: '文本' }),
        getColor('activeColor', '选项配色', { placeholder: '选中' }),
        getColor('backgroundColor', '选项配色', { placeholder: '背景' }),
        getColor('activeBackgroundColor', '选项配色', { placeholder: '选中' })
      ],
      'value.index': [
         getInput('value', '选中', { placeholder: '值' }),
         getInput('index', '选中', { placeholder: '索引' })
      ],
      valueType: getSelect('valueType', '数据类型', ['String', 'Number', 'Boolean'])
    }
  }
})

const localConfigValue = Object.freeze({
  layout: {
    font: {
      color: '#a9a9a9',
      size: 14
    },
    background: {
      color: '#414141'
    },
    border: {
      topLeftRadius: 5,
      topRightRadius: 5,
      bottomRightRadius: 5,
      bottomLeftRadius: 5
    }
  },
  config: {
    showLabel: false,
    label: '',
    options: '选项1:1,选项2:2',
    optionGap: 0,
    optionGapUnit: 'px',
    optionWidth: 0,
    optionWidthUnit: 'px',
    optionAlign: 'right',
    color: '#c2c2c2',
    activeColor: '#c2c2c2',
    backgroundColor: 'transparent',
    activeBackgroundColor: 'rgba(45,140,240,0.5)',
    value: null,
    index: 0,
    valueType: 'Number'
  },
  api: {
    data: '[{ "label": "选项1", "value": 1 }, { "label": "选项2", "value": 2 }]',
    bind: {
      enable: true,
      role: ['provider']
    }
  }
})

// 用于筛选预置配置项
const configParseMap = {
  layout: {
    size: {
      '$width.height.unit': true
    },
    font: true,
    position: true,
    background: true,
    border: true,
    padding: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    showLabel: true,
    label: true,
    options: true,
    optionGap: true,
    optionGapUnit: true,
    optionWidth: true,
    optionWidthUnit: true,
    optionAlign: true,
    '$color.activeColor.backgroundColor.activeBackgroundColor': true,
    'value.index': true,
    valueType: true
  },
  api: true,
  animation: true
}

export default {
  name: 'widget-property-switch',
  label: '点选条件切换',
  mixins: [widgetMixin],
  data () {
    return {}
  },
  render: function (h) {
    const { layout } = this.config
    const {
      showLabel, label, options, value, index, textAlign, optionWidthUnit,
      valueType, optionGap, optionWidth, optionAlign, optionGapUnit,
      color, activeColor, backgroundColor, activeBackgroundColor,
      topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius, radiusUnit
    } = this.mergedConfig

    const body = [
      h(
        'ul',
        {
          'class': ['property-switch-options', { active: this.showOptions }, `align-${optionAlign}`],
          style: {
            '--option-text-color': color,
            '--option-text-active-color': activeColor,
            '--option-background-color': backgroundColor,
            '--option-background-active-color': activeBackgroundColor,
            '--option-border-radius-top-left': `${topLeftRadius}${radiusUnit}`,
            '--option-border-radius-top-right': `${topRightRadius}${radiusUnit}`,
            '--option-border-radius-bottom-left': `${bottomLeftRadius}${radiusUnit}`,
            '--option-border-radius-bottom-right': `${bottomRightRadius}${radiusUnit}`
          }
        },
        options.length ? options.map(({ value: optionValue, label }, i) => {
          const selectedValue = !index && index !== 0 ? value : options[index] ? options[index].value : ''
          const isSelected = isEqualByType(optionValue, selectedValue, valueType)
          const width = `${optionWidth > 0 ? optionWidth : 'auto'}${optionWidth > 0 ? optionWidthUnit : ''}`
          return h(
            'li',
            {
              'class': ['property-switch-option', `align-${textAlign}`, { selected: isSelected, 'fixed-width': optionWidth > 0 }],
              style: {
                marginLeft: `${i ? optionGap : 0}${optionGapUnit}`,
                width
              },
              on: {
                click: () => {
                  const output = getValueByType(optionValue, valueType)
                  if (!index && index !== 0) {
                    this.config.config.value = output
                  } else {
                    const currentVal = output
                    this.config.config.index = options.findIndex(item => item.value === currentVal + '')
                  }
                }
              }
            },
            label || optionValue
          )
        }) : [
            h(
              'li',
              {
                'class': 'property-switch-option property-switch-option-empty'
              },
              '暂无选项'
            )
          ]
      )
    ]

    return h(
      'div',
      {
        style: styleParser(layout, this.time),
        'class': ['widget-property-switch', 'widget-part'],
        ref: 'widget'
      },
      [
        showLabel && label && h(
          'label',
          {
            'class': 'property-switch-label'
          },
          label
        ),
        body
      ]
    )
  },
  computed: {
    mergedConfig () {
      const { layout = {}, config = {} } = this.config
      const textAlign = layout.font ? layout.font.align || 'center' : 'center'
      const { topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius, radiusUnit } = layout.border || {}
      const {
        showLabel = false,
        label = '',
        value = 1,
        index = null,
        valueType = 'Number',
        optionGap = 0,
        optionGapUnit = 'px',
        optionWidth = 0,
        optionWidthUnit = 'px',
        optionAlign = 'right',
        color = '#c2c2c2',
        activeColor = '#c2c2c2',
        backgroundColor = 'transparent',
        activeBackgroundColor = 'rgba(45,140,240,0.5)'
      } = config

      let options = this.data || config.options || [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }]

      if (!Array.isArray(options)) options = optionsParser(options)

      return {
        showLabel,
        label,
        options,
        optionGap,
        optionGapUnit,
        optionWidth,
        optionWidthUnit,
        value,
        index,
        valueType,
        optionAlign,
        textAlign,
        color,
        activeColor,
        backgroundColor,
        activeBackgroundColor,
        topLeftRadius,
        topRightRadius,
        bottomRightRadius,
        bottomLeftRadius,
        radiusUnit
      }
    }
  },
  watch: {
    'config.config.options' (value) {
      this.data = JSON.stringify(optionsParser(value))
    },
    'config.config.value': {
      handler: function (value) {
        if (value === undefined || value === null) return
        this.config.config.index = null
      },
      immediate: true
    },
    'config.config.index': {
      handler: function (value) {
        if (value === undefined || value === null) return
        this.config.config.value = null
      },
      immediate: true
    }
  },
  created () {
    this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  }
}
</script>

<style lang="scss" scoped>
  .widget-property-switch {
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .property-switch-label {
    position: relative;
    padding: 0 1em;
    margin-right: 1em;
    white-space: nowrap;
    &:after {
      content: '';
      position: absolute;
      right: 0px;
      top: 0;
      bottom: 0;
      margin: auto 0;
      height: 1em;
      width: 1px;
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
  .property-switch-options {
    width: 100%;
    height: 100%;
    list-style: none;
    display: flex;
    padding: 0;
    &.align-left {
      justify-content: flex-start;
    }
    &.align-center {
      justify-content: center;
    }
    &.align-right {
      justify-content: flex-end;
    }
    &.align-justify {
      justify-content: space-between;
    }
    .property-switch-option {
      display: inline-flex;
      height: 100%;
      color: var(--option-text-color);
      background-color: var(--option-background-color);
      padding: 0 1em;
      white-space: nowrap;
      align-items: center;
      text-align: inherit;
      cursor: pointer;
      &.align-left {
        justify-content: flex-start;
      }
      &.align-center {
        justify-content: center;
      }
      &.align-right {
        justify-content: flex-end;
      }
      &.fixed-width {
        flex-grow: 0;
        flex-shrink: 0;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }
      &.selected {
        color: var(--option-text-active-color);
        background-color: var(--option-background-active-color);
      }
      &:first-child {
        border-radius: var(--option-border-radius-top-left) 0 0 var(--option-border-radius-bottom-left);
      }
      &:last-child {
        border-radius: 0 var(--option-border-radius-top-right) var(--option-border-radius-bottom-right) 0;
      }
    }
  }
</style>
