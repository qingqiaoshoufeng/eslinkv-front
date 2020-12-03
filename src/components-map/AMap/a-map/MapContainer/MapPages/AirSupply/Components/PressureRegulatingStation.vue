调压站
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
		@click="click"
	/>
</template>
<script>
import { BaseOverlay } from '../../../../components/index';
export default {
	name: 'PressurereGulatingStation',
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
		let apiFun = this.$sysApi.map.home.getPressureRegulatingStationList;
		return {
			apiFun: apiFun,
		};
	},
	methods: {
		click(marker) {
			console.log(marker, 2222);
			this.$emit('overlay-click', marker, 'PressureRegulatingStation');
		},
	},
};
</script>



