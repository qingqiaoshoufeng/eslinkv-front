地下抢修点
<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="
			marker => $emit('overlay-click', marker, 'UndergroundRepairStation')
		"
	/>
</template>
<script>
import BaseOverlay from './BaseOverlay';
export default {
	name: 'UndergroundRepairStation',
	components: {
		BaseOverlay,
	},
	props: {
		visible: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		let apiFun = this.$sysApi.map.home.getUndergroundRepairStationList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'UndergroundRepairStation',
				overlayIcon: 'icondixiaqiangxiudian',
			},
		};
	},
};
</script>



