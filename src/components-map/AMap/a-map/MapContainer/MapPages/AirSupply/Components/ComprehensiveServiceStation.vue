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
	>
	</BaseOverlay>
</template>
<script>
	import { BaseOverlay } from '../../../../components/index'
	export default {
		name: 'ComprehensiveServiceStation',
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
			}
		},
		data () {
			const apiFun = this.$api.map.mock.getComprehensiveServiceStationList
			return {
				apiFun: apiFun
			}
		}
	}
</script>

