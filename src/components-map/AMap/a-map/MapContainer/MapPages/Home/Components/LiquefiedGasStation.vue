液化气站
<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="marker => $emit('overlay-click', marker, 'LiquefiedGasStation')"
	/>
</template>
<script>
import {BaseOverlay} from '../../Components/index';
export default {
	name: 'LiquefiedGasStation',
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
		let apiFun = this.$sysApi.map.home.getLiquefiedGasStationList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'LiquefiedGasStation',
				overlayIcon: 'iconyehuaqi',
			},
		};
	},
};
</script>




