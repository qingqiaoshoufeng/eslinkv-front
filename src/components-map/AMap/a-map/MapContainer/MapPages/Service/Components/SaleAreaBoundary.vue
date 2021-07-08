区域边界线
<script>
import overlayMixin from '../../../../mixins/overlayMixin.js'
import {
  getStationAreaRange,
} from '@/components-map-api/map.airSupply.api'
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
      getStationAreaRange({type: 'BranchCompany'}).then(res => {
				const saleAreaJson = res.branchCompanyList || []
				this._instanceMap = {}
				const map = this.$amap
				if (!map) return false
				Object.keys(saleAreaJson).forEach((area, index) => {
					this._instanceMap[area] = index
					const instance = new window.AMap.Polygon({
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
					// 默认选中
					if (this.value) {
						const instanceIndex = this._instanceMap[this.value]
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
