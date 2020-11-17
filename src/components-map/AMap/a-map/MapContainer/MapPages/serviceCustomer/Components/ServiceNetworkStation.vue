<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="
			marker => $emit('overlay-click', marker, 'ServiceNetworkStation')
		"
	/>
</template>
<script>
import { BaseOverlay } from '../../Components/index';
export default {
	name: 'ServiceNetworkStation',
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
		let apiFun = this.$sysApi.map.serve.getServiceNetworkStationList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'ServiceNetworkStation',
				overlayIcon: 'iconfuwuwangdian',
			},
		};
	},
};
</script>



