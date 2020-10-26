import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getInput, getSelect, getBackground } from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    fields: {
      src: getBackground('src', '选择图片', { params: { type: null }, mountToBody: true }),
      src1: getInput('src', '图片地址', { placeholder: '自定义图片资源' }),
      title: getInput('title', '标题文本'),
      fit: getSelect('fit', '图片样式', ['fill', 'contain', 'cover', 'scale-down', 'none'])
    }
  }
})

const localConfigValue = Object.freeze({
  config: {
    src: '',
    title: '',
    fit: 'contain'
  }
})

// 用于筛选预置配置项
const configParseMap = {
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
    src: true,
    src1: true,
    title: true,
    fit: true
  },
  animation: true
}

export default {
  name: 'widget-a-image',
  label: '图片',
  mixins: [widgetMixin],
  render: function (createElement) {
    const { layout } = this.config
    const { src, title, fit } = this.mergedConfig
    return createElement(
      'img',
      {
        style: `${styleParser(layout, this.time)}; object-fit: ${fit};`,
        'class': ['widget-a-image', 'widget-part'],
        ref: 'widget',
        attrs: {
          title,
          src: `${src}?t=${Date.now()}`
        }
      }
    )
  },
  computed: {
    mergedConfig () {
      return this.config.config || { src: '', title: '示例图片标题', fit: 'contain' }
    }
  },
  created () {
    this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  }
}
