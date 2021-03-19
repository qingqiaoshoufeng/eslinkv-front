<template></template>
<script>
	export default {
		name: 'amap-tile',
		inject: ['getMap'],
		props: {
			opacity: {
				type: Number,
				default: 1
			},
			detectRetina: false,
			zIndex: {
				type: Number,
				default: 120
			},
			visible: {
				type: Boolean,
				default: true
			},
			getTileUrl: {
				type: Function
			}
		},
		watch: {
			visible (val) {
				if (!this.originInstance) {
					return false
				}
				if (val) {
					this.originInstance.show()
				} else {
					setTimeout(() => {
						this.originInstance.hide()
					}, 1000)
				}
			}
		},

		mounted () {
			setTimeout(() => {
				this.$amap = this.getMap()
				this.load()
				this.$amap.on('zoomstart', this.handleMapZoomChangeStart)
				this.$amap.on('zoomend', this.handleMapZoomChangeEnd)
			}, 300)
		},
		methods: {
			load () {
				const { BMap, opacity, zIndex, getTileUrl } = this
				if (!getTileUrl) {
					return false
				}
				this.originInstance = new AMap.TileLayer({
					zIndex: zIndex,
					opacity,
					getTileUrl: getTileUrl,
					map: this.$amap
				})
			},
			reload () {
				this.$nextTick(() => {
					this.originInstance && this.originInstance.reload()
				})
			},
			handleMapZoomChangeStart () {
				if (this.visible) {
					this.originInstance.hide()
				}
			},
			handleMapZoomChangeEnd () {
				if (this.timerZoomEnd) {
					clearTimeout(this.timerZoomEnd)
				}
				this.timerZoomEnd = setTimeout(() => {
					if (this.visible) {
						this.originInstance.show()
						this.reload()
					}
				}, 0)
			}
		},
		beforeDestroy () {
			this.originInstance && this.$amap.remove(this.originInstance)
			this.$amap.off('zoomstart', this.handleMapZoomChangeStart)
			this.$amap.off('zoomend', this.handleMapZoomChangeEnd)
		}
	}
</script>
