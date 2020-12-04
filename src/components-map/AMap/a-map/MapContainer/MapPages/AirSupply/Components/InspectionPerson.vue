<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			...$attrs,
            data
		}"
		@click="marker => $emit('overlay-click', marker, 'InspectionPerson')"
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
};
</script>



