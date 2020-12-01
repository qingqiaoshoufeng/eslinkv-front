<!-- 综合服务站 -->
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			...$attrs,
			detailList,
		}"
		@click="
			marker =>
				$emit(
					'overlay-click',
					{ detailList, ...marker, overlayType },
					overlayType
				)
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
		overlayIcon: {
			type: String,
			default: '',
		},
		overlayType: {
			type: String,
			default: '',
		},
		detailList: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	data() {
		return {
			apiFun: this.$sysApi.map.serve.getServiceNetworkStationList,
		};
	},
};
</script>



