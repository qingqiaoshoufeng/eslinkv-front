<!-- 综合服务站 -->
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,

			...$attrs,
			data,
		}"
		@click="
			marker =>
				$emit(
					'overlay-click',
					{ detailList, ...marker, overlayType },
					overlayType
				)
		"
	/>
</template>
<script>
	import { BaseOverlay } from '../../../../components/index'
	export default {
		name: 'ServiceStation',
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
			},
			data: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data () {
			return {}
		},
		mounted () {}
	}
</script>

