<script>
import heatMapData from '@/assets/amap/json/heatMap.json';
import overlayMixin from '../mixins/overlayMixin.js';
export default {
	mixins: [overlayMixin],
	created() {
		this.initHeatMap();
	},
	methods: {
		initHeatMap() {
			let map = this.$parent.map;
			this.instance = new AMap.HeatMap(map, {
				radius: 80, //给定半径
				opacity: [0, 0.8],
			});
			this.instance.setDataSet({
				data: heatMapData,
				max: 4000,
			});
		},
	},
	render() {
		return null;
	},
};
</script>

