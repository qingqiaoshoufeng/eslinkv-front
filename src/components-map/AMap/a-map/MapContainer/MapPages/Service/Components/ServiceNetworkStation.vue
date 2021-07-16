<!-- 服务网点 -->
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
		}"
		@click="mouseover"
	></BaseOverlay>
</template>
<script>
import { BaseOverlay } from '../../../../components/index'
import { getServiceNetworkStationList } from '@/components-map-api/map.mock.api'

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
	},
	data() {
		return {
			apiFun: getServiceNetworkStationList,
		}
	},
	methods: {
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
		handleMouseleave() {
			this.mouseIn = false
			this.$emit('close')
		},
	},
}
</script>
