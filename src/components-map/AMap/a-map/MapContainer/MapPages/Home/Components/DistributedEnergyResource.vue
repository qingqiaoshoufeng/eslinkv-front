<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="
			marker =>
				$emit('overlay-click', marker, 'DistributedEnergyResource')
		"
	/>
</template>
<script>
import { BaseOverlay } from '../../Components/index';
export default {
	name: 'DistributedEnergyResource',
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
        let apiFun = this.$sysApi.map.home.getDistributedEnergyResourceList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'DistributedEnergyResource',
				overlayIcon: 'iconnengyuanzhan',
			},
		};
	},
};
</script>



