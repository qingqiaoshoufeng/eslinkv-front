<script>
import heatMapData from '@/assets/amap/json/heatMap.json';
import overlayMixin from '../../mixins/overlayMixin.js';
export default {
	mixins: [overlayMixin],
	methods: {
		init() {
			// let map = this.$parent.map;
			let instance = new AMap.HeatMap(this.$amap, {
				radius: 80, //给定半径
				opacity: [0, 0.8],
			});
			instance.setDataSet({
				data: heatMapData,
				max: 4000,
			});
			this.instanceArr.push(instance);
		},
	},
	render() {
		return null;
	},
};
</script>

