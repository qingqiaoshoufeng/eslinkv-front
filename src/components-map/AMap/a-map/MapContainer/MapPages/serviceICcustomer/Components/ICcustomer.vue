<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
		}"
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
		let apiFun = this.$sysApi.map.serve.getGrouphallList;
		return {
			apiFun: apiFun,
		};
	},
};
</script>



