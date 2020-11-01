import widgetTypes from '../../views/core/widgets/widget-type-list'

export default {
	methods: {
		handleLayerWidgetLock(id) {
			const widget = this.widgetsAdded[id]
			if (widget) {
				const widgetConfig = widget.config.widget
				widgetConfig.locked = !widgetConfig.locked
			}
		},
		handleLayerWidgetHide(id) {
			const widget = this.widgetsAdded[id]
			if (widget) {
				const widgetConfig = widget.config.widget
				widgetConfig.hide = !widgetConfig.hide
			}
		},
		handleLayerWidgetDelete(id) {
			this.$Modal.confirm({
				title: '提示',
				content: '是否删除当前组件？',
				onOk: () => {
					this.removeCombinationChild(id)
					this.$delete(this.widgetsAdded, id)
					this.$delete(this.zIndexMap, id)
					this.$delete(this.sizeMap, id)
					this.$delete(this.positionMap, id)
					this.activatedWidgetId = this.rightMenuBindWidgetId = null
				}
			})
		},
		handleLayerWidgetActive({id, type}) {
			this.currentWidgetType = type
			this.activatedWidgetId = id
			this.$nextTick(() => {
				this.updatePanelPosition()
			})
		},
		handleLayerWidgetZIndexUpdate({id, value}) {
			const widget = this.widgetsAdded[id]
			if (!widget) return
			const zIndexes = this.zIndexMap
			const layout = widget.config.layout
			if (typeof value === 'number') {
				if (layout.zIndex === 0 && value < 0) {
					zIndexes[id] = layout.zIndex = this.getMinZIndex()
					return
				}
				layout.zIndex += value
				zIndexes[id] += value
			} else {
				zIndexes[id] = layout.zIndex = value === 'top' ? this.getMaxZIndex() : this.getMinZIndex()
			}
		},
		handleLayerWidgetHover(id) {
			const currentHover = document.querySelector(`.widget-hover`)
			currentHover && currentHover.classList.remove('widget-hover')
			id && document.querySelector(`.widget-${id}`).classList.add('widget-hover')
		},
		handleLayerWidgetNameUpdate({id, name}) {
			const widget = this.widgetsAdded[id]
			if (!widget) return
			widget.config.widget.name = name
		}
	},
	computed: {
		layerWidgets() {
			const widgets = this.widgetsAdded
			const ordinaryWidgets = this.ordinaryWidgets
			const layerWidgets = []
			Object.keys(ordinaryWidgets).forEach(id => {
				const widget = ordinaryWidgets[id]
				const {type, config, scene = 0} = widget
				const {locked, hide, name} = config.widget
				const {zIndex} = config.layout
				const active = id === this.activatedWidgetId
				const typeDes = widgetTypes[type]
				const isCombinationWidget = type === 'combination'
				const children = isCombinationWidget ? [] : null
				if (isCombinationWidget) {
					this.getChildrenIdList(id).forEach(id => {
						const widget = widgets[id]
						if (!widget) return
						const {type, config, scene = 0} = widget
						const {locked, hide, name} = config.widget
						const {zIndex} = config.layout
						const active = id === this.activatedWidgetId
						const typeDes = widgetTypes[type]
						children.push({
							scene,
							type, id, locked, hide, name, zIndex, active, typeDes
						})
					})
				}
				layerWidgets.push({
					scene,
					type, id, locked, hide, name, zIndex,
					active, typeDes, isCombinationWidget, children
				})
			})
			return layerWidgets
		}
	}
}
