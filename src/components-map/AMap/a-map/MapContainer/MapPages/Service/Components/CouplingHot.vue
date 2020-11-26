<!-- 联码数量热力 -->
<script>
import overlayMixin from '../../mixins/overlayMixin.js';
export default {
	name: 'CouplingHot',
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
			console.log(val, 'aaa');
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
	methods: {
		async init() {
			if (!this._heatMapData) {
				this._heatMapData = this.data;
				// this._heatMapData = this._heatMapData.slice(0, 200);
			}
			this._instance = new AMap.HeatMap(this.$amap, {
				radius: 30, //给定半径
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

