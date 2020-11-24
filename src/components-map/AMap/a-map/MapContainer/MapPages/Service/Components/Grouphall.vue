<!-- 集团大厅 -->
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			data,
			apiFun,
		}"
		@click="marker => $emit('overlay-click', marker, overlayType)"
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
		overlayIcon: {
			type: String,
			default: '',
		},
		overlayType: {
			type: String,
			default: '',
		},
		data: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	data() {
		return {
			apiFun: this.$sysApi.map.serve.getGrouphallList,
		};
	},
};
</script>



