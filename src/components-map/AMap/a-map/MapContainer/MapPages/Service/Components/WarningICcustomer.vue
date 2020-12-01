<!-- 工商户警报 -->
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			data,
		}"
		@click="
			marker =>
				$emit('overlay-click', { detailList, ...marker }, overlayType)
		"
	>
		<video
			class="warning-videO"
			src="@/assets/amap/images/warning-circle.webm"
			controls="controls"
			autoplay="autoplay"
			muted="muted"
			loop
		></video>
	</BaseOverlay>
</template>
<script>
import { BaseOverlay } from '../../Components/index';

export default {
	name: 'BranchCompany',
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
			apiFun: this.$sysApi.map.serve.getBranchCompanyList,
		};
	},
};
</script>
<style lang="scss" scoped>
video::-webkit-media-controls {
	display: none !important;
}
.warning-videO {
	margin-left: -38px;
	margin-top: -80px;
	outline: none;
}
</style>



