<!-- 三社联动 -->
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			...$attrs,
			data,
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
	name: 'ThreeSocialLinkage',
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
		detailList: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	data() {
		return {
			apiFun: this.$sysApi.map.serve.getThreeSocialLinkageList,
		};
	},
};
</script>



