export default {
	props: {
		legendMap: {
			type: Object,
			default() {
				return {}
			},
		},
		activeItem: {
			type: Object,
			default() {
				return {}
			},
		},
	},
	data() {
		return {
			activeOverlay: {},
			showOverlayDetail: false,
		}
	},
	watch: {
		activeItem(val) {
			if (JSON.stringify(val) === '{}') return false
			this.handleOverlayClick(val, 'WARN')
		},
	},

	methods: {
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			let { lng, lat } = overlay
			overlay.overlayType = overlayType
			this.activeOverlay = overlay
			this.showOverlayDetail = true
			this.$amap.setZoom(14)
			if (isCenter) {
				this.$nextTick(() => {
					this.$amap.panTo([lng, lat])
				})
			}
		},
		closeOverlayDetail(done) {
			this.showOverlayDetail = false
			this.activeOverlay = {}
			this.$emit('close')
			this.$amap.setZoom(11)
			done()
		},
	},
}
