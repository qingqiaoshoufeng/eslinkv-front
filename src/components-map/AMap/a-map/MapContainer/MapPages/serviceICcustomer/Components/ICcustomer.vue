<template>
	<BaseOverlay
		class="ICcustomer1"
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
		}"
		:showOverlayName="false"
		@click="marker => $emit('overlay-click', marker, 'ICcustomer')"
	/>
</template>
<script>
import { BaseOverlay } from '../../Components/index';

export default {
	name: 'ICcustomer',
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
		let apiFun = this.$sysApi.map.serve.getICcustomerList;
		return {
			apiFun: apiFun,
		};
	},
};
</script>



