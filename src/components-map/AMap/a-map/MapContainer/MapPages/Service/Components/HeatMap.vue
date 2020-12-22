<!-- 销气热力 -->
<script>
// import heatMapData from '@/assets/amap/json/heatMap.json';
import overlayMixin from '../../../../mixins/overlayMixin.js';
export default {
	mixins: [overlayMixin],
	data: function () {
		return {};
	},
	methods: {
		async init() {
			let data = await this.$sysApi.map.serve.getHeatMapList();
			let instance = new AMap.Heatmap(this.$amap, {
				radius: 100, //给定半径
				opacity: [0, 0.8],
				zIndex: 1000,
			});

			instance.setDataSet({
				data: data,
				max: 12000,
			});

			if (this.instanceArr) {
				this.instanceArr.push(instance);
			}
		},
	},
	render() {
		return null;
	},
};
</script>

