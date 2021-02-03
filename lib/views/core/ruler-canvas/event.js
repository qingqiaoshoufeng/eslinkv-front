import platform from '../../../store/platform.store'

export default {
	data() {
		return {
			clientX: 0,
			clientY: 0,
			lockGuides: false,
			platform: platform.state
		}
	},
	methods: {
		init() {
			this.box()
			this.setSpacing()
			this.updateRulerRange()
		},
		windowResize() {
			this.xScale = []
			this.yScale = []
			this.init()
		},
		updateRulerRange() {
			const width = this.contentRef.scrollWidth
			const content = this.contentLayout
			const contentLeft = this.isScaleRevise ? content.left : 0
			const contentTop = this.isScaleRevise ? content.top : 0
			this.hrWidth = (width && width > this.windowWidth ? width : this.windowWidth) + contentLeft
			const height = this.contentRef.scrollHeight
			this.vrHeight = (height && height > this.windowHeight ? height : this.windowHeight) + contentTop
			this.scaleCalc()
		},
		startContentMove(e) {
			if (e.keyCode === 32) this.contentMove = true
		},
		stopContentMove() {
			this.contentMove = false
			this.contentMoveStartX = this.contentMoveStartY = 0
		},
		box() {
			const position = this.$refs.rulerWrapper.getBoundingClientRect()
			this.windowWidth = Math.ceil(position.width)
			this.windowHeight = Math.ceil(position.height)
			this.rulerWidth = this.$refs.verticalRuler.clientWidth
			this.rulerHeight = this.$refs.horizontalRuler.clientHeight
			this.contentWidth = this.contentRef.scrollWidth
			this.contentHeight = this.contentRef.scrollHeight
		},
		dispatchHotKey(e) {
			if (this.isHotKey) {
				this.stopContentMove()
				switch (e.keyCode) {
					case this.keyCode.r:
						if (e.altKey) {
							this.platform.ruler.rulerVisible = !this.platform.ruler.rulerVisible
						}
						break
					case 67:
						if (e.altKey) this.clearGuides()
						break
					case 72:
						if (e.altKey) this.insertGuide('h')
						break
					case 76:
						if (e.altKey) this.lockGuides = !this.lockGuides
						break
					case 86:
						if (e.altKey) this.insertGuide('v')
						break
				}
			}
		},
		setMove($event) {
			const {clientX, clientY} = $event
			this.clientX = clientX
			this.clientY = clientY
			if (this.contentDrag) {
				this.handleContentMove(clientX, clientY)
				return
			}
			this.dottedLineMove(clientX, clientY)
		},
		stopMove($event) {
			if (this.contentDrag) {
				this.handleContentMoveEnd($event)
				return
			}
			this.dottedLineUp($event)
		},
		handleWheel(e) {
			e.preventDefault()
			e.stopPropagation()
			if (e.ctrlKey) {
				return this.handleWheelSetZoom(e)
			}
			if (e.shiftKey) {
				return this.setContentScrollLeft(e)
			}
			this.setContentScrollTop(e)
		}
	},
	mounted() {
		document.addEventListener('mousemove', this.setMove)
		document.addEventListener('mouseup', this.stopMove)
		document.addEventListener('keyup', this.dispatchHotKey, true)
		document.addEventListener('keydown', this.startContentMove)
		window.addEventListener('resize', this.windowResize)
		window.addEventListener('scroll', this.setSpacing)
		this.$refs.rulerWrapper.addEventListener('wheel', this.handleWheel)
		this.$refs.rulerWrapper.addEventListener('dblclick', this.resetZoom)
		requestAnimationFrame(this.init)
	},
	beforeDestroy() {
		document.removeEventListener('mousemove', this.setMove)
		document.removeEventListener('mouseup', this.stopMove)
		document.removeEventListener('keyup', this.dispatchHotKey, true)
		document.removeEventListener('keydown', this.startContentMove)
		window.removeEventListener('resize', this.windowResize)
		window.removeEventListener('scroll', this.setSpacing)
		this.$refs.rulerWrapper.removeEventListener('wheel', this.handleWheel)
		this.$refs.rulerWrapper.removeEventListener('dblclick', this.resetZoom)
	}
}
