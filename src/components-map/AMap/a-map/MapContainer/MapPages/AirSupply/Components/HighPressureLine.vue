<script>
import overlayMixin from '../../mixins/overlayMixin.js';
export default {
	name: 'HighPressureLine',
	mixins: [overlayMixin],
	methods: {
		init() {
			this.drawLine();
		},
		async drawLine() {
			this.instanceArr = [];
			let data = await this.$sysApi.map.home.getHighPressureLine();
			data.forEach(line => {
				let polyLine = new AMap.Polyline({
					...line,
					zIndex: 200,
					strokeWeight: 4,
				});
				if (this.instanceArr) {
					this.$amap.add(polyLine);
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

