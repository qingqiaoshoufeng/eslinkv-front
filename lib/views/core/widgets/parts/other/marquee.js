import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getInput, getInputNumber } from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    fields: {
      text: getInput('text', '文本内容', { placeholder: '文本内容', innerType: 'textarea', rows: 5 }),
      duration: getInputNumber('duration', '动画时长')
    }
  }
})

const localConfigValue = Object.freeze({
  layout: {
    font: {
      color: '#fff',
      size: 16,
      lineHeight: 1.5,
      align: 'left'
    }
  },
  config: {
    text: '这里也许是一行比较长的文字',
    duration: 5000
  },
  api: {
    data: ''
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
    text: true,
    duration: true
  },
  api: true,
  animation: true
}

export default {
  name: 'widget-marquee',
  label: '跑马灯',
  mixins: [widgetMixin],
  data () {
    return {
      marqueeName: Date.now().toString(36)
    }
  },
  render: function (createElement) {
    const { layout } = this.config
    const { text, duration } = this.mergedConfig
    return createElement(
      'div',
      {
        style: `${styleParser(layout, this.time)};overflow:hidden;white-space: nowrap;`,
        'class': ['widget-marquee', 'widget-part'],
        directives: [
          {
            name: 'marquee',
            modifiers: {
              [this.marqueeName]: true
            },
            value: duration
          }
        ],
        ref: 'widget'
      },
      [
        createElement(
          'div',
          {
            style: {
              position: 'absolute'
            }
          },
          text
        )
      ]
    )
  },
  computed: {
    mergedConfig () {
      if (!this.config.config) return false
      const option = { ...this.config.config }
      if (!option.text) option.text = '这里也许是一行比较长的文字'
      if (this.data) {
        option.text = this.data
        this.config.config.text = this.data
      }
      return option
    }
  },
  watch: {
    'config.config.text' (value) {
      this.data = value
    }
  },
  created () {
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  }
}
