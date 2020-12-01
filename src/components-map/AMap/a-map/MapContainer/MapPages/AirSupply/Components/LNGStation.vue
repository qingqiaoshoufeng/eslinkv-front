<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			...$attrs,
		}"
		@click="marker => $emit('overlay-click', marker, 'LNGStation')"
	/>
</template>
<script>
import {BaseOverlay} from '../../Components/index';
export default {
	name: 'LNGStation',
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
		let apiFun = this.$sysApi.map.home.getLNGStationList;
		return {
				apiFun: apiFun,
		};
	},
};
</script>




