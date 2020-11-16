<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="marker => $emit('overlay-click', marker, 'Grouphall')"
	/>
</template>
<script>
import { BaseOverlay } from '../../Components/index';

export default {
	name: 'Grouphall',
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
		let apiFun = this.$sysApi.map.serve.getGrouphallList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'Grouphall',
				overlayIcon: 'iconjituandating',
			},
		};
	},
};
</script>



