import copy from 'fast-copy'
import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getInput, getInputNumber, getBooleanInput, getColor, getRadio } from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    fields: {
      bgImgSrc: getInput('bgImgSrc', '背景图片'),
      bgImgUrl: getInput('bgImgUrl', '背景图片'),
      centerPoint: getInput('centerPoint', '中心坐标'),
      orbitColor: getColor('orbitColor', '轨迹颜色'),
      'lineWidth.flylineRadius.flylineColor': [
        getInputNumber('lineWidth', '飞线', { placeholder: '宽度' }),
        getInputNumber('flylineRadius', '飞线', { placeholder: '显示半径' }),
        getColor('flylineColor', '飞线', { placeholder: '颜色' })
      ],
      'k.curvature': [
        getInputNumber('k', '飞线', { placeholder: '收束程度', max: 1, min: -1, step: 0.1 }),
        getInputNumber('curvature', '飞线', { placeholder: '曲率', max: 10, min: 1 })
      ],
      duration: getInput('duration', '飞线动画时长', { placeholder: '大小' }),
      relative: getBooleanInput('relative', '相对坐标')
    },
    halo: {
      groupLabel: '光晕配置',
      groupType: 'Collapse',
      fields: {
        show: getBooleanInput('show', '显示光晕'),
        duration: getInput('duration', '动画时长'),
        color: getColor('color', '光晕颜色'),
        radius: getInputNumber('radius', '最大半径', { placeholder: '大小' })
      }
    },
    text: {
      groupLabel: '文本配置',
      groupType: 'Collapse',
      fields: {
        show: getBooleanInput('show', '显示文本'),
        offset: getInput('offset', '位置偏移'),
        color: getColor('color', '文本颜色'),
        fontSize: getInputNumber('fontSize', '文字大小', { placeholder: '大小' })
      }
    },
    icon: {
      groupLabel: '图标配置',
      groupType: 'Collapse',
      fields: {
        show: getBooleanInput('show', '显示图标'),
        src: getInput('src', '路径'),
        width: getInputNumber('width', '宽度', { placeholder: '大小' }),
        height: getInputNumber('height', '高度', { placeholder: '大小' })
      }
    },
    line: {
      groupLabel: '飞线配置',
      groupType: 'Collapse',
      fields: {
        width: getInputNumber('width', '飞线宽度'),
        color: getColor('color', '飞线颜色'),
        orbitColor: getColor('orbitColor', '轨迹颜色'),
        duration: getInput('duration', '动画时长'),
        radius: getInputNumber('radius', '飞线半径')
      }
    },
    centerPointImg: {
      groupLabel: '中心点图片配置',
      groupType: 'Collapse',
      fields: {
        url: getInput('url', '路径'),
        width: getInputNumber('width', '宽度', { placeholder: '大小' }),
        height: getInputNumber('height', '高度', { placeholder: '大小' })
      }
    },
    pointsImg: {
      groupLabel: '飞线点图片配置',
      groupType: 'Collapse',
      fields: {
        url: getInput('url', '路径'),
        width: getInputNumber('width', '宽度', { placeholder: '大小' }),
        height: getInputNumber('height', '高度', { placeholder: '大小' })
      }
    }
  }
})

const localConfigValueEnhanced = Object.freeze({
  layout: {
    size: {
      width: 500,
      height: 400
    },
    background: {
      url: ''
    }
  },
  config: {
    bgImgSrc: 'static/images/widgets/fly-line/map.jpg',
    k: -0.5,
    curvature: 5,
    relative: true,
    halo: {
      show: false,
      duration: '30,30',
      color: '#fb7293',
      radius: 120
    },
    text: {
      show: true,
      offset: '0,15',
      color: '#ffdb5c',
      fontSize: 12
    },
    icon: {
      show: true,
      src: 'static/images/widgets/fly-line/mapPoint.png',
      width: 15,
      height: 15
    },
    line: {
      width: 1,
      color: '#ffde93',
      orbitColor: 'rgba(103, 224, 227, .2)',
      duration: '20,30',
      radius: 100
    }
  },
  api: {
    data: JSON.stringify({
      points: [
        {
          name: '郑州',
          coordinate: [0.48, 0.35]
        },
        {
          name: '新乡',
          coordinate: [0.52, 0.23]
        },
        {
          name: '焦作',
          coordinate: [0.43, 0.29]
        },
        {
          name: '开封',
          coordinate: [0.59, 0.35]
        },
        {
          name: '许昌',
          coordinate: [0.53, 0.47]
        },
        {
          name: '平顶山',
          coordinate: [0.45, 0.54]
        },
        {
          name: '洛阳',
          coordinate: [0.36, 0.38]
        },
        {
          name: '周口',
          coordinate: [0.62, 0.55]
        },
        {
          name: '漯河',
          coordinate: [0.56, 0.56]
        },
        {
          name: '南阳',
          coordinate: [0.37, 0.66]
        },
        {
          name: '信阳',
          coordinate: [0.55, 0.81]
        },
        {
          name: '驻马店',
          coordinate: [0.55, 0.67]
        },
        {
          name: '济源',
          coordinate: [0.37, 0.29]
        },
        {
          name: '三门峡',
          coordinate: [0.20, 0.36]
        },
        {
          name: '商丘',
          coordinate: [0.76, 0.41]
        },
        {
          name: '鹤壁',
          coordinate: [0.59, 0.18]
        },
        {
          name: '濮阳',
          coordinate: [0.68, 0.17]
        },
        {
          name: '安阳',
          coordinate: [0.59, 0.10]
        }
      ],
      lines: [
        {
          source: '新乡',
          target: '郑州'
        },
        {
          source: '焦作',
          target: '郑州'
        },
        {
          source: '开封',
          target: '郑州'
        },
        {
          source: '许昌',
          target: '郑州'
        },
        {
          source: '平顶山',
          target: '郑州'
        },
        {
          source: '洛阳',
          target: '郑州'
        },
        {
          source: '周口',
          target: '郑州'
        },
        {
          source: '漯河',
          target: '郑州'
        },
        {
          source: '南阳',
          target: '郑州'
        },
        {
          source: '信阳',
          target: '郑州'
        },
        {
          source: '驻马店',
          target: '郑州'
        },
        {
          source: '济源',
          target: '郑州'
        },
        {
          source: '三门峡',
          target: '郑州'
        },
        {
          source: '商丘',
          target: '郑州'
        },
        {
          source: '鹤壁',
          target: '郑州'
        },
        {
          source: '濮阳',
          target: '郑州'
        },
        {
          source: '安阳',
          target: '郑州'
        }
      ]
    })
  }
})

// 增强版
const localConfigMapEnhanced = Object.freeze({
  widget: true,
  layout: {
    size: true,
    position: true,
    border: true,
    padding: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    bgImgSrc: true,
    'k.curvature': true,
    relative: true,
    halo: {
      show: true,
      duration: true,
      color: true,
      radius: true
    },
    text: {
      show: true,
      offset: true,
      color: true,
      fontSize: true
    },
    icon: {
      show: true,
      src: true,
      width: true,
      height: true
    },
    line: {
      width: true,
      color: true,
      orbitColor: true,
      duration: true,
      radius: true
    }
  },
  api: true,
  animation: true
})

export default {
  name: 'widget-flyline-chart',
  label: '飞线图',
  mixins: [widgetMixin],
  render: function (createElement) {
    const { layout, config: originConfig } = this.config
    const config = this.mergedConfig
    if (!layout || !originConfig) return null
    return createElement(
      'dv-flyline-chart-enhanced',
      {
        style: styleParser(layout, this.time),
        'class': ['widget-part', { ready: this.ready }, 'widget-fly-line-chart', originConfig.className],
        props: {
          config
        },
        ref: 'widget'
      }
    )
  },
  computed: {
    mergedConfig () {

      if (!this.config.config) return {}

      const option = copy(this.config.config)
      const { points = [], lines = [] } = this.data || {}

      option.points = points
      option.lines = lines

      if (option.halo) {
        const { duration } = option.halo
        const { offset } = option.text
        option.halo.duration = duration ? duration.split(',').map(item => item - 0) : duration
        option.text.offset = offset.split(',').map(item => item - 0)
      }
      if (option.line) {
        const { duration } = option.line
        option.line.duration = duration ? duration.split(',').map(item => item - 0) : duration
      }
      const { centerPoint, duration } = option
      if (centerPoint) {
        option.centerPoint = centerPoint.split(',').map(item => item - 0)
      }
      if (duration) {
        option.duration = duration.split(',').map(item => item - 0)
      }
      return option
    }
  },
  methods: {
    init () { }
  },
  created () {
    this.configSource = this.parseConfigSource(localConfigMapEnhanced, localConfigSource)
    this.configValue = this.parseConfigValue(localConfigMapEnhanced, localConfigValueEnhanced)
  }
}
