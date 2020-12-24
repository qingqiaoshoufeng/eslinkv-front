<!-- 集团大厅 -->
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			data,
			apiFun,
			detailList,
			nameStyle,
			...$attrs,
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
import { BaseOverlay } from '../../../../components/index';

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
			apiFun: this.$sysApi.map.mock.getGrouphallList,
			nameStyle: {
				fontSize: '24px',
			},
		};
	},
};
</script>



