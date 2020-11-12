<script>
import overlayMixin from '../../mixins/overlayMixin.js';
//高压线数据
import GaoYaLineJSON from '@/assets/amap/json/gaoya.json';
export default {
	name: 'HighPressureLine_Process',
	mixins: [overlayMixin],
	props: {
		strokeWeight: {
			type: Number,
			default: 3,
		},
		strokeColor: {
			type: String,
			default: '#04F499',
		},
	},
	methods: {
		init() {
			this.drawLine();
		},
		drawLine() {
			let { strokeWeight, strokeColor } = this;
			var geoJSON = new window.AMap.GeoJSON({
				geoJSON: GaoYaLineJSON,
				getPolyline: function(geojson, lnglats) {
					return new AMap.Polyline({
						path: lnglats,
						zIndex: 200,
						strokeWeight: strokeWeight,
						strokeColor: strokeColor,
					});
				},
			});
			this.$amap.add(geoJSON);
			this.instanceArr.push(geoJSON);
		},
	},
	render() {
		return null;
	},
};
</script>

