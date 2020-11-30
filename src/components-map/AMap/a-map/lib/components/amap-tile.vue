<script>
import getHangZhouGasGISPosition from './getHangZhouGasGISPosition';
function findAmapRoot() {
	if (this.$amap) return this.$amap;
	let parent = this.$parent;
	if (parent) {
		let fun = findAmapRoot.bind(parent);
		return fun();
	}
}
export default {
	name: 'amap-tile',
	render(h) {},
	props: {
		opacity: {
			type: Number,
			default: 1,
		},
		detectRetina: false,
		zIndex: {
			type: Number,
			default: 120,
		},
		visible: {
			type: Boolean,
			default: true,
		},
		getTileUrl: {
			type: Function,
		},
	},
	watch: {
		visible: {
			handler(val) {
				if (val) {
					if (this.originInstance) {
						this.originInstance.zIndex = this.zIndex;
					} else {
						this.load();
					}
				} else {
					this.originInstance.zIndex = 0;
				}
			},
		},
	},
	created() {
		let fun = findAmapRoot.bind(this);
		this.$amap = fun();
		if (this.visible) {
			this.load();
		}
	},
	methods: {
		load() {
			const { BMap, opacity, zIndex, getTileUrl } = this;
			if (!getTileUrl) {
				return false;
			}
			this.originInstance = new AMap.TileLayer({
				zIndex,
				opacity,
				getTileUrl: getTileUrl,
			});
			this.$amap.addLayer(this.originInstance);
		},
	},
	beforeDestroy() {
		this.originInstance && this.$map.remove(this.originInstance);
	},
};
</script>
