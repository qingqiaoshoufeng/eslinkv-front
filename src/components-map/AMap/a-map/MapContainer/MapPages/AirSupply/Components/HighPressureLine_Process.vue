<script>
import overlayMixin from '../../mixins/overlayMixin.js';
export default {
	name: 'HighPressureLine_Process',
	mixins: [overlayMixin],
	methods: {
		init() {
			this.drawLine();
		},
		async drawLine() {
			this.instanceArr = [];
			let data = await this.$sysApi.map.home.getHighPressureLineProcess();
			data.forEach(line => {
				let polyLine = new AMap.Polyline({
					...line,
					zIndex: 200,
					strokeWeight: 4,
				});
				if (this.instanceArr) {
					polyLine.setMap(this.$amap);
					this.instanceArr.push(polyLine);
				}
			});
		},
	},
	render() {
		return null;
	},
};
</script>

