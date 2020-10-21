<script>
import jsonic from 'jsonic'
import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import bmScale from 'vue-baidu-map/components/controls/Scale.vue'
import bmNavigation from 'vue-baidu-map/components/controls/Navigation.vue'
import bmOverviewMap from 'vue-baidu-map/components/controls/OverviewMap.vue'
import bmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import bmPointCollection from 'vue-baidu-map/components/overlays/PointCollection.vue'
import bmPolyline from 'vue-baidu-map/components/overlays/Polyline.vue'
import bmPolygon from 'vue-baidu-map/components/overlays/Polygon.vue'
import bmCircle from 'vue-baidu-map/components/overlays/Circle.vue'
import bmLabel from 'vue-baidu-map/components/overlays/Label.vue'
import bmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
import { getInput, getSelect, getInputNumber, getBooleanInput, getColor, getSlider, getBackground } from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    baseMap: {
      groupLabel: '地图基础配置',
      groupType: 'Collapse',
      groupActive: true,
      fields: {
        mapType: getSelect('mapType', '地图类型', ['普通街道视图:BMAP_NORMAL_MAP', '透视图像视图:BMAP_PERSPECTIVE_MAP', '卫星视图:BMAP_SATELLITE_MAP', '混合视图:BMAP_HYBRID_MAP']),
        position: getInput('position', '中心点', { placeholder: '地区名称/经纬度' }),
        maxZoom: getInputNumber('maxZoom', '最小缩放级别'),
        minZoom: getInputNumber('minZoom', '最大缩放级别'),
        zoom: getInputNumber('zoom', '缩放等级'),
        mapStyleString: getInput('mapStyleString', '自定义主题', { placeholder: 'json格试片段', innerType: 'textarea', rows: 5 })
      },
      mouseEvent: {
        groupLabel: '鼠标事件',
        groupType: 'Collapse',
        fields: {
          mapClick: getBooleanInput('mapClick', '允许点击'),
          dragging: getBooleanInput('dragging', '允许拖拽'),
          scrollWheelZoom: getBooleanInput('scrollWheelZoom', '鼠标滚轮缩放'),
          doubleClickZoom: getBooleanInput('doubleClickZoom', '双击放大')
        }
      }
    },
    bmScale: {
      groupLabel: '比例尺控件',
      groupType: 'Collapse',
      fields: {
        show: getBooleanInput('show', '显示比例尺'),
        anchor: getSelect('anchor', '停靠位置', ['左上:BMAP_ANCHOR_TOP_LEFT', '右上:BMAP_ANCHOR_TOP_RIGHT', '左下:BMAP_ANCHOR_BOTTOM_LEFT', '右下:BMAP_ANCHOR_BOTTOM_RIGHT'])
      }
    },
    bmNavigation: {
      groupLabel: '缩放控件',
      groupType: 'Collapse',
      fields: {
        show: getBooleanInput('show', '显示缩放控件'),
        anchor: getSelect('anchor', '停靠位置', ['左上:BMAP_ANCHOR_TOP_LEFT', '右上:BMAP_ANCHOR_TOP_RIGHT', '左下:BMAP_ANCHOR_BOTTOM_LEFT', '右下:BMAP_ANCHOR_BOTTOM_RIGHT']),
        showZoomInfo: getBooleanInput('showZoomInfo', '显示级别提示信息')
      }
    },
    bmOverviewMap: {
      groupLabel: '缩略图控件',
      groupType: 'Collapse',
      fields: {
        show: getBooleanInput('show', '显示缩略图控件'),
        anchor: getSelect('anchor', '停靠位置', ['左上:BMAP_ANCHOR_TOP_LEFT', '右上:BMAP_ANCHOR_TOP_RIGHT', '左下:BMAP_ANCHOR_BOTTOM_LEFT', '右下:BMAP_ANCHOR_BOTTOM_RIGHT']),
        isOpen: getBooleanInput('isOpen', '开合状态')
      }
    },
    cover: {
      groupLabel: '覆盖物',
      groupType: 'Collapse',
      bmMarker: {
        groupLabel: '点（标注）配置',
        groupType: 'Collapse',
        fields: {
          show: getBooleanInput('show', '显示点'),
          dragging: getBooleanInput('dragging', '启用拖拽'),
          clicking: getBooleanInput('clicking', '响应鼠标事件'),
          raiseOnDrag: getBooleanInput('raiseOnDrag', '开启拖拽效果'),
          rotation: getInputNumber('rotation', '旋转角度'),
          title: getInput('title', '标题内容'),
          'width.height': [
            getInputNumber('width', '位置偏移', { placeholder: '水平方向' }),
            getInputNumber('height', '位置偏移', { placeholder: '垂直方向' }),
          ]
        },
        icon: {
          groupLabel: '图标配置',
          groupType: 'Collapse',
          fields: {
            url: getBackground('url', '选择图片', { params: { type: 0 }, mountToBody: true }),
            'width.height': [
              getInputNumber('width', '图标尺寸', { placeholder: '宽度' }),
              getInputNumber('height', '图标尺寸', { placeholder: '高度' }),
            ]
          }
        }
      },
      bmPointCollection: {
        groupLabel: '海量点配置',
        groupType: 'Collapse',
        fields: {
          show: getBooleanInput('show', '显示海量点'),
          shape: getSelect('shape', '坐标点形状', ['圆形:BMAP_POINT_SHAPE_CIRCLE', '星形:BMAP_POINT_SHAPE_STAR', '方形:BMAP_POINT_SHAPE_SQUARE', '菱形:BMAP_POINT_SHAPE_RHOMBUS', '水滴状:BMAP_POINT_SHAPE_WATERDROP']),
          size: getSelect('size', '坐标点尺寸', ['2px*2px:BMAP_POINT_SIZE_TINY', '4px*4px:BMAP_POINT_SIZE_SMALLER', '8px*8px:BMAP_POINT_SIZE_SMALL', '10px*10px:BMAP_POINT_SIZE_NORMAL', '16px*16px:BMAP_POINT_SIZE_BIG', '20px*20px:BMAP_POINT_SIZE_BIGGER', '30px*30px:BMAP_POINT_SIZE_HUGE']),
          color: getColor('color', '坐标点颜色')
        }
      },
      bmPolyline: {
        groupLabel: '折线配置',
        groupType: 'Collapse',
        fields: {
          show: getBooleanInput('show', '显示折线'),
          strokeColor: getColor('strokeColor', '线颜色'),
          strokeWeight: getInputNumber('strokeWeight', '线宽'),
          strokeOpacity: getSlider('strokeOpacity', '透明度', 0, 1, { step: 0.01 }),
          strokeStyle: getSelect('strokeStyle', '线样式', ['solid', 'dashed']),
          editing: getBooleanInput('editing', '启用线编辑'),
          clicking: getBooleanInput('clicking', '响应鼠标事件')
        }
      },
      bmPolygon: {
        groupLabel: '多边形配置',
        groupType: 'Collapse',
        fields: {
          show: getBooleanInput('show', '显示多边形'),
          strokeColor: getColor('strokeColor', '线颜色'),
          strokeWeight: getInputNumber('strokeWeight', '线宽'),
          strokeOpacity: getSlider('strokeOpacity', '线透明度', 0, 1, { step: 0.01 }),
          strokeStyle: getSelect('strokeStyle', '线样式', ['solid', 'dashed']),
          fillColor: getColor('fillColor', '填充颜色'),
          fillOpacity: getSlider('fillOpacity', '填充透明度', 0, 1, { step: 0.01 }),
          editing: getBooleanInput('editing', '启用线编辑'),
          clicking: getBooleanInput('clicking', '响应鼠标事件')
        }
      },
      bmCircle: {
        groupLabel: '圆形配置',
        groupType: 'Collapse',
        fields: {
          show: getBooleanInput('show', '显示圆形'),
          point: getInput('point', '中心坐标'),
          radius: getInputNumber('radius', '半径'),
          strokeColor: getColor('strokeColor', '线颜色'),
          strokeWeight: getInputNumber('strokeWeight', '线宽'),
          strokeOpacity: getSlider('strokeOpacity', '线透明度', 0, 1, { step: 0.01 }),
          strokeStyle: getSelect('strokeStyle', '线样式', ['solid', 'dashed']),
          fillColor: getColor('fillColor', '填充颜色'),
          fillOpacity: getSlider('fillOpacity', '填充透明度', 0, 1, { step: 0.01 }),
          editing: getBooleanInput('editing', '启用线编辑'),
          clicking: getBooleanInput('clicking', '响应鼠标事件')
        }
      },
      bmLabel: {
        groupLabel: '标签配置',
        groupType: 'Collapse',
        fields: {
          show: getBooleanInput('show', '显示标签'),
          content: getInput('content', '文本内容'),
          title: getInput('title', '提示内容'),
          point: getInput('point', '地理位置')
        }
      },
      bmInfoWindow: {
        groupLabel: '信息窗体配置',
        groupType: 'Collapse',
        fields: {
          show: getBooleanInput('show', '开启信息窗体'),
          width: getInputNumber('width', '宽度'),
          height: getInputNumber('height', '高度'),
          title: getInput('title', '窗体标题'),
          closeOnClick: getBooleanInput('closeOnClick', '点击地图关闭窗体'),
          content: getInput('content', '窗体内容')
        }
      }
    }
  }
})

const localConfigValue = Object.freeze({
  layout: {
    font: {
      color: '#3de7c9',
      size: 21,
      lineHeight: 3,
      whiteSpace: 'nowrap'
    }
  },
  config: {
    baseMap: {
      position: '北京',
      maxZoom: null,
      minZoom: null,
      zoom: 12,
      mapType: 'BMAP_NORMAL_MAP',
      mapStyleString: '',
      mouseEvent: {
        mapClick: true,
        dragging: true,
        scrollWheelZoom: false,
        doubleClickZoom: false
      }
    },
    bmScale: {
      show: false,
      anchor: 'BMAP_ANCHOR_TOP_RIGHT'
    },
    bmNavigation: {
      show: false,
      anchor: 'BMAP_ANCHOR_BOTTOM_RIGHT',
      showZoomInfo: true
    },
    bmOverviewMap: {
      show: false,
      anchor: 'BMAP_ANCHOR_BOTTOM_RIGHT',
      isOpen: true
    },
    cover: {
      bmMarker: {
        show: false,
        dragging: true,
        clicking: true,
        raiseOnDrag: false,
        rotation: 0,
        title: '',
        width: 0,
        height: 0,
        icon: {
          url: '',
          width: 20,
          height: 20
        }
      },
      bmPointCollection: {
        show: false,
        shape: 'BMAP_POINT_SHAPE_CIRCLE',
        size: 'BMAP_POINT_SIZE_NORMAL',
        color: '#fa937e'
      },
      bmPolyline: {
        show: false,
        strokeColor: '#3C99FA',
        strokeWeight: 2,
        strokeOpacity: 1,
        strokeStyle: 'solid',
        editing: false,
        clicking: true
      },
      bmPolygon: {
        show: false,
        strokeColor: '#3C99FA',
        strokeWeight: 2,
        strokeOpacity: 1,
        strokeStyle: 'solid',
        fillColor: '#3C99FA',
        fillOpacity: 0.5,
        editing: false,
        clicking: false
      },
      bmCircle: {
        show: false,
        point: '116.404, 39.915',
        radius: 2000,
        strokeColor: '#3C99FA',
        strokeWeight: 2,
        strokeOpacity: 1,
        strokeStyle: 'solid',
        fillColor: '#3C99FA',
        fillOpacity: 0.5,
        editing: false,
        clicking: false
      },
      bmLabel: {
        show: false,
        content: '文本内容',
        title: '提示内容',
        point: '116.404,39.915'
      },
      bmInfoWindow: {
        show: false,
        width: 200,
        height: 100,
        title: '窗体标题',
        closeOnClick: true,
        content: '窗体内容'
      }
    }
  },
  api: {
    data: JSON.stringify({
      markers: [
        { lng: 116.404, lat: 39.915 }
      ],
      points: [
        { lng: 116.404, lat: 39.915 },
        { lng: 116.151, lat: 39.943 },
        { lng: 116.103, lat: 39.980 },
        { lng: 116.549, lat: 39.916 }
      ],
      path: [
        { lng: 116.404, lat: 39.915 },
        { lng: 116.151, lat: 39.943 },
        { lng: 116.103, lat: 39.980 },
        { lng: 116.549, lat: 39.916 }
      ]
    }, null, 2)
  }
})

// 用于筛选预置配置项
const configParseMap = Object.freeze({
  widget: true,
  layout: {
    size: {
      '$width.height.unit': true
    },
    font: true,
    position: true,
    border: true,
    padding: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    baseMap: true,
    bmScale: true,
    bmNavigation: true,
    bmOverviewMap: true,
    cover: true
  },
  api: true,
  animation: true
})

export default {
  name: 'widget-baidu-map',
  label: '百度地图',
  mixins: [widgetMixin],
  components: {
    BaiduMap,
    bmScale,
    bmNavigation,
    bmOverviewMap,
    bmMarker,
    bmPointCollection,
    bmPolyline,
    bmPolygon,
    bmCircle,
    bmLabel,
    bmInfoWindow
  },
  data () {
    return {
      BMap: null,
      map: null
    }
  },
  render: function (createElement) {
    const { layout } = this.config
    const config = this.mergedConfig || {}
    const { baseMap, bmScale, bmNavigation, bmOverviewMap } = config
    const { bmMarker: markerConfig } = config.cover || {}
    const { markers, points, path } = this.data || {}
    // 控件、覆盖物
    const bmConfig = { bmScale, bmNavigation, bmOverviewMap, ...config.cover }
    let bmCom = []
    for (var key in bmConfig) {
      if (bmConfig[key] && bmConfig[key].show && key !== 'bmMarker') {
        let props = bmConfig[key]
        if (key === 'bmPointCollection') {
          props.points = points
        }
        if (key === 'bmPolyline' || key === 'bmPolygon') {
          props.path = path
        }
        bmCom.push({
          name: key,
          props
        })
      }
    }
    const bmComponents = bmCom.map((item) => {
      return createElement(
        item.name,
        {
          props: item.props
        }
      )
    })
    // marker 标注
    let markerCom = []
    if (markerConfig && markerConfig.show && Array.isArray(markers)) {
      markerCom = markers.map((item) => {
        return createElement(
          'bm-marker',
          {
            props: {
              ...markerConfig,
              position: item
            }
          }
        )
      })
    }

    // 地图基础配置
    let baseMapProps = null
    if (baseMap) {
      const mouseEvent = baseMap.mouseEvent
      baseMapProps = {
        ...baseMap,
        ...mouseEvent
      }
    }

    return createElement(
      'div',
      {
        style: styleParser(layout, this.time),
        'class': ['widget-baidu-map', 'widget-part'],
        ref: 'widget'
      },
      [
        createElement(
          'baidu-map',
          {
            props: baseMapProps || {
              center: '北京',
              maxZoom: null,
              minZoom: null,
              zoom: 12,
              mapClick: true,
              mapType: 'BMAP_NORMAL_MAP',
              dragging: true,
              scrollWheelZoom: false,
              doubleClickZoom: false
            },
            attrs: {
              ak: '9jbZQGDwZAR2GVGbXb5Dp4WT5lPz5F69'
            },
            style: {
              pointerEvents: this.kanboard.isInEditor ? 'none' : 'unset',
              width: '100%',
              height: '100%'
            },
            on: {
              ready: ({ BMap, map }) => {
                this.BMap = BMap
                this.map = map
              }
            },
            ref: 'baiduMap'
          },
          [
            ...bmComponents,
            ...markerCom
          ]
        )
      ]
    )
  },
  methods: {
    bmMarkerFormatter (object) {
      const marker = JSON.parse(JSON.stringify(object))
      const { width, height, icon } = marker
      const offset = {
        width,
        height
      }
      if (icon && icon.url) {
        marker.icon = {
          url: icon.url,
          size: {
            width: icon.width,
            height: icon.height
          }
        }
      } else {
        delete marker.icon
      }
      delete marker.height
      delete marker.width
      return {
        ...marker,
        offset
      }
    },
    setViewport (value, key) {
      const zoom = this.config.config.baseMap.zoom || 12
      if (value.show) {
        const data = this.data[key]
        const points = data.map(item => {
          return new this.BMap.Point(item.lng, item.lat)
        })
        this.map.setViewport(points)
        this.map.setZoom(zoom)
      }
    },
    init () { }
  },
  computed: {
    mergedConfig () {
      if (!this.config.config) return
      const option = this.config.config
      option.cover.bmMarker = this.bmMarkerFormatter(option.cover.bmMarker)
      // 地图中心
      const pointMap = option.baseMap.position
      if (typeof pointMap === 'string' && pointMap && pointMap.indexOf(',') > -1) {
        const pointArr = pointMap.split(',')
        option.baseMap.center = {
          lng: pointArr[0] - 0,
          lat: pointArr[1] - 0
        }
      } else {
        option.baseMap.center = pointMap
      }
      if (option.baseMap.mapStyleString) option.baseMap.mapStyle = jsonic(option.baseMap.mapStyleString)

      // 覆盖物 圆形
      const pointCircle = option.cover.bmCircle.point
      if (typeof pointCircle === 'string' && pointCircle && pointCircle.indexOf(',') > -1) {
        const pointArr = pointCircle.split(',')
        option.cover.bmCircle.center = {
          lng: pointArr[0] - 0,
          lat: pointArr[1] - 0
        }
      }
      // lable 标签
      const pointLabel = option.cover.bmLabel.point
      if (typeof pointLabel === 'string' && pointLabel && pointLabel.indexOf(',') > -1) {
        const pointArr = pointLabel.split(',')
        option.cover.bmLabel.position = {
          lng: pointArr[0] - 0,
          lat: pointArr[1] - 0
        }
      }
      return option
    }
  },
  watch: {
    'config.config.cover.bmMarker': {
      handler (value) {
        value && this.setViewport(value, 'markers')
      },
      deep: true
    },
    'config.config.cover.bmPointCollection': {
      handler (value) {
        value && this.setViewport(value, 'points')
      },
      deep: true
    },
    'config.config.cover.bmPolyline': {
      handler (value) {
        value && this.setViewport(value, 'path')
      },
      deep: true
    }
  },
  created () {
    this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  }
}
</script>
<style lang="scss" scoped>
  /deep/ {
    .BMap_cpyCtrl,
    .anchorBL {
      opacity: 0;
    }
  }
</style>
