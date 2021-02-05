export default {
	data() {
		return {
			updateTimer: null,
			draggingTimer: null,
			resizingTimer: null
		}
	},
	methods: {
		updatePosition(id) {
			const position = this.widgetAdded[id].config.layout.position
			// const { x, y } = this.positionMap[id]
			// position.left = x
			// position.top = y
		},
		updateSize(id) {
			const size = this.widgetAdded[id].config.layout.size
			// const { w, h } = this.sizeMap[id]
			// size.width = w
			// size.height = h
		},
		resizing(left, top, width, height) {
			this.isWidgetResizing = true
			if (this.resizingTimer) cancelAnimationFrame(this.resizingTimer)
			this.resizingTimer = requestAnimationFrame(() => {
			})
		},
		// 拖拽操作区组件
		dragging(left, top) {
			this.isWidgetDragging = true
			if (this.draggingTimer) cancelAnimationFrame(this.draggingTimer)
			this.draggingTimer = requestAnimationFrame(() => {
			})
		},
		updateView() {
			if (this.updateTimer) cancelAnimationFrame(this.updateTimer)
			this.updateTimer = requestAnimationFrame(() => {
				this.$forceUpdate()
				this.updateTimer = null
			})
		}
	},
	computed: {
		layout() {
			if (!this.currentWidgetValue) return null
			return this.currentWidgetValue.layout
		},
		position() {
			if (!this.layout) return null
			const {left, top} = this.layout.position
			return {
				left, top
			}
		},
		size() {
			if (!this.layout) return null
			const {width, height} = this.layout.size
			return {
				width, height
			}
		}
	},
	watch: {
		size: {
			handler: function (size) {
				if (!size) return
				this.updateView()
			},
			deep: true
		},
		position: {
			handler: function (position) {
				if (!position) return
				this.updateView()
			},
			deep: true
		}
	}
}
