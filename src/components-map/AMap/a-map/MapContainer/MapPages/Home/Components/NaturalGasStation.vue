加气站
<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="marker => $emit('overlay-click', marker, 'NaturalGasStation')"
	/>
</template>
<script>
import {BaseOverlay} from '../../Components/index';
export default {
	name: 'NaturalGasStation',
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
		let apiFun = this.$sysApi.map.home.getNaturalGasStationList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'NaturalGasStation',
				overlayIcon: 'iconjiaqizhan',
			},
		};
	},
};
</script>



