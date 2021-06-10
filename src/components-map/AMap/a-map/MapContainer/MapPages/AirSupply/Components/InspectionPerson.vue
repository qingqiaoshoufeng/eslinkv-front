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
		v-if="ready"
		@click="handleOverlayClick"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index'
import { getInspectionPersonList } from '@/components-map-api/map.mock.api'
import { getAllTypeStationList } from '@/components-map-api/map.airSupply.api'

export default {
	name: 'InspectionPerson',
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
		// data: {
		// 	type: Array,
		// },
	},
	data() {
		const apiFun = getInspectionPersonList
		return {
			apiFun: apiFun,
			ready: false,
			data: [],
		}
	},
	async created() {
		await this.getData()
		this.ready = true
	},
	methods: {
		handleMouseover(marker) {
			// let { id='', name='', type='' } = marker;
			// this.$emit('overlay-click', marker, 'InspectionPerson', false);
		},
		handleOverlayClick(marker) {
			const { id = '', name = '', type = '' } = marker
			this.$emit('overlay-click', marker, 'InspectionPerson', false)
		},
		handleMouseleave() {
			// this.$emit('close');
		},
		async getData() {
			const params = {
				types: ['InspectionPerson'].toString(),
			}
			const res = await getAllTypeStationList(params)
			this.data = (res && res.inspectionPersonList) || []
			if (!this.ready) {
				this.timer = setInterval(() => {
					this.getData()
				}, 120000)
			}
		},
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
	},
}
</script>
