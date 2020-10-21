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
      color: '#312D2D'
    },
    series: [
      {
        type: 'map',
        id: '',
        dataIndex: 'value',
        geoIndex: 0,
        coordinateSystem: 'geo'
      }
    ],
    geo: {
      geos: [
        {
          map: 'china',
          zoom: 1,
          center: [],
          layoutCenter: [null, null],
          label: {
            show: true
          }
        }
      ]
    }
  }
})

// 用于筛选预置配置项
const configParseMap = Object.freeze({
  widget: true,
  layout: true,
  config: {
    colors: true,
    series: true,
    geo: true,
    bmap: true,
    font: true,
    visualMap: true,
    tooltip: true
  },
  api: true,
  animation: true
})

export default {
  name: 'widget-map-chart',
  label: '地图-ECharts',
  mixins: [widgetMixin],
  components: {
    chartBase
  },
  data () {
    return {
      localConfigSource: {},
      selectedArea: null
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
        on: {
          'map-center-update': data => {
            if (!data) return
            this.config.config.geo.geos[0].center = data
          },
          'map-area-selected': data => {
            this.selectedArea = data.batch[0]
          }
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
    },
    output () {
      const { name } = this.selectedArea
      return { selectedArea: name }
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
