液化气站
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
		@click="marker => $emit('overlay-click', marker, 'LiquefiedGasStation')"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index'
export default {
	name: 'LiquefiedGasStation',
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
				return []
			},
		},
	},
	data() {
		const apiFun = this.$api.map.mock.getLiquefiedGasStationList
		return {
			apiFun: apiFun,
		}
	},
}
</script>
