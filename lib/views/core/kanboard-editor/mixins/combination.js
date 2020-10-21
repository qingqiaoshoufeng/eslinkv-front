import copy from 'fast-copy'

export default {
  methods: {
    handleCombinationDrop ({ e, target, widgetConfig }) {
      this.isDragIn = false
      if (!widgetConfig) return
      widgetConfig = JSON.parse(widgetConfig)
      if (widgetConfig.type === 'combination') {
        this.$Message.warning('组合小工具不支持嵌套!')
        return
      }
      widgetConfig.config.widget.combinationTo = target
      const childId = this.handleWidgetDrop(e, JSON.stringify(widgetConfig))
      if (!childId) return
      childId && this.insertChild(target, childId)
    },
    getChildrenIdList (id) {
      const children = this.widgetsAdded[id].config.config.children
      return children.list ? children.list.split(',') : []
    },
    getItemChildren ({ config }) {
      const children = config.config.children.list.split(',')
      const set = this.widgetsAdded
      const result = {}
      children.forEach(id => {
        const child = set[id]
        if (child) result[id] = child
      })
      return result
    },
    insertChild (targetId, childId) {
      const children = this.widgetsAdded[targetId].config.config.children
      const childrenIds = children.list ? children.list.split(',') : []
      childrenIds.push(childId)
      children.list = childrenIds.join(',')
    },
    removeCombinationWidget (id) {
      const childrenIds = this.getChildrenIdList(id)
      childrenIds.forEach(childId => {
        const child = this.widgetsAdded[id]
        if (child) {
          this.removeCombinationChild(childId)
          this.$delete(this.widgetsAdded, childId)
          this.$delete(this.zIndexMap, childId)
          this.$delete(this.sizeMap, childId)
          this.$delete(this.positionMap, childId)
        }
      })
      this.$delete(this.widgetsAdded, id)
      this.$delete(this.zIndexMap, id)
      this.$delete(this.sizeMap, id)
      this.$delete(this.positionMap, id)
      this.activatedWidgetId = this.rightMenuBindWidgetId = null
    },
    removeCombinationChild (id) {
      const target = this.widgetsAdded[id]
      if (!target) return
      const targetConfig = target.config
      if (targetConfig.config.children) {
        this.removeCombinationWidget(id)
        return
      }
      const combinationToTargetId = targetConfig.widget.combinationTo
      if (combinationToTargetId) {
        const childrenIds = this.getChildrenIdList(combinationToTargetId)
        const childIndex = childrenIds.findIndex(childId => childId === id)
        if (childIndex > -1) {
          childrenIds.splice(childIndex, 1)
          this.widgetsAdded[combinationToTargetId].config.config.children.list = childrenIds.join(',')
        }
      }
    },
    copyCombinationChildren (combinationWidget, ids) {
      const combinationWidgetId = combinationWidget.id
      const children = combinationWidget.config.config.children
      const childrenIds = children.list ? children.list.split(',') : []
      const loop = childId => {
        const widget = this.widgetsAdded[childId]
        if (!widget) return
        const copiedWidget = copy(widget)
        const id = Date.now() + ''
        copiedWidget.id = id
        const config = copiedWidget.config
        config.widget.combinationTo = combinationWidgetId
        this.initNewWidget(id, copiedWidget, false)
        // 副本挂入该组合小工具
        childrenIds.push(id)
        if (ids.length) {
          requestAnimationFrame(() => {
            loop(ids.shift())
          })
        } else {
          children.list = childrenIds.join(',')
          requestAnimationFrame(() => {
            this.initNewWidget(combinationWidgetId, combinationWidget)
          })
        }
      }
      ids.length && requestAnimationFrame(() => {
        loop(ids.shift())
      })
    },
    shouldBeShow (item) {
      const children = item.config.config.children
      return children && children.list
    },
    calcSlideHide ({ config }, id) {
      const isSlideMode = config.mode === 'slide'
      const slide = config.slide
      return (isSlideMode && slide && slide.currentWidgetId !== id) || (isSlideMode && !slide)
    }
  }
}
