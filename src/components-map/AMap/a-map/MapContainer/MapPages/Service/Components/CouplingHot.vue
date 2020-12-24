<!-- 联码数量热力 -->
<script>
import overlayMixin from '../../../../mixins/overlayMixin.js';
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
			}

			this._instance = new AMap.Heatmap(this.$amap, {
				radius: 10, //给定半径
				// opacity: [0, 0.8],
				zIndex: 1000,
				'3d': {
					//热度转高度的曲线控制参数，可以利用左侧的控制面板获取
					heightBezier: [0, 0, 0, 0],
					//取样精度，值越小，曲面效果越精细，但同时性能消耗越大
					gridSize: 1,
					heightScale: 0,
				},
			});
			this._instance.setDataSet({
				data: this._heatMapData,
				max: 15000,
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
};
</script>

