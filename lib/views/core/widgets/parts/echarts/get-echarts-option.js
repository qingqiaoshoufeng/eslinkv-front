import jsonic from 'jsonic'
import configMerge from '../lib/config-merge'
import objectFilterParams from './object-filter-params'
import createSandbox from '../../../../../views/mixins/js-sandbox'

const functionProcessor = params => {
  let func = null
  const obj = params ? JSON.parse(params) : {}
  try {
    const { anonymous, methodBody } = obj
    if (!anonymous || !methodBody) return null
    const sandboxFunc = methodBody ? createSandbox(methodBody, { refused: ['document', 'navigator'] }) : null
    func = function () {
      // 匿名参数具名化
      const argumentsObject = {}
      anonymous.forEach((key, index) => {
        argumentsObject[key] = arguments[index]
      })
      return sandboxFunc(argumentsObject)
    }
  } catch (err) {
    console.warn('eCharts配置函数语法错误：', err.message)
    this.$Message.warning('eCharts配置函数语法错误：' + err.message)
  }
  return func
}
const markSymbolUnwrap = config => {
  const symbol = config.symbol
  if (!symbol) return
  if (!symbol.symbol) symbol.symbol = 'pin'
  const symbolIcon = symbol.symbol
  symbol && Object.assign(config, symbol)
  const data = config.data
  data && data.forEach(item => {
    const symbol = item.symbol
    if (!symbol) return
    if (!symbol.symbol) symbol.symbol = symbolIcon
    symbol && Object.assign(item, symbol)
  })
}

const handleBMapLoad = (option, bmap, config) => {
  const mapStyle = bmap.mapStyle
  option.bmap = bmap
  option.bmap.mapStyle = {
    styleJson: mapStyle ? jsonic(mapStyle) : undefined
  }
  delete option.bmap.ak
  delete option.bmap.enable
  if (config) {
    config.bmap.enable = false
    requestAnimationFrame(() => {
      config.bmap.enable = true
    })
  }
}

const getEchartsOption = function (config, data = {}) {
  if (!config) return
  const filteredConfig = objectFilterParams(config)
  const { colors = [], grid, series, font, axisCommonStyle, legend, radar, polar, visualMap, geo, parallel, tooltip, bmap } = filteredConfig || {}
  const { color: gTextColor, fontWeight: gTextWeight, fontSize: gTextSize, fontStyle: gTextStyle } = font || {}
  // 图表配置参数
  let option = {
    color: colors
  }

  let commonAxisLineStyle = {}
  let commonAxisTickStyle = {}
  let commonSplitLineStyle = {}
  let commonSplitAreaStyle = {}

  if (axisCommonStyle) {
    const { showLine, showTick, ...axisStyle } = axisCommonStyle.axisStyle || {}
    const { show: showSplitLine, ...splitLineStyle } = axisCommonStyle.splitLine || {}
    const { show: showSplitArea, ...splitAreaStyle } = axisCommonStyle.splitArea || {}
    commonAxisLineStyle = objectFilterParams({ show: showLine, lineStyle: axisStyle })
    commonAxisTickStyle = objectFilterParams({ show: showTick, lineStyle: axisStyle })
    commonSplitLineStyle = objectFilterParams({ show: showSplitLine, lineStyle: splitLineStyle })
    commonSplitAreaStyle = objectFilterParams({ show: showSplitArea, areaStyle: splitAreaStyle })
  }

  if (legend && legend.legends && legend.legends.length) {
    option.legend = legend.legends.map(item => {
      item.textStyle = font
      const padding = item.padding
      if (padding) {
        if (padding.indexOf('[') === 0) {
          try {
            item.padding = JSON.parse(padding)
          } catch (e) { }
        } else {
          item.padding = padding - 0
        }
      }
      if (item.formatterFuncEnable) {
        item.formatter = functionProcessor(item.formatterFunc)
      }
      return item
    })
  }

  if (grid) {
    const { grids, xAxis, yAxis } = grid

    if (grids) {
      option.grid = grids
    }

    if (xAxis && xAxis.length) {
      option.xAxis = []
      let fontStyle = { ...font }
      xAxis.forEach(item => {
        let dataIndex = item.dataIndex
        item.data = dataIndex ? data[dataIndex] || [] : []
        // 文本样式统一配置
        if (item.textColor) {
          fontStyle.color = item.textColor
        }
        // 轴线、刻度线、分割线/区统一配置
        const axisColor = item.axisColor
        if (axisColor) {
          commonAxisLineStyle = configMerge({
            lineStyle: {
              color: axisColor
            }
          }, commonAxisLineStyle)
          commonAxisTickStyle = configMerge({
            lineStyle: {
              color: axisColor
            }
          }, commonAxisTickStyle)
          commonSplitLineStyle = configMerge({
            lineStyle: {
              color: axisColor
            }
          }, commonSplitLineStyle)
          commonSplitAreaStyle = configMerge({
            areaStyle: {
              color: axisColor
            }
          }, commonSplitAreaStyle)
        }
        if (item.axisDetail) {
          let axisDetail = { ...item.axisDetail }
          axisDetail = configMerge(axisDetail, {
            axisLine: commonAxisLineStyle,
            axisTick: commonAxisTickStyle,
            splitLine: commonSplitLineStyle,
            splitArea: commonSplitAreaStyle
          })

          let nameText = axisDetail.nameText || {}
          delete axisDetail.nameText
          nameText = configMerge(nameText, {
            nameTextStyle: fontStyle
          })

          let axisLabel = axisDetail.axisLabel || {}
          if (axisLabel.formatterFuncEnable) {
            axisLabel.formatter = functionProcessor(axisLabel.formatterFunc)
          }
          axisDetail.axisLabel = configMerge(axisLabel, fontStyle)

          // 最大值 最小值 通过函数配置
          if (axisDetail.maxFuncEnable) {
            item.max = functionProcessor(axisDetail.maxFunc)
          }
          if (axisDetail.minFuncEnable) {
            item.min = functionProcessor(axisDetail.minFunc)
          }

          delete item.axisDetail
          option.xAxis.push({
            ...item,
            ...axisDetail,
            ...nameText
          })
        } else {
          option.xAxis.push({
            ...item,
            nameTextStyle: fontStyle,
            axisLabel: fontStyle,
            axisLine: commonAxisLineStyle,
            axisTick: commonAxisTickStyle,
            splitLine: commonSplitLineStyle,
            splitArea: commonSplitAreaStyle
          })
        }
      })
    }

    if (yAxis && yAxis.length) {
      option.yAxis = []
      let fontStyle = { ...font }
      yAxis.forEach(item => {
        let dataIndex = item.dataIndex
        if (dataIndex) {
          item.data = data ? data[dataIndex] || [] : []
        }
        if (item.textColor) {
          fontStyle.color = item.textColor
        }
        // 轴线、刻度线、分割线/区统一配置
        const axisColor = item.axisColor
        if (axisColor) {
          commonAxisLineStyle = configMerge({
            lineStyle: {
              color: axisColor
            }
          }, commonAxisLineStyle)
          commonAxisTickStyle = configMerge({
            lineStyle: {
              color: axisColor
            }
          }, commonAxisTickStyle)
          commonSplitLineStyle = configMerge({
            lineStyle: {
              color: axisColor
            }
          }, commonSplitLineStyle)
          commonSplitAreaStyle = configMerge({
            areaStyle: {
              color: axisColor
            }
          }, commonSplitAreaStyle)
        }
        if (item.axisDetail) {
          let axisDetail = { ...item.axisDetail }

          axisDetail = configMerge(axisDetail, {
            axisLine: commonAxisLineStyle,
            axisTick: commonAxisTickStyle,
            splitLine: commonSplitLineStyle,
            splitArea: commonSplitAreaStyle
          })

          let nameText = axisDetail.nameText || {}
          delete axisDetail.nameText
          nameText = configMerge(nameText, {
            nameTextStyle: fontStyle
          })

          let axisLabel = axisDetail.axisLabel || {}
          if (axisLabel.formatterFuncEnable) {
            axisLabel.formatter = functionProcessor(axisLabel.formatterFunc)
          }
          axisDetail.axisLabel = configMerge(axisLabel, fontStyle)

          // 最大值 最小值 通过函数配置
          if (axisDetail.maxFuncEnable) {
            item.max = functionProcessor(axisDetail.maxFunc)
          }
          if (axisDetail.minFuncEnable) {
            item.min = functionProcessor(axisDetail.minFunc)
          }

          delete item.axisDetail
          option.yAxis.push({
            ...item,
            ...axisDetail,
            ...nameText
          })
        } else {
          option.yAxis.push({
            ...item,
            nameTextStyle: fontStyle,
            axisLabel: fontStyle,
            axisLine: commonAxisLineStyle,
            axisTick: commonAxisTickStyle,
            splitLine: commonSplitLineStyle,
            splitArea: commonSplitAreaStyle
          })
        }
      })
    }
  }
  // 雷达图
  if (radar && radar.radars && radar.radars.length) {
    option.radar = radar.radars.map(item => {
      const { radius = [], radiusUnit = 0, center = [], centerUnit = 0 } = item
      if (radius.length === 1 || radius[0] === radius[1]) {
        item.radius = radius[0] + radiusUnit
      } else {
        item.radius = radius.map(v => {
          return v + radiusUnit
        })
      }
      item.center = center.map(v => {
        return v + centerUnit
      })
      delete item.radiusUnit
      delete item.centerUnit

      if (item.name) {
        const textStyle = item.name.nameTextStyle || {}
        item.name.textStyle = configMerge(textStyle, font)
        delete item.name.nameTextStyle
        // 文本格式化 函数配置
        if (item.name.formatterFuncEnable) {
          item.name.formatter = functionProcessor(item.name.formatterFunc)
        }
      } else {
        item.name = {
          textStyle: font
        }
      }

      if (item.axisLabel) {
        item.axisLabel = configMerge(item.axisLabel, font)
        if (item.axisLabel.formatterFuncEnable) {
          item.axisLabel.formatter = functionProcessor(item.axisLabel.formatterFunc)
        }
      } else {
        item.axisLabel = font
      }

      return item
    })
  }

  // 仪表盘
  if (polar) {
    const { polars, angleAxis, radiusAxis } = polar || {}
    option.polar = {}
    if (polars && Object.keys(polars).length) {
      const { radius = [], radiusUnit = 0, center = [], centerUnit = 0 } = polars

      if (radius.length === 1 || radius[0] && radius[1] && radius[0] === radius[1]) {
        option.polar.radius = radius[0] + radiusUnit
      } else {
        option.polar.radius = radius.map(v => {
          return v + radiusUnit
        })
      }
      option.polar.center = center.map(v => {
        return v + centerUnit
      })
    }
    if (angleAxis && angleAxis.length) {
      option.angleAxis = angleAxis.map(item => {
        const dataIndex = item.dataIndex
        item.data = data[dataIndex] || []
        if (item.axisLabel && item.axisLabel.formatterFuncEnable) {
          item.axisLabel.formatter = functionProcessor(item.axisLabel.formatterFunc)
        }
        // 轴线、刻度线、分割线/区统一配置
        item = configMerge(item, {
          axisLine: commonAxisLineStyle,
          axisTick: commonAxisTickStyle,
          splitLine: commonSplitLineStyle,
          splitArea: commonSplitAreaStyle
        })
        return item
      })
    } else {
      option.angleAxis = [
        {
          axisLine: commonAxisLineStyle,
          axisTick: commonAxisTickStyle,
          splitLine: commonSplitLineStyle,
          splitArea: commonSplitAreaStyle
        }
      ]
    }
    if (radiusAxis && radiusAxis.length) {
      option.radiusAxis = radiusAxis.map(item => {
        const dataIndex = item.dataIndex
        item.data = data[dataIndex] || []
        if (item.axisLabel && item.axisLabel.formatterFuncEnable) {
          item.axisLabel.formatter = functionProcessor(item.axisLabel.formatterFunc)
        }
        // 轴线、刻度线、分割线/区统一配置
        item = configMerge(item, {
          axisLine: commonAxisLineStyle,
          axisTick: commonAxisTickStyle,
          splitLine: commonSplitLineStyle,
          splitArea: commonSplitAreaStyle
        })
        return item
      })
    } else {
      option.radiusAxis = [
        {
          axisLine: commonAxisLineStyle,
          axisTick: commonAxisTickStyle,
          splitLine: commonSplitLineStyle,
          splitArea: commonSplitAreaStyle
        }
      ]
    }
  }

  // 视觉映射组件
  if (visualMap && visualMap.enable && visualMap.visualMaps && visualMap.visualMaps.length) {
    option.visualMap = visualMap.visualMaps.map(item => {
      const { inRange, textStyle, categories } = item
      const color = colors.length ? colors.splice(0, 2) : []
      if (!inRange) {
        item.inRange = {
          color: color
        }
      } else if (!inRange.color || !inRange.color.length) {
        item.inRange.color = color
      }

      if (textStyle) {
        item.textStyle = configMerge(textStyle, font)
      } else {
        item.textStyle = font
      }

      if (categories) {
        item.categories = categories.split(',')
      }
      return item
    })
  }

  if (geo && geo.enable && geo.geos && geo.geos.length) {
    option.geo = geo.geos.map(item => {
      const { roam, layoutCenter, layoutCenterUnit, regions, label, nameMap, emphasis } = item
      if (roam) {
        item.roam = roam === 'all' ? true : roam
      }
      if (layoutCenter && layoutCenter.length) {
        item.layoutCenter = layoutCenter.map(l => l + layoutCenterUnit)
        delete item.layoutCenterUnit
      }
      if (regions && regions.length) {
        item.regions = regions.map(r => {
          const label = r.label
          if (label) {
            if (label.formatterFuncEnable) {
              label.formatter = functionProcessor(label.formatterFunc)
            }
            r.label = configMerge(label, {
              color: gTextColor,
              fontWeight: gTextWeight,
              fontSize: gTextSize,
              fontStyle: gTextStyle
            })
          } else {
            r.label = {
              color: gTextColor,
              fontWeight: gTextWeight,
              fontSize: gTextSize,
              fontStyle: gTextStyle
            }
          }
          return r
        })
      }

      if (label) {
        if (label.formatterFuncEnable) {
          label.formatter = functionProcessor(label.formatterFunc)
        }
        item.label = configMerge(label, {
          color: gTextColor,
          fontWeight: gTextWeight,
          fontSize: gTextSize,
          fontStyle: gTextStyle
        })
      } else {
        item.label = {
          color: gTextColor,
          fontWeight: gTextWeight,
          fontSize: gTextSize,
          fontStyle: gTextStyle
        }
      }
      // 图形高亮
      if (emphasis && emphasis.label) {
        const { formatterFuncEnable, formatterFunc } = emphasis.label
        if (formatterFuncEnable) {
          item.emphasis.label.formatter = functionProcessor(formatterFunc)
        }
      }
      if (nameMap) {
        item.nameMap = jsonic(nameMap)
      }
      return item
    })
  }

  if (bmap && bmap.enable && bmap.ak) {
    // 加载 bmap.js 及 地图 api，需要 ak
    if (!window.BMap && !document.getElementById('bmap-dependencies')) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.id = 'bmap-dependencies'
      script.src = `https://api.map.baidu.com/getscript?v=3.0&ak=${bmap.ak}`
      script.onload = () => {
        if (!window.bmap && !document.getElementById('bmap-extension')) {
          const script = document.createElement('script')
          script.type = 'text/javascript'
          script.id = 'bmap-extension'
          script.src = `https://cdn.jsdelivr.net/npm/echarts/dist/extension/bmap.js`
          script.onload = () => {
            handleBMapLoad(option, bmap, config)
          }
          document.body.appendChild(script)
        } else {
          handleBMapLoad(option, bmap, config)
        }
      }
      document.body.appendChild(script)
    } else if (window.BMap && window.bmap) {
      handleBMapLoad(option, bmap)
    }
  }

  // 平行坐标系
  if (parallel) {
    const { parallels, parallelAxis } = parallel
    if (parallels && parallels.length) {
      option.parallel = parallels.map(item => {
        const parallelAxisDefault = item.parallelAxisDefault
        if (parallelAxisDefault) {
          item.parallelAxisDefault = configMerge(parallelAxisDefault, {
            nameTextStyle: font,
            axisLabel: font,
            axisLine: commonAxisLineStyle,
            axisTick: commonAxisTickStyle
          })
        } else {
          item.parallelAxisDefault = {
            nameTextStyle: font,
            axisLabel: font,
            axisLine: commonAxisLineStyle,
            axisTick: commonAxisTickStyle
          }
        }
        return item
      })
    }
    if (parallelAxis && parallelAxis.length) {
      option.parallelAxis = parallelAxis.map(item => {
        const { dataIndex } = item
        if (dataIndex) {
          item.data = data[dataIndex]
        }
        return item
      })
    }
  }

  // tooltip
  if (tooltip) {
    if (tooltip.formatterFuncEnable) {
      tooltip.formatter = functionProcessor(tooltip.formatterFunc)
    }
    option.tooltip = tooltip
  }
  if (series && series.length) {
    option.series = []
    series.forEach(item => {
      const chartType = item.type
      if (!chartType) return
      const itemConfig = item[chartType]
      Object.assign(item, itemConfig)
      delete item[chartType]

      let dataIndex = item.dataIndex
      item.data = dataIndex ? data[dataIndex] : data
      let label = item.label || {}
      if (label.formatterFuncEnable) {
        label.formatter = functionProcessor(label.formatterFunc)
      }
      item.label = configMerge(label, {
        color: gTextColor,
        fontSize: gTextSize,
        fontStyle: gTextStyle,
        fontWeight: gTextWeight
      })

      if (chartType === 'line') {
        const areaStyle = item.areaStyle
        if (areaStyle && !Object.keys(areaStyle).length) delete item.areaStyle
      }

      // 折线图、散点图
      let symbol = item.symbol
      if (symbol && typeof symbol === 'object') {
        delete item.symbol
        Object.assign(item, symbol)
        if (item.symbolSize && item.symbolSize.length === 1) {
          item.symbolSize = item.symbolSize[0]
        }
        const symbolByFunc = functionProcessor(symbol.symbolFunc)
        if (item.symbolFuncEnable && symbolByFunc) {
          item.symbol = symbolByFunc
        }
        if (item.symbolSizeFuncEnable) {
          item.symbolSize = functionProcessor(symbol.symbolSizeFunc)
        }
        if (item.symbolRotateFuncEnable) {
          item.symbolRotate = functionProcessor(symbol.symbolRotateFunc)
        }
      }

      // 标注图标配置退层
      const { markPoint, markLine, markArea } = item;
      [markPoint, markLine, markArea].forEach(config => config && markSymbolUnwrap(config))
      if (markPoint) {
        if (markPoint.label) {
          const { formatterFuncEnable, formatterFunc } = markPoint.label
          if (formatterFuncEnable) {
            markPoint.label.formatter = functionProcessor(formatterFunc)
          }
        }
        if (markPoint.symbolSize && markPoint.symbolSize.length === 1) {
          markPoint.symbolSize = markPoint.symbolSize[0]
        }
        const symbolByFunc = functionProcessor(markPoint.symbolFunc)
        if (markPoint.symbolFuncEnable && symbolByFunc) {
          markPoint.symbol = symbolByFunc
        }
        if (markPoint.symbolSizeFuncEnable) {
          markPoint.symbolSize = functionProcessor(markPoint.symbolSizeFunc)
        }
        if (markPoint.symbolRotateFuncEnable) {
          markPoint.symbolRotate = functionProcessor(markPoint.symbolRotateFunc)
        }
      }
      // 饼图
      if (chartType === 'pie') {
        const { radius = [], radiusUnit = 0, center = [], centerUnit = 0 } = item
        if (radius.length) {
          if (radius.length === 1 || radius[0] && radius[1] && radius[0] === radius[1]) {
            item.radius = radius[0] + radiusUnit
          } else {
            item.radius = radius.map(v => {
              return v + radiusUnit
            })
          }
        }
        if (center.length) {
          item.center = center.map(v => {
            return v + centerUnit
          })
        }
        delete item.radiusUnit
        delete item.centerUnit
      }

      // 仪表盘
      if (chartType === 'gauge') {
        const { radius, radiusUnit, title, detail, axisLabel } = item
        if (radius) {
          item.radius = radius + radiusUnit
          delete item.radiusUnit
        }

        if (title) {
          const { offsetCenter, offsetCenterUnit } = title
          item.title = configMerge(title, font)
          if (offsetCenter && offsetCenter.length) {
            if (offsetCenter.length === 1 || offsetCenter[0] && offsetCenter[1] && offsetCenter[0] === offsetCenter[1]) {
              item.title.offsetCenter = offsetCenter[0] + offsetCenterUnit
            } else {
              item.title.offsetCenter = offsetCenter.map(v => {
                return v + offsetCenterUnit
              })
            }
          }
        } else {
          item.title = font
        }

        if (detail) {
          const { offsetCenter, offsetCenterUnit } = detail
          item.detail = configMerge(detail, font)
          if (offsetCenter && offsetCenter.length) {
            if (offsetCenter.length === 1 || offsetCenter[0] && offsetCenter[1] && offsetCenter[0] === offsetCenter[1]) {
              item.detail.offsetCenter = offsetCenter[0] + offsetCenterUnit
            } else {
              item.detail.offsetCenter = offsetCenter.map(v => {
                return v + offsetCenterUnit
              })
            }
          }
        } else {
          item.detail = font
        }

        if (axisLabel) {
          item.axisLabel = configMerge(axisLabel, font)
        } else {
          item.axisLabel = font
        }
      }

      // 旭日图
      if (chartType === 'sunburst') {
        const { radius = [], radiusUnit = 0, center = [], centerUnit = 0 } = item
        if (radius.length) {
          if (radius.length === 1 || radius[0] && radius[1] && radius[0] === radius[1]) {
            item.radius = radius[0] + radiusUnit
          } else {
            item.radius = radius.map(v => {
              return v + radiusUnit
            })
          }
        }
        if (center.length) {
          item.center = center.map(v => {
            return v + centerUnit
          })
        }
        delete item.radiusUnit
        delete item.centerUnit

        if (item.sortFuncEnable) {
          item.sort = functionProcessor(item.sortFunc)
        }
        if (item.highlight && item.highlight.label) {
          const { formatterFuncEnable, formatterFunc } = item.highlight.label
          if (formatterFuncEnable) {
            item.highlight.label.formatter = functionProcessor(formatterFunc)
          }
        }
        if (item.downplay && item.downplay.label) {
          const { formatterFuncEnable, formatterFunc } = item.downplay.label
          if (formatterFuncEnable) {
            item.downplay.label.formatter = functionProcessor(formatterFunc)
          }
        }
        if (item.levels && item.levels.length) {
          item.levels = item.levels.map(level => {
            if (level.highlight && level.highlight.label) {
              const { formatterFuncEnable, formatterFunc } = level.highlight.label
              if (formatterFuncEnable) {
                level.highlight.label.formatter = functionProcessor(formatterFunc)
              }
            }
            if (level.downplay && level.downplay.label) {
              const { formatterFuncEnable, formatterFunc } = level.downplay.label
              if (formatterFuncEnable) {
                level.downplay.label.formatter = functionProcessor(formatterFunc)
              }
            }
            return level
          })
        }
      }

      if (item.coordinateSystem === 'bmap' && bmap) {
        item.geoIndex = undefined
      }

      // 路径图
      if (chartType === 'lines') {
        // option.bmap = geo.geos
        // item.coordinateSystem = 'bmap'
      }

      // 漏斗图
      if (chartType === 'funnel') {
        if (item.sortFuncEnable) {
          item.sort = functionProcessor(item.sortFunc)
        }
      }

      if (['heatmap', 'scatter', 'effectScatter'].includes(chartType)) {
        if (item.coordinateSystem === 'bmap' && !option.bmap) {
          return
        }
      }

      option.series.push(item)
    })
  }
  return option
}
export default getEchartsOption
