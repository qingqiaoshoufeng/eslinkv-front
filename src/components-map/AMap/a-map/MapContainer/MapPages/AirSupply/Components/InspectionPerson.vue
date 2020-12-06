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
		@click="handleOverlayClick"
		@mouseover="handleMouseover"
		@mouseleave="handleMouseleave"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index';
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
		data: {
			type: Array,
		},
	},
	data() {
		let apiFun = this.$sysApi.map.home.getInspectionPersonList;
		return {
			apiFun: apiFun,
		};
	},
	methods: {
		handleMouseover(marker) {
			let { id, name, type } = marker;
			this.$emit('overlay-click', marker, 'InspectionPerson', false);
		},
		handleOverlayClick(marker) {},
		handleMouseleave() {
			this.$emit('close');
		},
	},
};
</script>



