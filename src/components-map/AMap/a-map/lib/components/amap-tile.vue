<script>
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
	computed: {
		zIndexInner() {
			return this.visible ? this.zIndex : 0;
		},
	},
	watch: {
		visible: {
			handler(val) {
				this.originInstance.setzIndex(this.zIndexInner);
			},
		},
	},
	created() {
		let fun = findAmapRoot.bind(this);
		this.$amap = fun();
		this.load();
	},
	methods: {
		load() {
			const { BMap, opacity, zIndexInner, getTileUrl } = this;
			if (!getTileUrl) {
				return false;
			}
			this.originInstance = new AMap.TileLayer({
				zIndex:zIndexInner,
				opacity,
				getTileUrl: getTileUrl,
			});
			this.$amap.addLayer(this.originInstance);
		},
		reload() {
			this.originInstance && this.$amap.remove(this.originInstance);
			this.$nextTick(() => {
				this.load();
			});
		},
	},
	beforeDestroy() {
		this.originInstance && this.$amap.remove(this.originInstance);
	},
};
</script>
