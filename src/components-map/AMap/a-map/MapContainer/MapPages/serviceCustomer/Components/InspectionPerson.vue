<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="marker => $emit('overlay-click', marker, 'InspectionPerson')"
	/>
</template>
<script>
import {BaseOverlay} from '../../Components/index';
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
	},
	data() {
		let apiFun = this.$sysApi.map.home.getInspectionPersonList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'InspectionPerson',
				overlayIcon: 'iconrenyuan',
			},
		};
	},
};
</script>



