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
				this._instance.show();
			} else {
				if (this._instance) {
					this._instance.hide();
				}
			}
		},
	},
	methods: {
		async init() {
			if (!this._heatMapData) {
				this._heatMapData = this.data;
				// this._heatMapData = await this.$sysApi.map.serve.getHeatMapList();
				// console.log(this._heatMapData, 5555);
				// this._heatMapData = this._heatMapData.slice(0, 180);
			}
			// console.log(this._heatMapData, 6666);
			this._instance = new AMap.Heatmap(this.$amap, {
				radius: 10, //给定半径
                opacity: [0, 0.8],
                zIndex:1000
			});
			this._instance.setDataSet({
				data: this._heatMapData,
				max: 600000,
			});
		},
	},
	render() {
		return null;
	},
	beforeDestroy() {
		if (this._instance) {
			this._instance.setMap(null);
			this._instance = null;
		}
	},
	mounted() {},
};
</script>

