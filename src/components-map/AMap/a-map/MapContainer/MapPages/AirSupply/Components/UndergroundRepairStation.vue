地下抢修点
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
		}"
		@click="
			marker => $emit('overlay-click', marker, 'UndergroundRepairStation')
		"
	/>
</template>
<script>
import {BaseOverlay} from '../../Components/index';
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
		let apiFun = this.$sysApi.map.home.getUndergroundRepairStationList;
		return {
				apiFun: apiFun,
		};
	},
};
</script>



