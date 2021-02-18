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
      color: '#fff'
    },
    series: [
      {
        type: 'sunburst',
        id: '',
        name: '',
        dataIndex: 'value'
      }
    ]
  },
  api: {
    data: JSON.stringify({
      value: [{
        name: 'Grandpa',
        children: [{
          name: 'Uncle Leo',
          value: 15,
          children: [{
            name: 'Cousin Jack',
            value: 2
          }, {
            name: 'Cousin Mary',
            value: 5,
            children: [{
              name: 'Jackson',
              value: 2
            }]
          }, {
            name: 'Cousin Ben',
            value: 4
          }]
        }, {
          name: 'Father',
          value: 10,
          children: [{
            name: 'Me',
            value: 5
          }, {
            name: 'Brother Peter',
            value: 1
          }]
        }]
      }, {
        name: 'Nancy',
        children: [{
          name: 'Uncle Nike',
          children: [{
            name: 'Cousin Betty',
            value: 1
          }, {
            name: 'Cousin Jenny',
            value: 2
          }]
        }]
      }]
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
    tooltip: true
  },
  api: true,
  animation: true
}

export default {
  name: 'widget-sunburst',
  label: '旭日图-ECharts',
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
        style: styleParser(layout, this.time),
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
