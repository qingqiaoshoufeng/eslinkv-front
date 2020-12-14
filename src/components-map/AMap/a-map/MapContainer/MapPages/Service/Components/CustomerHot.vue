<!-- 联码数量热力 -->
<script>
import overlayMixin from '../../../../mixins/overlayMixin.js';
export default {
	name: 'useHotYear',
	mixins: [overlayMixin],
	props: {
		data: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	watch: {
		visible(val) {
			if (val) {
				this.init();
			} else {
				if (this._instance) {
					this._instance.removeFromMap();
					this._instance = null;
				}
			}
		},
	},
	mounted() {
		console.log(this.$amap, 'this.$amap');
		this.$amap.on('zoomstart', this.handleMapZoomChangeStart);
		this.$amap.on('zoomend', this.handleMapZoomChangeEnd);
		window.bbb = this.init;
		window.ccc = this._instance;
		let zoom = this.$amap.getZoom();
		console.log(zoom);
	},
	methods: {
		handleMapZoomChangeStart() {},
		handleMapZoomChangeEnd() {
			let zoom = this.$amap.getZoom();
			console.log(zoom);
			this._instance.setOptions({
				// radius: 8,
			});
		},
		async init(max = 6000) {
			if (!this._heatMapData) {
				this._heatMapData = this.data;
				// this._heatMapData = await this.$sysApi.map.serve.getHeatMapList();
				// console.log(this._heatMapData, 5555);
				// this._heatMapData = this._heatMapData.slice(0, 180);
			}
			// console.log(this._heatMapData, 6666);
			this._instance = new AMap.HeatMap(this.$amap, {
				radius: 8, //给定半径
				opacity: [0, 0.8],
			});
			this._instance.setDataSet({
				data: this._heatMapData,
				max,
			});
		},
	},
	render() {
		return null;
	},
	beforeDestroy() {
		this.$amap.off('zoomstart', this.handleMapZoomChangeStart);
		this.$amap.off('zoomend', this.handleMapZoomChangeEnd);
		if (this._instance) {
			this._instance.removeFromMap();
			this._instance = null;
		}
	},
};
</script>

