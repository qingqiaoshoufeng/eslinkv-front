<!-- 应急气源站 -->
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			...$attrs,
			data: dataInner,
		}"
		@click="
			marker =>
				$emit('overlay-click', marker, 'EmergencyAirSourceStation')
		"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index'
import { getEmergencyAirSourceStationList } from '@/components-map-api/map.mock.api'

export default {
	name: 'EmergencyAirSourceStation',
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
	computed: {
		dataInner() {
			const { data = [] } = this
			const stationPoseMap = {
				西部应急气源站: 'left',
				东部应急气源站: 'top',
				西部应急气源站: 'left',
			}
			return this.data.map(item => {
				item.pose = stationPoseMap[item.name]
				return item
			})
		},
	},
	data() {
		const apiFun = getEmergencyAirSourceStationList
		return {
			apiFun: apiFun,
		}
	},
}
</script>
