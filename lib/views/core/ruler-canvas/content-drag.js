import platform from '../../../store/platform.store'

export default {
	data() {
		return {
			platform: platform.state,
			contentWidth: 0,
			contentHeight: 0,
			contentMoveStartX: 0, // 内容容器移动起始点水平时点值
			contentMoveStartY: 0, // 内容容器移动起始点垂直时点值
			contentMove: false, // 是否按下了 空格 键，启动内容区拖动
			contentDrag: false, // 是否正在执行内容区拖动
			contentDragDeltaX: 0, // 内容区拖动水平距离
			contentDragDeltaY: 0, // 内容区拖动垂直距离
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
			if (this.dragHoldTime / 3 > this.contentDragDeltaTime) this.contentDragDeltaX = this.contentDragDeltaY = 0
		},
		// 内容区拖动围栏
		contentMoveFence() {
			const rulerRange = this.rulerRange
			const endX = -rulerRange
			const endY = -rulerRange
			if (this.platform.ruler.contentScrollLeft < endX) this.platform.ruler.contentScrollLeft = endX
			if (this.platform.ruler.contentScrollTop < endY) this.platform.ruler.contentScrollTop = endY
			const startX = rulerRange / 2
			const startY = rulerRange / 2
			if (this.platform.ruler.contentScrollLeft > startX) this.platform.ruler.contentScrollLeft = startX
			if (this.platform.ruler.contentScrollTop > startY) this.platform.ruler.contentScrollTop = startY
		},
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
	}
}
