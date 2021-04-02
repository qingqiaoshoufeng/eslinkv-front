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
			showOverlayName: false,
		}"
		@click="mouseover"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index'
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
				return []
			},
		},
		detailList: {
			type: Array,
			default() {
				return []
			},
		},
	},
	data() {
		return {
			apiFun: this.$api.map.mock.getThreeSocialLinkageList,
		}
	},
	methods: {
		handleOverlayClick(marker) {
			this.$emit('view-detail', {
				...marker,
				overlayType: this.overlayType,
			})
		},
		mouseover(marker) {
			this.mouseIn = true
			this.$emit(
				'overlay-click',
				{
					detailList: this.detailList,
					...marker,
					overlayType: this.overlayType,
				},
				this.overlayType,
			)
		},
		handleMouseleave() {},
	},
}
</script>
