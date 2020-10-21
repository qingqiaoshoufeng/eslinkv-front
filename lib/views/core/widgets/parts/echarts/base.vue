<template>
  <div ref="eChart" :class="{ ready: ready }" :style="{ backgroundColor }" class="chart-base" v-on="$listeners">
    <slot :instance="instance" :option="option"></slot>
  </div>
</template>

<script>
import parseFunctionString from '../../../../../vendor/parse-function-string'
import { mapmapping } from './mapmapping'
import axios from 'axios'

const funcToString = (input) => {
  const output = !Array.isArray(input) ? {} : []
  for (let key in input) {
    const value = input[key]
    if (typeof value === 'object') {
      output[key] = funcToString(value)
      continue
    }
    if (typeof value === 'function') {
      output[key] = value.toString()
      continue
    }
    output[key] = value
  }
  return output
}

const isFunctionString = (input) => {
  if (typeof input !== 'string') return false
  input = input.trim()
  return input.indexOf('function') === 0 || (input.indexOf('(') === 0 && input.indexOf('=>') > 0)
}

const stringToFunc = (input) => {
  const output = !Array.isArray(input) ? {} : []
  for (let key in input) {
    const value = input[key]
    if (typeof value === 'object') {
      output[key] = stringToFunc(value);
      continue
    }
    if (isFunctionString(value)) {
      output[key] = parseFunctionString(value)
      continue
    }
    output[key] = value
  }
  return output
}

export default {
  name: 'chart-base',
  props: {
    option: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      instance: null,
      ready: false,
      chartOption: {},
      selectIndex: null,
      mapSourceMark: {},
      currentMapName: null,
      bmapInstance: null,
      backgroundColor: null,
      mapstyleUpdateTimer: null
    };
  },
  methods: {
    initEchart () {
      if (this.instance) {
        this.instance.clear();
        this.instance.off('click');
        this.instance.getZr().off('click');
      } else {
        this.instance = echarts.init(this.$refs.eChart)
      }
      // console.info(JSON.stringify(this.chartOption))
      this.instance.setOption(this.chartOption)
      this.instance.showLoading({
        text: '查询中',
        color: '#007CD2',
        textColor: '#007CD2',
        maskColor: 'rgba(0, 0, 0, 0.1)',
        zlevel: 9
      })

      this.instance.on('click', (params) => {
        this.$emit('chart-click', params, this.instance)
      })
      this.instance.getZr().on('click', (params) => {
        if (params.target === undefined) {
          this.$emit('chart-blank-click', params, this.instance)
        }
      })
      this.instance.on('geoselectchanged', data => this.$emit('map-area-selected', data))
    },
    updateChart (option = {}, noMerge = false) {
      option = stringToFunc(option)
      this.instance.setOption(option, noMerge)
      !noMerge ? Object.assign(this.chartOption, option) : (this.chartOption = Object.assign(option))
      this.instance.hideLoading()
      if (!this.ready) {
        this.ready = true
        this.$emit('ready')
      }
    },
    updateSize () {
      this.instance && this.instance.resize()
      requestAnimationFrame(() => {
        this.$emit('size-change')
      })
    },
    setReady (action) {
      this.ready = action
    },
    getChartConfig () {
      return funcToString(this.chartOption)
    },
    updateMapStyle (mapStyle, forceUpdate) {
      if (!this.bmapInstance || !mapStyle) return
      if (this.backgroundColor && !forceUpdate) return
      const landStyle = (mapStyle.styleJson || []).find(item => item.featureType === 'land')
      if (landStyle) {
        this.backgroundColor = landStyle.stylers ? landStyle.stylers.color : null
      }
      this.bmapInstance.setMapStyle(mapStyle)
    },
    watchMapstyleUpdate (mapStyle) {
      if (this.mapstyleUpdateTimer) cancelAnimationFrame(this.mapstyleUpdateTimer)
      if (!mapStyle) return
      this.mapstyleUpdateTimer = requestAnimationFrame(() => {
        this.bmapInstance = this.instance.getModel().getComponent('bmap').getBMap()
        mapStyle && this.updateMapStyle(mapStyle, true)
        this.mapstyleUpdateTimer = null
      })
    }
  },
  watch: {
    option: {
      handler: function (option) {
        if (option) {
          let { bmap, geo } = option
          if (geo) {
            if (Array.isArray(geo)) geo = geo[0]
            if (!geo) return
            let mapJSON, mapName
            mapmapping.some((item) => {
              if (geo.map === item.label) {
                mapName = item.label === 'china' ? item.value : 'province/' + item.value
                return true
              }
            })
            if (this.currentMapName) {
              if (geo.map !== this.currentMapName) {
                this.currentMapName = geo.map
              }
            } else {
              this.currentMapName = geo.map
            }
            if (this.mapSourceMark[geo.map]) {
              this.instance ? this.updateChart(option, true) : (this.chartOption = stringToFunc(option))
              return
            }
            if (!mapName) {
              this.$Message.warning('未获得与之匹配的地图资源名称：' + geo.map)
              return
            }
            axios.get('static/mapJSON/' + mapName + '.json').then((res) => {
              this.mapSourceMark[geo.map] = true
              echarts.registerMap(geo.map, res.data)
              this.instance ? this.updateChart(option, true) : (this.chartOption = stringToFunc(option))
            }).catch((err) => {
              console.warn(err)
            })
            return
          }
          if (bmap) {
            if (this.instance) {
              this.updateChart(option, true)
            } else {
              this.chartOption = stringToFunc(option)
            }
            this.watchMapstyleUpdate(bmap.mapStyle)
            return
          } else {
            this.backgroundColor = null
          }
          this.instance ? this.updateChart(option, true) : (this.chartOption = stringToFunc(option))
        }
      },
      immediate: true,
      deep: true
    },
    loading (isLoading) {
      if (isLoading) {
        this.instance.showLoading({
          text: '查询中',
          color: '#007CD2',
          textColor: '#007CD2',
          maskColor: 'rgba(255, 255, 255, 0)',
          zlevel: 9
        });
      } else {
        this.instance.hideLoading()
      }
    },
    'option.bmap.mapStyle': {
      handler: 'watchMapstyleUpdate'
    }
  },
  mounted () {
    this.initEchart()
    this.updateChart()
    window.addEventListener('resize', this.updateSize)
    this.$emit('update-instance', this)
  },
  beforeDestroy () {
    this.instance && this.instance.dispose()
    this.instance = null
    this.bmapInstance = null
    window.removeEventListener('resize', this.updateSize)
  }
}
</script>

<style lang="scss" scoped>
  .chart-base {
    width: 100%;
    height: 100%;
    /deep/ {
      .ec-extension-bmap{
        background-color: transparent!important;
      }
    }
  }
</style>
