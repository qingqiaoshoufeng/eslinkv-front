<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			iconSize: 52,
		}"
		@click="
			marker =>
				$emit('overlay-click', marker, 'EmergencyAirSourceStation')
		"
	/>
</template>
<script>
import { BaseOverlay } from '../../Components/index';
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
		overlayIcon: {
			type: String,
			default: '',
		},
		overlayType: {
			type: String,
			default: '',
		},
	},
	data() {
		let apiFun = this.$sysApi.map.home.getEmergencyAirSourceStationList;
		return {
			apiFun: apiFun,
		};
	},
};
</script>



