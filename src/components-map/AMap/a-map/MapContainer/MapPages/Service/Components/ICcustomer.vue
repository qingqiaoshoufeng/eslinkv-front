<template>
	<BaseOverlay
		class="ICcustomer1"
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			...$attrs,
		}"
		:showOverlayName="false"
		@click="handleOverlayClick"
	/>
</template>
<script>
	import { BaseOverlay } from '../../../../components/index'

	export default {
		name: 'ICcustomer',
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
			detailList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data () {
			const apiFun = this.$api.map.mock.getICcustomerList
			return {
				apiFun: apiFun
			}
		},
		methods: {
			handleOverlayClick (marker) {
				marker.detailList = this.detailList
				$emit('overlay-click', this.marker, this.overlayIcon)
			}
		}
	}
</script>
