<script>
	import overlayMixin from '../../../../mixins/overlayMixin.js'
	export default {
		name: 'HighPressureLine_Process',
		mixins: [overlayMixin],
		methods: {
			init () {
				this.drawLine()
			},

			async drawLine () {
				this.instanceArr = []
				let data = []
				if (this.data) {
					data = this.data
				} else {
					data = await this.$api.map.mock.getHighPressureLineProcess()
				}
				data.forEach(line => {
					const polyLine = new AMap.Polyline({
						...line,
						zIndex: 200,
						strokeWeight: 4,
						strokeColor: '#04F499'
					})
					if (this.instanceArr) {
						polyLine.setMap(this.$amap)
						this.instanceArr.push(polyLine)
					}
				})
			}
		},
		render () {
			return null
		}
	}
</script>

