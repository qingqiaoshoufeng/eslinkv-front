export default {
  data () {
    return {
      currentWidgetId: null,
      playTimer: null,
      sizeUpdateTimer: null,
      sortString: ''
    }
  },
  methods: {
    updateSort () {
      const childrenIds = this.childrenIds
      const slide = this.config.config.slide
      const widgetAdded = this.kanboardEditor.widgetAdded
      slide.sort.splice(0)
      childrenIds.forEach(id => {
        const widget = widgetAdded[id]
        if (widget) {
          const { id, config: { widget: { name } } } = widget
          slide.sort.push({
            id, title: name
          })
        }
      })
    },
    updateChildSize (isSlideMode) {
    	console.log(1)
      if (!isSlideMode) return
      const childrenIds = this.childrenIds
      const kanboardEditor = this.kanboardEditor
      if (!kanboardEditor) return
      // this.sizeUpdateTimer && clearTimeout(this.sizeUpdateTimer)
      // this.sizeUpdateTimer = setTimeout(() => {
        // 刷新子级小工具
        childrenIds.forEach(id => {
          const widget = this.childRefs[id]
          widget && widget.$children[0].init()
        })
      // }, 100)
    },
    nextSlide () {
      const slides = this.slides
      if (!slides.length) return
      const currentIndex = slides.findIndex(slide => slide.id === this.currentWidgetId)
      if (currentIndex < slides.length - 1) {
        this.currentWidgetId = slides[currentIndex + 1].id
      } else {
        this.currentWidgetId = slides[0].id
      }
    },
    toggleSlide (id) {
      this.currentWidgetId = id
      this.sliderPause()
    },
    sliderPause () {
      clearInterval(this.playTimer)
      if (!this.autoplay) return
      const { delay, duration } = this.mergedConfig.slide
      this.playTimer = setTimeout(() => {
        this.sliderPlay()
      }, (delay + duration) * 2)
    },
    sliderPlay () {
      clearInterval(this.playTimer)
      if (!this.autoplay || this.innerEditing) return
      const { delay, duration } = this.mergedConfig.slide
      this.playTimer = setInterval(() => {
        this.nextSlide()
      }, delay + duration)
    },
    toggleToNewSlide () {
      setTimeout(() => {
        const slides = this.slides
        const length = slides.length
        if (!length) return
        this.currentWidgetId = slides[length - 1].id
      }, 200)
    }
  },
  computed: {
    childRefs () {
      const refs = this.kanboardEditor.$refs
      return this.childrenIds.reduce((acc, id) => {
        if (!refs[id]) return acc
        acc[id] = refs[id][0]
        return acc
      }, {})
    },
    isSlideMode () {
      return this.mergedConfig.mode === 'slide'
    },
    slides () {
      return this.isSlideMode ? this.mergedConfig.slide ? this.mergedConfig.slide.sort : [] : []
    },
    switcher () {
      return this.isSlideMode ? this.mergedConfig.slide ? this.mergedConfig.slide.switcher : {} : {}
    },
    autoplay () {
      return this.isSlideMode ? this.mergedConfig.slide ? this.mergedConfig.slide.autoplay : false : false
    },
    updateSizeWatcher () {
      const { size, padding, border } = this.config.layout
      return { size, padding, border }
    }
  },
  watch: {
    isSlideMode: {
      handler: function (value) {
        setTimeout(() => {
          this.updateChildSize(value)
        })
        if (value && this.ready) {
          setTimeout(() => {
            this.updateSort()
          })
        }
      }
    },
    'config.config.children.list' (value, oldValue) {
      if (!this.ready || !this.isSlideMode || value === oldValue) return
      setTimeout(() => {
        this.updateSort()
      })
    },
    slides: {
      handler: function (slides) {
        const list = slides.map(s => s.id).join(',')
        if (!list) return
        this.sortString = list
        this.currentWidgetId = slides[0].id
      },
      deep: true,
      immediate: true
    },
    sortString (value, oldValue) {
      if (value === oldValue) return
      this.config.config.children.list = value
    },
    'head.show' () {
      this.$nextTick(() => {
        this.updateChildSize(this.isSlideMode)
      })
    },
    'config.config.slide': {
      handler: function (value, oldValue) {
        if (!oldValue && value) this.config.config.slide.currentWidgetId = this.currentWidgetId
      },
      immediate: true
    },
    autoplay: {
      handler: function (autoplay) {
        if (autoplay) {
          this.sliderPlay()
        } else {
          clearInterval(this.playTimer)
        }
      },
      immediate: true
    },
    updateSizeWatcher: {
      handler: 'updateChildSize',
      deep: true
    },
    currentWidgetId (id) {
      if (!id) return
      if (this.isSlideMode) {
        if (this.config.config.slide) {
          this.config.config.slide.currentWidgetId = id
        }
      }
    },
    innerEditing (value) {
      value ? clearInterval(this.playTimer) : this.sliderPlay()
    }
  },
  beforeDestroy () {
    this.playTimer && clearInterval(this.playTimer)
    this.sizeUpdateTimer && clearInterval(this.sizeUpdateTimer)
  }
}
