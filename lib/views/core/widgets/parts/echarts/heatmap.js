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
    colors: ['#ca6265', '#f7f1af'],
    series: [
      {
        type: 'heatmap',
        id: '',
        name: '直接访问',
        dataIndex: 'value'
      }
    ],
    grid: {
      grids: [{
        top: 20,
        left: 80,
        bottom: 30,
        right: 15
      }],
      xAxis: [{
        gridIndex: 0,
        dataIndex: 'hours'
      }],
      yAxis: [{
        gridIndex: 0,
        dataIndex: 'days'
      }]
    },
    visualMap: {
      enable: true,
      visualMaps: [
        {
          show: true,
          min: 0,
          max: 10,
          calculable: true,
          outOfRange: {
            color: ['transparent']
          },
          controller: {
            outOfRange: {
              color: ['#999']
            }
          }
        }
      ]
    }
  },
  api: {
    data: JSON.stringify({
      hours: ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p'],
      days: ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun'],
      value: [[0, 0, 5], [1, 0, 1], [2, 0, 0], [3, 0, 0], [4, 0, 0], [5, 0, 0], [6, 0, 0], [7, 0, 0], [8, 0, 0], [9, 0, 0], [10, 0, 0], [11, 0, 9], [12, 0, 4], [13, 0, 1], [0, 1, 7], [1, 1, 0], [2, 1, 0], [1, 3, 0], [4, 1, 0], [5, 1, 0], [6, 1, 0], [7, 1, 0], [8, 1, 0], [9, 1, 0], [10, 1, 5], [11, 1, 9], [12, 1, 9], [13, 1, 6], [0, 2, 8], [1, 2, 8], [2, 2, 0], [3, 2, 0], [4, 2, 0], [5, 2, 0], [6, 2, 0], [7, 2, 0], [8, 2, 0], [9, 2, 0], [10, 2, 3], [11, 2, 2], [12, 2, 1], [13, 2, 9], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 8], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 9], [4, 13, 4], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [4, 5, 0], [5, 5, 0], [6, 5, 0], [7, 5, 0], [8, 5, 2], [9, 5, 0], [10, 5, 4], [11, 5, 1], [12, 5, 5], [13, 5, 10], [0, 6, 1], [6, 1, 0], [2, 6, 0], [3, 6, 0], [4, 6, 0], [5, 6, 0], [6, 6, 0], [7, 6, 0], [8, 6, 0], [9, 6, 0], [10, 6, 1], [11, 6, 0], [12, 6, 2], [13, 6, 1]]
    }, null, 2)
  }
})

// 用于筛选预置配置项
const configParseMap = {
  layout: true,
  config: {
    colors: true,
    series: true,
    grid: true,
    geo: true,
    bmap: true,
    visualMap: true,
    font: true,
    axisCommonStyle: true,
    tooltip: true
  },
  api: true,
  animation: true
}

export default {
  name: 'widget-heatmap',
  label: '热力图-ECharts',
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
