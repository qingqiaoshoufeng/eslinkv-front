区域边界线
<script>
import overlayMixin from '../../mixins/overlayMixin.js';
import axios from 'axios';
export default {
	name: 'SaleAreaBoundary',
	mixins: [overlayMixin],
	methods: {
		init() {
			this.drawSaleAreaBoundary(this.$amap);
		},
		drawSaleAreaBoundary(map) {
			axios.get('/static/amap/json/saleArea.json').then(res => {
				let saleAreaJson = res.data || [];
				Object.keys(saleAreaJson).forEach(area => {
					let instance = new window.AMap.Polygon({
						path: saleAreaJson[area],
                        map,
                        zIndex:2000,
						strokeWeight: 2,
						fillOpacity: 0,
						strokeOpacity: 1,
						strokeStyle: 'dashed',
						strokeColor: '#FFDC45',
						extData: {
							area: area,
						},
					});
					this.instanceArr.push(instance);
				});
			});
		},
	},
	render() {
		return null;
	},
};
</script>

