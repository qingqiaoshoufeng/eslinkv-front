export default {
	data() {
		return {
			updateTimer: null,
		}
	},
	methods: {
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
