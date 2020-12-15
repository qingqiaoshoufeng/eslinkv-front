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
	mounted() {
		console.log(this.$amap, 'this.$amap');
		let zoom = this.$amap.getZoom();
	},
	methods: {
		async init(max = 3000) {
			if (!this._heatMapData) {
				this._heatMapData = this.data;
			}
			this._instance = new AMap.Heatmap(this.$amap, {
                radius: 20, //给定半径
                opacity: [0, 0.8],
                zIndex:1000,
				// gradient: {
				// 	0.8: '#00D1FF',
				// 	0.65: 'rgb(117,211,248)',
				// 	0.7: 'rgb(0, 255, 0)',
				// 	0.9: '#ffea00',
				// 	1.0: 'red',
				// },
            });
            window.ccc = this._instance
			this._instance.setDataSet({
				data: this._heatMapData,
				max:9000,
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

