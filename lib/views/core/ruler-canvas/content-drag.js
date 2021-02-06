import platform from '../../../store/platform.store'

export default {
	data() {
		return {
			platform: platform.state,
			contentWidth: 0,
			contentHeight: 0,
			contentMoveStartX: 0, // 内容容器移动起始点水平时点值
			contentMoveStartY: 0, // 内容容器移动起始点垂直时点值
			contentMove: false, // 是否按下了 ctrl 键，启动内容区拖动
			contentDrag: false, // 是否正在执行内容区拖动
			contentDragStartTime: 0,
			contentDragDeltaTime: 0, // 内容区拖动时长
			contentDragDeltaX: 0, // 内容区拖动水平距离
			contentDragDeltaY: 0, // 内容区拖动垂直距离
			easingMoveTimer: null, // 内容区释放拖动后缓动定时器
			dragHoldTime: 0,
			scrollYTime: +new Date(),
			scrollXTime: +new Date(),
		}
	},
	computed: {
		/**
		 * @description 移动面板的宽度 缩放后的像素差（有正负）
		 */
		fixedWidth() {
			return this.contentWidth * (this.zoom - 1) / 2
		},
		/**
		 * @description 移动面板的高度 缩放后的像素差（有正负）
		 */
		fixedHeight() {
			return this.contentHeight * (this.zoom - 1) / 2
		},
		/**
		 * @description
		 *
		 * 距离左侧的刻度
		 * 移动面板的宽度 缩放后的像素差
		 * 去控制刻度显示和位移（有正负）
		 */
		hRulerScrollLeft() {
			return Math.ceil(this.platform.ruler.contentScrollLeft - this.fixedWidth - this.rulerRange / 2)
		},
		/**
		 * @description
		 *
		 * 距离顶侧的刻度
		 * 移动面板的高度 缩放后的像素差
		 * 去控制刻度显示和位移（有正负）
		 */
		vRulerScrollTop() {
			return Math.ceil(this.platform.ruler.contentScrollTop - this.fixedHeight - this.rulerRange / 2)
		},
		/**
		 * @description 放大缩小的面板dom
		 */
		contentRef() {
			return this.$refs.content.firstChild || {}
		},
		/**
		 * @description 面板放大缩小后处理的样式
		 */
		contentStyle() {
			console.log(this.platform.ruler.contentScrollTop)
			return {
				borderWidth: 18 + 'px',
				transform: `translate3d(${this.platform.ruler.contentScrollLeft}px, ${this.platform.ruler.contentScrollTop}px, 0) scale(${this.zoom})`,
				width: this.contentWidth + 18 * 2 + 'px',
				height: this.contentHeight + 18 * 2 + 'px',
				pointerEvents: this.contentMove ? 'none' : 'auto'
			}
		},
		/**
		 * @deprecated
		 * @description 放大缩小的面板dom 的父级
		 */
		contentRect() {
			return this.$refs.content && this.$refs.content.getBoundingClientRect() || {}
		},
		/**
		 * @deprecated
		 * @description 容器可拖动的水平量
		 */
		contentScrollRangeX() {
			return Math.ceil(this.contentWidth - this.windowWidth + this.platform.ruler.contentLayout.left * 2)
		},
		/**
		 * @deprecated
		 * @description 容器可拖动的垂直量
		 */
		contentScrollRangeY() {
			return Math.ceil(this.contentHeight - this.windowHeight + this.platform.ruler.contentLayout.top * 2)
		},
	},
	methods: {
		/**
		 * @description 拖动开始时
		 */
		handleContentMoveStart(e) {
			if (!this.contentMove) return
			if (this.easingMoveTimer) {
				clearTimeout(this.easingMoveTimer)
			}
			this.contentDragStartTime = Date.now()
			this.contentMoveStartX = e.clientX
			this.contentMoveStartY = e.clientY
			this.contentDrag = true
		},
		/**
		 * @description 拖动停止时
		 */
		handleContentMoveEnd() {
			if (!this.contentDrag) return
			this.contentDrag = false
			this.contentMoveStartX = this.contentMoveStartY = 0
			this.dragHoldTime = Date.now() - this.dragHoldTime
			if (this.dragHoldTime / 3 > this.contentDragDeltaTime) this.contentDragDeltaX = this.contentDragDeltaY = 0
			this.easingMove()
		},
		/**
		 * @description 每次移动距离差 与 移动距离 得出 释放缓动效果
		 */
		easingMove() {
			const deltaTime = this.contentDragDeltaTime
			this.platform.ruler.contentScrollLeft += Math.ceil(this.contentDragDeltaX / deltaTime * 200)
			this.platform.ruler.contentScrollTop += Math.ceil(this.contentDragDeltaY / deltaTime * 200)
			this.contentMoveFence()
		},
		// 内容区拖动围栏
		contentMoveFence() {
			const rulerRange = this.rulerRange
			const endX = -rulerRange
			const endY = -rulerRange
			if (this.platform.ruler.contentScrollLeft < endX) this.platform.ruler.contentScrollLeft = endX
			if (this.platform.ruler.contentScrollTop < endY) this.platform.ruler.contentScrollTop = endY
			const startX = 0 + rulerRange / 2
			const startY = 0 + rulerRange / 2
			if (this.platform.ruler.contentScrollLeft > startX) this.platform.ruler.contentScrollLeft = startX
			if (this.platform.ruler.contentScrollTop > startY) this.platform.ruler.contentScrollTop = startY
		},
		handleContentMove(clientX, clientY) {
			if (!this.contentMoveStartX) {
				this.contentMoveStartX = clientX
				this.contentMoveStartY = clientY
			}
			this.contentDragDeltaX = Math.ceil(clientX - this.contentMoveStartX)
			this.contentDragDeltaY = Math.ceil(clientY - this.contentMoveStartY)
			this.contentMoveStartX = clientX
			this.contentMoveStartY = clientY
			const time = Date.now()
			this.dragHoldTime = time
			this.contentDragDeltaTime = time - this.contentDragStartTime
			this.contentDragStartTime = time
			this.platform.ruler.contentScrollLeft += Math.ceil(this.contentDragDeltaX)
			this.platform.ruler.contentScrollTop += Math.ceil(this.contentDragDeltaY)
			this.contentMoveFence()
		},
		setContentScrollTop(e) {
			if (+new Date() - this.scrollYTime >= 500) {
				this.platform.ruler.contentScrollTop += e.wheelDeltaY > 0 ? 100 : -100
				this.contentMoveFence()
				this.scrollYTime = +new Date()
			}
		},
		setContentScrollLeft(e) {
			if (+new Date() - this.scrollXTime >= 500) {
				this.contentScrollLeft += e.wheelDeltaY > 0 ? 100 : -100
				this.contentMoveFence()
				this.scrollXTime = +new Date()
			}
		},
		resetContentMove() {
			let left = 0
			let top = 0
			const {width, height} = this.$el.getBoundingClientRect()
			const w = this.contentWidth
			const h = this.contentHeight
			if (width > w) left = Math.ceil((width - w) / 2)
			if (height > h) top = Math.ceil((height - h) / 2)
			this.platform.ruler.contentScrollLeft = left
			this.platform.ruler.contentScrollTop = top
		}
	},
	watch: {
		'platform.ruler.contentLayout': {
			handler: function (offset) {
				this.platform.ruler.contentScrollLeft = offset.left
				this.platform.ruler.contentScrollTop = offset.top
			},
			immediate: true,
			deep: true
		},
		contentMove(value) {
			this.$emit('content-move', value)
		}
	}
}
