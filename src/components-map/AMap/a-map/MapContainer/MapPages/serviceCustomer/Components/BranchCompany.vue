<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
		}"
		@click="marker => $emit('overlay-click', marker, overlayType)"
	/>
</template>
<script>
import { BaseOverlay } from '../../Components/index';

export default {
	name: 'BranchCompany',
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
			apiFun: this.$sysApi.map.serve.getBranchCompanyList,
		};
	}
};
</script>



