<script>
import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getInput, getInputNumber, getSelect, getColors, getAnimationCurve, getBooleanInput } from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    fields: {
      strokeHeight: getInputNumber('strokeHeight', '比例条高度'),
      color: getColors('color', '背景色'),
      duration: getInputNumber('duration', '动画时长'),
      easing: getSelect('easing', '动画效果', ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']),
      align: getSelect('align', '对齐方式', ['left', 'right', 'top', 'bottom']),
      show: getBooleanInput('show', '显示文本')
    }
  }
})

const localConfigValue = Object.freeze({
  layout: {
    font: {
      color: '#fff',
      size: 12,
      lineHeight: 1.5
    }
  },
  config: {
    strokeHeight: 15,
    color: ['#f56c6c', '#CDCFD3'],
    duration: 1000,
    easing: 'ease',
    align: 'left',
    show: false
  },
  api: {
    data: 0.75
  }
})

// 用于筛选预置配置项
const configParseMap = {
  layout: {
    size: {
      '$width.height.unit': true
    },
    font: {
      size: true,
      color: true,
      letterSpacing: true
    },
    position: true,
    border: true,
    padding: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    strokeHeight: true,
    color: true,
    duration: true,
    easing: true,
    align: true,
    show: true
  },
  api: true,
  animation: true
}

export default {
  name: 'widget-ratio-bar',
  label: '比例条',
  mixins: [widgetMixin],
  data () {
    return {
      barName: Date.now().toString(36)
    }
  },
  render: function (createElement) {
    const { layout } = this.config
    const data = this.data || 0
    const { strokeHeight, color, duration, easing, align, show } = this.mergedConfig
    return createElement(
      'div',
      {
        style: `${styleParser(layout, this.time)};display: flex;justify-content: center;flex-direction: column;`,
        'class': ['widget-ratio-bar', 'widget-part'],
        ref: 'widget',
      },
      [
        createElement(
          'div',
          {
            style: {
              width: '100%',
              height: strokeHeight + 'px',
              position: 'relative',
              backgroundColor: color ? color[1] : 'transparent',
              textAlign: align,
              overflow: 'hidden'
            },
            directives: [
              {
                name: 'ratio-bar',
                modifiers: {
                  [this.barName]: true
                },
                value: {
                  ratio: data,
                  color: color ? color[0] : '#f56c6c',
                  duration,
                  easing,
                  align
                }
              }
            ],
            ref: 'ratio',
          },
          show ? [
            createElement(
              'span',
              {
                style: {
                  lineHeight: strokeHeight + 'px',
                  position: 'absolute',
                  left: align === 'left' ? '5px' : 'unset',
                  right: align === 'right' ? '5px' : 'unset'
                }
              },
              data
            )
          ] : ''
        )
      ]
    )
  },
  computed: {
    mergedConfig () {
      if (!this.config.config) return false
      const option = { ...this.config.config }
      return option
    }
  },
  created () {
    this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  }
}
</script>
<style lang="scss" scoped>
  [data-ratio-bar] {
    &:before {
      content: ' ';
      position: absolute;
    }
  }
</style>

