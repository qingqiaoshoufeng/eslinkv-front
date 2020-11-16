管网运行管理站
<template>
	<BaseOverlay
		v-bind="{
			visible,
			...overlayProps,
		}"
		@click="
			marker => $emit('overlay-click', marker, 'PipeManageMentStation')
		"
	/>
</template>
<script>
import {BaseOverlay} from '../../Components/index';
export default {
	name: 'PipeManageMentStation',
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
		let apiFun = this.$sysApi.map.home.getPipeManageMentStationList;
		return {
			overlayProps: {
				apiFun: apiFun,
				overlayType: 'PipeManageMentStation',
				overlayIcon: 'iconguanwangyunhangguanlizhan',
			},
		};
	},
};
</script>



