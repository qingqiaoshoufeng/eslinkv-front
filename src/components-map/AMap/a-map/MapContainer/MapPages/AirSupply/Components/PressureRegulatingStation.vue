调压站
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
		}"
		@click="click"
	/>
</template>
<script>
import { BaseOverlay } from '../../Components/index';
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
	},
	data() {
		let apiFun = this.$sysApi.map.home.getPressureRegulatingStationList;
		apiFun().then(res => {
			console.log(res, 3333);
		});  
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



