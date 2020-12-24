<!-- 用气大户 -->
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			data,
			apiFun,
			detailList,
			showOverlayName: false,
		}"
		@click="
			marker =>
				$emit('overlay-click', { detailList, ...marker }, overlayType)
		"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index';

export default {
	name: 'MajorClient',
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
			apiFun: this.$sysApi.map.mock.getGrouphallList,
			mouseIn: true,
		};
	},
	methods: {
		mouseover(marker) {
			this.mouseIn = true;
			this.$emit(
				'overlay-click',
				{
					detailList: this.detailList,
					...marker,
					overlayType: this.overlayType,
				},
				this.overlayType
			);
		},
		mouseleave() {
			this.mouseIn = true;
			this.$emit('close');
		},
	},
};
</script>



