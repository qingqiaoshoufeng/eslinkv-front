<!-- 操作数量热力 -->
<script>
import overlayMixin from '../../mixins/overlayMixin.js';
export default {
	name: 'OperationHot',
	mixins: [overlayMixin],
	watch: {
		visible(val) {
			if (val) {
				this.init();
			} else {
				this._instance && this._instance.removeFromMap();
				this._instance = null;
			}
		},
	},
	methods: {
		async init() {
			if (!this._heatMapData) {
				this._heatMapData = await this.$sysApi.map.serve.getHeatMapList();
			}
			this._instance = new AMap.HeatMap(this.$amap, {
				radius: 80, //给定半径
				opacity: [0, 0.8],
			});
			this._instance.setDataSet({
				data: this._heatMapData,
				max: 4000,
			});
		},
	},
	render() {
		return null;
	},
	beforeDestroy() {
		if (this._instance) {
			this._instance.removeFromMap();
			this._instance = null;
		}
	},
};
</script>

