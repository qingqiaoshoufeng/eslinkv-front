<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
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
	},
	data() {
		let apiFun = this.$sysApi.map.serve.getBranchCompanyList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'BranchCompany',
				overlayIcon: 'iconfengongsi',
			},
		};
	},
};
</script>



