<template>
	<div class="map_button_box">
		<div class="three-button" @click="toggerMapStyle('3d')">3D地图</div>
		<div class="satellite-button" @click="toggerMapStyle('Satellite')">
			卫星地图
		</div>
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
		return { sateLayer: null };
	},
	created() {},
	mounted() {
		setTimeout(() => {
			let fun = findAmapRoot.bind(this);
			this.$amap = fun();
			// this.load();
			// this.$amap.on('zoomstart', this.handleMapZoomChangeStart);
			// this.$amap.on('zoomend', this.handleMapZoomChangeEnd);
		}, 300);
		this.createdSatellite();
	},
	methods: {
		createdSatellite() {
			this.sateLayer = new AMap.TileLayer.Satellite();
			console.log(AMap.TileLayer.Satellite);
			console.log(this.sateLayer);
		},
		toggerMapStyle(val) {
			console.log(this.$amap);
			console.log(this.sateLayer);
			if (val === 'Satellite') {
				this.$amap.add(this.sateLayer); //添加图层到地图
				this.sateLayer.show();
			} else {
				this.sateLayer.hide();
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.map_button_box {
	position: fixed;
	bottom: -5px;
	right: -27px;
	z-index: 10000000;
	display: flex;
	transform: scale(0.4);
	.three-button {
		width: 110px;
		height: 30px;
		border: 1px solid #00ddff;
		box-sizing: border-box;
		line-height: 30px;
		text-align: center;
	}
	.satellite-button {
		width: 110px;
		height: 30px;
		border: 1px solid #00ddff;
		box-sizing: border-box;
		color: #fff;
		line-height: 30px;
		text-align: center;
	}
}
</style>
