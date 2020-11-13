调压站
<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="
			marker =>
				$emit('overlay-click', marker, 'PressurereGulatingStation')
		"
	/>
</template>
<script>
import BaseOverlay from './BaseOverlay';
export default {
	name: 'PressurereGulatingStation',
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
		let apiFun = this.$sysApi.map.home.getPressureRegulatingStationList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'PressurereGulatingStation',
				overlayIcon: 'icontuliqiyuanzhan',
			},
		};
	},
};
</script>



