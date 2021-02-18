<script>
import styleParser from '../../lib/style-parser'
import widgetMixin from '../../lib/widget-mixin'
import {
  getInput, getSelect, getBooleanInput, getRadio,
  getInputNumber, getNumberWithUnit, getColor,
  getBackground, getArrayGroup, getCheckBox
} from '../../lib/config-tools'
import isEqualByType from './is-equal-by-type'
import getValueByType from './get-value-by-type'
import fields from '../../../../config-panel/components/fields.vue'
import jsonic from 'jsonic'

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
      title: getInput('title', '表单标题'),
      collapseButtonName: getInput('collapseButtonName', '锚点文本', { placeholder: '用于配置表单展开的锚点文本' }),
      showProps: getCheckBox(
        'showProps',
        '显示设置',
        ['标签文本:label', '占位文本:placeholder', '确认按钮:confirmButton', '重置按钮:resetButton'],
        {
          title: '显示确认按钮时，修改查询条件将不自动触发查询'
        }
      ),
      features: getCheckBox('features', '特性设置', ['自动收起:autoCollapse', '自动贴边:autoWelt', '固定位置:positionFix'], { title: '不固定位置表示操作者可通过鼠标移动查询表单' }),
      formItems: getArrayGroup('formItems', '字段清单', [
        getInput('field', '字段名称'),
        getSelect('type', '字段类型', ['文本框:Input', '文本域:Input@textarea', '下拉选单:Select', '数字:InputNumber', '复选框:CheckBox', '单选框:Radio', '布尔值:BooleanInput', '日期:DatePicker']),
        getInput('label', '标签文本'),
        getInput('placeholder', '占位文本'),
        getInput('defaultValue', '默认值'),
        getBooleanInput('clearable', '可清空'),
        getBooleanInput('enable', '启用字段'),
        getInput('config', 'iViewUI 表单元素组件附加配置', { innerType: 'textarea', rows: 6, placeholder: '此处用于配置 iViewUI 组件的参数。对于下拉选单等包含选项的组件，可使用 options 属性指定选项列表，例：{options:\'年:1,月:2\'}。除 options 之外的属性将被识别为对组件的配置。' })
      ], { hideItemsMoreThan: 4 })
    }
  }
})

const localConfigValue = Object.freeze({
  layout: {
    font: {
      color: '#a9a9a9',
      size: 14,
      align: 'left'
    },
    background: {
      color: '#414141'
    },
    border: {
      topLeftRadius: 5,
      topRightRadius: 5,
      bottomRightRadius: 5,
      bottomLeftRadius: 5
    },
    padding: {
      detail: {
        left: 12,
        right: 12,
        bottom: 12
      }
    }
  },
  config: {
    title: '标题',
    collapseButtonName: '查询框',
    showProps: ['label', 'placeholder', 'confirmButton', 'resetButton'],
    features: ['autoCollapse'],
    formItems: [
      {
        "enable": true,
        "label": "文本框",
        "type": "Input",
        "field": "input",
        "placeholder": "请输入",
        "defaultValue": "",
        "clearable": true,
        "config": ""
      },
      {
        "enable": true,
        "label": "下拉选单",
        "type": "Select",
        "field": "select",
        "placeholder": "请选择",
        "defaultValue": "1",
        "clearable": true,
        "config": "{options:'年:1,月:2'}"
      },
      {
        "enable": true,
        "label": "复选框",
        "type": "CheckBox",
        "field": "checkbox",
        "placeholder": "",
        "defaultValue": "2",
        "clearable": true,
        "config": "{options:'年:1,月:2'}"
      },
      {
        "enable": true,
        "label": "输入数字",
        "type": "InputNumber",
        "field": "number",
        "placeholder": "请输入",
        "defaultValue": "2",
        "clearable": true,
        "config": ""
      },
      {
        "enable": true,
        "label": "选择日期",
        "type": "DatePicker",
        "field": "date",
        "placeholder": "请选择",
        "defaultValue": "",
        "clearable": true,
        "config": "{innerType:'daterange'}"
      }
    ]
  },
  api: {
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
    padding: true,
    background: true,
    border: true,
    position: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    title: true,
    collapseButtonName: true,
    showProps: true,
    features: true,
    formItems: true
  },
  api: {
    bind: {
      enable: true,
      role: true
    }
  },
  animation: true
}

export default {
  name: 'widget-float-form',
  label: '浮动查询表单',
  mixins: [widgetMixin],
  components: {
    fields
  },
  data () {
    return {
      formItems: [],
      output: {},
      dragStart: false,
      lastX: 0,
      lastY: 0,
      weltTimer: null,
      hasWelt: null,
      expand: false
    }
  },
  render: function (h) {
    const { layout } = this.config
    const { title, collapseButtonName, showProps, features } = this.mergedConfig
    const showLabel = showProps.includes('label')
    const showPlaceholder = showProps.includes('placeholder')
    const showConfirmButton = showProps.includes('confirmButton')
    const showResetButton = showProps.includes('resetButton')
    const isPositionFix = this.isPositionFix
    const autoCollapse = this.autoCollapse
    const dragStart = this.dragStart
    const expand = this.expand
    const hasWelt = this.hasWelt
    return h(
      'div',
      {
        style: styleParser(layout, this.time),
        'class': [
          'widget-float-form',
          'widget-part',
          {
            dragging: dragStart,
            [`welt-${hasWelt}`]: hasWelt,
            'auto-collapse': autoCollapse,
            expand
          }
        ],
        ref: 'widget',
        on: {
          mousemove: e => {
            if (!this.dragStart) return
            e.stopPropagation()
            e.preventDefault()
            const position = this.config.layout.position
            position.left += e.clientX - this.lastX
            position.top += e.clientY - this.lastY
            this.lastX = e.clientX
            this.lastY = e.clientY
          },
          mouseleave: e => {
            if (this.dragStart) return
            this.weltTimer = setTimeout(() => {
              this.formWelt()
              this.weltTimer = null
              if (autoCollapse) this.expand = false
            }, 500)
          },
          mouseenter: e => {
            if (this.weltTimer) clearTimeout(this.weltTimer)
          }
        }
      },
      [
        h(
          'div',
          {
            'class': 'collapse-handle',
            on: {
              mouseenter: e => {
                this.expand = true
              }
            }
          },
          [
            collapseButtonName,
            !autoCollapse && expand && h(
              'Icon',
              {
                props: {
                  type: 'md-close'
                },
                on: {
                  click: e => {
                    this.expand = false
                  }
                }
              }
            )
          ]
        ),
        h(
          'div',
          {
            'class': 'float-form-header'
          },
          [
            title && h(
              'div',
              {
                'class': 'float-form-title'
              },
              title
            ),
            !isPositionFix && h(
              'div',
              {
                'class': ['drag-handler', { active: dragStart }],
                on: {
                  mousedown: e => {
                    e.stopPropagation()
                    e.preventDefault()
                    if (hasWelt) {
                      const formElement = this.$el
                      const width = formElement.getBoundingClientRect().width
                      const position = this.config.layout.position
                      const left = position.left
                      console.info(width, left)
                      formElement.style.transition = '0s'
                      position.left = hasWelt === 'left' ? left + width + 20 : left - width - 20
                      this.expand = false
                      this.hasWelt = null
                    }
                    this.dragStart = true
                    this.lastX = e.clientX
                    this.lastY = e.clientY
                  }
                }
              }
            )
          ]
        ),
        h(
          'div',
          {
            class: ['float-form-body', { 'no-label': !showLabel }]
          },
          [
            h(
              'fields',
              {
                props: {
                  value: this.output,
                  fields: showPlaceholder ? this.formItems : this.formItems.map(({ placeholder, ...otherProps }) => otherProps)
                }
              }
            )
          ]
        )
      ]
    )
  },
  methods: {
    handleFloatFormDragEnd () {
      this.dragStart = false
      this.$el.style.transition = null
    },
    formWelt () {
      if (this.kanboard.isInEditor || this.isPositionFix || !this.autoWelt || this.hasWelt) return
      const kanboard = document.querySelector('div.canvas-wrapper')
      if (kanboard) {
        const formElement = this.$el
        const kanboardRect = kanboard.getBoundingClientRect()
        const formRect = formElement.getBoundingClientRect()
        const kanboardCenterX = (kanboardRect.left + kanboardRect.right) / 2
        // 只处理水平贴靠
        // const kanboardCenterY = (kanboardRect.top + kanboardRect.bottom) / 2
        const formCenterX = (formRect.left + formRect.right) / 2
        const isLeft = formCenterX <= kanboardCenterX
        formElement.style.transition = 'left .4s'
        this.config.layout.position.left = isLeft ? -formRect.width : kanboardRect.width
        setTimeout(() => {
          formElement.style.transition = null
          this.hasWelt = isLeft ? 'left' : 'right'
        }, 400)
      }
    }
  },
  computed: {
    mergedConfig () {
      const {
        title = '查询表单',
        collapseButtonName = '查询框',
        showProps = ['label', 'placeholder', 'confirmButton', 'resetButton'],
        features = ['autoCollapse', 'autoWelt']
      } = this.config.config || {}

      return {
        title,
        collapseButtonName,
        showProps,
        features
      }
    },
    isPositionFix () {
      const features = this.mergedConfig.features
      return features.includes('positionFix')
    },
    autoCollapse () {
      const features = this.mergedConfig.features
      return features.includes('autoCollapse')
    },
    autoWelt () {
      const features = this.mergedConfig.features
      return features.includes('autoWelt')
    }
  },
  watch: {
    isPositionFix (value) {
      if (value) {
        const features = this.config.config.features
        features.splice(0)
        features.push('positionFix')
      }
    },
    autoWelt (value) {
      if (value) {
        const features = this.config.config.features
        const index = features.indexOf('positionFix')
        index > -1 && features.splice(index, 1)
      }
    },
    autoCollapse: {
      handler: function (value) {
        const config = this.config.config
        if (value && config) {
          const features = config.features || []
          const index = features.indexOf('positionFix')
          index > -1 && features.splice(index, 1)
          if (features.indexOf('autoWelt') === -1) features.push('autoWelt')
        }
      },
      immediate: true
    },
    'config.config.formItems': {
      handler: function (value) {
        this.output = {}
        if (!value || !value.length) {
          this.formItems = []
          return
        }
        this.formItems = value.filter(item => item.enable && item.field).map(item => {
          const { field, type, clearable, label, placeholder, defaultValue, config } = item
          const [itemType, innerType] = type.split('@')
          let { options, ...props } = config ? jsonic(config.trim()) : {}
          if (options) options = options.split(',')
          Object.assign(props, { placeholder, clearable })
          innerType && Object.assign(props, { innerType })
          const value = itemType !== 'CheckBox' ? defaultValue || '' : defaultValue ? defaultValue.split(',') : []
          this.$set(this.output, field, value)
          switch (itemType) {
            case 'InputNumber':
              return getInputNumber(field, label, props)
            case 'Select':
              return getSelect(field, label, options, props)
            case 'CheckBox':
              return getCheckBox(field, label, options, props)
            case 'Radio':
              return getRadio(field, label, options, props)
            case 'BooleanInput':
              return getBooleanInput(field, label, props)
            case 'DatePicker':
              return {
                label,
                type: 'DatePicker',
                field,
                ...props
              }
            default:
              return getInput(field, label, props)
          }
        })
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  },
  mounted () {
    document.addEventListener('mouseup', this.handleFloatFormDragEnd)
    setTimeout(() => {
      this.formWelt()
    }, 1000)
  },
  beforeDestroy () {
    document.removeEventListener('mouseup', this.handleFloatFormDragEnd)
  }
}
</script>

<style lang="scss" scoped>
  .widget-float-form {
    position: relative;
    &:hover,
    &:focus-within {
      .float-form-clear {
        opacity: 1;
        pointer-events: auto;
        transition: opacity 0.2s 0.2s;
      }
    }
    &.expand:focus-within {
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
    }
    &.dragging {
      overflow: visible;
      &:before {
        content: '';
        position: absolute;
        bottom: calc(50% - 20px);
        left: calc(50% - 3em);
        width: 100%;
        height: 100%;
      }
    }
    .collapse-handle {
      position: absolute;
      top: 10px;
      width: 2em;
      background-color: inherit;
      padding: 0.5em;
      line-height: 1.2em;
      opacity: 0;
      pointer-events: none;
      transition: transform 0.4s, opacity 0.4s;
      cursor: pointer;
    }
    &.welt-left,
    &.welt-right {
      transition: transform 0.4s;
      .collapse-handle {
        pointer-events: auto;
        opacity: 1;
      }
    }
    &.welt-right {
      .collapse-handle {
        left: 0;
        transform: translateX(-100%);
        border-radius: 4px 0 0 4px;
      }
    }
    &.welt-left {
      .collapse-handle {
        right: 0;
        transform: translateX(100%);
        border-radius: 0 4px 4px 0;
      }
    }
    &.welt-left.expand {
      transform: translateX(calc(100% + 20px));
    }
    &.welt-right.expand {
      transform: translateX(calc(-100% - 20px));
    }
    &.expand.auto-collapse {
      .collapse-handle {
        opacity: 0;
        transform: translateX(0);
        pointer-events: none;
      }
    }
  }
  .float-form-header {
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: rgba(255, 255, 255, 0.1) thin solid;
    margin-bottom: 10px;
    .float-form-title {
      font-weight: bold;
      font-size: 1.1em;
      white-space: nowrap;
    }
    .drag-handler {
      width: 5em;
      height: 8px;
      flex-shrink: 1;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.2);
      cursor: move;
      &:hover,
      &.active {
        height: 12px;
        border-radius: 6px;
        background-color: rgba(255, 255, 255, 0.4);
      }
    }
  }
  .float-form-body {
    height: calc(100% - 52px);
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
    }
    &.no-label {
      /deep/ .field-item .field-label {
        display: none;
      }
    }
    /deep/ {
      .field-input-text,
      .field-input-number,
      .field-input .ivu-input,
      .field-select {
        background-color: rgba(255, 255, 255, 0.06);
        color: inherit !important;
        border-color: rgba(255, 255, 255, 0.3) !important;
        font-size: inherit !important;
      }
      .field-item {
        font-size: inherit !important;
      }
    }
  }
</style>
<style>
  .ivu-date-picker-transfer {
    z-index: 999999 !important;
  }
</style>
