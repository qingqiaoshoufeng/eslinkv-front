<!-- 分公司 -->
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			...$attrs,
			data,
			iconSize: 56,
			nameStyle,
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
			nameStyle: {
				fontSize: '24px',
			},
		};
	},
	mounted() {
		console.log(this.detailList);
	},
};
</script>



