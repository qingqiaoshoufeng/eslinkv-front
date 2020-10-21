import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getInput, getSelect, getInputNumber, getBooleanInput, getArrayGroup, getBackground } from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    fields: {
      'direction.effect.speed.delay': [
        getSelect('direction', '切换设置', ['横向切换:horizontal', '竖向切换:vertical'], { placeholder: '方向' }),
        getSelect('effect', '切换设置', ['位移切换:slide', '淡入:fade', '方块:cube', '3d流:coverflow', '3d翻转:flip'], { placeholder: '效果' }),
        getInputNumber('speed', '切换设置', { placeholder: '速度' }),
        getInputNumber('delay', '切换设置', { placeholder: '间隔', title: '自动切换的时间间隔，单位ms' })
      ],
      'slidesPerView.slidesPerGroup': [
        getInputNumber('slidesPerView', '数量设置', { min: 1, placeholder: '每页展示数量', title: 'slider 容器能够同时显示的 slides 数量' }),
        getInputNumber('slidesPerGroup', '数量设置', { min: 1, placeholder: '每组展示数量', title: '定义多少张 slides 为一组' })
      ],
      loop: getBooleanInput('loop', '循环模式'),
      autoplay: getBooleanInput('autoplay', '自动切换'),
      showPagination: getBooleanInput('showPagination', '显示分页'),
      type: getSelect('type', '分页样式', ['圆点:bullets', '分式:fraction', '进度条:progressbar']),
      showNavigation: getBooleanInput('showNavigation', '切换按钮'),
      swiperSource: getArrayGroup('swiperSource', '资源配置', [
        getInput('title', '标题'),
        getInput('text', '文本内容'),
        getBackground('url', '图片', { params: { type: 4 }, mountToBody: true })
      ])
    }
  }
})

const localConfigValue = Object.freeze({
  layout: {
    font: {
      color: '#fff',
      size: 16,
      lineHeight: 3,
      whiteSpace: 'nowrap'
    }
  },
  config: {
    swiperSource: [
      {
        title: 'Slide 1',
        text: '',
        url: ''
      }, {
        title: 'Slide 2',
        text: '',
        url: ''
      }, {
        title: 'Slide 3',
        text: '',
        url: ''
      }, {
        title: 'Slide 4',
        text: '',
        url: ''
      }, {
        title: 'Slide 5',
        text: '',
        url: ''
      }
    ],
    direction: 'horizontal',
    effect: 'slide',
    speed: 300,
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: false,
    autoplay: false,
    delay: 3000,
    showPagination: true,
    type: 'bullets',
    showNavigation: true
  },
  api: {
    data: []
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
    background: true,
    border: true,
    padding: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    '$direction.effect.speed.delay': true,
    'slidesPerView.slidesPerGroup': true,
    loop: true,
    autoplay: true,
    showPagination: true,
    type: true,
    showNavigation: true,
    swiperSource: true
  },
  animation: true
})

export default {
  name: 'widget-swiper',
  label: '轮播图',
  mixins: [widgetMixin],
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  render: function (createElement) {
    const { layout } = this.config
    const swiperSource = this.mergedConfig ? this.mergedConfig.swiperSource : []
    const align = layout.font ? layout.font.align : 'center'
    const { showPagination, showNavigation } = this.mergedConfig || {}
    const children = swiperSource.map((item) => {
      return createElement(
        'swiper-slide',
        {
          style: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: align,
            backgroundImage: `url(${item.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }
        },
        [
          createElement(
            'h2',
            item.title
          ),
          createElement(
            'p',
            {
              style: {
                whiteSpace: 'normal',
                lineHeight: 'normal'
              }
            },
            item.text
          )
        ]
      )
    })
    return createElement(
      'div',
      {
        style: styleParser(layout, this.time),
        'class': ['widget-swiper', 'widget-part'],
        ref: 'widget'
      },
      [
        createElement(
          'swiper',
          {
            props: {
              autoUpdate: true,
              options: this.mergedConfig
            },
            style: {
              pointerEvents: this.kanboard.isInEditor ? 'none' : 'unset',
              width: '100%',
              height: '100%'
            },
            ref: 'mySwiper'
          },
          [
            ...children,
            showPagination && createElement(
              'div',
              {
                class: ['swiper-pagination'],
                style: {
                  bottom: '10px',
                  width: '100%',
                  left: 0
                },
                slot: 'pagination'
              }
            ),
            showNavigation && createElement(
              'div',
              {
                class: ['swiper-button-prev'],
                slot: 'button-prev'
              }
            ),
            showNavigation && createElement(
              'div',
              {
                class: ['swiper-button-next'],
                slot: 'button-next'
              }
            )
          ]
        )
      ]
    )
  },
  methods: {
    init () { }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper ? this.$refs.mySwiper.$swiper : null
    },
    mergedConfig () {
      if (!this.config.config) return
      const option = { ...this.config.config }
      option.pagination = {
        el: '.swiper-pagination',
        type: option.type,
        clickable: true
      }
      option.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
      option.observer = true
      option.observeParents = true
      return option
    }
  },
  watch: {
    mergedConfig () {
      setTimeout(() => {
        this.$refs.mySwiper.$swiper.update(true)
      }, 100)
    }
  },
  created () {
    this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  }
}
