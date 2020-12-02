<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			...$attrs,
			data,
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
		data: {
			type: Array,
		},
		detailList: {
			type: Array,
			default() {
				return [];
			},
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



