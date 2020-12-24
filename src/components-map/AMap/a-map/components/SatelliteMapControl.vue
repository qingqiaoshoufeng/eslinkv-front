<template>
	<div class="map_button_box">
		<div class="three-button" @click="$emit('input', false)">3D地图</div>
		<div class="satellite-button" @click="$emit('input', true)">
			卫星地图
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return { sateLayer: null };
	},
	props: ['value'],
	watch: {
		value: {
			handler(val) {
				console.log(val);
			},
			immediate: true,
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
