import platform from '../../../store/platform.store'

export default {
	data() {
		return {
			platform: platform.state,
			zoomUpdateTime: new Date() * 1
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
				this.setContentScroll(zoom, oldZoom)
			},
			immediate: true
		}
	},
	computed: {
		zoomLength(){
			return this.platform.ruler.zooms.length
		},
		zoom() {
			return this.platform.ruler.zooms[this.platform.ruler.zoomIndex]
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
			const deltaX = (this.clientX - left) * deltaZoom * 0.5
			const deltaY = (this.clientY - top) * deltaZoom * 0.5
			// console.info(left, top, width, height, deltaX, deltaY)
			this.platform.ruler.contentScrollLeft += Math.ceil(deltaX)
			this.platform.ruler.contentScrollTop += Math.ceil(deltaY)
		},
		/**
		 * @description 设置缩放比例
		 *
		 * e.wheelDeltaY 滚轮方向
		 */
		handleWheelSetZoom(e) {
			if (new Date() * 1 - this.zoomUpdateTime >= 500) {
				e.wheelDeltaY > 0 ? this.platform.ruler.zoomIndex++ : this.platform.ruler.zoomIndex--
				if (this.platform.ruler.zoomIndex < 0) this.platform.ruler.zoomIndex = 0
				if (this.platform.ruler.zoomIndex >= this.zoomLength) this.platform.ruler.zoomIndex = this.zoomLength - 1
				requestAnimationFrame(() => {
					this.scaleCalc()
				})
				this.zoomUpdateTime = new Date() * 1
			}
		},
		/**
		 * @description 恢复默认缩放比例
		 */
		resetZoom(e) {
			e && e.stopPropagation()
			this.platform.ruler.zoomIndex = this.platform.ruler.zooms.findIndex(item => item === 1)
		},
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
	}
}
