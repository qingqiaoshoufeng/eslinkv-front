<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="
			marker =>
				$emit('overlay-click', marker, 'EmergencyAirSourceStation')
		"
	/>
</template>
<script>
import {BaseOverlay} from '../../Components/index';
export default {
	name: 'EmergencyAirSourceStation',
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
		let apiFun = this.$sysApi.map.home.getEmergencyAirSourceStationList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'EmergencyAirSourceStation',
				overlayIcon: 'iconqiyuanzhan',
			},
		};
	},
};
</script>



