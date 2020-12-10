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
		this.$amap.on('zoomstart', this.handleMapZoomChangeStart);
		this.$amap.on('zoomend', this.handleMapZoomChangeEnd);
	},
	methods: {
		load() {
			const { BMap, opacity, zIndexInner, getTileUrl } = this;
			if (!getTileUrl) {
				return false;
			}
			this.originInstance = new AMap.TileLayer({
				zIndex: zIndexInner,
				opacity,
				getTileUrl: getTileUrl,
			});
			this.$amap.addLayer(this.originInstance);
		},
		reload() {
			this.$nextTick(() => {
				this.originInstance && this.originInstance.reload();
			});
		},
		handleMapZoomChangeStart() {
			this.originInstance.setzIndex(-1);
		},
		handleMapZoomChangeEnd() {
            if(this.timerZoomEnd){
                clearTimeout(this.timerZoomEnd)
            }
			this.timerZoomEnd = setTimeout(() => {
				this.originInstance.setzIndex(this.zIndex);
				this.reload();
			}, 200);
		},
	},
	beforeDestroy() {
		this.originInstance && this.$amap.remove(this.originInstance);
		this.$amap.off('zoomstart', this.handleMapZoomChangeStart);
		this.$amap.off('zoomend', this.handleMapZoomChangeEnd);
	},
};
</script>
