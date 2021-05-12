<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			...$attrs,
		}"
		@click="
			marker =>
				$emit('overlay-click', marker, overlayType)
		"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index'
export default {
	name: 'MapMarkerIcon',
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
		}
	},
}
</script>
