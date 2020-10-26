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
    series: [
      {
        type: 'line',
        id: '',
        name: '直接访问',
        dataIndex: 'value'
      }
    ],
    grid: {
      grids: [{
        top: 20,
        left: 30,
        right: 15,
        bottom: 30
      }],
      xAxis: [{
        gridIndex: 0,
        dataIndex: 'name'
      }],
      yAxis: [{
        gridIndex: 0
      }]
    }
  },
  api: {
    data: JSON.stringify({
      name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      value: [10, 20, 6, 7, 8, 11, 26]
    }, null, 2)
  }
})

// 用于筛选预置配置项
const configParseMap ={
  layout: true,
  config: {
    colors: true,
    grid: true,
    series: true,
    font: true,
    axisCommonStyle: true,
    legend: true,
    tooltip: true
  },
  api: true,
  animation: true
}

export default {
  name: 'widget-line-chart',
  label: '折线图-ECharts',
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
