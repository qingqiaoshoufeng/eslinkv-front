地下抢修点
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
		@click="
			marker => $emit('overlay-click', marker, 'UndergroundRepairStation')
		"
	/>
</template>
<script>
	import { BaseOverlay } from '../../../../components/index'
	export default {
		name: 'UndergroundRepairStation',
		components: {
			BaseOverlay
		},
		props: {
			visible: {
				type: Boolean,
				default: true
			},
			overlayIcon: {
				type: String,
				default: ''
			},
			overlayType: {
				type: String,
				default: ''
			},
			data: {
				type: Array
			},
			detailList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data () {
			const apiFun = this.$sysApi.map.mock.getUndergroundRepairStationList
			return {
				apiFun: apiFun
			}
		}
	}
</script>

