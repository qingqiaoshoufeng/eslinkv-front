<script>
import styleParser from '../../lib/style-parser'
import widgetMixin from '../../lib/widget-mixin'
import { getInput, getBackground } from '../../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
  layout: {
    background: {
      fields: {
        url: getBackground('url', '槽位背景', { params: { type: 2 }, mountToBody: true }),
      }
    }
  },
  config: {
    fields: {
      id: getInput('id', '槽位ID')
    }
  }
})

const localConfigValue = Object.freeze({
  config: {
    id: `slot-${Date.now()}`
  }
})

// 用于筛选预置配置项
const configParseMap = {
  layout: {
    size: {
      '$width.height.unit': true
    },
    position: true,
    background: true,
    border: true,
    padding: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    id: true
  },
  animation: true
}

export default {
  name: 'widget-preset-slot',
  label: '预留槽位',
  mixins: [widgetMixin],
  render: function (createElement) {
    const { layout } = this.config
    const { id } = this.mergedConfig
    return createElement(
      'div',
      {
        style: styleParser(layout, this.time),
        'class': ['widget-preset-slot', 'widget-part'],
        ref: 'widget',
        attrs: {
          id
        }
      }
    )
  },
  computed: {
    mergedConfig () {
      if (!this.config.config) return { id: `slot-${Date.now()}` }
      const option = { ...this.config.config }
      if (!option.id) option.id = `slot-${Date.now()}`
      return option
    }
  },
  created () {
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  }
}
</script>

<style lang="scss" scoped>
  .widget-preset-slot:empty {
    outline: rgba(255, 255, 255, 0.2) dashed 1px;
    outline-offset: -1px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    mix-blend-mode: difference;
    &:before {
      content: '预置槽位';
    }
  }
</style>
