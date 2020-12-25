<template></template>
<script>
export default {
	data() {
		return { sateLayer: null, count: 0 };
	},
	props: {
		value: { type: Boolean, default: false },
		map: {
			type: [Object, null],
			default: null,
		},
	},
	watch: {
		value: {
			handler(val) {
				console.log(this.map);

				this.toggerMapStyle(val);
			},
			// immediate: true,
		},
	},
	mounted() {
		this.createdSatellite();
	},
	methods: {
		createdSatellite() {
			// this.sateLayer = new AMap.TileLayer.Satellite();
			AMap.plugin(['AMap.MapType'], () => {
				this.map.addControl(
					new AMap.MapType({
						defaultType: 0, //使用2D地图
					})
				);
			});
		},
		toggerMapStyle(val) {
			if (!this.map) return;
			var btn = document.querySelector('.amap-maptype-title');
			this.count++;
			console.log(this.count);
			if (val) {
				btn.click();
			} else {
				btn.click();
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.map_button_box {
	position: fixed;
	// bottom: -5px;
	// right: -27px;
	bottom: 32px;
	right: 32px;
	z-index: 10000000;
	display: flex;
	// transform: scale(0.4);
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
