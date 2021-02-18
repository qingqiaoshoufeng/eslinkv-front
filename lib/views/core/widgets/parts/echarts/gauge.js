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
        type: 'gauge',
        id: '',
        name: '直接访问',
        dataIndex: 'value'
      }
    ]
  },
  api: {
    data: JSON.stringify({
      value: [{ value: 50, name: '完成率' }]
    }, null, 2)
  }
})

// 用于筛选预置配置项
const configParseMap = {
  layout: true,
  config: {
    colors: true,
    series: true,
    polar: true,
    font: true,
    axisCommonStyle: true,
    legend: true,
    tooltip: true
  },
  api: true,
  animation: true
}

export default {
  name: 'widget-gauge',
  label: '仪表盘-ECharts',
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
    this.configValue = this.parseConfigValue(configParseMap, configMerge(localConfigValue, baseConfigValue()))
  }
}
