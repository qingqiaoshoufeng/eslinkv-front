import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import configMerge from '../lib/config-merge'
import chartBase from './base.vue'
import getEchartsOption from './get-echarts-option'
import { baseConfigSource, baseConfigValue } from './base-config'

const localConfigValue = Object.freeze({
  layout: {
    size: {
      width: 400,
      height: 300
    }
  },
  config: {
    font: {
      color: null
    },
    series: [
      {
        type: 'pie',
        id: '',
        dataIndex: 'value',
        radius: [0, 50],
        radiusUnit: '%',
        center: [50, 50],
        centerUnit: '%',
        label: {
          position: 'left'
        }
      }
    ]
  },
  api: {
    data: JSON.stringify({
      value: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]
    }, null, 2)
  }
})

// 用于筛选预置配置项
const configParseMap = {
  layout: true,
  config: {
    colors: true,
    series: true,
    font: true,
    legend: true,
    tooltip: true
  },
  api: true,
  animation: true
}

export default {
  name: 'widget-pie',
  label: '饼图-ECharts',
  mixins: [widgetMixin],
  components: {
    chartBase
  },
  data () {
    return {
      localConfigSource: {}
    }
  },
  render: function (createElement) {
    const { layout } = this.config
    const option = this.mergedConfig
    return createElement(
      'chart-base',
      {
        style: styleParser(layout),
        'class': ['widget-part', { ready: this.ready }, 'widget-charts'],
        props: {
          option
        },
        ref: 'widget'
      }
    )
  },
  computed: {
    mergedConfig () {
      const { config } = this.config
      const option = getEchartsOption(config, this.data)
      return option
    }
  },
  methods: {
    init () {
      this.$refs.widget && this.$refs.widget.updateSize()
    }
  },
  created () {
    this.configSource = this.parseConfigSource(configParseMap, baseConfigSource)
    this.configValue = this.parseConfigValue(configParseMap, configMerge(localConfigValue, baseConfigValue()))
  }
}
