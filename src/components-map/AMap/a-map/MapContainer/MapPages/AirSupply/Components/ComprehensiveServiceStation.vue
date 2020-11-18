<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
		}"
		@click="
			marker =>
				$emit('overlay-click', marker, 'ComprehensiveServiceStation')
		"
	>
		<!-- <div class="sample-name" :slot-scope="{ data }">{{ data.name }}</div> -->
	</BaseOverlay>
</template>
<script>
import { BaseOverlay } from '../../Components/index';
export default {
	name: 'ComprehensiveServiceStation',
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
		let apiFun = this.$sysApi.map.home.getComprehensiveServiceStationList;
		return {
			apiFun: apiFun,
		};
	},
};
</script>





