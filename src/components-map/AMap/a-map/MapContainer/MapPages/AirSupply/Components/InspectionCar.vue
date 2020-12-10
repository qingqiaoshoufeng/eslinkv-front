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
		v-if="ready"
		@click="handleOverlayClick"
		@mouseover="handleMouseover"
		@mouseleave="handleMouseleave"
	>
	</BaseOverlay>
</template>
<script>
import { BaseOverlay } from '../../../../components/index';
export default {
	name: 'InspectionCar',
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
		let apiFun = this.$sysApi.map.home.getInspectionCarList;
		return {
			apiFun: apiFun,
			data: [],
			ready: false,
		};
	},
	async created() {
		await this.getData();
		this.ready = true;
	},
	methods: {
		handleMouseover(marker) {
			// let { id, name, type } = marker;
			// this.$emit('overlay-click', marker, 'InspectionCar', false);
		},
		handleOverlayClick(marker) {
            let { id, name, type } = marker;
			this.$emit('overlay-click', marker, 'InspectionPerson', false);
        },
		handleMouseleave() {
			// this.$emit('close');
		},
		async getData() {
			let params = {
				types: ['InspectionCar'].toString(),
			};
			let res = await this.$sysApi.map.airSupply.getAllTypeStationList(
				params
			);
			this.data = (res && res['inspectionCarList']) || [];
			if (!this.ready) {
				this.timer = setInterval(() => {
					this.getData();
				}, 120000);
			}
		},
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	},
};
</script>




