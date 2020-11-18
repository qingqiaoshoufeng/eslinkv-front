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
            console.log('suyan')
			data.forEach(line => {
				let polyLine = new AMap.Polyline({
					...line,
					zIndex: 200,
				});
				polyLine.setMap(this.$amap);
				this.instanceArr.push(polyLine);
			});
		},
	},
	render() {
		return null;
	},
};
</script>

