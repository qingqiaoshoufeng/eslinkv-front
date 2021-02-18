import lottie from 'lottie-web'
import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getSelectWithInput, getSelect, getInputNumber, getFile, getBooleanInput } from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    fields: {
      url: getFile('url', '选择文件'),
      loop: getBooleanInput('loop', '循环播放'),
      speed: getInputNumber('speed', '播放速度', { step: 0.1 }),
      direction: getSelect('direction', '播放方向', ['正向播放:1', '反向播放:-1']),
      quality: getSelectWithInput('quality', '播放质量', ['high', 'medium', 'low'])
    }
  }
})

const localConfigValue = Object.freeze({
  config: {
    url: 'static/lottieJSON/data.json',
    loop: true,
    speed: 1,
    direction: '1',
    quality: 'high'
  }
})

// 用于筛选预置配置项
const configParseMap = {
  layout: {
    size: {
      '$width.height.unit': true
    },
    position: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    url: true,
    loop: true,
    speed: true,
    direction: true,
    quality: true
  },
  animation: true
}

export default {
  name: 'widget-lottie',
  label: 'lottie',
  mixins: [widgetMixin],
  render: function (createElement) {
    const { layout } = this.config
    return createElement(
      'div',
      {
        style: `${styleParser(layout, this.time)};`,
        'class': ['widget-lottie', 'widget-part'],
        ref: 'widget'
      }
    )
  },
  data () {
    return {
      instance: null
    }
  },
  methods: {
    loadLottie () {
      const { url, loop, direction, speed, quality } = this.config.config
      this.instance && this.instance.destroy()
      if (!url || !this.$refs.widget) return
      this.instance = lottie.loadAnimation({
        container: this.$refs.widget,
        path: url,
        autoplay: true,
        renderer: 'svg',
        loop,
        direction,
        speed,
        quality
      })
      this.instance.setQuality = lottie.setQuality
      this.instance.setQuality(quality)
      this.instance.setSpeed(speed)
      this.instance.setDirection(direction)
    },
    init () {
      this.loadLottie()
    },
    updateInstance (prop, data) {
      const instance = this.instance
      if (!instance || this.readonly) return
      requestAnimationFrame(() => {
        const [firstLetter, ...other] = prop.split('')
        const key = `set${firstLetter.toUpperCase()}${other.join('')}`
        instance[key](data)
      })
    }
  },
  watch: {
    'config.config.url' () {
      this.loadLottie()
    },
    'config.config.loop' () {
      this.loadLottie()
    },
    'config.config.speed' (value) {
      this.updateInstance('speed', value)
    },
    'config.config.direction' (value) {
      this.updateInstance('direction', value)
    },
    'config.config.quality' (value) {
      this.updateInstance('quality', value)
    }
  },
  created () {
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  },
  beforeDestroy () {
    this.instance && this.instance.destroy()
  }
}
