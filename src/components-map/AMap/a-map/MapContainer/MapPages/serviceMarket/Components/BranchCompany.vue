<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
		}"
		@click="marker => $emit('overlay-click', marker, 'BranchCompany')"
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
		let apiFun = this.$sysApi.map.serve.getBranchCompanyList;
		return {
				apiFun: apiFun,
		};
	},
};
</script>



