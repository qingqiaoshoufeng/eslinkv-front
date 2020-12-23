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
		@click="marker => $emit('overlay-click', marker, 'LNGStation')"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index';
export default {
	name: 'LNGStation',
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
		detailList: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	data() {
		let apiFun = this.$sysApi.map.mock.getLNGStationList;
		return {
			apiFun: apiFun,
		};
	},
};
</script>




