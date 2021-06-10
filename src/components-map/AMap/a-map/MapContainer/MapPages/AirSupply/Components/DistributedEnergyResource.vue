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
				$emit('overlay-click', marker, 'DistributedEnergyResource')
		"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index'
import { getDistributedEnergyResourceList } from '@/components-map-api/map.mock.api'

export default {
	name: 'DistributedEnergyResource',
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
		const apiFun = getDistributedEnergyResourceList
		return {
			apiFun: apiFun,
		}
	},
}
</script>
