<script>
import styleParser from '../../lib/style-parser'
import widgetMixin from '../../lib/widget-mixin'
import { getInput, getSelect, getBooleanInput, getBackground } from '../../lib/config-tools'
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
      showPlaceholder: getBooleanInput('showPlaceholder', '显示占位文本'),
      placeholder: getInput('placeholder', '占位文本', { placeholder: '占位文本' }),
      clearable: getBooleanInput('clearable', '可清空'),
      options: getInput('options', '选项清单', {
        innerType: 'textarea',
        rows: 3,
        placeholder: 'label1:value1,label2,value2',
        title: 'label1:value1,label2,value2'
      }),
      'value.index': [
         getInput('value', '选中', { placeholder: '值' }),
         getInput('index', '选中', { placeholder: '索引' })
      ],
      valueType: getSelect('valueType', '数据类型', ['String', 'Number', 'Boolean']),
      inputable: getBooleanInput('inputable', '可输入'),
      hideIcon: getBooleanInput('hideIcon', '隐藏图标')
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
    label: '请选择',
    showPlaceholder: true,
    placeholder: '请选择',
    clearable: false,
    options: '选项1:1,选项2:2',
    value: null,
    index: 0,
    valueType: 'Number',
    inputable: false,
    hideIcon: false
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
const configParseMap ={
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
    showPlaceholder: true,
    placeholder: true,
    clearable: true,
    options: true,
    'value.index': true,
    valueType: true,
    hideIcon: true
  },
  api: true,
  animation: true
}

export default {
  name: 'widget-property-select',
  label: '下拉条件切换',
  mixins: [widgetMixin],
  data () {
    return {
      showOptions: false,
      output: null,
      blurTimer: null
    }
  },
  render: function (h) {
    const { layout } = this.config
    const {
      showLabel, label, showPlaceholder, placeholder,
      clearable, options, value, index, valueType, inputable,
      textAlign, backgroundColor, hideIcon
    } = this.mergedConfig

    const id = 'property-select-' + (Math.random() * 1000000 | 0)
    const body = [
      h(
        'input',
        {
          'class': 'property-select',
          style: {
            [!hideIcon && 'padding-right']: '2.5em'
          },
          attrs: {
            id,
            [showPlaceholder && 'placeholder']: placeholder,
            [!inputable && 'readonly']: 'readonly'
          },
          domProps: {
            value: this.innerLabel
          },
          on: {
            focus: e => {
              this.showOptions = true
            },
            blur: e => {
              this.blurTimer = setTimeout(() => {
                this.showOptions = false
              }, 300)
            }
          }
        }
      ),
      h(
        'ul',
        {
          'class': ['property-select-options', { active: this.showOptions }],
          style: `background-color: ${backgroundColor}`
        },
        options.length ? options.map(({ value: optionValue, label }) => {
          const selectedValue = !index && index !== 0 ? value : options[index] ? options[index].value : ''
          const isSelected = isEqualByType(optionValue, selectedValue, valueType)
          return h(
            'li',
            {
              'class': ['property-select-option', { selected: isSelected }],
              on: {
                click: () => {
                  const output = getValueByType(optionValue, valueType)
                  if (!index && index !== 0) {
                    this.config.config.value = output
                  } else {
                    const currentVal = output
                    this.config.config.index = options.findIndex(item => item.value === currentVal + '')
                  }
                  this.showOptions = false
                  this.blurTimer && clearTimeout(this.blurTimer)
                }
              }
            },
            label || optionValue
          )
        }) : [
            h(
              'li',
              {
                'class': 'property-select-option property-select-option-empty'
              },
              '暂无选项'
            )
          ]
      )
    ]

    if (!hideIcon) {
      body.push(h(
        'span',
        {
          'class': 'property-select-icon'
        }
      ))
    }

    if (clearable) {
      body.push(h(
        'div',
        {
          'class': ['property-select-clear', { hide: !this.output && this.output !== 0 }],
          on: {
            click: () => {
              this.config.config.value = null
              this.config.config.index = null
            }
          }
        },
        '×'
      ))
    }

    return h(
      'div',
      {
        style: styleParser(layout, this.time),
        'class': ['widget-property-select', 'widget-part', `align-${textAlign}`],
        ref: 'widget'
      },
      [
        showLabel && label && h(
          'label',
          {
            'class': 'property-select-label',
            attrs: {
              for: id
            }
          },
          label
        ),
        h(
          'div',
          {
            'class': 'select-wrapper'
          },
          body
        )
      ]
    )
  },
  computed: {
    mergedConfig () {
      const { layout = {}, config = {} } = this.config
      const textAlign = layout.font ? layout.font.align || 'center' : 'center'
      const backgroundColor = layout.background ? layout.background.color : ''
      const {
        showLabel = false,
        label = '',
        showPlaceholder = true,
        placeholder = '',
        clearable = false,
        value = 1,
        index = null,
        valueType = 'Number',
        inputable = false,
        hideIcon = false
      } = config

      let options = this.data || config.options || [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }]

      if (!Array.isArray(options)) options = optionsParser(options)

      return {
        showLabel,
        label,
        showPlaceholder,
        placeholder,
        clearable,
        options,
        value,
        index,
        valueType,
        inputable,
        textAlign,
        backgroundColor,
        hideIcon
      }
    },
    innerLabel () {
      const { valueType, options, index, value } = this.mergedConfig
      const selectedValue = !index && index !== 0 ? value : options[index] ? options[index].value : ''
      const selectedOption = options.find(option => isEqualByType(option.value, selectedValue, valueType)) || {}
      return selectedOption.label || selectedOption.value || ''
    }
  },
  watch: {
    'config.config.options' (value) {
      this.data = JSON.stringify(optionsParser(value))
    },
    'config.config.value': {
      handler: function (value) {
        if (value === undefined || value === null) return
        this.output = value
        this.config.config.index = null
      },
      immediate: true
    },
    'config.config.index': {
      handler: function (value) {
        if (value === undefined || value === null) return
        this.output = value
        this.config.config.value = null
      },
      immediate: true
    }
  },
  created () {
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  }
}
</script>

<style lang="scss" scoped>
  .widget-property-select {
    display: flex;
    align-items: center;
    &:hover:not(:focus-within) {
      .property-select-clear {
        opacity: 1;
        pointer-events: auto;
        transition: opacity 0.2s 0.2s;
      }
    }
    &:focus-within {
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
      .property-select-icon {
        &::before {
          transform: rotate(180deg);
          margin-top: -0.5em;
        }
      }
    }
  }
  .property-select-clear {
    position: absolute;
    right: 0.85em;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 1.3em;
    height: 1.3em;
    border-radius: 50%;
    background-color: #595959;
    color: #e6e6e6;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0;
    cursor: pointer;
    &.hide {
      display: none;
    }
  }
  .property-select-icon {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1em 0 0;
    pointer-events: none;
    &:before {
      content: '';
      width: 0;
      height: 0;
      border: transparent 0.5em solid;
      border-top-color: currentColor;
      margin-top: 0.5em;
    }
  }
  .property-select-label {
    position: relative;
    padding: 0 1em;
    white-space: nowrap;
    cursor: pointer;
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
  .select-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    align-items: center;
  }
  .property-select {
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    outline: none;
    color: inherit;
    padding: 0 0.7em 0 1em;
    text-align: inherit;
    cursor: pointer;
  }
  .property-select-options {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 100%;
    list-style: none;
    padding: 0;
    height: auto;
    max-height: 300px;
    opacity: 0;
    transform: translate3d(0, -5px, 0);
    transition: transform 0.2s, opacity 0.2s;
    overflow-x: hidden;
    z-index: 2;
    pointer-events: none;
    .property-select-option {
      display: block;
      width: 100%;
      line-height: 2.5;
      padding: 0 1em;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }
      &.selected {
        background-color: rgba(45, 140, 240, 0.5);
      }
    }
    &.active {
      opacity: 1;
      transform: translate3d(0, 5px, 0);
      pointer-events: auto;
    }
  }
</style>
