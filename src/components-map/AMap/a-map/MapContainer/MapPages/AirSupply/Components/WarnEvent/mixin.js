export default {
	data() {
		return {
			activeWarnData: {},
            
		};
	},
	methods: {
		handleListClick(overlay, overlayType) {
			let { lng, lat, } = overlay;
			overlay.overlayType = overlayType || overlay.overlayType;
			this.activeWarnData = overlay;
			this.setZoomAndPanTo(lng, lat);
		},
		closeWarnEventDetail() {
			this.activeWarnData = {};
			this.$amap.setZoom(this.zoom, 100);
			this.$amap.setCenter(this.center, 100);
		},
	}
};