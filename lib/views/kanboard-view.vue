<template>
  <div :class="[{ active: ready, 'mobile-kanboard': isMobile() }, getLayoutMode()]" class="preview-wrapper">
    <kanban-preview ref="previewContainer" />
  </div>
</template>

<script>
import kanbanPreview from './preview-base.vue'

export default {
  components: {
    kanbanPreview
  },
  provide () {
    return { kanboard: this }
  },
  data () {
    return {
      ready: false,
      kanboardConfig: null,
      kanboardSize: {},
      freshTimer: null
    }
  },
  methods: {
    queryKanboard () {
      const route = this.$route
      const hexCode = route.params.id
      const params = route.query
      this.$api.getKanboardByHexCode({ hexCode, ...params }).then(res => {
        if (res.responseCode == 100000) {
          const data = res.result
          document.title = `${data.name} - ${route.meta.title}`
          const value = JSON.parse(data.attribute)
          this.kanboardConfig = value
          this.kanboardSize = value.kanboard.size
          this.refill()
        }
      }).catch(error => {
        alert(error.message)
      })
    },
    refill () {
      const config = this.updateSize(this.kanboardConfig)
      this.$refs.previewContainer.refillConfig(config).then(() => {
        this.ready = true
      })
    },
    fullscreen () {
      this.ready && this.$el.requestFullscreen()
    },
    isMobile () {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile Safari|Opera Mini/i.test(navigator.userAgent)
    },
    updateSize (config) {
      if (!this.isMobile()) return config
      const { isMobileKanboard, layoutMode, width, height } = this.kanboardSize
      if (!isMobileKanboard) return config
      const { clientWidth, clientHeight } = document.body
      const widthRatio = clientWidth / width
      const heightRatio = clientHeight / height
      // document.head.querySelector('[name="viewport"]').setAttribute('content', 'width=device-width,initial-scale=0.5')
      // document.documentElement.style.fontSize = '20px'
      const widgets = config.widgets
      switch (layoutMode) {
        case 'full-size':
          this.kanboardSize.width = clientWidth
          this.kanboardSize.height = clientHeight
          widgets.forEach(({value: { layout }}) => {
            const size = layout.size
            size.width *= widthRatio
            size.height *= heightRatio
            const position = layout.position
            position.left *= widthRatio
            position.top *= heightRatio
          })
          break
        case 'full-width':
          this.kanboardSize.width = clientWidth
          this.kanboardSize.height *= widthRatio
          widgets.forEach(({value: { layout }}) => {
            const size = layout.size
            size.width *= widthRatio
            size.height *= widthRatio
            const position = layout.position
            position.left *= widthRatio
            position.top *= widthRatio
          })
          break
        case 'full-height':
          this.kanboardSize.width *= heightRatio
          this.kanboardSize.height = clientHeight
          widgets.forEach(({value: { layout }}) => {
            const size = layout.size
            size.width *= heightRatio
            size.height *= heightRatio
            const position = layout.position
            position.left *= heightRatio
            position.top *= heightRatio
          })
          break
      }
      return config
    },
    getLayoutMode () {
      const { isMobileKanboard, layoutMode, deviceType } = this.kanboardSize
      if (!isMobileKanboard) return ''
      return `layout-${layoutMode} device-${deviceType}`
    },
    refreshSize () {
      this.freshTimer && clearTimeout(this.freshTimer)
      this.freshTimer = setTimeout(() => {
        this.refill()
      }, 300)
    }
  },
  watch: {
    // todo
    '$route': {
      handler: function (route) {
        if (!route) return
        if (!route.params.id) {
          alert('缺少看板ID')
          return
        }
        document.title = route.meta.title
        this.queryKanboard()
      },
      immediate: true
    }
  },
  mounted () {
    document.title = '数据看板'
    window.addEventListener('resize', this.refreshSize)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.refreshSize)
    })
  }
};
</script>

<style lang="scss" scoped>
  .preview-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #0f3b69;
    z-index: 99999;
    display: flex;
    &.mobile-kanboard{
      width: 100%;
      height: 100%;
      position: unset;
      z-index: unset;
      display: block;
      background-color: block;
    }
    &.active {
      overflow: auto;
    }
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    /deep/ {
      #kanban {
        position: relative;
        outline: rgba(255, 255, 255, 0.2) 1px dotted;
        flex-shrink: 0;
        flex-grow: 0;
        margin: auto;
      }
      &.layout-full-size{
        #kanban{
          width: 100%!important;
          height: 100%!important;
        }
      }
      &.layout-full-width{
        overflow-x: hidden;
      }
      &.layout-full-height{
        overflow-y: hidden;
      }
    }
  }
</style>
