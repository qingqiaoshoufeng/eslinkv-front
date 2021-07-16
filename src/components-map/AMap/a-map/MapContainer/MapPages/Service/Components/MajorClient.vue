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
		@click="handleOverlayClick"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index'
import { getGrouphallList } from '@/components-map-api/map.mock.api'

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
			apiFun: getGrouphallList,
			mouseIn: true,
		}
	},
	methods: {
		mouseover(marker) {
			this.mouseIn = true
			marker.detailList = this.detailList
			marker.overlayType = this.overlayType
			this.$emit('overlay-click', marker, this.overlayType)
		},
		mouseleave() {
			this.mouseIn = true
			this.$emit('close')
		},
		handleOverlayClick(marker) {
			marker.detailList = this.detailList
			marker.overlayType = this.overlayType
			this.$emit('overlay-click', marker, this.overlayType)
		},
	},
}
</script>
