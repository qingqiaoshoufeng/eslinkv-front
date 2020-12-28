区域边界线
<script>
import overlayMixin from '../../../../mixins/overlayMixin.js'
import axios from 'axios'
export default {
	name: 'SaleAreaBoundary',
	mixins: [overlayMixin],
	props: {
		selectAreaChange: {
			type: Function,
		},
		value: {
			type: String,
			default: '',
		},
	},

	methods: {
		init() {
			this.drawSaleAreaBoundary()
		},
		drawSaleAreaBoundary() {
			axios.get('/static/amap/json/saleArea.json').then((res) => {
				let saleAreaJson = res.data || []
                this._instanceMap = {}
				let map = this.$amap
				if (!map) return false
				Object.keys(saleAreaJson).forEach((area, index) => {
					this._instanceMap[area] = index
					let instance = new window.AMap.Polygon({
						path: saleAreaJson[area],
						map,
						zIndex: 2000,
						strokeWeight: 1,
						fillOpacity: 0,
						fillColor: '#0085FF',
						strokeOpacity: 1,
						strokeStyle: 'dashed',
						strokeColor: '#FFDC45',
						extData: {
							area: area,
						},
						strokeDasharray: [5, 2],
					})
					if (this.instanceArr) {
						this.instanceArr.push(instance)
					}
					//默认选中
					if (this.value) {
						let instanceIndex = this._instanceMap[this.value]
						this.instanceArr[instanceIndex].setOptions({
							fillOpacity: 0.6,
						})
					}
				})
			})
		},
	},
	render() {
		return null
	},
}
</script>
