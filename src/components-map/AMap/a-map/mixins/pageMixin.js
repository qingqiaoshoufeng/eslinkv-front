export default {
	inject: ['parentInfo'],
	created() {
		this.$amap = this.$parent.$amap
	},
	methods: {
		/**
		 *
		 * @param {Number} topOffestRatio 上移动百分比
		 * @param {Number} scaleRatio     缩放
		 * @param {Number} offsetLeftRatio     距离左侧的比例
		 */
		mapFitView(topOffestRatio = 0, scaleRatio = 0, offsetLeftRatio = 0) {
			const latDiff = 1.377759
			const topOffest = topOffestRatio * latDiff // 上移经纬度
			const scale = (scaleRatio / 2) * latDiff // 缩放
			const { parentInfo } = this
			const { scaleRatio: screenScaleRatio } = parentInfo || {}
			// 上下偏移，缩放
			this.$amap.setFitView([
				new AMap.Marker({
					position: [118.344933, 29.288757 - topOffest + scale],
				}),
				new AMap.Marker({
					position: [120.721945, 30.496516 - topOffest - scale],
				}),
			])
			// x轴向偏移
			if (offsetLeftRatio) {
				const avaliableAreaWidth = 1.53 * 1050 * screenScaleRatio // 杭州区域的宽度
				const paddingRight =
					3500 * screenScaleRatio * (1 - offsetLeftRatio) -
					(3500 * screenScaleRatio - avaliableAreaWidth) / 2
				this.$amap.panBy(-paddingRight, 0, 0)
			}
		},
		/**
		 *
		 * @param {Number} topOffestRatio 上移动百分比
		 * @param {Number} scaleRatio     缩放
		 * @param {Number} offsetLeftRatio     距离左侧的比例
		 */
		mapFitView2(arr = []) {
			if (!arr.length) {
				return false
			}
			const markers = arr.map(item => {
				return new AMap.Marker({
					position: [item.lng, item.lat],
				})
			})
			this.$amap.setFitView(markers, true)
			// 覆盖zoom 和 center
			setTimeout(() => {
				const { lat, lng } = this.$amap.getCenter()
				this.zoom = this.$amap.getZoom()
				this.center = [lng, lat]
			}, 1000)
		},
	},
}
