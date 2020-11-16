<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="marker => $emit('overlay-click', marker, 'LNGStation')"
	/>
</template>
<script>
import BaseOverlay from './BaseOverlay';
export default {
	name: 'LNGStation',
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
		let apiFun = this.$sysApi.map.home.getLNGStationList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'LNGStation',
				overlayIcon: 'iconlng',
			},
		};
	},
};
</script>




