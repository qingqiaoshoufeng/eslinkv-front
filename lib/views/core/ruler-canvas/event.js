import platform from '../../../store/platform.store'

export default {
	data() {
		return {
			clientX: 0,
			clientY: 0,
			platform: platform.state,
			zoomUpdateTime: +new Date(),
			scrollYTime: +new Date(),
			scrollXTime: +new Date(),
		}
	},
	computed: {
		zoom() {
			return this.platform.ruler.zooms[this.platform.ruler.zoomIndex]
		}
	},
	methods: {
		/**
		 * @description 根据缩放比例生成 x,y刻度
		 */
		scaleCalc() {
			const rulerRange = this.rulerRange
			const getCalc = (array, length) => {
				const step = this.platform.ruler.stepLength / this.zoom
				for (let id = 0; id < length * step / 50; id += step) {
					if (id % step === 0) {
						array.push({id})
					}
				}
			}
			const getCalcRevise = (array, length) => {
				array.splice(0)
				const step = this.platform.ruler.stepLength / this.zoom
				for (let id = -length * step / 50; id < 0; id += step) {
					if (id % step === 0 && id + step <= length) {
						array.push({id})
					}
				}
			}
			getCalcRevise(this.xScale, rulerRange / 2)
			getCalcRevise(this.yScale, rulerRange / 2)
			getCalc(this.xScale, rulerRange)
			getCalc(this.yScale, rulerRange)
		},
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
				case 82: // r
					if (e.altKey) {
						this.platform.ruler.rulerVisible = !this.platform.ruler.rulerVisible
					}
					break
				case 67: // c
					if (e.altKey) this.clearGuides()
					break
				case 72: // h
					if (e.altKey) this.insertGuide('h')
					break
				case 76: // l
					if (e.altKey) this.platform.ruler.lockGuides = !this.platform.ruler.lockGuides
					break
				case 86: // v
					if (e.altKey) this.insertGuide('v')
					break
			}
		},
		setMove(e) {
			const {clientX, clientY} = e
			if (this.contentDrag) {
				console.log('contentDrag = true')
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
				return
			}
			this.dottedLineMove(clientX, clientY)
		},
		stopMove($event) {
			if (this.contentDrag) {
				this.handleContentMoveEnd($event)
				return
			}
			// 虚线松开
			if (!this.platform.ruler.isDrag) return
			const {clientX, clientY} = $event
			if (!this.isMoved) {
				return this.clickDraw(clientX, clientY)
			}
			console.log(clientX, clientY)
			this.dragDrawEnd(clientX, clientY)
		},
		handleWheel(e) {
			e.preventDefault()
			e.stopPropagation()
			const id = this.platform.ruler.dragId
			const dragContent = document.getElementById(id)
			if (e.ctrlKey) {
				/**
				 * @description 设置缩放比例
				 *
				 * e.wheelDeltaY 滚轮方向
				 */
				if (+new Date() - this.zoomUpdateTime >= 500) {
					e.wheelDeltaY > 0 ? this.platform.ruler.zoomIndex++ : this.platform.ruler.zoomIndex--
					if (this.platform.ruler.zoomIndex < 0) this.platform.ruler.zoomIndex = 0
					if (this.platform.ruler.zoomIndex >= this.platform.ruler.zooms.length) this.platform.ruler.zoomIndex = this.platform.ruler.zooms.length - 1
					requestAnimationFrame(() => {
						this.scaleCalc()
					})
					this.zoomUpdateTime = +new Date()
					dragContent.style.transform = `translate3d(${this.platform.ruler.contentScrollLeft}px, ${this.platform.ruler.contentScrollTop}px, 0) scale(${this.zoom})`
				}
				return false
			}
			if (e.shiftKey) {
				if (+new Date() - this.scrollXTime >= 500) {
					this.contentScrollLeft += e.wheelDeltaY > 0 ? 100 : -100
					this.contentMoveFence()
					this.scrollXTime = +new Date()
					dragContent.style.transform = `translate3d(${this.platform.ruler.contentScrollLeft}px, ${this.platform.ruler.contentScrollTop}px, 0) scale(${this.zoom})`
				}
				return false
			}
			if (+new Date() - this.scrollYTime >= 500) {
				this.platform.ruler.contentScrollTop += e.wheelDeltaY > 0 ? 100 : -100
				this.contentMoveFence()
				this.scrollYTime = +new Date()
				dragContent.style.transform = `translate3d(${this.platform.ruler.contentScrollLeft}px, ${this.platform.ruler.contentScrollTop}px, 0) scale(${this.zoom})`
			}
		},
		/**
		 * @description 恢复默认缩放比例+居中
		 */
		resetZoom(e) {
			e && e.stopPropagation()
			this.platform.ruler.zoomIndex = this.platform.ruler.zooms.findIndex(item => item === 1)
			const id = this.platform.ruler.dragId
			const dragContent = document.getElementById(id)
			const {offsetWidth, offsetHeight} = document.body
			if (!dragContent) return
			const {width, height} = dragContent.getBoundingClientRect()
			const deltaX = (offsetWidth - width) * 0.5
			const deltaY = (offsetHeight - height) * 0.5
			this.platform.ruler.contentScrollLeft = Math.ceil(deltaX)
			this.platform.ruler.contentScrollTop = Math.ceil(deltaY)
			dragContent.style.transform = `translate3d(${this.platform.ruler.contentScrollLeft}px, ${this.platform.ruler.contentScrollTop}px, 0) scale(${this.zoom})`
		},
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
		setTimeout(() => {
			this.resetZoom()
		})
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
