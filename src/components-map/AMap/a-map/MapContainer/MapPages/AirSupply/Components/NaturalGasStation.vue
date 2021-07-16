加气站
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
		@click="marker => $emit('overlay-click', marker, 'NaturalGasStation')"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index'
import { getNaturalGasStationList } from '@/components-map-api/map.mock.api'

export default {
	name: 'NaturalGasStation',
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
		return {
			apiFun: getNaturalGasStationList,
		}
	},
}
</script>
