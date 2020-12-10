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
		@mouseover="handleMouseover"
		@mouseleave="handleMouseleave"
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
			propDwMap: {
				flow: 'm³/h',
				inPressure: 'MPa',
				inTemp: '℃',
				outPressure: 'MPa',
				outTemp: '℃',
				todayAirFeed: 'm³',
			},
			mouseIn: false,
		};
	},
	methods: {
		async handleMouseover(marker) {
			if (this.mouseIn) {
				return false;
			}
			this.mouseIn = true;
			let { id, name, type } = marker;
			let data = await this.$sysApi.map.airSupply.getStationRealTimeInfo({
				id,
				name,
				type,
			});
			let dataComp = {};
			Object.keys(data).forEach(prop => {
				let dw = this.propDwMap[prop];
				if (typeof data[prop] !== 'object') {
					return false;
				}
				data[prop].forEach((item, index) => {
					let { name, value } = item;
					let propInner = prop + index;
					dataComp[propInner] = {
						label: name,
						value: value.toFixed(2),
						dw,
					};
				});
			});
			if (this.mouseIn) {
				this.$emit(
					'overlay-click',
					{ ...marker, detail: dataComp },
					'PressureRegulatingStation',
					false
				);
			}
		},
		handleMouseleave() {
			this.mouseIn = false;
			this.$emit('close');
		},
	},
};
</script>



