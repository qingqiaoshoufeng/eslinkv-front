<!-- 操作数量热力 -->
<script>
import overlayMixin from '../../../../mixins/overlayMixin.js';
export default {
	name: 'OperationHot',
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
                this._instance.show()
			} else {
                this._instance.hide()
			}
		},
	},
	methods: {
		async init() {
			if (!this._heatMapData) {
				this._heatMapData = this.data;
				// this._heatMapData = await this.$sysApi.map.serve.getHeatMapList();
				// console.log(this._heatMapData, 5555);
				// this._heatMapData = this._heatMapData.slice(180);
			}

			this._instance = new AMap.Heatmap(this.$amap, {
				radius: 8, //给定半径
				opacity: [0, 0.8],
			});
			this._instance.setDataSet({
				data: this._heatMapData,
				max: 8000,
            });
		},
	},
	render() {
		return null;
	},
	beforeDestroy() {
		if (this._instance) {
            this.heatmap.setMap(null);
			this._instance = null;
		}
	},
};
</script>

