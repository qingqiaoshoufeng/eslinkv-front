<template>
	<div class="map_button_box">
		<div class="three-button">3D地图</div>
		<div class="satellite-button">卫星地图</div>
	</div>
</template>
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
	data() {
		sateLayer: null;
	},
	created() {},
	mounted() {
		setTimeout(() => {
			let fun = findAmapRoot.bind(this);
			this.$amap = fun();
			this.load();
			// this.$amap.on('zoomstart', this.handleMapZoomChangeStart);
			// this.$amap.on('zoomend', this.handleMapZoomChangeEnd);
		}, 300);
	},
	methods: {
		createdSatellite() {
			this.sateLayer = new AMap.TileLayer.Satellite();
		},
	},
};
</script>
<style lang="scss" scoped>
.map_button_box {
	display: flex;
	bottom: 32px;
	right: 32px;
	.three-button {
		width: 110px;
		height: 30px;
		border: 1px solid #00ddff;
		box-sizing: border-box;
	}
	.satellite-button {
		width: 110px;
		height: 30px;
		border: 1px solid #00ddff;
		box-sizing: border-box;
	}
}
</style>
