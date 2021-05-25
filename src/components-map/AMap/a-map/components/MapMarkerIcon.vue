<template>
	<BaseOverlay
		v-bind="{
			overlayIcon: legendIcon,
			overlayType,
			visible,
			...$attrs,
		}"
		@click="handleOverlayClick"
	/>
</template>
<script>
import BaseOverlay from './BaseOverlay/index.vue'
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
		legendIcon: {
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
			unitMap: {
				todayDischarge: '吨',
				monthDischarge: '吨',
				yearCompletedOrderCount: '单',
				pendingOrderCount: '单',
				yearDischarge: '吨',
			}
		}
	},
	methods: {
		async handleOverlayClick(marker) {
			console.log(marker)
			if (this.$attrs.detailHandler) {
				const { id = '', name = '', type = '' } = marker
				const dataComp = {}
				let data = await this.$attrs.detailHandler({ id, name, type })
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
			if (!marker.detail) marker.detail = {}
			this.$emit('overlay-click', marker, this.overlayType)
		},
	}
}
</script>
