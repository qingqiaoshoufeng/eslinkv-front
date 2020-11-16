<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="marker => $emit('overlay-click', marker, 'GasStation')"
	/>
</template>
<script>
import BaseOverlay from './BaseOverlay';
export default {
	name: 'GasStation',
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
		let apiFun = this.$sysApi.map.home.getGasStationList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'GasStation',
				overlayIcon: 'iconmenzhan',
			},
		};
	},
};
</script>



