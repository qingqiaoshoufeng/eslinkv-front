import platform from '../../../store/platform.store'

export default {
	data() {
		return {
			clientX: 0,
			clientY: 0,
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
			const content = this.platform.ruler.contentLayout
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
					if (e.altKey) this.platform.ruler.lockGuides = !this.platform.ruler.lockGuides
					break
				case 86:
					if (e.altKey) this.insertGuide('v')
					break
			}
		},
		setMove(e) {
			const {clientX, clientY} = e
			if (this.contentDrag) {
				if (!this.contentMoveStartX) {
					this.contentMoveStartX = clientX
					this.contentMoveStartY = clientY
				}
				this.platform.ruler.contentScrollLeft += Math.ceil(clientX - this.contentMoveStartX)
				this.platform.ruler.contentScrollTop += Math.ceil(clientY - this.contentMoveStartY)
				const id = this.platform.ruler.dragId
				const dragContent = document.getElementById(id)
				dragContent.style.transform = `translate3d(${this.platform.ruler.contentScrollLeft}px, ${this.platform.ruler.contentScrollTop}px, 0) scale(${this.zoom})`
				dragContent.style.width = `${this.contentWidth + 18 * 2} px`
				dragContent.style.height = `${this.contentHeight + 18 * 2} px`
				this.contentMoveStartX = clientX
				this.contentMoveStartY = clientY
			}
			// platform.actions.guideAdd(clientX, clientY)
		},
		stopMove($event) {
			if (this.contentDrag) {
				this.handleContentMoveEnd($event)
				return
			}
			// 虚线松开
			if (!this.isDrag) return
			const {clientX, clientY} = $event
			if (!this.isMoved) {
				return this.clickDraw(clientX, clientY)
			}
			this.dragDrawEnd(clientX, clientY)
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
