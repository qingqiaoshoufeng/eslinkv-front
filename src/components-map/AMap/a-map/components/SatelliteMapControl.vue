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
import SvgIcon from './SvgIcon/index.vue'
export default {
	data() {
		return { sateLayer: null }
	},
	components: { SvgIcon },
	props: ['value', 'sateMapCtrPos'],
	watch: {
		value: {
			handler(val) {
				console.log(val)
			},
			immediate: true,
		},
	},
}
</script>
<style lang="scss" scoped>
.map_button_box {
	position: fixed;
	right: 32px;
	// bottom: -5px;
	// right: -27px;
	bottom: 32px;
	z-index: 10000000;
	display: flex;
	// transform: scale(0.4);
	.three-button {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 110px;
		height: 30px;
		font-size: 16px;
		line-height: 30px;
		color: #fff;
		text-align: center;
		border: 1px solid #0df;
	}

	.satellite-button {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 110px;
		height: 30px;
		margin-left: 8px;
		font-size: 16px;
		line-height: 30px;
		color: #fff;
		text-align: center;
		border: 1px solid #0df;
	}
}

.SatelliteMapleft {
	right: 2100px !important;
}
</style>
