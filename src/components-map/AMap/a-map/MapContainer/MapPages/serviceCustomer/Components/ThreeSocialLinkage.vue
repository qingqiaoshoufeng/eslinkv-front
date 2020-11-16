<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="marker => $emit('overlay-click', marker, 'ThreeSocialLinkage')"
	/>
</template>
<script>
import {BaseOverlay} from '../../Components/index';
export default {
	name: 'ThreeSocialLinkage',
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
		let apiFun = this.$sysApi.map.home.getInspectionCarList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'InspectionCar',
				overlayIcon: 'iconsansheliandong',
			},
		};
	},
};
</script>



