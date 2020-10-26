<script>
import styleParser from '../../lib/style-parser'
import widgetMixin from '../../lib/widget-mixin'
import { getInput, getSelect, getBooleanInput } from '../../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    fields: {
      src: getInput('src', '网页路径'),
      frameborder: getSelect('frameborder', '边框', ['显示:1', '不显示:0']),
      scrolling: getSelect('scrolling', '滚动条', ['显示:yes', '不显示:no', '默认:auto'])
    }
  }
})

const localConfigValue = Object.freeze({
  config: {
    src: '',
    frameborder: '1',
    scrolling: 'yes'
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
    src: true,
    frameborder: true,
    scrolling: true
  },
  api: {
    params: true,
    bind: true
  },
  animation: true
}

export default {
  name: 'widget-iframe-web',
  label: 'iframe网页嵌入',
  mixins: [widgetMixin],
  data () {
    return {
      iframeContext: null,
      paramsToIframeContext: true
    }
  },
  render: function (createElement) {
    const { layout } = this.config
    const { src, frameborder, scrolling } = this.mergedConfig
    return createElement(
      'div',
      {
        style: styleParser(layout, this.time),
        'class': ['widget-iframe-web', 'widget-part'],
        ref: 'widget'
      },
      src
        ? [
          createElement(
            'iframe',
            {
              class: 'iframe',
              style: {
                pointerEvents: this.kanboard.isInEditor ? 'none' : 'unset'
              },
              attrs: {
                src,
                frameborder,
                scrolling
              },
              ref: 'iframeContext'
            }
          )
        ] : ''
    )
  },
  methods: {
    init () {}
  },
  computed: {
    mergedConfig () {
      const option = { ...this.config.config }
      return option
    }
  },
  created () {
    this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  },
  watch: {
    'config.config.src': {
      handler: function (value) {
        if (value) this.$nextTick(() => {
          this.iframeContext = this.$refs.iframeContext
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .widget-iframe-web {
    &:empty {
      outline: rgba(255, 255, 255, 0.2) dashed 1px;
      outline-offset: -1px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      mix-blend-mode: difference;
      &:before {
        content: 'iframe网页嵌套';
      }
    }
    iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>
