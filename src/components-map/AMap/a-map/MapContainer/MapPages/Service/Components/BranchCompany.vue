<!-- 子公司 -->
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			data: dataInner,
			...$attrs,
			nameStyle,
		}"
		@mouseover="
			marker =>
				$emit(
					'overlay-click',
					{ detailList, ...marker, overlayType },
					overlayType
				)
		"
		@mouseleave="handleMouseleave"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index';

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
	computed: {
		dataInner() {
			return this.data.map(item => {
				item.name = item.name.replace(/有限公司|分公司/, '');
				return item;
			});
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
		console.log(this.data, '1111');
		console.log(this.overlayType, '1111');
	},
	methods: {
		handleMouseleave() {
			this.$emit('close');
		},
	},
};
</script>



