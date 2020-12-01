地上抢修点
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			...$attrs,
		}"
		@click="
			marker => $emit('overlay-click', marker, 'UndergroundRepairStation')
		"
	/>
</template>
<script>
import { BaseOverlay } from '../../Components/index';
export default {
	name: 'OngroundRepairStation',
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



