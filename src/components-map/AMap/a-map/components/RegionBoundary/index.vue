区域边界线
<script>
import overlayMixin from '../../mixins/overlayMixin.js'
export default {
	name: 'RegionBoundary',
	mixins: [overlayMixin],
	mounted() {
		this.$amap.on('zoomend', this.handleMapZoomChange)
	},
	methods: {
		init() {
			this.drawRegionBoundary()
		},
		drawRegionBoundary() {
			const districtInstance = new window.AMap.DistrictSearch({
				extensions: 'all',
				subdistrict: 0,
				level: 'city',
				showbiz: false,
			})
			const districts = ['杭州市']
			this.instanceArr = []
			const map = this.$amap
			if (!map) return false
			districts.forEach(area => {
				districtInstance.search(area, (status, result) => {
					const bounds = result.districtList[0].boundaries
					if (bounds) {
					  console.log('bounds')
					  console.log(bounds)
						for (let i = 0, l = bounds.length; i < l; i++) {
							const instance = new window.AMap.Polygon({
								path: bounds[i],
								map: map,
								strokeWeight: 1,
								fillOpacity: 0.5,
								fillColor: '#0054B7',
								strokeOpacity: '1',
								strokeStyle: 'dashed',
								strokeColor: '#509CE1',
								strokeDasharray: [3, 6],
								extData: {
									area: area,
								},
							})
							this.instanceArr.push(instance)
						}
					}
				})
			})
		},
		handleMapZoomChange() {
			if (!this.visible) return false
			const operateName = this.$amap.getZoom() > 12 ? 'hide' : 'show'
			this.instanceArr.forEach(instance => {
				instance[operateName]()
			})
		},
	},
	render() {
		return null
	},
	beforeDestroy() {
		this.$amap.off('zoomend', this.handleMapZoomChange)
	},
}
</script>
