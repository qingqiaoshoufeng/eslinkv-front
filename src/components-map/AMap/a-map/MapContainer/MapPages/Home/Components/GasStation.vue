<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
		}"
		@click="marker => $emit('overlay-click', marker, 'GasStation')"
	/>
</template>
<script>
import {BaseOverlay} from '../../Components/index';
export default {
	name: 'GasStation',
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
		let apiFun = this.$sysApi.map.home.getGasStationList;
		return {
				apiFun: apiFun,
		};
	},
};
</script>



