<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="
			marker =>
				$emit('overlay-click', marker, 'ComprehensiveServiceStation')
		"
	/>
</template>
<script>
import BaseOverlay from './BaseOverlay';
export default {
	name: 'ComprehensiveServiceStation',
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
		let apiFun = this.$sysApi.map.home.getComprehensiveServiceStationList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'ComprehensiveServiceStation',
				overlayIcon: 'iconzonghefuwuzhan',
			},
		};
	},
};
</script>





