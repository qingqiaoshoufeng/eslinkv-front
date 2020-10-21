import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getInput, getRatio, getColor } from '../lib/config-tools'
import xss from 'xss'

// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    fields: {
      content: getInput('content', 'SVG内容节点', { innerType: 'textarea', placeholder: '请贴入完整的SVG代码', rows: 10 }),
      viewBox: getRatio('viewBox', 'viewBox', { symbol: '-', range: {} }),
      fill: getColor('fill', '填充色')
    }
  }
})

const localConfigValue = Object.freeze({
  config: {
    content: '',
    viewBox: [0, 0, 1024, 1024],
    fill: ''
  }
})

// 用于筛选预置配置项
const configParseMap = Object.freeze({
  widget: true,
  layout: {
    size: {
      '$width.height.unit': true
    },
    position: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    content: true,
    viewBox: true,
    fill: true
  },
  animation: true
})

export default {
  name: 'widget-a-svg',
  label: 'SVG',
  mixins: [widgetMixin],
  render: function (createElement) {
    const { layout } = this.config
    const { viewBox, content, fill } = this.mergedConfig
    return createElement(
      'div',
      {
        style: styleParser(layout, this.time),
        'class': ['widget-a-svg', 'widget-part'],
        ref: 'widget'
      },
      [
        createElement(
          'svg',
          {
            style: 'width: 100%; height: 100%;',
            attrs: {
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: viewBox.join(' '),
              fill
            }
          }
        )
      ]
    )
  },
  methods: {
    loadSvg () {
      const svg = this.$el.querySelector('svg')
      if (!svg) return
      const cleanedContent = this.clearContent(this.mergedConfig.content)
      svg.innerHTML = cleanedContent
    },
    init () {
      this.loadSvg()
    },
    clearContent (content) {
      content = xss(content, {
        allowCommentTag: false,
        whiteList: [],
        stripIgnoreTagBody: ['script', 'a', 'span', 'div', 'section', 'p', 'b', 'strong', 'bold']
      })
      content = content.replace(/&lt;/g, '<')
      content = content.replace(/&gt;/g, '>')
      return content
    }
  },
  computed: {
    mergedConfig () {
      return this.config.config
    }
  },
  created () {
    this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  },
  updated () {
    this.loadSvg()
  }
}
