export default {
	props: {
		zooms: {
			type: Array,
			default: () => [0.25, 0.5, 1, 2, 4]
		}
	},
	data() {
		return {
			zoomIndex: -1,
			zoomLength: 0
		}
	},
	watch: {
		zooms: {
			handler: function (val) {
				this.resetZoom()
			},
			immediate: true
		},
		zoom: {
			handler: function (zoom, oldZoom) {
				this.$emit('zoom', zoom)
				this.setContentScroll(zoom, oldZoom)
			},
			immediate: true
		}
	},
	computed: {
		zoom() {
			return this.zooms[this.zoomIndex]
		}
	},
	methods: {
		/**
		 * @description 根据鼠标位置进行缩放不同角度
		 * // 叶海清 todo 算法错误
		 * // 个人建议可以先去除该方法
		 */
		setContentScroll(zoom, oldZoom) {
			if (!this.$refs.content) return
			const deltaZoom = zoom - oldZoom
			const {left, top, width, height} = this.$refs.content.getBoundingClientRect()
			// todo 算法错误
			const deltaX = (this.clientX - left) * deltaZoom * 0.5
			const deltaY = (this.clientY - top) * deltaZoom * 0.5
			// console.info(left, top, width, height, deltaX, deltaY)
			this.contentScrollLeft += Math.ceil(deltaX)
			this.contentScrollTop += Math.ceil(deltaY)
		},
		/**
		 * @description 设置缩放比例
		 *
		 * e.wheelDeltaY 滚轮方向
		 */
		handleWheelSetZoom(e) {
			e.wheelDeltaY > 0 ? this.zoomIndex++ : this.zoomIndex--
			if (this.zoomIndex < 0) this.zoomIndex = 0
			if (this.zoomIndex >= this.zoomLength) this.zoomIndex = this.zoomLength - 1
			requestAnimationFrame(() => {
				this.scaleCalc()
			})
		},
		/**
		 * @description 恢复默认缩放比例
		 */
		resetZoom(e) {
			e && e.stopPropagation()
			this.zoomIndex = this.zooms.findIndex(item => item === 1)
			this.zoomLength = this.zooms.length
		},
		resetContentZoom() {
			this.zoomIndex = this.zooms.findIndex(item => item === 1)
		},
		/**
		 * @description 根据缩放比例生成 x,y刻度
		 */
		scaleCalc() {
			const rulerRange = this.rulerRange
			const getCalc = (array, length) => {
				const step = this.stepLength / this.zoom
				for (let id = 0; id < length * step / 50; id += step) {
					if (id % step === 0) {
						array.push({id})
					}
				}
			}
			const getCalcRevise = (array, length) => {
				array.splice(0)
				const step = this.stepLength / this.zoom
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
			this.$debug('ruler', '根据缩放比例生成 x,y刻度')
		},
	}
}
