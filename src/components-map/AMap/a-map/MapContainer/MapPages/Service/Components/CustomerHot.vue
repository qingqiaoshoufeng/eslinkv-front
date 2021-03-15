<!-- 联码数量热力 -->
<script>
	import overlayMixin from '../../../../mixins/overlayMixin.js'
	export default {
		name: 'useHotYear',
		mixins: [overlayMixin],
		props: {
			data: {
				type: Array,
				default () {
					return []
				}
			}
		},
		watch: {
			visible (val) {
				if (val) {
					this._instance.show()
				} else {
					if (this._instance) {
						this._instance.hide()
					}
				}
			}
		},
		mounted () {
			// console.log(this.$amap, 'this.$amap');
			const zoom = this.$amap.getZoom()
		},
		methods: {
			async init (max = 3000) {
				if (!this._heatMapData) {
					this._heatMapData = this.data
				}
				this._instance = new AMap.Heatmap(this.$amap, {
					radius: 20, // 给定半径
					opacity: [0, 0.8],
					zIndex: 1000
				})
				this._instance.setDataSet({
					data: this._heatMapData,
					max: 9000
				})
			}
		},
		render () {
			return null
		},
		beforeDestroy () {
			if (this._instance) {
				this._instance.setMap(null)
				this._instance = null
			}
		}
	}
</script>

