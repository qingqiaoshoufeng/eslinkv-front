<script>
import { http } from '../../../../api/axios.js';

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.2,
  error: 'static/images/error.png',
  loading: 'static/images/loading.svg',
  attempt: 1
})

export default {
  name: 'background-picker',
  props: {
    backgrounds: {
      type: Array,
      default: () => []
    },
    params: {
      type: Object,
      default: () => {
        return {
          group: ''
        }
      }
    },
    method: {
      type: String,
      default: 'GET'
    },
    url: {
      type: [String, Function],
      default: null
    },
    responseCheck: {
      type: Object,
      default: () => {
        return {
          key: 'responseCode',
          value: '100000'
        }
      }
    },
    path: {
      type: String,
      default: 'result.list'
    },
    value: {
      type: [String, Object],
      default: ''
    },
    objectMode: {
      type: Boolean,
      default: false
    },
    thumbSize: {
      type: Object,
      default: () => {
        return {
          width: '100%',
          height: 'auto'
        }
      }
    },
    mountToBody: {
      type: Boolean,
      default: false
    },
    listClassName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isBackgroundListShow: false,
      currentBackground: null,
      backgroundImgStatus: {},
      backgroundList: null,
      backgroundListElement: null,
      clearValue: false,
      emiting: false,
      loading: false
    }
  },
  render: function (h) {
    const current = this.currentBackground
    const backgrounds = this.list || []
    const size = this.thumbSize
    const style = `width: ${size.width}; height: ${size.height};`
    const getCurrentBackground = h(
      'div',
      {
        'class': 'current-background',
        style: `background-image: url(${current && current.src})`,
        on: {
          click: e => {
            e.stopPropagation()
            e.preventDefault()
            this.isBackgroundListShow = true
            // this.$nextTick(this.$Lazyload.lazyLoadHandler)
          }
        }
      },
      current
        ? [
          h(
            'Button',
            {
              class: 'open-background',
              props: {
                shape: 'circle',
                icon: 'ios-open-outline',
                to: current.src,
                size: 'small',
                target: '_blank'
              },
              attrs: {
                title: '查看大图'
              },
              on: {
                click: e => {
                  e.stopPropagation()
                }
              }
            }
          ),
          h(
            'Button',
            {
              class: 'cancel-background',
              props: {
                shape: 'circle',
                icon: 'ios-close',
                size: 'small'
              },
              attrs: {
                title: '清除选择'
              },
              on: {
                click: e => {
                  e.stopPropagation()
                  this.clearValue = true
                  this.currentBackground = null
                }
              }
            }
          )
        ]
        : '请选择'
    )
    const backgroundList = h(
      'ul',
      {
        'class': ['background-list background-picker-list', this.listClassName],
        style: this.isBackgroundListShow ? '' : 'display: none;',
        directives: [
          {
            name: 'lazy-container',
            value: { selector: '.background-img' }
          }
        ]
      },
      backgrounds.length ? backgrounds.map(background => {
        const { src, name: title, description: alt } = background
        const ref = `img-${src}`
        return h(
          'li',
          {
            'class': ['background-item', { active: current && current.src === src }],
            style,
            on: {
              click: e => {
                e.stopPropagation()
                e.preventDefault()
                this.currentBackground = background
              }
            },
            props: {
              key: src
            },
            ref
          },
          [
            h(
              'img',
              {
                'class': 'background-img',
                attrs: {
                  title,
                  alt,
                  'data-src': src
                }
              }
            )
          ]
        )
      }) : [
          h(
            'div',
            {
              'class': 'empty-background-list',
              style
            },
            [
              '暂无图片',
              h(
                'Button',
                {
                  class: 'refresh-button',
                  props: {
                    loading: this.loading
                  },
                  on: {
                    click: e => {
                      e.stopPropagation()
                      this.loadBackgrounds()
                    }
                  }
                },
                '刷新'
              )
            ]
          )
        ]
    )
    return h(
      'div',
      {
        'class': ['background-picker', { active: this.isBackgroundListShow }],
        ref: 'backgroundPicker'
      },
      [
        getCurrentBackground,
        backgroundList
      ]
    )
  },
  methods: {
    hideBackgroundList () {
      this.isBackgroundListShow = false
    },
    loadBackgrounds () {
      const { responseCheck: { key, value }, params, url, method, path } = this
      if (!url) return
      this.loading = true;
      (typeof url == 'string' ? http(params, method, url) : url(params)).then(response => {
        if (response[key] === value) {
          const keys = path.split('.')
          while (keys.length) {
            response = response[keys.shift()]
          }
          this.backgroundList = response.map(item => {
            if (item.src) return item
            item.src = item.url
            item.group = item.type.toString()
            delete item.url
            delete item.type
            return item
          })
        }
      }).catch(e => {
        console.warn(e)
      }).finally(() => {
        this.loading = false
      })
    },
    updateListPosition () {
      const list = this.backgroundListElement
      if (!list) return
      const clientHeight = document.body.clientHeight
      const { left, top, width, height } = this.$el.getBoundingClientRect()
      const { width: listWidth, height: listHeight } = list.getBoundingClientRect()
      let topOffset = top + height + 3
      if (clientHeight - topOffset < listHeight) {
        topOffset = top > listHeight ? top - listHeight - 3 : clientHeight - listHeight
      }
      if (topOffset < 0) topOffset = 0
      if (topOffset > clientHeight - listHeight) topOffset = clientHeight - listHeight
      list.style.transform = `translate3d(${left}px, ${topOffset}px, 0)`
      list.style.width = `${width}px`
    },
    handleScrollUpdate () {
      if (!this.isBackgroundListShow) return
      this.updateListPosition()
    }
  },
  watch: {
    isBackgroundListShow (value) {
      if (!this.backgroundListElement) this.backgroundListElement = this.$el.querySelector('.background-list') || document.body.querySelector(`.background-list.mount-to-body[data-link-id="${this._uid}"]`)
      const list = this.backgroundListElement
      if (!list) return
      if (value) {
        requestAnimationFrame(() => {
          this.updateListPosition()
          list.classList.add('active')
        })
      } else {
        list.classList.remove('active')
      }
    },
    value: {
      handler: function (value) {
        if (this.emiting) return
        if (!value) {
          this.currentBackground = null
          return
        }
        this.currentBackground = this.list.find(background => background.src === (this.objectMode ? value.src : value))
      },
      immediate: true
    },
    list (list) {
      const value = this.value
      if (!value) return
      this.currentBackground = this.list.find(background => background.src === (this.objectMode ? value.src : value))
    },
    currentBackground (value) {
      if (this.clearValue) {
        this.emiting = true
        this.$emit('input', this.objectMode ? null : '')
        setTimeout(() => {
          this.emiting = false
        }, 50)
        this.clearValue = false
        return
      }
      if (!value) {
        return this.$emit('input', this.objectMode ? this.value || null : this.value)
      }
      if (value.src === (this.objectMode ? this.value.src : this.value)) return
      this.$emit('input', this.objectMode ? value : value.src)
    },
    params: {
      handler: function (params) {
        this.loadBackgrounds()
      },
      deep: true,
      immediate: true
    },
    url (url) {
      url && this.loadBackgrounds()
    }
  },
  computed: {
    list () {
      return this.backgroundList || this.backgrounds
    }
  },
  mounted () {
    document.addEventListener('click', this.hideBackgroundList)
    window.addEventListener('scroll', this.handleScrollUpdate, true)
    this.mountToBody && this.$nextTick(() => {
      const backgroundList = this.$el.querySelector('.background-list')
      if (!backgroundList) return
      backgroundList.style.position = 'fixed'
      backgroundList.style.zIndex = 999999
      backgroundList.classList.add('mount-to-body')
      backgroundList.setAttribute('data-link-id', this._uid)
      document.body.appendChild(backgroundList)
    })
  },
  beforeDestroy () {
    document.removeEventListener('click', this.hideBackgroundList)
    window.removeEventListener('scroll', this.handleScrollUpdate)
    if (this.mountToBody) {
      const backgroundList = document.body.querySelector(`.background-picker-list.mount-to-body[data-link-id="${this._uid}"]`)
      backgroundList && backgroundList.remove()
    }
  }
}
</script>

<style lang="scss" scoped>
  .background-picker {
    position: relative;
    .current-background {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      border: 1px solid #dcdee2;
      padding: 1px;
      .cancel-background,
      .open-background {
        position: absolute;
        top: 10px;
        right: 10px;
        line-height: 24px;
      }
      .cancel-background {
        right: 40px;
      }
    }
    .background-list {
      position: absolute;
      top: 100%;
      left: 0;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      min-width: 200px;
      height: auto;
      height: 300px;
      overflow: hidden;
      overflow-y: auto;
      background-color: #e2e2e2;
      border: #57a3f3 3px solid;
      box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
      transform: translate3d(0, 6px, 0);
      opacity: 0;
      pointer-events: none;
      z-index: 9;
      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar-track:hover {
        background-color: #e2e2e2;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #666;
        border-radius: 0;
      }
      &:empty {
        display: flex;
        justify-content: center;
        align-items: center;
        &:before {
          content: '暂无可用素材';
        }
      }
      .empty-background-list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
        min-height: 50px;
        font-size: 1.5em;
      }
      .background-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 1px 0;
        background-color: #57a3f3;
        background-image: linear-gradient(white 1px, transparent 0), linear-gradient(90deg, white 1px, transparent 0),
          linear-gradient(hsla(0, 0%, 100%, 0.3) 1px, transparent 0), linear-gradient(90deg, hsla(0, 0%, 100%, 0.3) 1px, transparent 0);
        background-size: 75px 75px, 75px 75px, 15px 15px, 15px 15px;
        min-height: 60px;
        overflow: hidden;
        cursor: pointer;
        img {
          display: block;
          opacity: 1;
          transform: scale(1);
          transition: 0.5s;
        }
        &:after {
          content: '√';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 42px;
          height: 42px;
          font-size: 30px;
          font-family: cursive;
          color: white;
          background-color: rgba(61, 231, 201, 0.78);
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          opacity: 0;
          transition: 0.2s;
        }
        &.active {
          &:after {
            opacity: 1;
          }
          img {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
      }
      .background-img {
        width: 100%;
        height: auto;
      }
      .refresh-button {
        margin-top: 25px;
      }
    }
    &.active {
      .current-background {
        border-color: #57a3f3;
        box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
      }
      .background-list {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
</style>

<style lang="scss">
  .background-list.mount-to-body {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    min-width: 200px;
    height: auto;
    height: 300px;
    overflow: hidden;
    overflow-y: auto;
    background-color: #e2e2e2;
    border: #57a3f3 3px solid;
    box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
    transform: translate3d(0, 16px, 0);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s;
    z-index: 9;
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track:hover {
      background-color: #e2e2e2;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #666;
      border-radius: 0;
    }
    &:empty {
      display: flex;
      justify-content: center;
      align-items: center;
      &:before {
        content: '暂无可用素材';
      }
    }
    .empty-background-list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: white;
      min-height: 50px;
      font-size: 1.5em;
    }
    .background-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 1px 0;
      background-color: #57a3f3;
      background-image: linear-gradient(white 1px, transparent 0), linear-gradient(90deg, white 1px, transparent 0),
        linear-gradient(hsla(0, 0%, 100%, 0.3) 1px, transparent 0), linear-gradient(90deg, hsla(0, 0%, 100%, 0.3) 1px, transparent 0);
      background-size: 75px 75px, 75px 75px, 15px 15px, 15px 15px;
      min-height: 60px;
      overflow: hidden;
      img {
        display: block;
        opacity: 1;
        transform: scale(1);
        transition: 0.5s;
      }
      &:after {
        content: '√';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 42px;
        height: 42px;
        font-size: 30px;
        font-family: cursive;
        color: white;
        background-color: rgba(61, 231, 201, 0.78);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        opacity: 0;
        transition: 0.2s;
      }
      &.active {
        &:after {
          opacity: 1;
        }
        img {
          transform: scale(1.1);
          opacity: 0.9;
        }
      }
    }
    .background-img {
      width: 100%;
      height: auto;
    }
    &.active {
      transform: translate3d(0, 6px, 0);
      opacity: 1;
      pointer-events: auto;
    }
    .refresh-button {
      margin-top: 25px;
    }
  }
</style>
