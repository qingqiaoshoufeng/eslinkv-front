import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getInput, getSelect, getInputNumber, getColor, getBooleanInput } from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    option: {
      fields: {
        rowNum: getInputNumber('rowNum', '行数'),
        'headerBGC.oddRowBGC.evenRowBGC': [
          getColor('headerBGC', '背景色', { placeholder: '表头' }),
          getColor('oddRowBGC', '背景色', { placeholder: '奇数行' }),
          getColor('evenRowBGC', '背景色', { placeholder: '偶数行' })
        ],
        headerHeight: getInputNumber('headerHeight', '表头高度'),
        columnWidth: getInput('columnWidth', '列宽度', { placeholder: '每列用逗号分隔' }),
        align: getInput('align', '列对齐方式', { placeholder: 'left | center | right' }),
        index: getBooleanInput('index', '显示行号'),
        indexHeader: getInput('indexHeader', '行号表头'),
        waitTime: getInputNumber('waitTime', '轮播时间间隔', { placeholder: '单位ms' }),
        carousel: getSelect('carousel', '轮播方式', ['single', 'page'])
      }
    }
  }
})

const localConfigValue = Object.freeze({
  config: {
    option: {
      rowNum: 5,
      headerBGC: '#00BAFF',
      oddRowBGC: '#003B51',
      evenRowBGC: '#0A2732',
      headerHeight: 35,
      columnWidth: '',
      align: '',
      index: false,
      indexHeader: '#',
      waitTime: 2000,
      carousel: 'single'
    }
  },
  api: {
    data: JSON.stringify({
      header: ['列1', '列2', '列3'],
      data: [
        ['行1列1', '行1列2', '行1列3'],
        ['行2列1', '行2列2', '行2列3'],
        ['行3列1', '行3列2', '行3列3'],
        ['行4列1', '行4列2', '行4列3'],
        ['行5列1', '行5列2', '行5列3'],
        ['行6列1', '行6列2', '行6列3'],
        ['行7列1', '行7列2', '行7列3'],
        ['行8列1', '行8列2', '行8列3'],
        ['行9列1', '行9列2', '行9列3'],
        ['行10列1', '行10列2', '行10列3']
      ]
    }, null, 2)
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
      'headerBGC.oddRowBGC.evenRowBGC': true,
      headerHeight: true,
      columnWidth: true,
      align: true,
      index: true,
      indexHeader: true,
      waitTime: true,
      carousel: true
    }
  },
  api: true,
  animation: true
})
import Vue from 'vue'
import {scrollBoard} from '@jiaminghi/data-view'

Vue.use(scrollBoard)
export default {
  name: 'widget-scroll-board',
  label: '轮播列表',
  mixins: [widgetMixin],
  render: function (createElement) {
    const { layout, config } = this.config
    if (!layout || !config) return null
    return createElement(
      'dv-scroll-board',
      {
        style: styleParser(layout, this.time),
        'class': ['widget-part', { ready: this.ready }, 'widget-scroll-board', config.className],
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
      if (this.data !== null) {
        Object.assign(option, this.data)
      }
      const { columnWidth, align } = option
      if (columnWidth) {
        option.columnWidth = columnWidth.split(',')
      }
      if (align) {
        option.align = align.split(',')
      }
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
