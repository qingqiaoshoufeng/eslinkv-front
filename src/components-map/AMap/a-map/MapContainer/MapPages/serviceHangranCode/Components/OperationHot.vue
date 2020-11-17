<script>
// import heatMapData from '@/assets/amap/json/heatMap.json';
import overlayMixin from '../../mixins/overlayMixin.js';
export default {
	mixins: [overlayMixin],
	data: function () {
		return {};
	},
	methods: {
		async init() {
			let apiFun = await this.$sysApi.map.serve.getHeatMapList();
			console.log(apiFun);
			let instance = new AMap.HeatMap(this.$amap, {
				radius: 80, //给定半径
				opacity: [0, 0.8],
			});

			instance.setDataSet({
				data: apiFun,
				max: 4000,
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

