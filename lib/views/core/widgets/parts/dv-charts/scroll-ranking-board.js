import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getInput, getInputNumber, getBooleanInput, getSelect } from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    option: {
      fields: {
        rowNum: getInputNumber('rowNum', '行数'),
        waitTime: getInputNumber('waitTime', '轮播时间间隔', { placeholder: '单位ms' }),
        carousel: getSelect('carousel', '轮播方式', ['single', 'page']),
        unit: getInput('unit', '单位'),
        sort: getBooleanInput('sort', '自动排序')
      }
    }
  }
})

const localConfigValue = Object.freeze({
  config: {
    option: {
      rowNum: 5,
      waitTime: 2000,
      carousel: 'single',
      unit: '',
      sort: true
    }
  },
  api: {
    data: JSON.stringify([
      {
        name: '周口',
        value: 55
      },
      {
        name: '南阳',
        value: 120
      },
      {
        name: '西峡',
        value: 78
      },
      {
        name: '驻马店',
        value: 66
      },
      {
        name: '新乡',
        value: 80
      }
    ], null, 2)
  }
})

// 用于筛选预置配置项
const configParseMap = Object.freeze({
  widget: true,
  layout: {
    size: true,
    position: true,
    background: true,
    border: true,
    padding: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    option: {
      rowNum: true,
      waitTime: true,
      carousel: true,
      unit: true,
      sort: true
    }
  },
  api: true,
  animation: true
})

export default {
  name: 'widget-scroll-ranking-board',
  label: '排行轮播列表',
  mixins: [widgetMixin],
  render: function (createElement) {
    const { layout, config } = this.config
    if (!layout || !config) return null
    return createElement(
      'dv-scroll-ranking-board',
      {
        style: styleParser(layout, this.time),
        'class': ['widget-part', { ready: this.ready }, 'widget-scroll-ranking-board', config.className],
        props: {
          config: this.mergedConfig
        },
        ref: 'widget'
      }
    )
  },
  computed: {
    mergedConfig () {
      const option = { ...this.config.config.option }
      option.data = this.data || []
      return option
    }
  },
  methods: {
    init () { }
  },
  created () {
    this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  }
}
