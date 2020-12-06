<!-- 服务网点 -->
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
		}"
		@mouseover="marker => $emit('overlay-click', marker, overlayType)"
		@mouseleave="handleMouseleave"
	>
	</BaseOverlay>
</template>
<script>
import { BaseOverlay } from '../../../../components/index';
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
		return {
			apiFun: this.$sysApi.map.serve.getServiceNetworkStationList,
		};
	},
	methods: {
		handleMouseleave() {
			this.$emit('close');
		},
	},
};
</script>



