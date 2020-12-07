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
		@mouseover="
			marker =>
				$emit(
					'overlay-click',
					{ detailList, ...marker, overlayType },
					overlayType
				)
		"
		@click="handleOverlayClick"
		@mouseleave="handleMouseleave"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index';
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
	methods: {
		handleOverlayClick(marker) {
             console.log('click')
            this.$emit(
					'view-detail',
					{  ...marker, overlayType:this.overlayType },
                )
        },
		handleMouseleave() {
			this.$emit('close');
		},
	},
};
</script>



