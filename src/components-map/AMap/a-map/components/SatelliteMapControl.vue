<template>
	<div class="map_button_box" :class="'SatelliteMap' + sateMapCtrPos">
		<div class="three-button" @click="$emit('input', false)">
			<SvgIcon :icon-name="'icon3dmap'"></SvgIcon>
			<span>3D地图</span>
		</div>
		<div class="satellite-button" @click="$emit('input', true)">
			<SvgIcon :icon-name="'iconSatellitemap'"></SvgIcon>

			<span>卫星地图</span>
		</div>
	</div>
</template>
<script>
import SvgIcon from './SvgIcon/index.vue';
export default {
	data() {
		return { sateLayer: null };
	},
	components: { SvgIcon },
	props: ['value', 'sateMapCtrPos'],
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
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
	}
	.satellite-button {
		width: 110px;
		height: 30px;
		border: 1px solid #00ddff;
		box-sizing: border-box;
		color: #fff;
		line-height: 30px;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		margin-left: 8px;
	}
}
.SatelliteMapleft {
	right: 2100px !important;
}
</style>
