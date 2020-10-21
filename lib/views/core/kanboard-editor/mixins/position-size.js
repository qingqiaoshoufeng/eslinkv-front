export default {
  data () {
    return {
      positionMap: {},
      sizeMap: {},
      updateTimer: null,
      draggingTimer: null,
      resizingTimer: null
    }
  },
  methods: {
    updatePosition (id) {
      const position = this.widgetsAdded[id].config.layout.position
      const { x, y } = this.positionMap[id]
      position.left = x
      position.top = y
    },
    updateSize (id) {
      const size = this.widgetsAdded[id].config.layout.size
      const { w, h } = this.sizeMap[id]
      size.width = w
      size.height = h
    },
    resizing (left, top, width, height) {
      this.isWidgetResizing = true
      if (this.resizingTimer) cancelAnimationFrame(this.resizingTimer)
      this.resizingTimer = requestAnimationFrame(() => {
        const position = this.positionMap[this.activatedWidgetId]
        const size = this.sizeMap[this.activatedWidgetId]
        position.x = left
        position.y = top
        size.w = width
        size.h = height
      })
    },
    // 拖拽操作区组件
    dragging (left, top) {
      this.isWidgetDragging = true
      if (this.draggingTimer) cancelAnimationFrame(this.draggingTimer)
      this.draggingTimer = requestAnimationFrame(() => {
        const position = this.positionMap[this.activatedWidgetId]
        if (!position) return
        position.x = left
        position.y = top
      })
    },
    updateView () {
      if (this.updateTimer) cancelAnimationFrame(this.updateTimer)
      this.updateTimer = requestAnimationFrame(() => {
        this.$forceUpdate()
        this.updateTimer = null
      })
    }
  },
  computed: {
    layout () {
      if (!this.currentWidgetValue) return null
      return this.currentWidgetValue.layout
    },
    position () {
      if (!this.layout) return null
      const { left, top } = this.layout.position
      return {
        left, top
      }
    },
    size () {
      if (!this.layout) return null
      const { width, height } = this.layout.size
      return {
        width, height
      }
    }
  },
  watch: {
    size: {
      handler: function (size) {
        if (!size) return
        const sizeItem = this.sizeMap[this.activatedWidgetId]
        if (!sizeItem) return
        const { width, height } = size
        sizeItem.w = width
        sizeItem.h = height
        this.updateView()
      },
      deep: true
    },
    position: {
      handler: function (position) {
        if (!position) return
        const positionItem = this.positionMap[this.activatedWidgetId]
        if (!positionItem) return
        const { left, top } = position
        positionItem.x = left
        positionItem.y = top
        this.updateView()
      },
      deep: true
    }
  }
}