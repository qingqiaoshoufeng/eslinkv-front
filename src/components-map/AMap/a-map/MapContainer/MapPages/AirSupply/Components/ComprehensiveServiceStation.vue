<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			...$attrs,
		}"
		@click="
			marker =>
				$emit('overlay-click', marker, 'ComprehensiveServiceStation')
		"
	></BaseOverlay>
</template>
<script>
import { BaseOverlay } from '../../../../components/index'
import { getComprehensiveServiceStationList } from '@/components-map-api/map.mock.api'

export default {
	name: 'ComprehensiveServiceStation',
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
			apiFun: getComprehensiveServiceStationList,
		}
	},
}
</script>
