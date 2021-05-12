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
			// 单位
			unitMap: {}
		}
	},
	methods: {
		async handleOverlayClick(marker) {
			console.log(marker)
			if (!marker.detail) {
				const { id = '', name = '', type = '' } = marker
				const dataComp = {}
				let data = await this.$api.map.airSupply.getStationRealTimeInfo(
					{
						id,
						name,
						type,
					},
				)
				Object.keys(data).forEach(prop => {
					const dw = this.unitMap[prop]
					if (typeof data[prop] !== 'object') {
						return false
					}
					data[prop].forEach((item, index) => {
						const { name, value } = item
						const propInner = prop + index
						dataComp[propInner] = {
							label: name,
							value: value,
							dw,
						}
					})
				})
				marker.detail = dataComp
			}
			this.$emit('overlay-click', marker, this.overlayType, false)
		},
	}
}
</script>
